import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const API = "http://localhost:3001"

export default function Galeria() {
  const [imagens, setImagens] = useState([])
  const [modal, setModal] = useState(null)

  // ─── Buscar imagens iniciais ───────────────────────────────────────────
  useEffect(() => {
    fetch(`${API}/api/imagens`)
      .then(res => res.json())
      .then(data => setImagens(data))
      .catch(err => console.error("Erro ao buscar imagens:", err))
  }, [])

  // ─── SSE: escuta actualizações em tempo real ──────────────────────────
  useEffect(() => {
    const source = new EventSource(`${API}/api/eventos`)

    source.onmessage = (e) => {
      const lista = JSON.parse(e.data)
      setImagens(lista)
    }

    source.onerror = () => {
      console.error("Erro na conexão SSE")
    }

    return () => source.close()
  }, [])

  return (
    <main className="min-h-screen bg-darkBlue pt-24 px-8 pb-20">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-brightBlue text-xs tracking-[0.4em] uppercase mb-3">Visual</p>
          <h1 className="text-5xl font-light text-white tracking-wide">Gallery</h1>
          <p className="text-white/30 text-xs mt-2 tracking-widest">
            {imagens.length} image{imagens.length !== 1 ? "s" : ""}
          </p>
        </motion.div>

        {/* Grid */}
        {imagens.length === 0 ? (
          <div className="text-center py-32">
            <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/10 mx-auto mb-8" />
            <p className="text-white/20 text-sm tracking-widest">
              Aguardando imagens do ComfyUI...
            </p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            <AnimatePresence>
              {imagens.map((img, i) => (
                <motion.div
                  key={img.filename}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i < 6 ? i * 0.06 : 0 }}
                  className={`group relative overflow-hidden cursor-pointer bg-darkBlue ${
                    i === 0 ? "ring-1 ring-brightBlue/20" : ""
                  }`}
                  onClick={() => setModal(img)}
                >
                  {/* Badge "mais recente" */}
                  {i === 0 && (
                    <div className="absolute top-3 left-3 z-10 bg-brightBlue text-darkBlue text-[10px] tracking-widest uppercase px-2 py-0.5">
                      Recente
                    </div>
                  )}
                  <img
                    src={`${API}/uploads/${img.filename}`}
                    alt={img.filename}
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-darkBlue/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <p className="text-white/40 text-xs tracking-widest">{img.data}</p>
                    <p className="text-white text-sm font-light truncate">{img.filename}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-darkBlue/95 flex items-center justify-center p-8"
            onClick={() => setModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="max-w-4xl w-full"
            >
              <img
                src={`${API}/uploads/${modal.filename}`}
                alt={modal.filename}
                className="w-full max-h-[70vh] object-contain"
              />
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <p className="text-white/40 text-xs tracking-widest">{modal.data}</p>
                  <p className="text-white text-xl font-light">{modal.filename}</p>
                </div>
                <button
                  onClick={() => setModal(null)}
                  className="text-white/40 hover:text-white text-xs tracking-widest uppercase"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}