CREATE OR REPLACE PROCEDURE createartifact(
    p_title VARCHAR,
    p_description TEXT,
    p_userId INT,
    p_filename VARCHAR,
    p_image BYTEA,
    OUT artifact_title VARCHAR
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_image_id INT;
BEGIN
    INSERT INTO images (filename, image)
    VALUES (p_filename, p_image)
    RETURNING id INTO v_image_id;

    INSERT INTO artifacts (title, description, image_id, user_id)
    VALUES (p_title, p_description, v_image_id, p_userId);

    artifact_title := p_title;
END;
$$;

CREATE OR REPLACE FUNCTION get_home_artifacts()
RETURNS TABLE (
    artifact_id INT,
    artifact_title VARCHAR,
    artifact_description TEXT,
    user_id INT,
    created_at TIMESTAMP,
    image_id INT,
    filename VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        a.id AS artifact_id,
        a.title AS artifact_title,
        a.description AS artifact_description,
        a.user_id,
        a.created_at,
        i.id AS image_id,
        i.filename
    FROM artifacts a
    JOIN images i ON a.image_id = i.id
    ORDER BY a.id DESC;
END;
$$ LANGUAGE plpgsql;

-- Consigue un artifact y sus datos para una desplegarlos una pagina.
CREATE OR REPLACE FUNCTION get_artifact_page_data(p_artifact_id INT)
RETURNS TABLE (
    artifact_id INT,
    artifact_title VARCHAR,
    artifact_description TEXT,
    user_id INT,
    user_name VARCHAR,
    user_last_name VARCHAR,
    created_at TIMESTAMP,
    image_id INT,
    filename VARCHAR,
    image BYTEA
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        a.id AS artifact_id,
        a.title AS artifact_title,
        a.description AS artifact_description,
        a.user_id,
        u.name AS user_name,
        u.last_name AS user_last_name,
        a.created_at,
        i.id AS image_id,
        i.filename,
        i.image
    FROM artifacts a
    JOIN images i ON a.image_id = i.id
    JOIN users u ON a.user_id = u.id
    WHERE a.id = p_artifact_id;
END;
$$ LANGUAGE plpgsql;
