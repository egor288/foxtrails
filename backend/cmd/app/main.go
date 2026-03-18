package main

import (
	"github.com/labstack/echo/v4"

	api "github.com/egor288/foxtrails/internal/gateway/http"
	httpHandler "github.com/egor288/foxtrails/internal/gateway/http"
	"github.com/egor288/foxtrails/internal/usecase"
)

func main() {

	e := echo.New()

	// usecase
	routeUC := usecase.NewRouteUsecase()

	// handler
	handler := httpHandler.NewHandler(routeUC)

	// регистрация swagger-generated интерфейса
	api.RegisterHandlers(e, handler)

	e.Logger.Fatal(e.Start(":8080"))
}
