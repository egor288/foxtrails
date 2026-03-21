package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

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
		log.Fatal("failed to connect db:", err)
	}

	svc := service.NewService(dbConn)

	handler := http.NewHandler(svc)
	authHandler := http.NewAuthHandler(dbConn)

	e.POST("/api/auth/register", authHandler.Register)
	e.POST("/api/auth/login", authHandler.Login)

	e.GET("/api/health", handler.Health)
	e.POST("/api/routes/generate", handler.GenerateRoute)

	go func() {
		if err := e.Start(":8080"); err != nil {
			log.Println("server stopped:", err)
		}
	}()

	log.Println("🚀 server started on :8080")

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, syscall.SIGTERM)
	<-quit

	log.Println("shutting down server...")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := e.Shutdown(ctx); err != nil {
		log.Fatal("server shutdown failed:", err)
	}

	log.Println("server exited properly")
}
