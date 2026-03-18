package api

import (
	"net/http"

	api "github.com/egor288/foxtrails/internal/gateway/http"
	"github.com/egor288/foxtrails/internal/usecase"

	"github.com/labstack/echo/v4"
)

type Handler struct {
	RouteUC *usecase.RouteUsecase
}

func NewHandler(uc *usecase.RouteUsecase) *Handler {
	return &Handler{
		RouteUC: uc,
	}
}

func (h *Handler) GenerateRoute(c echo.Context) error {

	var req api.RouteRequest

	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, "bad request")
	}

	res, err := h.RouteUC.GenerateRoute(c.Request().Context(), req)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, res)
}
