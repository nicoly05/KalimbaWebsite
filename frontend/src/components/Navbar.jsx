import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import logo from "../assets/logo.png"

const links = [
  { to: "/", label: "Home" },
  { to: "/examples", label: "Examples" },
  { to: "/musics", label: "Musics" },
  { to: "/projects", label: "Projects" },
]

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-darkBlue/80 backdrop-blur-md border-b border-white/5">
      <Link to="/" className="flex items-center gap-3">
        <img src={logo} alt="Tone Poem Logo" className="h-12 w-auto" />
        <span className="text-brightBlue font-semibold tracking-[0.3em] text-sm uppercase">
          TONE POEM
        </span>
      </Link>
      <div className="flex gap-8">
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`text-xs tracking-widest uppercase transition-colors duration-300 ${
              pathname === to ? "text-brightBlue" : "text-white/50 hover:text-white"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}