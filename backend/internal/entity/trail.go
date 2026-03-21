package entity

type Point struct {
	Name string  `json:"name"`
	Lat  float64 `json:"lat"`
	Lon  float64 `json:"lon"`
}

type Route struct {
	Title       string   `json:"title"`
	Description string   `json:"description"`
	DistanceKm  float64  `json:"distance_km"`
	Points      []Point  `json:"points"`
	Story       []string `json:"story"`
}

type User struct {
	ID       string `json:"id"`
	Email    string `json:"email"`
	Password string `json:"-"`
}

type Place struct {
	ID          int      `json:"id"`
	Name        string   `json:"name"`
	Description string   `json:"description"`
	Lat         float64  `json:"lat"`
	Lon         float64  `json:"lon"`
	Tags        []string `json:"tags"`
}
