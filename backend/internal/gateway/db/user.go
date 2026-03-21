package db

import (
	"context"
	"database/sql"
	"errors"
	"fmt"

	"foxtrails/internal/entity"

	"golang.org/x/crypto/bcrypt"
)

// =====================
// 🔐 REGISTER
// =====================

func CreateUser(ctx context.Context, dbConn *sql.DB, email, password string) error {

	fmt.Println("➡️ DB CreateUser:", email)

	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	var id int

	err = dbConn.QueryRowContext(ctx,
		`INSERT INTO users (email, password_hash)
		 VALUES ($1, $2)
		 RETURNING id`,
		email, string(hash),
	).Scan(&id)

	if err != nil {
		fmt.Println("❌ DB insert error:", err)
		return err
	}

	fmt.Println("✅ User created:", email, "ID:", id)
	return nil
}

// =====================
// 🔑 LOGIN
// =====================

func LoginUser(ctx context.Context, dbConn *sql.DB, email, password string) (*entity.User, error) {

	fmt.Println("➡️ DB LoginUser:", email)

	row := dbConn.QueryRowContext(ctx,
		`SELECT id, email, password_hash
		 FROM users
		 WHERE email=$1`,
		email,
	)

	var user entity.User

	err := row.Scan(&user.ID, &user.Email, &user.Password)
	if err != nil {
		fmt.Println("❌ user not found:", err)
		return nil, errors.New("user not found")
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		fmt.Println("❌ wrong password")
		return nil, errors.New("invalid password")
	}

	fmt.Println("✅ Login success:", email)

	return &user, nil
}

// =====================
// 📄 GET USER
// =====================

func GetUserByID(ctx context.Context, dbConn *sql.DB, id int) (*entity.User, error) {
	var user entity.User

	err := dbConn.QueryRowContext(ctx,
		"SELECT id, email FROM users WHERE id=$1",
		id,
	).Scan(&user.ID, &user.Email)

	if err != nil {
		return nil, err
	}

	return &user, nil
}
