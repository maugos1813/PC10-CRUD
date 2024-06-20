import { pool } from '../config/db.js'

export const getAll = async (req, res) => {
  const [result] = await pool.query('SELECT * FROM usuarios')
  res.json(result)
}

export const deleteById = async (req, res) => {
  const { id } = req.params
  const [result] = await pool.execute('DELETE FROM usuarios WHERE id=?', [id])

  if (result.affectedRows === 1) {
    return res.json({ message: 'Usuario eliminado' })
  }

  return res.status(500).json({ message: 'No se pudo eliminar al usuario' })
}

export const createU = async (req, res) => {
  console.log(req.body)
  const { nombres, apellidos, dni, edad, telefono } = req.body

  if (!nombres || !apellidos || !dni || !edad || !telefono) {
    return res.status(400).json({ message: 'Faltan datos en el formulario' })
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO usuarios (nombres, apellidos, dni, edad, telefono) VALUES (?, ?, ?, ?, ?)',
      [nombres, apellidos, dni, edad, telefono]
    )

    if (result.affectedRows === 1 && result.insertId) {
      return res.status(201).json({ message: 'Usuario guardado' })
    } else {
      return res.status(500).json({ message: 'Hubo un error al crear el usuario' })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error en el servidor' })
  }
}

export const totalUpdate = async (req, res) => {
  try {
    const { id } = req.params
    const { nombres, apellidos, dni, edad, telefono, direccion, correo, fechaCreacion } = req.body

    if (!nombres || !apellidos || !dni || !edad || !telefono) return res.status(400).json({ message: 'Faltan datos en el formulario' })

    const [result] = await pool.execute('UPDATE usuarios SET nombres=?, apellidos=?, dni=?, edad=?, telefono=?, direccion=?, correo=?,      fechaCreacion=? WHERE id=?', [nombres, apellidos, dni, edad, telefono, direccion ?? null, correo ?? null, fechaCreacion ?? null, id])

    if (result.affectedRows !== 1) {
      return res.status(500).json({ message: 'No se pudo actualizar el usuario' })
    }

    res.json({ message: 'Usuario actualizado' })
  } catch (error) {
    return res.status(500).json({ message: 'Error interno', details: error.message })
  }
}

export const partialUpdate = async (req, res) => {
  try {
    const { id } = req.params
    const { nombres, apellidos, dni, edad, telefono, direccion, correo, fechaCreacion } = req.body

    let query = 'UPDATE usuarios SET '
    const params = []

    if (nombres) {
      query += 'nombres=?, '
      params.push(nombres)
    }
    if (apellidos) {
      query += 'apellidos=?, '
      params.push(apellidos)
    }
    if (dni) {
      query += 'dni=?, '
      params.push(dni)
    }
    if (edad) {
      query += 'edad=?, '
      params.push(edad)
    }
    if (telefono) {
      query += 'telefono=?, '
      params.push(telefono)
    }
    if (direccion) {
      query += 'direccion=?, '
      params.push(direccion)
    }
    if (correo) {
      query += 'correo=?, '
      params.push(correo)
    }
    if (fechaCreacion) {
      query += 'fechaCreacion=?, '
      params.push(fechaCreacion)
    }

    query = query.slice(0, -2)
    query += ' WHERE id=?'
    params.push(id)

    const [result] = await pool.execute(query, params)
    if (result.affectedRows !== 1) {
      return res.status(500).json({ message: 'No se pudo actualizar el usuario' })
    }

    res.json({ message: 'Usuario actualizado' })
  } catch (error) {
    return res.status(500).json({ message: 'Error interno', details: error.message })
  }
}
