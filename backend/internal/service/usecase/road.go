package usecase

import (
	"context"

	"github.com/egor288/foxtrails/internal/gateway"
	api "github.com/egor288/foxtrails/internal/gateway/http"
)

type RouteUsecase struct {
	repo gateway.POIRepository
}

func NewRouteUsecase(repo gateway.POIRepository) *RouteUsecase {
	return &RouteUsecase{repo: repo}
}

func (u *RouteUsecase) GenerateRoute(
	ctx context.Context,
	req api.RouteRequest,
) (api.RouteResponse, error) {

	pois, err := u.repo.GetPOI(ctx, req.Interests)
	if err != nil {
		return api.RouteResponse{}, err
	}

	// 1️⃣ фильтр по расстоянию
	filtered := filterNearby(pois, req.Lat, req.Lon, req.MaxDistanceKm)

	// 2️⃣ сортировка по близости
	sortByDistance(filtered, req.Lat, req.Lon)

	// 3️⃣ ограничение количества
	if len(filtered) > 8 {
		filtered = filtered[:8]
	}

	// 4️⃣ построение маршрута
	points := buildRoute(req.Lat, req.Lon, filtered)

	return api.RouteResponse{
		DistanceKm: calculateDistance(points),
		Points:     points,
	}, nil
}
