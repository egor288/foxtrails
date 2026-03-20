package main

import (
	"github.com/labstack/echo/v4"

	"foxtrails/internal/gateway/db"
	"foxtrails/internal/gateway/http"
	"foxtrails/internal/service"
)

func main() {
	e := echo.New()

	svc := service.NewService()
	handler := http.NewHandler(svc)

	dbConn, err := db.New()
	if err != nil {
		panic(err)
	}

	authHandler := http.NewAuthHandler(dbConn)

	e.POST("/auth/register", authHandler.Register)
	e.POST("/auth/login", authHandler.Login)

	e.GET("/health", handler.Health)
	e.POST("/routes/generate", handler.GenerateRoute)

	e.Logger.Fatal(e.Start(":8080"))
}
