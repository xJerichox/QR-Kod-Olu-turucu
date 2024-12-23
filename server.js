const express = require("express");
const QRCode = require("qrcode");

const app = express();
const PORT = 3000;

app.use(express.json());

// QR kod oluşturma endpoint'i
app.post("/generate", async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "Lütfen geçerli bir URL sağlayın." });
  }

  try {
    const qrCode = await QRCode.toDataURL(url);
    res.json({ qrCode });
  } catch (error) {
    res.status(500).json({ error: "QR kod oluşturulamadı", details: error.message });
  }
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
