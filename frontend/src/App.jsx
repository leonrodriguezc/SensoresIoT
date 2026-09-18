// frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Thermometer, Droplets, Gauge, Activity, AlertCircle } from 'lucide-react';
import './App.css';

const API_URL = 'http://localhost:3000/api/data';

function App() {
  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener datos del backend
  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setSensors(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  };

  // Efecto para actualizar datos cada 3 segundos (polling)
  useEffect(() => {
    fetchData(); // Carga inicial
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  // Componente para las tarjetas de sensores
  const SensorCard = ({ sensor }) => {
    const Icon = sensor.type === 'temperature' ? Thermometer : 
                 sensor.type === 'humidity' ? Droplets : Gauge;
    
    const isAlert = sensor.type === 'temperature' && sensor.value > 28;

    return (
      <div className={`card ${isAlert ? 'alert' : ''}`}>
        <div className="card-header">
          <Icon size={24} />
          <span>{sensor.id}</span>
        </div>
        <div className="card-body">
          <div className="value">{sensor.value}{sensor.unit}</div>
          <div className="type">{sensor.type}</div>
        </div>
        {isAlert && (
          <div className="alert-badge">
            <AlertCircle size={14} /> ALERTA
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="dashboard">
      <header>
        <h1><Activity /> IoT Sensor Monitor</h1>
        <div className="status-dot"></div>
        <span>Live System</span>
      </header>

      <main>
        {/* Sección de Tarjetas de Sensores */}
        <section className="sensors-grid">
          {sensors.map(sensor => (
            <SensorCard key={sensor.id} sensor={sensor} />
          ))}
        </section>

        {/* Sección del Gráfico */}
        <section className="chart-section">
          <h2>Tendencia de Temperatura</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sensors.filter(s => s.type === 'temperature')}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="id" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip contentStyle={{ backgroundColor: '#222', border: 'none' }} />
                <Line type="monotone" dataKey="value" stroke="#ff4d4d" strokeWidth={3} dot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;