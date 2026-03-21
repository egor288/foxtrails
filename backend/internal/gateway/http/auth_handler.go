package http

import (
	"database/sql"
	"net/http"

	"foxtrails/internal/gateway/db"

	"github.com/labstack/echo/v4"
)

type AuthHandler struct {
	db *sql.DB
}

func NewAuthHandler(dbConn *sql.DB) *AuthHandler {
	return &AuthHandler{db: dbConn}
}

type request struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// =====================
// 🔐 REGISTER
// =====================

func (h *AuthHandler) Register(c echo.Context) error {

	var req request

	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, "bad request")
	}

	err := db.CreateUser(c.Request().Context(), h.db, req.Email, req.Password)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, "registered")
}

// =====================
// 🔑 LOGIN
// =====================

func (h *AuthHandler) Login(c echo.Context) error {

	var req request

	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, "bad request")
	}

	user, err := db.LoginUser(c.Request().Context(), h.db, req.Email, req.Password)
	if err != nil {
		return c.JSON(http.StatusUnauthorized, err.Error())
	}

	return c.JSON(http.StatusOK, user)
}
