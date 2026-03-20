package http

import (
	"net/http"

	"foxtrails/internal/gateway/db"

	"github.com/labstack/echo/v4"
)

type AuthHandler struct {
	db *db.DB
}

func NewAuthHandler(db *db.DB) *AuthHandler {
	return &AuthHandler{db: db}
}

type request struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (h *AuthHandler) Register(c echo.Context) error {

	var req request

	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, "bad request")
	}

	err := h.db.CreateUser(c.Request().Context(), req.Email, req.Password)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, "registered")
}

func (h *AuthHandler) Login(c echo.Context) error {

	var req request

	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, "bad request")
	}

	user, err := h.db.LoginUser(c.Request().Context(), req.Email, req.Password)
	if err != nil {
		return c.JSON(http.StatusUnauthorized, err.Error())
	}

	return c.JSON(http.StatusOK, user)
}
