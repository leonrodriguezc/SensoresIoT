# 🌐 Monitor de Red de Sensores IoT (Arquitectura Distribuida)

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

Un sistema distribuido de alta escalabilidad y robustez diseñado para simular, monitorear y visualizar datos de telemetría en tiempo real provenientes de una red de sensores IoT. Este proyecto fue desarrollado como parte del curso de **Arquitectura de Software** para demostrar la aplicación práctica de patrones de diseño distribuidos y modelado UML.

## 🚀 Descripción General

Este proyecto simula un entorno IoT del mundo real donde múltiples nodos sensores independientes generan datos (temperatura, humedad y presión) y los transmiten a un mediador centralizado. El sistema cuenta con un dashboard interactivo para monitorear el estado de los sensores y disparar alertas visuales cuando se superan los umbrales permitidos.

### Características Principales
- **Simulación de Nodos Distribuidos:** Procesos autónomos que actúan como productores de datos independientes.
- **Telemetría en Tiempo Real:** Ingesta de datos asíncrona mediante una API REST HTTP.
- **Dashboard en Vivo:** Interfaz reactiva construida con React y Recharts para la visualización dinámica de datos.
- **Alertas Inteligentes:** Notificaciones visuales automáticas cuando los valores de los sensores exceden los límites operativos.
- **Arquitectura Escalable:** Diseñada para manejar un incremento en el número de nodos sensores con una latencia mínima.

---

## 🏗️ Arquitectura y Patrones de Diseño

El sistema sigue una arquitectura de **Mediador-Cliente-Servidor** para garantizar un bajo acoplamiento entre sus componentes.

### Patrones de Diseño Aplicados:
- **Patrón Mediator (Mediador):** El Backend actúa como el mediador central, gestionando la comunicación entre los nodos sensores distribuidos y los consumidores del Frontend, evitando una complejidad de conexión de $N \times M$.
- **Patrón Proxy:** La API REST sirve como un proxy para el almacén de datos en memoria, encapsulando el estado interno y proporcionando una interfaz controlada para el cliente.
- **Patrón Observer (Observador):** El Frontend implementa un mecanismo de *polling* para sincronizar su estado con el servidor, simulando el comportamiento de un observador que reacciona a los cambios de estado en el sistema.

### Stack Tecnológico:
- **Backend:** Node.js, Express.js
- **Frontend:** React, Vite, Recharts, Lucide React
- **Comunicación:** HTTP/1.1 (API REST), JSON

---

## 📂 Estructura del Proyecto

```text
iot-monitor/
├── backend/
│   ├── server.js       # Mediador Central (API Express)
│   ├── simulator.js    # Nodos Sensores Autónomos (Productores)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx     # Componente Principal del Dashboard
│   │   └── App.css     # Estilos de Modo Oscuro Profesional
│   └── package.json
└── README.md
