package db

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/lib/pq"
)

func New() (*sql.DB, error) {
	dsn := os.Getenv("DATABASE_URL")

	db, err := sql.Open("postgres", dsn)
	if err != nil {
		return nil, err
	}

	if err := db.Ping(); err != nil {
		return nil, err
	}

	fmt.Println("✅ Postgres connected")

	return db, nil
}
