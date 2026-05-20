import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay },
})

const materias = [
  { titulo: "Design Thinking", desc: "Aplicamos metodologias criativas para resolver problemas de moda com tecnologia.", obj: "Prototipagem e empatia com o usuário" },
  { titulo: "Programação Web", desc: "Desenvolvimento do site, integração de APIs e criação de interfaces modernas.", obj: "Frontend e backend integrados" },
  { titulo: "Inteligência Artificial", desc: "Uso de IA generativa para criação de looks, paletas e referências visuais.", obj: "Prompting e modelos de visão" },
  { titulo: "Marketing Digital", desc: "Identidade visual, branding e posicionamento do projeto no mercado fashion.", obj: "Presença digital e storytelling" },
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
          Onde a inteligência artificial encontra a linguagem da moda — criando o futuro da expressão visual.
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
          <p className="text-brightBlue text-xs tracking-[0.4em] uppercase mb-4">Sobre o Projeto</p>
          <h2 className="text-4xl font-light text-white mb-8 leading-snug">
            Kalimba é a fusão entre<br />
            <span className="text-brightBlue">criatividade e código</span>
          </h2>
          <p className="text-white/50 leading-relaxed text-lg font-light">
            Nascido na interseção entre tecnologia e moda, o Kalimba é um projeto que utiliza
            inteligência artificial para reimaginar o processo criativo no universo fashion.
            Nossa intenção é democratizar a criação visual e conectar estudantes, designers
            e entusiastas a ferramentas que ampliam sua visão estética.
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
            <p className="text-brightBlue text-xs tracking-[0.4em] uppercase mb-3">Aplicação</p>
            <h2 className="text-3xl font-light text-white">Nas Matérias</h2>
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
          <p className="text-brightBlue text-xs tracking-[0.4em] uppercase mb-4">Visão</p>
          <h2 className="text-3xl font-light text-white mb-8">O Futuro que Construímos</h2>
          <p className="text-white/50 leading-loose text-lg font-light">
            Kalimba não é apenas um projeto acadêmico — é uma declaração criativa. Acreditamos
            que a IA pode ser o próximo grande instrumento do designer de moda: capaz de gerar
            referências visuais, harmonizar paletas, sugerir silhuetas e criar conceitos
            completos em segundos. O impacto é tanto tecnológico quanto estético.
          </p>
          <br></br>
          <Link
            to="/examples"
            className="border border-brightBlue text-brightBlue px-10 py-3 text-xs tracking-[0.3em] uppercase hover:bg-brightBlue hover:text-darkBlue transition-all duration-500"
          >
            Explore Possibilities
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