// simulator.js - El Cliente (Ahora envía datos reales)
const axios = require('axios');

const SENSORS = [
    { id: 'temp_01', type: 'temperature', unit: '°C', min: 20, max: 30 },
    { id: 'temp_02', type: 'temperature', unit: '°C', min: 15, max: 25 },
    { id: 'humi_01', type: 'humidity', unit: '%', min: 40, max: 60 },
    { id: 'pres_01', type: 'pressure', unit: 'hPa', min: 1000, max: 1020 },
];

const SERVER_URL = 'http://localhost:3000/api/data';

function getRandomValue(min, max) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function readSensor(sensor) {
    return {
        id: sensor.id,
        type: sensor.type,
        value: getRandomValue(sensor.min, sensor.max),
        unit: sensor.unit,
        timestamp: new Date().toISOString()
    };
}

async function startSimulation() {
    console.log("🚀 Iniciando envío de datos al servidor...");

    setInterval(async () => {
        for (const sensor of SENSORS) {
            const data = readSensor(sensor);
            
            try {
                // ENVIAMOS los datos al servidor vía POST
                await axios.post(SERVER_URL, data);
                console.log(`📤 Enviado: ${data.id} -> ${data.value}${data.unit}`);
            } catch (error) {
                console.error(`❌ Error al enviar ${data.id}: El servidor podría estar apagado.`);
            }
        }
        console.log("------------------------------------------");
    }, 3000);
}

startSimulation();