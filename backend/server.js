// server.js - El Cerebro (Backend)
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Permite conexiones desde otros dominios (como el frontend)
app.use(express.json()); // Permite que el servidor entienda JSON

// "Base de datos" temporal en memoria
// Guardaremos solo el último dato de cada sensor para que el dashboard sea rápido
let latestReadings = {};

/**
 * RUTA POST: Recibe datos del simulador
 */
app.post('/api/data', (req, res) => {
    const sensorData = req.body;

    if (!sensorData.id) {
        return res.status(400).json({ error: "ID de sensor no proporcionado" });
    }

    // Guardamos el dato usando el ID del sensor como llave
    latestReadings[sensorData.id] = sensorData;

    console.log(`Datos recibidos de [${sensorData.id}]: ${sensorData.value}${sensorData.unit}`);
    res.status(201).send("Datos recibidos");
});

/**
 * RUTA GET: El Frontend llamará aquí para obtener todos los datos
 */
app.get('/api/data', (req, res) => {
    // Convertimos el objeto de objetos a un array para que sea fácil de leer
    const dataArray = Object.values(latestReadings);
    res.json(dataArray);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Esperando datos en http://localhost:${PORT}/api/data`);
});