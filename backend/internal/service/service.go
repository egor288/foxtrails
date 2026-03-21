package service

import (
	"context"
	"math"
	"os"
	"sort"
	"time"

	"foxtrails/internal/entity"

	"database/sql"

	"github.com/go-resty/resty/v2"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Service struct {
	client *resty.Client
	apiKey string
	db     *sql.DB
}
type Place struct {
	ID   int
	Name string
	Lat  float64
	Lon  float64
}

func NewService(db *pgxpool.Pool) *Service {
	return &Service{
		client: resty.New().SetTimeout(90 * time.Second),
		apiKey: os.Getenv("OPENROUTER_API_KEY"),
		db:     db,
	}
}

func buildRoute(startLat, startLon float64, places []Place) []Place {

	visited := make([]bool, len(places))
	var route []Place

	currentLat := startLat
	currentLon := startLon

	for range places {
		bestIdx := -1
		bestDist := math.MaxFloat64

		for i, p := range places {
			if visited[i] {
				continue
			}

			d := haversine(currentLat, currentLon, p.Lat, p.Lon)

			if d < bestDist {
				bestDist = d
				bestIdx = i
			}
		}

		if bestIdx == -1 {
			break
		}

		visited[bestIdx] = true
		next := places[bestIdx]

		route = append(route, next)

		currentLat = next.Lat
		currentLon = next.Lon
	}

	return route
}

func (s *Service) GenerateRoute(ctx context.Context, lat, lon float64, tags []string) (map[string]interface{}, error) {

	rows, err := s.db.Query(ctx, `
		SELECT DISTINCT p.id, p.name, p.lat, p.lon
		FROM places p
		JOIN place_tags pt ON pt.place_id = p.id
		JOIN tags t ON t.id = pt.tag_id
		WHERE t.name = ANY($1)
	`, tags)

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var places []Place

	for rows.Next() {
		var p Place
		if err := rows.Scan(&p.ID, &p.Name, &p.Lat, &p.Lon); err != nil {
			continue
		}
		places = append(places, p)
	}

	if len(places) == 0 {
		return map[string]interface{}{"places": []Place{}}, nil
	}

	// 🔥 1. сортируем по расстоянию от пользователя
	sort.Slice(places, func(i, j int) bool {
		return haversine(lat, lon, places[i].Lat, places[i].Lon) <
			haversine(lat, lon, places[j].Lat, places[j].Lon)
	})

	// 🔥 2. ограничим (например 10)
	if len(places) > 10 {
		places = places[:10]
	}

	// 🔥 3. строим маршрут greedy
	route := buildRoute(lat, lon, places)

	return map[string]interface{}{
		"places": route,
	}, nil
}

// fallback
func fallbackRoute(lat, lon float64) entity.Route {
	return entity.Route{
		Title:       "Fallback маршрут",
		Description: "ИИ не ответил",
		DistanceKm:  3,
		Points: []entity.Point{
			{Name: "Start", Lat: lat, Lon: lon},
			{Name: "End", Lat: lat, Lon: lon},
		},
		Story: []string{"Попробуй ещё раз"},
	}
}

// очистка markdown
func cleanJSON(s string) string {
	s = removePrefix(s, "```json")
	s = removePrefix(s, "```")
	s = removeSuffix(s, "```")
	return s
}

func removePrefix(s, prefix string) string {
	if len(s) >= len(prefix) && s[:len(prefix)] == prefix {
		return s[len(prefix):]
	}
	return s
}

func removeSuffix(s, suffix string) string {
	if len(s) >= len(suffix) && s[len(s)-len(suffix):] == suffix {
		return s[:len(s)-len(suffix)]
	}
	return s
}
