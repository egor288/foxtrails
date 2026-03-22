package service

import (
	"context"
	"database/sql"
	"math"
	"strings"
)

type Service struct {
	db *sql.DB
}

type Place struct {
	ID   int
	Name string
	Lat  float64
	Lon  float64
}

func NewService(db *sql.DB) *Service {
	return &Service{
		db: db,
	}
}

// 🔥 основной метод
func (s *Service) GenerateRoute(ctx context.Context, lat, lon float64, tags []string) ([]Place, error) {

	rows, err := s.db.QueryContext(ctx, `
		SELECT 
			p.id, 
			p.name, 
			p.lat, 
			p.lon,
			COUNT(t.id) as match_count,
			(
				6371 * acos(
					cos(radians($1)) * cos(radians(p.lat)) *
					cos(radians(p.lon) - radians($2)) +
					sin(radians($1)) * sin(radians(p.lat))
				)
			) AS distance
		FROM places p
		JOIN place_tags pt ON pt.place_id = p.id
		JOIN tags t ON t.id = pt.tag_id
		WHERE t.name = ANY($3)
		GROUP BY p.id
		ORDER BY match_count DESC, distance ASC
		LIMIT 20
	`, lat, lon, pqArray(tags))

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var places []Place

	for rows.Next() {
		var p Place
		var matchCount int
		var distance float64

		if err := rows.Scan(&p.ID, &p.Name, &p.Lat, &p.Lon, &matchCount, &distance); err != nil {
			continue
		}

		places = append(places, p)
	}

	if len(places) == 0 {
		return []Place{}, nil
	}

	// 🔥 теперь только строим маршрут (без сортировки)
	route := buildRoute(lat, lon, places)

	// ограничим до 10
	if len(route) > 10 {
		route = route[:10]
	}

	return route, nil
}
func sortPlaces(lat, lon float64, places []Place) {
	for i := 0; i < len(places); i++ {
		for j := i + 1; j < len(places); j++ {
			if haversine(lat, lon, places[i].Lat, places[i].Lon) >
				haversine(lat, lon, places[j].Lat, places[j].Lon) {
				places[i], places[j] = places[j], places[i]
			}
		}
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

// 🔥 фикс для ANY($1)
func pqArray(a []string) interface{} {
	return "{" + strings.Join(a, ",") + "}"
}
