package service

import (
	"context"
	"os"
	"time"

	"foxtrails/internal/entity"

	"github.com/go-resty/resty/v2"
)

type Service struct {
	client *resty.Client
	apiKey string
}

func NewService() *Service {
	return &Service{
		client: resty.New().SetTimeout(90 * time.Second),
		apiKey: os.Getenv("OPENROUTER_API_KEY"),
	}
}

func (s *Service) GenerateRoute(ctx context.Context, lat, lon float64) entity.Route {

	route := entity.Route{
		Title:       "Тестовый маршрут",
		Description: "Простой маршрут-заглушка вокруг точки старта",
		DistanceKm:  3.5,
		Points: []entity.Point{
			{
				Name: "Старт",
				Lat:  lat,
				Lon:  lon,
			},
			{
				Name: "Точка 1",
				Lat:  lat + 0.01,
				Lon:  lon + 0.01,
			},
			{
				Name: "Точка 2",
				Lat:  lat + 0.015,
				Lon:  lon - 0.01,
			},
			{
				Name: "Финиш",
				Lat:  lat,
				Lon:  lon,
			},
		},
		Story: []string{
			"Начни прогулку с этой точки",
			"Пройди к первой смотровой зоне",
			"Насладись природой и вернись обратно",
		},
	}

	return route
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
