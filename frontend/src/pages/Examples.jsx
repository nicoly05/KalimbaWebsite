import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const categorias = ["Todos", "Fashion", "Processo", "Pessoas", "IA & Design"]

const imagens = [
  { id: 1, src: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800", cat: "Fashion", titulo: "Editorial Outono" },
  { id: 2, src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800", cat: "Pessoas", titulo: "Coleção Primavera" },
  { id: 3, src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", cat: "Fashion", titulo: "Look Urban" },
  { id: 4, src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800", cat: "Pessoas", titulo: "Street Style" },
  { id: 5, src: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800", cat: "Processo", titulo: "Sketchbook" },
  { id: 6, src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800", cat: "IA & Design", titulo: "AI Generated Look" },
  { id: 7, src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800", cat: "Fashion", titulo: "Minimalismo" },
  { id: 8, src: "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=800", cat: "Processo", titulo: "Moodboard" },
  { id: 9, src: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800", cat: "IA & Design", titulo: "Concept AI" },
]

export default function Galeria() {
  const [cat, setCat] = useState("Todos")
  const [modal, setModal] = useState(null)

  const filtradas = cat === "Todos" ? imagens : imagens.filter(i => i.cat === cat)

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
          <h1 className="text-5xl font-light text-white tracking-wide">Galeria</h1>
        </motion.div>

        {/* Filtros */}
        <div className="flex gap-4 justify-center flex-wrap mb-12">
          {categorias.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`text-xs tracking-widest uppercase px-5 py-2 border transition-all duration-300 ${
                cat === c
                  ? "border-brightBlue text-brightBlue"
                  : "border-white/10 text-white/40 hover:border-white/30 hover:text-white/70"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          <AnimatePresence>
            {filtradas.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="group relative overflow-hidden cursor-pointer bg-darkBlue"
                onClick={() => setModal(img)}
              >
                <img
                  src={img.src}
                  alt={img.titulo}
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-darkBlue/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <p className="text-brightBlue text-xs tracking-widest uppercase">{img.cat}</p>
                  <p className="text-white text-lg font-light">{img.titulo}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
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
              className="max-w-3xl w-full"
            >
              <img src={modal.src} alt={modal.titulo} className="w-full max-h-[70vh] object-contain" />
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <p className="text-brightBlue text-xs tracking-widest uppercase">{modal.cat}</p>
                  <p className="text-white text-xl font-light">{modal.titulo}</p>
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