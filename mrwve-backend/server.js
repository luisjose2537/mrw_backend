const express = require('express');
const axios = require('axios');
const app = express();

// Middleware para parsear cuerpos JSON
app.use(express.json());

// Ruta para rastrear el paquete
app.post('/track', async (req, res) => {
  const trackingNumber = req.body.trackingNumber;

  if (!trackingNumber) {
    return res.status(400).json({ message: 'Número de seguimiento es requerido' });
  }

  try {
    const url = 'https://phoenixos.mrwve.com/api/tracking-externo/v2';
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': '453284f4c15d429b302b007afe2912be5dbdd2b2',
    };

    const body = `nro_tracking=${encodeURIComponent(trackingNumber)}`;

    // Realiza la solicitud a la API de MRWVE
    const response = await axios.post(url, body, { headers });

    // Envía la respuesta de vuelta a la app móvil
    res.json(response.data);
  } catch (error) {
    console.error('Error al rastrear paquete:', error.message);
    res.status(500).json({ message: 'Error interno al procesar la solicitud' });
  }
});

// Inicia el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});