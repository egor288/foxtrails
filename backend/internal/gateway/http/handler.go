package http

import (
	"net/http"

	"github.com/labstack/echo/v4"

	"foxtrails/internal/service"
)

type Handler struct {
	svc *service.Service
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

// generate route
func (h *Handler) GenerateRoute(c echo.Context) error {
	var req struct {
		Lat  float64  `json:"lat"`
		Lon  float64  `json:"lon"`
		Tags []string `json:"tags"`
	}

	if err := c.Bind(&req); err != nil {
		return c.JSON(400, map[string]string{"error": "bad request"})
	}

	route, err := h.svc.GenerateRoute(c.Request().Context(), req.Lat, req.Lon, req.Tags)
	if err != nil {
		return c.JSON(500, map[string]string{"error": err.Error()})
	}

	var result []map[string]interface{}

	for i, p := range route {
		result = append(result, map[string]interface{}{
			"id":    p.ID,
			"name":  p.Name,
			"lat":   p.Lat,
			"lon":   p.Lon,
			"order": i,
		})
	}

	return c.JSON(200, map[string]interface{}{
		"places": result,
	})
}
