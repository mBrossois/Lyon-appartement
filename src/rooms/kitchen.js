import {Group, Mesh, PlaneGeometry} from "three";
import {dimensions} from "../utils/dimensions.const";
import {addToGui} from "../utils/gui.util";

export const kitchenGroup = new Group()

export const initializeKitchen = (wallMaterial, floorMaterial, gui) => {
    const kitchenFolder = gui.addFolder('Kitchen')
    kitchenFolder.close()
    // Floor
    const floor = new Mesh(
        new PlaneGeometry(dimensions.kitchen.width, dimensions.kitchen.length, 20, 20),
        floorMaterial
    )

    floor.rotation.x = - Math.PI * 0.5
    addToGui(kitchenFolder, floor, 'floor')

    // Left wall
    const leftWall = new Mesh(
        new PlaneGeometry(dimensions.kitchen.length, dimensions.kitchen.height, 20, 20),
        wallMaterial
    )

    leftWall.position.x = - dimensions.kitchen.width/2
    leftWall.position.y = dimensions.kitchen.height / 2
    leftWall.rotation.y = Math.PI * 0.5
    addToGui(kitchenFolder, leftWall, 'leftWall')

    // Right wall
    const righWall = new Mesh(
        new PlaneGeometry(dimensions.kitchen.length, dimensions.kitchen.height, 20, 20),
        wallMaterial
    )

    righWall.position.x = dimensions.kitchen.width/2
    righWall.position.y = dimensions.kitchen.height / 2
    righWall.rotation.y = - Math.PI * 0.5
    addToGui(kitchenFolder, righWall, 'righWall')
    // Ceiling
    const ceiling = new Mesh(
        new PlaneGeometry(dimensions.kitchen.width, dimensions.kitchen.length, 20, 20),
        wallMaterial
    )

    ceiling.position.y = dimensions.kitchen.height
    ceiling.rotation.x = Math.PI * 0.5
    addToGui(kitchenFolder, ceiling, 'ceiling')

    kitchenGroup.add(floor, leftWall, righWall, ceiling)
}
