import './style.css'
import {
    AmbientLight,
    Clock,
    Group,
    MeshStandardMaterial,
    PerspectiveCamera,
    Scene,
    TextureLoader,
    WebGLRenderer
} from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import {hallwayGroup, initializeHallway} from "./rooms/hallway";
import {initializeOffice, officeGroup} from "./rooms/office";
import {dimensions} from "./utils/dimensions.const.js";
import {initializeKitchen, kitchenGroup} from "./rooms/kitchen";
import {initializeLivingRoom, livingRoomGroup} from "./rooms/living-room";
import {bedroomGroup, initializeBedroom} from "./rooms/bedroom";
import {bathroomGroup, initializeBathroom} from "./rooms/bathroom";

/**
 * Base
 */
// Debug
const gui = new dat.GUI({width: 400})
gui.close()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Textures
const textureLoader = new TextureLoader()

// Scene
const scene = new Scene()

const parameters = {
    ambientLightColor: '#ffffff',
    wallColor: '#ffffff',
    floorColor: '#f5b74d'
}

// Lights
const lightsFolder = gui.addFolder('Lights')
lightsFolder.close()
const ambientLight = new AmbientLight(parameters.ambientLightColor, 0.5)
lightsFolder.add(ambientLight, 'intensity').name('Ambient intensity').min(0).max(2).step(0.001)
lightsFolder.addColor(parameters, 'ambientLightColor', parameters.ambientLightColor).name('Ambient color')
    .onChange(() => {
        ambientLight.color.set(parameters.ambientLightColor)
    })
scene.add(ambientLight)

// Material
const wallMaterial = new MeshStandardMaterial({color: parameters.wallColor})
const floorMaterial = new MeshStandardMaterial({color: parameters.floorColor})

const materialFolder = gui.addFolder('Color parameters')
materialFolder.close()

materialFolder.addColor(parameters, 'wallColor', parameters.wallColor)
    .onChange(() => {
        wallMaterial.color.set(parameters.wallColor)
    })

materialFolder.addColor(parameters, 'floorColor', parameters.floorColor)
    .onChange(() => {
        floorMaterial.color.set(parameters.floorColor)
    })
// Objects
// House
const appartement = new Group()

// Hallway
const hallway = hallwayGroup
initializeHallway(wallMaterial, gui)
hallway.position.x = -dimensions.hallway.width / 2 + (dimensions.kitchen.width - dimensions.hallway.width) / 2 / 2
hallway.position.z = dimensions.hallway.length / 2 + dimensions.kitchen.length / 2

// Office
const office = officeGroup
initializeOffice(wallMaterial, gui)
office.position.x = -dimensions.hallway.width / 2 + (dimensions.kitchen.width - dimensions.hallway.width) / 2 / 2 + (dimensions.hallway.width / 2 + dimensions.office.width / 2)
office.position.z = dimensions.hallway.length / 2 + dimensions.kitchen.length / 2 - (dimensions.hallway.length / 2 - dimensions.office.length / 2)

// Kitchen (centered)
const kitchen = kitchenGroup
initializeKitchen(wallMaterial, floorMaterial, gui)

// Living room
const livingRoom = livingRoomGroup
initializeLivingRoom(wallMaterial, floorMaterial, textureLoader, gui)
livingRoom.position.z = -(dimensions.kitchen.length + dimensions.livingRoom.length) / 2

// Bedroom
const bedroom = bedroomGroup
initializeBedroom(wallMaterial, floorMaterial, textureLoader, gui)
bedroom.position.x = -(dimensions.livingRoom.width + dimensions.bedroom.width + dimensions.livingRoom.wallDepth) / 2
bedroom.position.y = dimensions.livingRoom.height - dimensions.bedroom.height
bedroom.position.z = -(dimensions.kitchen.length + dimensions.bedroom.length) / 2

// Bathroom
const bathroom = bathroomGroup
initializeBathroom(wallMaterial, gui)
bathroom.position.x = -(dimensions.kitchen.width + dimensions.bathroom.width + dimensions.kitchen.wallDepth) / 2
bathroom.position.y = dimensions.kitchen.height - dimensions.bathroom.height
bathroom.position.z = -(dimensions.kitchen.length - dimensions.bathroom.length - dimensions.bedroom.wallDepth) / 2


appartement.add(hallway, office, kitchen, livingRoom, bedroom, bathroom)
scene.add(appartement)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
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
const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = -3
camera.position.y = 2
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
