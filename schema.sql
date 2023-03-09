DROP TABLE IF EXISTS universities;

CREATE TABLE IF NOT EXISTS universities(
    id SERIAL PRIMARY KEY,
    uniname VARCHAR(255),
    uniwebpage VARCHAR(255)
)