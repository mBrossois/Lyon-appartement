import {BoxGeometry, Group, Mesh, MeshStandardMaterial, PlaneGeometry} from "three";
import {dimensions} from "../utils/dimensions.const";
import {addToGui} from "../utils/gui.util";

export const bedroomGroup = new Group()

export const initializeBedroom = (wallMaterial, floorMaterial, textureLoader, gui) => {
    const frontWallTextureGrayscale = textureLoader.load('/textures/bedroom/wall/front/wall-bathroom-grayscale.jpg')
    const frontWallMirroredTextureGrayscale = textureLoader.load('/textures/bedroom/wall/front/wall-bathroom-grayscale-mirrored.jpg')
    const backWallTextureGrayscale = textureLoader.load('/textures/bedroom/wall/back/wall-bedroom-back-greyscale.jpg')
    const bedroomFolder = gui.addFolder('bedroom')
    bedroomFolder.close()
    // Floor
    const floor = new Mesh(
        new PlaneGeometry(dimensions.bedroom.width, dimensions.bedroom.length, 10, 10),
        floorMaterial
    )
    floor.rotation.x = - Math.PI * 0.5

    addToGui(bedroomFolder, floor, 'floor')

    // Left wall
    const leftWall = new Mesh(
        new PlaneGeometry(dimensions.bedroom.length, dimensions.bedroom.height, 10, 10),
        wallMaterial
    )
    leftWall.position.x = - (dimensions.bedroom.width) / 2
    leftWall.position.y = dimensions.bedroom.height / 2
    leftWall.rotation.y = Math.PI * 0.5

    addToGui(bedroomFolder, leftWall, 'left wall')

    // Front wall
    const frontWall = new Mesh(
        new BoxGeometry(dimensions.bedroom.width, dimensions.bedroom.height, dimensions.bedroom.wallDepth, 10, 10),
        // order to add materials: x+,x-,y+,y-,z+,z-
        [
            wallMaterial,
            wallMaterial,
            wallMaterial,
            wallMaterial,
            new MeshStandardMaterial({
                color: '#ffffff',
                transparent: true,
                alphaMap: frontWallTextureGrayscale,
            }),
            new MeshStandardMaterial({
                color: '#ffffff',
                transparent: true,
                alphaMap: frontWallMirroredTextureGrayscale,
            })
        ]
    )
    frontWall.position.y = dimensions.bedroom.height / 2
    frontWall.position.z = (dimensions.bedroom.length + dimensions.bedroom.wallDepth) / 2
    frontWall.rotation.y = Math.PI

    addToGui(bedroomFolder, frontWall, 'front wall')

    // Back wall
    const backWall = new Mesh(
        new PlaneGeometry(dimensions.bedroom.width, dimensions.bedroom.height),
       new MeshStandardMaterial({
           color: '#ffffff',
           transparent: true,
           alphaMap: backWallTextureGrayscale
       })
    )
    backWall.position.y = dimensions.bedroom.height / 2
    backWall.position.z = - dimensions.bedroom.length / 2

    addToGui(bedroomFolder, backWall, 'back wall')

    // Roof
    const roof = new Mesh(
        new PlaneGeometry(dimensions.bedroom.width, dimensions.bedroom.length, 10, 10),
        wallMaterial
    )
    roof.position.y = dimensions.bedroom.height
    roof.rotation.x = Math.PI * 0.5

    addToGui(bedroomFolder, roof, 'roof')
    bedroomGroup.add(floor, leftWall, frontWall, backWall, roof)
}
