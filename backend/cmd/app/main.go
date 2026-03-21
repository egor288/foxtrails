package main

import (
	"log"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	"foxtrails/internal/gateway/db"
	"foxtrails/internal/gateway/http"
	"foxtrails/internal/service"
)

func main() {
	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())

	dbConn, err := db.New()
	if err != nil {
		log.Fatal(err)
	}

	svc := service.NewService(dbConn)

	handler := http.NewHandler(svc)
	authHandler := http.NewAuthHandler(dbConn)

	e.POST("/api/auth/register", authHandler.Register)
	e.POST("/api/auth/login", authHandler.Login)

	e.GET("/api/health", handler.Health)
	e.POST("/api/routes/generate", handler.GenerateRoute)

	e.Logger.Fatal(e.Start(":8080"))
}
