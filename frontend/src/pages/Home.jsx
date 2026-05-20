import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay },
})

const materias = [
  { titulo: "Design Interface & Interaction Design", desc: "The kalimba is used as an interface because it is intuitive and accessible—anyone can touch it and produce a sound immediately, illustrating the concept of affordance. Real-time visual feedback (each key activates a visual column) creates an interaction loop that is central to interaction design. The system also responds to the character of the touch, not just the note, making each experience personal and aligned with the UX goal of emotionally resonating with the user." },
  { titulo: "Artificial Intelligence — Generative", desc: "The system's generative layer captures the frequencies and the way each person plays (intensity, rhythm, harmonic character) and uses this information to generate real-time audio and visual feedback. Each performance produces a unique and unrepeatable audiovisual composition, making AI an extension of the user's individual expression."},
  { titulo: "Artificial Intelligence — Deep Learning", desc: "The neural network is trained with short recordings of sinusoidal waves at random frequencies, analyzed using the Python Essentia library. Each sample is described by features such as MFCC (Mel Frequency Cepstral Coefficients) — 13 coefficients that represent the timbre of the sound in a way that closely resembles human perception — returned as mean and variance over time. This process teaches the network to recognize and classify the sound patterns produced by the instrument."},
  { titulo: "Emergent Technologies", desc: "The project applies Augmented Reality principles to dissolve the separation between the physical and digital worlds: the generated visuals don't appear on a separate screen, but seem to be part of the garment itself. The t-shirt becomes an interface, the body becomes part of the system. The combination of AR, generative AI, real-time audio analysis, and wearables positions the project at the forefront of future interfaces—which will live in objects and bodies, not on screens."},
]

export default function Home() {
  return (
    <main className="min-h-screen bg-darkBlue">

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-8 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#00D4FF10_0%,_transparent_70%)]" />
        <motion.p {...fade(0.2)} className="text-brightBlue text-xs tracking-[0.5em] uppercase mb-6">
         Technology · Fashion · Creativity
        </motion.p>
        <motion.h1 {...fade(0.4)} className="text-7xl md:text-9xl font-light tracking-[0.15em] text-white mb-6">
          TONE POEM
        </motion.h1>
        <motion.p {...fade(0.6)} className="text-white/50 text-lg max-w-xl mb-10 font-light leading-relaxed">
Where artificial intelligence meets the language of fashion — creating the future of visual expression.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 flex flex-col items-center gap-2"
        >
          <div className="w-px h-20 bg-gradient-to-b from-transparent to-brightBlue/50" />
        </motion.div>
      </section>

      {/* Sobre */}
      <section className="max-w-4xl mx-auto px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-brightBlue text-xs tracking-[0.4em] uppercase mb-4">About the project</p>
          <h2 className="text-4xl font-light text-white mb-8 leading-snug">
            Tone Poem is the merger of<br />
            <span className="text-brightBlue">creativity, sound and technology</span>
          </h2>
          <p className="text-white/50 leading-relaxed text-lg font-light">
            Born at the intersection of technology and fashion, Tone Poem is a project that uses
            artificial intelligence to reimagine the creative process in the fashion universe.
            Our intention is to democratize visual creation and connect students, designers
            and enthusiasts to tools that broaden their aesthetic vision.
          </p>
        </motion.div>
      </section>

      {/* Matérias */}
      <section className="px-8 py-20 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-brightBlue text-xs tracking-[0.4em] uppercase mb-3">Aplications</p>
            <h2 className="text-3xl font-light text-white">In the Subjects</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            {materias.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-darkBlue p-8 hover:bg-white/5 transition-colors duration-500 group"
              >
                <div className="w-8 h-px bg-brightBlue mb-6 group-hover:w-16 transition-all duration-500" />
                <h3 className="text-white font-light text-lg mb-3">{m.titulo}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-4">{m.desc}</p>
                <p className="text-brightBlue text-xs tracking-wider">{m.obj}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Objetivo Final */}
      <section className="max-w-3xl mx-auto px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <p className="text-brightBlue text-xs tracking-[0.4em] uppercase mb-4">Vision</p>
          <h2 className="text-3xl font-light text-white mb-8">The Future We Build</h2>
          <p className="text-white/50 leading-loose text-lg font-light">
            Kalimba is not just an academic project — it is a creative declaration. We believe
            that AI can be the next great instrument for fashion designers: capable of generating
            visual references, harmonizing palettes, suggesting silhouettes, and creating complete concepts
            completos em segundos. O impacto é tanto tecnológico quanto estético.
          </p>
          <br></br>
          <Link
            to="/examples"
            className="border border-brightBlue text-brightBlue px-10 py-3 text-xs tracking-[0.3em] uppercase hover:bg-brightBlue hover:text-darkBlue transition-all duration-500"
          >
            Explore Real Results
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-8 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-brightBlue tracking-[0.3em] text-sm">Tone Poem</span>
          <span className="text-white/20 text-xs">© 2025 Tone Poem. Todos os direitos reservados.</span>
        </div>
      </footer>
    </main>
  )
}