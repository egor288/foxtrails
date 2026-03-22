package http

import (
	"net/http"

	"github.com/labstack/echo/v4"

	"foxtrails/internal/service"
)

type Handler struct {
	svc *service.Service
}

type GenerateRouteRequest struct {
	City          string   `json:"city"`
	Accommodation []string `json:"accommodation"`
	Company       struct {
		Adults   int `json:"adults"`
		Children int `json:"children"`
	} `json:"company"`
	Preferences []string `json:"preferences"`
	Dates       struct {
		Day   string `json:"day"`
		Month string `json:"month"`
		Year  string `json:"year"`
	} `json:"dates"`
}

func NewHandler(svc *service.Service) *Handler {
	return &Handler{svc: svc}
}

// health
func (h *Handler) Health(c echo.Context) error {
	return c.JSON(http.StatusOK, map[string]string{
		"status": "ok",
	})
}

func getCityCoords(city string) (float64, float64) {
	switch city {
	case "Сочи":
		return 43.5855, 39.7231
	case "Краснодар":
		return 45.0355, 38.9753
	default:
		return 45.0355, 38.9753 // fallback
	}
}

func (h *Handler) GenerateRoute(c echo.Context) error {
	var req GenerateRouteRequest

	if err := c.Bind(&req); err != nil {
		return c.JSON(400, map[string]string{"error": "invalid request"})
	}

	// 🔥 мапим city → координаты
	lat, lon := getCityCoords(req.City)

	// 🔥 формируем теги
	tags := req.Preferences

	if req.Company.Children > 0 {
		tags = append(tags, "family")
	}

	places, err := h.svc.GenerateRoute(
		c.Request().Context(),
		lat,
		lon,
		tags,
	)

	if err != nil {
		return c.JSON(500, map[string]string{"error": err.Error()})
	}

	return c.JSON(200, map[string]interface{}{
		"places": places,
	})
}
