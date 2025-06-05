import * as THREE from "three"
import * as Tone from "tone"

// Initialize Three.js scene
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Create different geometries
const geometries = [
  new THREE.BoxGeometry(),
  new THREE.SphereGeometry(0.7, 32, 32),
  new THREE.TorusGeometry(0.7, 0.3, 16, 100),
  new THREE.TetrahedronGeometry(0.8),
  new THREE.OctahedronGeometry(0.8),
]

const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 })
let currentShape = new THREE.Mesh(geometries[0], material)
scene.add(currentShape)

let currentGeometryIndex = 0

// Add lights
const ambientLight = new THREE.AmbientLight(0x404040)
scene.add(ambientLight)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(1, 1, 1)
scene.add(directionalLight)

// Position camera
camera.position.z = 5

// Initialize more complex sound setup
const synth = new Tone.PolySynth(Tone.Synth).toDestination()
const reverb = new Tone.Reverb(2).toDestination()
synth.connect(reverb)

// Different sound configurations for each shape
const soundConfigs = [
  { note: "C4", chord: ["C4", "E4", "G4"] },
  { note: "E4", chord: ["E4", "G4", "B4"] },
  { note: "G4", chord: ["G4", "B4", "D5"] },
  { note: "B4", chord: ["B4", "D5", "F5"] },
  { note: "D5", chord: ["D5", "F5", "A5"] },
]

// Handle click events
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

window.addEventListener("click", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObject(currentShape)

  if (intersects.length > 0) {
    // Change shape
    currentGeometryIndex = (currentGeometryIndex + 1) % geometries.length
    scene.remove(currentShape)
    currentShape = new THREE.Mesh(geometries[currentGeometryIndex], material)
    scene.add(currentShape)

    // Play chord based on current shape
    const soundConfig = soundConfigs[currentGeometryIndex]
    synth.triggerAttackRelease(soundConfig.chord, "4n")

    // Change color with smooth transition
    const hue = Math.random()
    const color = new THREE.Color().setHSL(hue, 0.7, 0.5)
    currentShape.material.color = color
  }
})

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

// Animation loop with smooth rotation
function animate() {
  requestAnimationFrame(animate)

  currentShape.rotation.x += 0.01
  currentShape.rotation.y += 0.01

  // Add subtle floating motion
  currentShape.position.y = Math.sin(Date.now() * 0.001) * 0.2

  renderer.render(scene, camera)
}

animate()
