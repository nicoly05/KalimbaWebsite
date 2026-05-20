import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Examples from "./pages/Examples"
import Projects from "./pages/Projects"
import Musics from "./pages/Musics"

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/examples" element={<Examples />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/musics" element={<Musics />} />
      </Routes>
    </BrowserRouter>
  )
}