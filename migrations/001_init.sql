-- USERS
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- PLACES
CREATE TABLE places (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    lat DOUBLE PRECISION,
    lon DOUBLE PRECISION,
    created_at TIMESTAMP DEFAULT NOW()
);

-- TAGS
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE place_tags (
    place_id INTEGER REFERENCES places(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (place_id, tag_id)
);

-- FEATURES
CREATE TABLE features (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE place_features (
    place_id INTEGER REFERENCES places(id) ON DELETE CASCADE,
    feature_id INTEGER REFERENCES features(id) ON DELETE CASCADE,
    PRIMARY KEY (place_id, feature_id)
);

-- ROUTES
CREATE TABLE routes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE route_places (
    route_id INTEGER REFERENCES routes(id) ON DELETE CASCADE,
    place_id INTEGER REFERENCES places(id) ON DELETE CASCADE,
    order_index INTEGER,
    PRIMARY KEY (route_id, place_id)
);