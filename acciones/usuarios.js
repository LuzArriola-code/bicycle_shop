// INICIALIZAR EL SERVIDOR CON LA BASE DE DATOS

const express = require("express");
const router = express.Router();

// Traemos la conexión de Supabase desde el archivo principal
const { supabase } = require("../servidor.js");

//---------------------------------------------------

// RUTA PARA EL LOGIN (INICIAR SESIÓN)
router.post("/login", async (req, res) => {
  const { user_Name, password } = req.body;

  // Validación básica de campos vacíos
  if (!user_Name || !password) {
    return res
      .status(400)
      .json({ error: "Usuario y contraseña son obligatorios." });
  }

  try {
    // Buscamos al usuario en Supabase que coincida con el nombre Y que esté activo (estado: 0)
    const { data, error } = await supabase
      .from("usuarios")
      .select("id_Usuario, user_Name, password, rol")
      .eq("user_Name", user_Name)
      .eq("estado", 0); // Si está en la papelera, no entra

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Si no encontró ningún registro con ese nombre de usuario
    if (data.length === 0) {
      return res
        .status(401)
        .json({ error: "El usuario no existe o está inactivo." });
    }

    const usuarioEncontrado = data[0];

    // VALIDACIÓN DE CONTRASEÑA (Directa en texto plano por ahora, como venís trabajando)
    if (usuarioEncontrado.password !== password) {
      return res.status(401).json({ error: "Contraseña incorrecta." });
    }

    // Si todo coincide, devolvemos el éxito y los datos clave (usuario y rol)
    res.status(200).json({
      mensaje: "¡Login exitoso!",
      usuario: {
        id: usuarioEncontrado.id_Usuario,
        name: usuarioEncontrado.user_Name,
        rol: usuarioEncontrado.rol,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Error interno del servidor en el login." });
  }
});

//---------------------------------------------------

// RUTA PARA AGREGAR UN NUEVO USUARIO

router.post("/registroUser", async (req, res) => {
  // Recibimos los datos del formulario (frontend)
  const { user_Name, password, rol } = req.body;

  // Validación básica por si faltan datos obligatorios
  if (!user_Name || !password) {
    return res
      .status(400)
      .json({
        error: "El nombre de usuario y la contraseña son obligatorios.",
      });
  }

  try {
    // Hacemos el INSERT en la tabla 'usuarios'
    // 'estado' no lo enviamos porque Supabase le pone 0 automáticamente
    const { data, error } = await supabase
      .from("usuarios")
      .insert([
        {
          user_Name: user_Name,
          password: password,
          rol: rol || "Admin", // Si no viene el rol, le asignamos 'Admin' por las dudas
        },
      ])
      .select(); // Nos devuelve el registro creado para confirmar

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Si todo sale bien, respondemos con éxito y los datos creados
    res.status(201).json({
      mensaje: "Usuario registrado con éxito",
      usuario: data[0],
    });
  } catch (err) {
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

//---------------------------------------------------

// RUTA PARA TRAER TODOS LOS USUARIOS ACTIVOS (QUE NO ESTÁN EN PAPELERA)
router.get("/listaUsuarios", async (req, res) => {
  try {
    // Hacemos el SELECT filtrando donde el estado sea 0
    const { data, error } = await supabase
      .from("usuarios")
      .select("id_Usuario, user_Name, rol") // Traemos solo lo necesario (sin password por seguridad)
      .eq("estado", 0)
      .order("user_Name", { ascending: true, nullsFirst: true });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Si todo sale bien, devolvemos la lista de usuarios
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

//---------------------------------------------------

// RUTA PARA EDITAR LOS DATOS DE UN USUARIO EXISTENTE (DINÁMICA)
router.put("/editarUser/:id", async (req, res) => {
  const idUsuario = req.params.id;
  const { user_Name, password, rol } = req.body;

  // 1. Creamos un objeto vacío donde vamos a meter SOLO lo que el usuario rellenó
  const camposAActualizar = {};

  // 2. Si el nombre vino y no está vacío, lo agregamos
  if (user_Name && user_Name.trim() !== "") {
    camposAActualizar.user_Name = user_Name;
  }

  // 3. Si el rol vino, lo agregamos
  if (rol) {
    camposAActualizar.rol = rol;
  }

  // 4. ¡LA CLAVE ESTÁ ACÁ! Solo agregamos la contraseña si el usuario escribió algo
  if (password && password.trim() !== "") {
    camposAActualizar.password = password;
  }

  // Validación por si le dieron a guardar sin cambiar absolutamente nada
  if (Object.keys(camposAActualizar).length === 0) {
    return res
      .status(400)
      .json({ error: "No enviaste ningún dato modificado para actualizar." });
  }

  try {
    // 5. Le pasamos el objeto dinámico a Supabase
    const { data, error } = await supabase
      .from("usuarios")
      .update(camposAActualizar) // Solo actualiza los campos que metimos arriba
      .eq("id_Usuario", idUsuario)
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    res.status(200).json({
      mensaje: "Usuario actualizado con éxito",
      usuario: data[0],
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error interno del servidor al actualizar." });
  }
});

//---------------------------------------------------

// RUTA PARA BORRADO LÓGICO (ENVIAR USUARIO A PAPELERA)
router.put("/papeleraUser/:id", async (req, res) => {
  // 1. Capturamos el ID del usuario desde la URL
  const idUsuario = req.params.id;

  try {
    // 2. Hacemos el UPDATE cambiando el estado a 1 (Papelera)
    const { data, error } = await supabase
      .from("usuarios")
      .update({ estado: 1 })
      .eq("id_Usuario", idUsuario)
      .select(); // Nos devuelve el registro para confirmar el cambio

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Si el ID no coincide con ningún usuario activo
    if (data.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    // 3. Si todo salió bien, respondemos con el mensaje que me pediste
    res.status(200).json({
      mensaje: "El registro se envió a la papelera correctamente",
      usuario: data[0],
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error interno del servidor al enviar a papelera." });
  }
});

//---------------------------------------------------

// RUTA PARA TRAER TODOS LOS USUARIOS QUE ESTÁN EN LA PAPELERA (ESTADO 1)
router.get("/listarP_User", async (req, res) => {
  try {
    // Hacemos el SELECT filtrando donde el estado sea 1 (Inactivos/Papelera)
    const { data, error } = await supabase
      .from("usuarios")
      .select("id_Usuario, user_Name, rol") // Traemos lo mismo que la tabla común
      .eq("estado", 1)
      .order("user_Name", { ascending: true, nullsFirst: true });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Si todo sale bien, devolvemos el array de usuarios archivados
    res.status(200).json(data);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error interno del servidor al listar la papelera." });
  }
});

//---------------------------------------------------

// RUTA PARA ELIMINACIÓN PERMANENTE (BORRAR DEFINITIVO)
router.delete("/usuarioBorrado/:id", async (req, res) => {
  const idUsuario = req.params.id;

  try {
    // Hacemos el DELETE directo en la base de datos
    const { data, error } = await supabase
      .from("usuarios")
      .delete()
      .eq("id_Usuario", idUsuario)
      .select(); // Confirmamos qué registro se borró

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    if (data.length === 0) {
      return res
        .status(404)
        .json({ error: "Usuario no encontrado en el sistema." });
    }

    res.status(200).json({
      mensaje: "El usuario ha sido eliminado permanentemente del sistema",
    });
  } catch (err) {
    res
      .status(500)
      .json({
        error: "Error interno del servidor al eliminar definitivamente.",
      });
  }
});

//---------------------------------------------------

// RUTA PARA RESTAURAR USUARIO (SACAR DE PAPELERA)
router.put("/restaurarUser/:id", async (req, res) => {
  const idUsuario = req.params.id;

  try {
    // Hacemos el UPDATE cambiando el estado a 0 (Activo de nuevo)
    const { data, error } = await supabase
      .from("usuarios")
      .update({ estado: 0 })
      .eq("id_Usuario", idUsuario)
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    if (data.length === 0) {
      return res
        .status(404)
        .json({ error: "Usuario no encontrado en la papelera." });
    }

    res.status(200).json({
      mensaje: "El usuario ha sido restaurado correctamente",
    });
  } catch (err) {
    res.status(500).json({ error: "Error interno del servidor al restaurar." });
  }
});

//-----------------------------------------------------
// Exportamos el router para que servidor.js lo pueda leer
module.exports = router;
