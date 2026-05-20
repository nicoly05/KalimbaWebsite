import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import AThousandYears from "../assets/kalimbamusics/AThousandYears.webp"
import HarryPotterTheme from "../assets/kalimbamusics/HarryPotterTheme.webp"
import InTheJungle from "../assets/kalimbamusics/InTheJungle.jpg"
import LetItGoFrozen from "../assets/kalimbamusics/LetItGoFrozen.webp"
import LittleMermaid from "../assets/kalimbamusics/LittleMermaid.jpg"
import MariedLifeUp from "../assets/kalimbamusics/MariedLifeUp.jpeg"
import OceanEyes from "../assets/kalimbamusics/OceanEyes.webp"
import SpongeBob from "../assets/kalimbamusics/SpongeBob.jpeg"
import Tangled from "../assets/kalimbamusics/Tangled.jpg"
import YouAreMySunshine from "../assets/kalimbamusics/YouAreMySunshine.webp"

const imagens = [
  { id: 1, src: AThousandYears, titulo: "A Thousand Years" },
  { id: 2, src: HarryPotterTheme, titulo: "Harry Potter Theme" },
  { id: 3, src: InTheJungle, titulo: "In The Jungle" },
  { id: 4, src: LetItGoFrozen, titulo: "Let It Go - Frozen" },
  { id: 5, src: LittleMermaid, titulo: "Little Mermaid" },
  { id: 6, src: MariedLifeUp, titulo: "Married Life - Up" },
  { id: 7, src: OceanEyes, titulo: "Ocean Eyes" },
  { id: 8, src: SpongeBob, titulo: "SpongeBob" },
  { id: 9, src: Tangled, titulo: "Tangled" },
  { id: 10, src: YouAreMySunshine, titulo: "You Are My Sunshine" },
]

export default function Galeria() {
  const [modal, setModal] = useState(null)

  return (
    <main className="min-h-screen bg-darkBlue pt-24 px-8 pb-20">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-brightBlue text-xs tracking-[0.4em] uppercase mb-3">Audio</p>
          <h1 className="text-5xl font-light text-white tracking-wide">Musics</h1>
          <p className="text-white/30 text-xs mt-2 tracking-widest">
            {imagens.length} music{imagens.length !== 1 ? "s" : ""}
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          <AnimatePresence>
            {imagens.map((img, i) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i < 6 ? i * 0.06 : 0 }}
                className="group relative overflow-hidden cursor-pointer bg-darkBlue"
                onClick={() => setModal(img)}
              >
                <img
                  src={img.src}
                  alt={img.titulo}
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-darkBlue/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
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
              className="max-w-4xl w-full"
            >
              <img
                src={modal.src}
                alt={modal.titulo}
                className="w-full max-h-[70vh] object-contain"
              />
              <div className="mt-4 flex justify-between items-center">
                <div>
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