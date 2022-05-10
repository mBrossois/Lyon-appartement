import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import * as dat from 'lil-gui'
import { AmbientLight, Color, Group, Mesh, MeshBasicMaterial, MeshStandardMaterial, PlaneGeometry } from 'three'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const parameters = {ambientLightColor: '#ffffff'}

// Lights
const lightsFolder = gui.addFolder('Lights')
const ambientLight = new AmbientLight(parameters.ambientLightColor, 0.5)
lightsFolder.add(ambientLight, 'intensity').name('Ambient intensity').min(0).max(2).step(0.001)
lightsFolder.addColor(parameters, 'ambientLightColor', parameters.ambientLightColor ).name('Ambient color')
.onChange(() =>
{
    ambientLight.color.set(parameters.ambientLightColor)
})
scene.add(ambientLight)

// Textures
const textureLoader = new THREE.TextureLoader()

// Material
const wallMaterial = new MeshStandardMaterial({color: '#ffffff'})

// Objects
// House
const appartement = new Group()

// Halway
const halway = new Group()
const halwayFolder = gui.addFolder('Halway')

const halwayFloor = new Mesh(
   new PlaneGeometry(2, 3, 10, 100, 100),
   new MeshStandardMaterial({color: '#8a4300'})
)
halwayFloor.rotateX(- Math.PI * 0.5)

// Door
const halwayEntranceDoor = new Mesh(
    new PlaneGeometry(1.5, 2.28, 100, 100),
    new MeshStandardMaterial({color: '#000985'})
)
halwayEntranceDoor.position.y = (2.28 / 2)
halwayEntranceDoor.position.z = 3/2 - 0.01
halwayEntranceDoor.rotateY(Math.PI)

// Entrance wall
const halwayEntranceWall = new Mesh(
    new PlaneGeometry(2, 2.28, 100, 100),
    wallMaterial
)
halwayEntranceWall.position.y = (2.28 / 2)
halwayEntranceWall.position.z = 3/2
halwayEntranceWall.rotateY(Math.PI)

// Left wall
const halwayLeftWall = new Mesh(
    new PlaneGeometry(3, 2.28, 100, 100),
    wallMaterial
)
halwayLeftWall.position.y = (2.28 / 2)
halwayLeftWall.position.x = - 2 / 2 
halwayLeftWall.rotateY(Math.PI * 0.5)

// Right wall
const halwayRightWall = new Mesh(
    new PlaneGeometry(2, 2.28, 100, 100),
    wallMaterial
)
halwayRightWall.position.y = (2.28 / 2)
halwayRightWall.position.x = 2 / 2 
halwayRightWall.position.z = 2 / 2 / 2
halwayRightWall.rotateY(- Math.PI * 0.5)

// Roof
const halwayRoof = new Mesh(
    new PlaneGeometry(2, 3, 100, 100),
    wallMaterial
)
halwayRoof.position.y = 2.28
halwayRoof.rotateX(Math.PI * 0.5)

halway.add(halwayFloor, halwayLeftWall, halwayRightWall, halwayRoof, halwayEntranceWall, halwayEntranceDoor)

appartement.add(halway)
scene.add(appartement)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 2
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()