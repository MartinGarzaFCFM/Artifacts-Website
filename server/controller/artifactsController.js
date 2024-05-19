const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const db = require("../Db");

const getAllArtifacts = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM get_home_artifacts();")
    const artifactsWithImages = result.rows;
    return res.status(200).json(artifactsWithImages)
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error in server." })
  }
}

const getArtifactById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ message: "Se necesita un Id para encontrar a uno." });
    }
    const result = await db.query("SELECT * FROM get_artifact_page_data($1);", [id]);
    const artifact = result.rows[0];

    if (result.rowCount > 0) {
      res.status(200).json({
        status: "success",
        result: result.rows.length,
        data: {
          user: artifact,
        },
      });
    } else {
      return res.status(404).json({ message: "No hay artifacts con ese Id" })
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error fetching user from the database.",
    });
  }
};

const createNewArtifact = asyncHandler(async (req, res) => {
  const { title, description, userId } = req.body;
  const { originalname, buffer } = req.file;

  if (!title || !description || !userId || !originalname || !buffer) {
    return res
      .status(400)
      .json({ message: "Todos los campos son requeridos." });
  }

  const imageHex = buffer.toString("hex");
  try {
    const result = await db.query(
      "CALL createartifact($1, $2, $3, $4, $5::bytea, $6);",
      [
        title,
        description,
        userId,
        originalname,
        Buffer.from(imageHex, "hex"),
        "",
      ]
    );
    const artifactTitle = result.rows[0]?.artifact_title;

    if (artifactTitle != null) {
      return res.status(201).json({ message: "Imagen subida correctamente." });
    } else {
      return res.status(500).json({ message: "Error al subir la imagen." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor." });
  }
});

const updateArtifact = asyncHandler(async (req, res) => {
  const { name, last_name, username, email, password, role } = req.body;

  if ((!name, !last_name, !username, !email, !password, !role)) {
    return res
      .status(400)
      .json({ message: "Todos los campos son requeridos." });
  }

  const hashedPwd = await bcrypt.hash(password, 10);
  console.log(name, last_name, username, email, hashedPwd, role);
  try {
    const user = await db.query(
      "insert into users (name, last_name, username, email, password, role) values ($1, $2, $3, $4, $5, $6);",
      [name, last_name, username, email, hashedPwd, role]
    );
    if (user.rowCount > 0) {
      res.status(201).json({
        status: "success",
        message: "Usuario creado exitosamente",
        data: {
          username: user.rows[0].username,
        },
      });
    } else {
      res.status(500).json({
        status: "error",
        message: "Error en la creacion de usuario",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "An error fatal ocurrio en la creacion de usuario",
    });
  }
});

const deleteArtifact = asyncHandler(async (req, res) => {});

module.exports = {
  getAllArtifacts,
  createNewArtifact,
  updateArtifact,
  deleteArtifact,
  getArtifactById,
};
