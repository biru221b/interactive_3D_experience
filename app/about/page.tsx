import { Music, Palette, Shapes, Sparkles } from "lucide-react"

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-6">About This Experience</h1>
            <p className="text-xl text-white/80 leading-relaxed">
              An interactive audiovisual journey that combines 3D graphics, generative music, and user interaction to
              create a unique digital art experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Shapes className="w-8 h-8 text-white mr-3" />
                <h2 className="text-2xl font-bold text-white">3D Interaction</h2>
              </div>
              <p className="text-white/80 leading-relaxed">
                Built with Three.js, this experience features five different 3D geometries: cube, sphere, torus,
                tetrahedron, and octahedron. Each shape rotates continuously and responds to your clicks with smooth
                transformations.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Music className="w-8 h-8 text-white mr-3" />
                <h2 className="text-2xl font-bold text-white">Musical Harmony</h2>
              </div>
              <p className="text-white/80 leading-relaxed">
                Powered by Tone.js, each geometric shape is mapped to a unique musical chord. The polyphonic synthesizer
                creates rich harmonies with reverb effects, turning your interactions into a musical composition.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Palette className="w-8 h-8 text-white mr-3" />
                <h2 className="text-2xl font-bold text-white">Dynamic Colors</h2>
              </div>
              <p className="text-white/80 leading-relaxed">
                Every interaction generates a new random color using HSL color space, ensuring vibrant and harmonious
                color combinations. The shapes smoothly transition between colors, creating a mesmerizing visual
                experience.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Sparkles className="w-8 h-8 text-white mr-3" />
                <h2 className="text-2xl font-bold text-white">Floating Animation</h2>
              </div>
              <p className="text-white/80 leading-relaxed">
                The shapes feature subtle floating motion using sine wave calculations, combined with continuous
                rotation on multiple axes. This creates an organic, living feel to the geometric forms.
              </p>
            </div>
          </div>

   

          <div className="text-center mt-12">
            <p className="text-white/60 text-sm">
              This project demonstrates the intersection of technology, art, and music, creating an immersive experience
              that responds to human interaction.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
