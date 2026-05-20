import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const API = "http://localhost:3001"

export default function Projetos() {
  const [imagem, setImagem] = useState(null)
  const [email, setEmail] = useState("")
  const [enviando, setEnviando] = useState(false)
  const [toast, setToast] = useState(null)

  // ─── SSE: escuta actualizações em tempo real ──────────────────────────
  useEffect(() => {
    const source = new EventSource(`${API}/api/eventos`)

    source.onmessage = (e) => {
      const lista = JSON.parse(e.data)
      if (lista.length > 0) {
        setImagem(lista[0])
      }
    }

    source.onerror = () => {
      mostrarToast("erro", "Sem ligação ao servidor.")
    }

    return () => source.close()
  }, [])

  const mostrarToast = (tipo, msg) => {
    setToast({ tipo, msg })
    setTimeout(() => setToast(null), 3500)
  }

  const enviarEmail = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      mostrarToast("erro", "Digite um e-mail válido.")
      return
    }
    if (!imagem) {
      mostrarToast("erro", "Nenhuma imagem disponível.")
      return
    }
    setEnviando(true)
    try {
      const res = await fetch(`${API}/api/enviar-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, filename: imagem.filename }),
      })
      const data = await res.json()
      if (res.ok) mostrarToast("ok", "E-mail enviado com sucesso!")
      else mostrarToast("erro", data.erro || "Erro ao enviar.")
    } catch {
      mostrarToast("erro", "Servidor indisponível.")
    } finally {
      setEnviando(false)
    }
  }

  return (
    <main className="min-h-screen bg-darkBlue pt-24 px-8 pb-20">

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 z-50 px-6 py-3 text-sm tracking-wide border backdrop-blur-sm ${
              toast.tipo === "ok"
                ? "border-brightBlue/50 text-brightBlue bg-brightBlue/5"
                : "border-red-500/50 text-red-400 bg-red-500/5"
            }`}
          >
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-brightBlue text-xs tracking-[0.4em] uppercase mb-3">IA Real Time Generation</p>
          <h1 className="text-5xl font-light text-white tracking-wide mb-4">My own Tone Poem</h1>
        </motion.div>

        {/* Imagem principal centralizada */}
        {imagem ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-16 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-brightBlue/20 to-capri/20 blur-3xl rounded-full opacity-30" />
              <img
                src={`${API}/uploads/${imagem.filename}`}
                alt={imagem.filename}
                className="relative max-w-full max-h-[60vh] object-contain rounded-lg shadow-2xl"
              />
              <p className="text-center text-white/40 text-xs mt-6 tracking-widest">
                {imagem.filename}
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-32">
            <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/10 mx-auto mb-8" />
            <p className="text-white/20 text-sm tracking-widest">
              Aguardando imagens do ComfyUI...
            </p>
          </div>
        )}

        {/* Campo de email e botão */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-xl mx-auto"
        >
          <div className="flex gap-3">
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={!imagem || enviando}
              className="flex-1 bg-white/5 border border-white/10 text-white placeholder-white/30 px-6 py-4 text-sm focus:outline-none focus:border-brightBlue/50 transition-all duration-300 disabled:opacity-50"
            />
            <button
              onClick={enviarEmail}
              disabled={!imagem || !email || enviando}
              className="border border-brightBlue text-brightBlue px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-brightBlue hover:text-darkBlue transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {enviando ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  )
}