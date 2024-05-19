const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const db = require("../Db");

const getAllUsers = async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM users;");
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        users: results.rows,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error fetching users from the database.",
    });
  }
};

const getAnUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ message: "Se necesita un Id para encontrar a uno." });
    }
    const results = await db.query("SELECT * FROM users WHERE id = $1;", [id]);
    if(results.rowCount > 0){
      res.status(200).json({
        status: "success",
        results: results.rows.length,
        data: {
          user: results.rows[0],
        },
      });
    }
    else {
      return res
        .status(404)
        .json({ message: "No hay usuarios con ese Id" });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error fetching user from the database.",
    });
  }
};

const createNewUser = asyncHandler(async (req, res) => {
  const { name, last_name, username, email, password, role } = req.body;

  if ((!name, !last_name, !username, !email, !password, !role)) {
    return res
      .status(400)
      .json({ message: "Todos los campos son requeridos." });
  }

  const duplicate = await db.query(
    "select username from users where username = $1;",
    [req.params.username]
  );
  if (duplicate.rowCount > 0) {
    return res.status(409).json({
      message: "Usuario ya existe.",
    });
  }

  const hashedPwd = await bcrypt.hash(password, 10);
  console.log(name, last_name, username, email, hashedPwd, role);
  try {
    const user = await db.query(
      "insert into users (name, last_name, username, email, password, role) values ($1, $2, $3, $4, $5, $6) returning username;",
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

const updateUser = asyncHandler(async (req, res) => {
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
      "insert into users (name, last_name, username, email, password, role) values ($1, $2, $3, $4, $5, $6) returning username;",
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

const deleteUser = asyncHandler(async (req, res) => {});

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
  getAnUserById
};
