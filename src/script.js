import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import * as dat from 'lil-gui'
import { AmbientLight, Color, Group, Mesh, MeshBasicMaterial, MeshStandardMaterial, PlaneGeometry } from 'three'
import {hallwayGroup, initializeHallway} from "./rooms/hallway";
import {initializeOffice, officeGroup} from "./rooms/office";

/**
 * Base
 */
// Debug
const gui = new dat.GUI({width: 400})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const parameters = {
    ambientLightColor: '#ffffff',
    wallColor: '#ffffff'
}

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
const wallMaterialGuiGroup = gui.addFolder('Wall parameters')

wallMaterialGuiGroup.addColor(parameters, 'wallColor', '#ffffff')
    .onChange(() => {
        wallMaterial.color.set(parameters.wallColor)
    })
// Objects
// House
const appartement = new Group()

// Hallway
const hallway = hallwayGroup
initializeHallway(wallMaterial, gui)

// Office
const office = officeGroup
initializeOffice(wallMaterial, gui)
office.position.x = 2 / 2 + 1 / 2
office.position.z = - 3.5 / 2 + 2 / 2

appartement.add(hallway, office)
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
