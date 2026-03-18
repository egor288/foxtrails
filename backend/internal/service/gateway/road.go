package usecase

import (
	"context"
	api "your_project/internal/gateway/http"
)

type RouteUsecase struct{}

func NewRouteUsecase() *RouteUsecase {
	return &RouteUsecase{}
}

func (u *RouteUsecase) GenerateRoute(ctx context.Context, req api.RouteRequest) (api.RouteResponse, error) {

	points := []api.Point{
		{
			Name: "Start",
			Lat:  req.Lat,
			Lon:  req.Lon,
		},
		{
			Name: "Scenic View",
			Lat:  req.Lat + 0.02,
			Lon:  req.Lon + 0.02,
		},
		{
			Name: "Finish",
			Lat:  req.Lat,
			Lon:  req.Lon,
		},
	}

	return api.RouteResponse{
		DistanceKm: 5.2,
		Points:     points,
	}, nil
}
