CREATE TABLE users (
   id SERIAL PRIMARY KEY,
   name VARCHAR(50) NOT NULL,
   last_name VARCHAR(50) NOT NULL,
   username VARCHAR(50) NOT NULL,
   email VARCHAR(50) NOT NULL,
   password TEXT NOT NULL,
   role VARCHAR(50) NOT NULL
);

CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    image BYTEA NOT NULL
);

CREATE TABLE artifacts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  image_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_image_id FOREIGN KEY (image_id) REFERENCES images(id)
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  user_id INT NOT NULL,
  artifact_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_artifact_id FOREIGN KEY (artifact_id) REFERENCES artifacts(id)
);