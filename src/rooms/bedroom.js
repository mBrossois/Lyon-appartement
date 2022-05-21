import {Group, Mesh, PlaneGeometry} from "three";
import {dimensions} from "../utils/dimensions.const";
import {addToGui} from "../utils/gui.util";

export const bedroomGroup = new Group()

export const initializeBedroom = (wallMaterial, floorMaterial, gui) => {
    const bedroomFolder = gui.addFolder('bedroom')
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
        new PlaneGeometry(dimensions.bedroom.width, dimensions.bedroom.height, 10, 10),
        wallMaterial
    )
    frontWall.position.y = dimensions.bedroom.height / 2
    frontWall.position.z = dimensions.bedroom.length / 2
    frontWall.rotation.y = Math.PI

    addToGui(bedroomFolder, frontWall, 'front wall')

    // Back wall
    const backWall = new Mesh(
        new PlaneGeometry(dimensions.bedroom.width, dimensions.bedroom.height),
        wallMaterial
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
