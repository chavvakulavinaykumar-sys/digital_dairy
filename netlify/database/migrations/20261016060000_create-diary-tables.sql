CREATE TABLE app_user (
  id SERIAL PRIMARY KEY,
  pin TEXT NOT NULL
);

CREATE TABLE entries (
  id SERIAL PRIMARY KEY,
  date TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Default PIN, same as the original app
INSERT INTO app_user (pin) VALUES ('1234');
