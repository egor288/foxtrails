package db

import (
	"context"
	"errors"
	"fmt"

	"foxtrails/internal/entity"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

// =====================
// 🔐 REGISTER
// =====================

func (db *DB) CreateUser(ctx context.Context, email, password string) error {

	fmt.Println("➡️ DB CreateUser:", email)

	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	id := uuid.NewString()

	_, err = db.Pool.Exec(ctx,
		`INSERT INTO users (id, email, password)
		 VALUES ($1, $2, $3)`,
		id, email, string(hash),
	)

	if err != nil {
		fmt.Println("❌ DB insert error:", err)
		return err
	}

	fmt.Println("✅ User created:", email)
	return nil
}

// =====================
// 🔑 LOGIN
// =====================

func (db *DB) LoginUser(ctx context.Context, email, password string) (*entity.User, error) {

	fmt.Println("➡️ DB LoginUser:", email)

	row := db.Pool.QueryRow(ctx,
		`SELECT id, email, password
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

func (db *DB) GetUserByID(ctx context.Context, id string) (*entity.User, error) {

	row := db.Pool.QueryRow(ctx,
		`SELECT id, email, password
		 FROM users
		 WHERE id=$1`,
		id,
	)

	var user entity.User

	err := row.Scan(&user.ID, &user.Email, &user.Password)
	if err != nil {
		return nil, err
	}

	return &user, nil
}
