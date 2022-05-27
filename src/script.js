import './style.css'
import {
    AmbientLight,
    Clock,
    Group,
    MeshStandardMaterial,
    PerspectiveCamera, RepeatWrapping,
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
const doorTextureAmbientOcclusion = textureLoader.load('/textures/Door_Wood/Door_Wood_001_ambientOcclusion.jpg')
const doorTextureColor = textureLoader.load('/textures/Door_Wood/Door_Wood_001_basecolor.jpg')
const doorTextureHeight = textureLoader.load('/textures/Door_Wood/Door_Wood_001_height.png')
const doorTextureMetallic = textureLoader.load('/textures/Door_Wood/Door_Wood_001_metallic.jpg')
const doorTextureNormal = textureLoader.load('/textures/Door_Wood/Door_Wood_001_normal.jpg')
const doorTextureOpacity = textureLoader.load('/textures/Door_Wood/Door_Wood_001_opacity.jpg')
const doorTextureRoughness = textureLoader.load('/textures/Door_Wood/Door_Wood_001_roughness.jpg')

const tilesTextureAmbientOcclusion = textureLoader.load('/textures/tiles_bathroom/Tiles_028_ambientOcclusion.jpg')
const tilesTextureBasecolor = textureLoader.load('/textures/tiles_bathroom/Tiles_028_basecolor_grey.jpg')
const tilesTextureHeight = textureLoader.load('/textures/tiles_bathroom/Tiles_028_height.png')
const tilesTextureNormal = textureLoader.load('/textures/tiles_bathroom/Tiles_028_normal.jpg')
const tilesTextureRoughness = textureLoader.load('/textures/tiles_bathroom/Tiles_028_roughness.jpg')

const tilesHallwayTextureAmbientOcclusion = textureLoader.load('/textures/Tiles_hallway/Tiles_033_ambientOcclusion.jpg')
const tilesHallwayTextureBasecolor = textureLoader.load('/textures/Tiles_hallway/Tiles_033_basecolor.jpg')
const tilesHallwayTextureHeight = textureLoader.load('/textures/Tiles_hallway/Tiles_033_height.png')
const tilesHallwayTextureNormal = textureLoader.load('/textures/Tiles_hallway/Tiles_033_normal.jpg')
const tilesHallwayTextureRoughness = textureLoader.load('/textures/Tiles_hallway/Tiles_033_roughness.jpg')

const tilesOfficeTextureAmbientOcclusion = textureLoader.load('/textures/Tiles_hallway/Tiles_033_ambientOcclusion.jpg')
const tilesOfficeTextureBasecolor = textureLoader.load('/textures/Tiles_hallway/Tiles_033_basecolor.jpg')
const tilesOfficeTextureHeight = textureLoader.load('/textures/Tiles_hallway/Tiles_033_height.png')
const tilesOfficeTextureNormal = textureLoader.load('/textures/Tiles_hallway/Tiles_033_normal.jpg')
const tilesOfficeTextureRoughness = textureLoader.load('/textures/Tiles_hallway/Tiles_033_roughness.jpg')

const woodFloorTextureColor = textureLoader.load('/textures/Wood_Floor/Wood_Floor_007_COLOR.jpg')
const woodFloorTextureHeight = textureLoader.load('/textures/Wood_Floor/Wood_Floor_007_DISP.png')
const woodFloorTextureNormal = textureLoader.load('/textures/Wood_Floor/Wood_Floor_007_NORM.jpg')
const woodFloorTextureAmbientOcclusion = textureLoader.load('/textures/Wood_Floor/Wood_Floor_007_OCC.jpg')
const woodFloorTextureRoughness = textureLoader.load('/textures/Wood_Floor/Wood_Floor_007_ROUGH.jpg')

const updateTexture = (texture, repeatX, repeatY) => {
    texture.repeat.set(repeatX, repeatY)
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
    return texture
}

// Scene
const scene = new Scene()

const parameters = {
    ambientLightColor: '#ffffff',
    wallColor: '#ffffff',
    floorColor: '#feffb3'
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
const doorMaterial = new MeshStandardMaterial({
    color: '#d8e9f8',
    transparent: true,
    map: doorTextureColor,
    alphaMap: doorTextureOpacity,
    displacementMap: doorTextureHeight,
    displacementScale: 0.1,
    metalnessMap: doorTextureMetallic,
    roughnessMap: doorTextureRoughness,
    normalMap: doorTextureNormal,
    aoMap: doorTextureAmbientOcclusion
})
const wallMaterial = new MeshStandardMaterial({color: parameters.wallColor})
const floorMaterial = new MeshStandardMaterial({
    color: parameters.floorColor,
    map: woodFloorTextureColor,
    displacementMap: woodFloorTextureHeight,
    displacementScale: 0.02,
    roughnessMap: woodFloorTextureRoughness,
    normalMap: woodFloorTextureNormal,
    aoMap: woodFloorTextureAmbientOcclusion,
})
const bathroomFloorMaterial = new MeshStandardMaterial({
    map: tilesTextureBasecolor,
    displacementMap: tilesTextureHeight,
    displacementScale: 0.02,
    normalMap: tilesTextureNormal,
    roughnessMap: tilesTextureRoughness,
    aoMap: tilesTextureAmbientOcclusion
    }
)

const repeatX = 2.38
const repeatY = 2.38

const hallwayFloorMaterial = new MeshStandardMaterial({
    map: updateTexture(tilesOfficeTextureBasecolor, repeatX, repeatY),
    displacementMap: updateTexture(tilesOfficeTextureHeight, repeatX, repeatY),
    displacementScale: 0.02,
    normalMap: updateTexture(tilesOfficeTextureNormal,repeatX ,repeatY),
    roughnessMap: updateTexture(tilesOfficeTextureRoughness, repeatX, repeatY),
    aoMap: updateTexture(tilesOfficeTextureAmbientOcclusion, repeatX, repeatY)
    }
)

const officeFloorMaterial = new MeshStandardMaterial({
    map: tilesHallwayTextureBasecolor,
    displacementMap: tilesHallwayTextureHeight,
    displacementScale: 0.02,
    normalMap: tilesHallwayTextureNormal,
    roughnessMap: tilesHallwayTextureRoughness,
    aoMap: tilesHallwayTextureAmbientOcclusion
    }
)

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
initializeHallway(wallMaterial, hallwayFloorMaterial, doorMaterial, gui)
hallway.position.x = -dimensions.hallway.width / 2 + (dimensions.kitchen.width - dimensions.hallway.width) / 2 / 2
hallway.position.z = dimensions.hallway.length / 2 + dimensions.kitchen.length / 2

// Office
const office = officeGroup
initializeOffice(wallMaterial, officeFloorMaterial, gui)
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
initializeBathroom(wallMaterial, bathroomFloorMaterial, gui)
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
