require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require("path")
const fs = require("fs")
const nodemailer = require("nodemailer")

const app = express()
const PORT = 3001

// ─── Pasta a vigiar (ComfyUI output) ───────────────────────────────────────
const WATCH_DIR = "/Users/nicoly/ComfyUI/output"
const EXT_VALIDAS = [".jpg", ".jpeg", ".png", ".webp", ".gif"]

// ─── Contador de usuários ───────────────────────────────────────────────────
let contadorUsuarios = 0
const COUNTER_FILE = path.join(__dirname, "counter.json")

// Carregar contador do arquivo se existir
if (fs.existsSync(COUNTER_FILE)) {
  try {
    const data = JSON.parse(fs.readFileSync(COUNTER_FILE, "utf8"))
    contadorUsuarios = data.count || 0
  } catch (e) {
    console.warn("⚠️  Erro ao ler contador, iniciando do zero")
  }
} 

// Salvar contador no arquivo
function salvarContador() {
  fs.writeFileSync(COUNTER_FILE, JSON.stringify({ count: contadorUsuarios }))
}

// ─── Middleware ─────────────────────────────────────────────────────────────
app.use(cors({ origin: "http://localhost:5173" }))
app.use(express.json())

// Serve as imagens directamente da pasta do ComfyUI
app.use("/uploads", express.static(WATCH_DIR))

// ─── Helpers ─────────────────────────────────────────────────────────────────
function listarImagens() {
  if (!fs.existsSync(WATCH_DIR)) return []

  return fs.readdirSync(WATCH_DIR)
    .filter(f => EXT_VALIDAS.includes(path.extname(f).toLowerCase()))
    .filter(f => f.startsWith("kalimba_wave_")) // Apenas kalimba_wave_
    .map(f => {
      const stats = fs.statSync(path.join(WATCH_DIR, f))
      return {
        filename: f,
        data: stats.mtime.toLocaleDateString("pt-BR"),
        timestamp: stats.mtime.getTime(),
      }
    })
    .sort((a, b) => b.timestamp - a.timestamp) // mais recente primeiro
}

// ─── SSE — clientes ligados ───────────────────────────────────────────────
const clientes = new Set()

function notificarClientes() {
  const imagens = listarImagens()
  const payload = `data: ${JSON.stringify(imagens)}\n\n`
  for (const res of clientes) {
    try { res.write(payload) } catch { clientes.delete(res) }
  }
}

// ─── Vigiar a pasta com fs.watch ─────────────────────────────────────────
let debounceTimer = null

if (fs.existsSync(WATCH_DIR)) {
  fs.watch(WATCH_DIR, (evento, filename) => {
    if (!filename) return
    if (!EXT_VALIDAS.includes(path.extname(filename).toLowerCase())) return

    // Debounce: espera 300ms para o ficheiro terminar de ser escrito
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      console.log(`📸 Nova imagem detectada: ${filename}`)
      notificarClientes()
    }, 300)
  })
  console.log(`👁️  A vigiar: ${WATCH_DIR}`)
} else {
  console.warn(`⚠️  Pasta não encontrada: ${WATCH_DIR}`)
}

// ─── Rotas ────────────────────────────────────────────────────────────────

// GET /api/imagens — lista inicial (sempre a última imagem)
app.get("/api/imagens", (req, res) => {
  const imagens = listarImagens()
  
  // Sempre mostrar apenas a última imagem
  if (imagens.length > 0) {
    res.json([imagens[0]])
  } else {
    res.json([])
  }
})

// GET /api/imagens/ultima — só a mais recente
app.get("/api/imagens/ultima", (req, res) => {
  const lista = listarImagens()
  if (lista.length === 0) return res.status(404).json({ erro: "Nenhuma imagem encontrada." })
  res.json(lista[0])
})

// GET /api/eventos — SSE stream
app.get("/api/eventos", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream")
  res.setHeader("Cache-Control", "no-cache")
  res.setHeader("Connection", "keep-alive")
  res.flushHeaders()

  // Enviar sempre a última imagem
  const imagens = listarImagens()
  let imagemParaEnviar = []
  if (imagens.length > 0) {
    imagemParaEnviar = [imagens[0]]
  }
  
  res.write(`data: ${JSON.stringify(imagemParaEnviar)}\n\n`)

  clientes.add(res)
  console.log(`🔌 Cliente SSE ligado (total: ${clientes.size})`)

  req.on("close", () => {
    clientes.delete(res)
    console.log(`🔌 Cliente SSE desligado (total: ${clientes.size})`)
  })
})

// POST /api/enviar-email
app.post("/api/enviar-email", async (req, res) => {
  const { email, filename } = req.body

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ erro: "E-mail inválido." })
  }
  if (!filename) {
    return res.status(400).json({ erro: "Nome do arquivo ausente." })
  }

  const filepath = path.join(WATCH_DIR, filename)
  if (!fs.existsSync(filepath)) {
    return res.status(404).json({ erro: "Arquivo não encontrado." })
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: `"Kalimba Portfolio" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `🌌 Your Tone Poem from Kalimba — ${filename}`,
      html: `
        <div style="font-family:sans-serif;background:#0A0A0A;color:#E5E5E5;padding:40px;border-radius:8px;">
          <h2 style="color:#0095FF;letter-spacing:0.2em;">TONE POEM</h2>
          <p>Here is your Tone Poem: <strong>${filename}</strong>. Thank you so much for your participation!</p>
          <p style="color:#888;font-size:12px;margin-top:32px;">Sent via Kalimba Tone Poem, IADE</p>
        </div>
      `,
      attachments: [{ filename, path: filepath }],
    })
    res.json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ erro: "Falha ao enviar e-mail." })
  }
})

app.listen(PORT, () => {
  console.log(`🖤 Kalimba API em http://localhost:${PORT}`)
})