// Hallway
import {Group, Mesh, MeshStandardMaterial, PlaneGeometry} from "three";
import {dimensions} from "../utils/dimensions.const.js";
import {addToGui} from "../utils/gui.util";

export const hallwayGroup = new Group()

export const initializeHallway = (wallMaterial, gui) => {
    const hallwayFolder = gui.addFolder('hallway')
    hallwayFolder.close()

    const hallwayFloor = new Mesh(
        new PlaneGeometry(dimensions.hallway.width, dimensions.hallway.length, 10, 100, 100),
        new MeshStandardMaterial({color: '#e6e6e6'})
    )
    hallwayFloor.rotateX(-Math.PI * 0.5)
    addToGui(hallwayFolder, hallwayFloor, 'floor')

    // Door
    const hallwayEntranceDoor = new Mesh(
        new PlaneGeometry(1.5, dimensions.hallway.height, 100, 100),
        new MeshStandardMaterial({color: '#000985'})
    )
    hallwayEntranceDoor.position.y = (dimensions.hallway.height / 2)
    hallwayEntranceDoor.position.z = dimensions.hallway.length / 2 - 0.01
    hallwayEntranceDoor.rotateY(Math.PI)

    // Entrance wall
    const hallwayEntranceWall = new Mesh(
        new PlaneGeometry(dimensions.hallway.width, dimensions.hallway.height, 100, 100),
        wallMaterial
    )
    hallwayEntranceWall.position.y = (dimensions.hallway.height / 2)
    hallwayEntranceWall.position.z = dimensions.hallway.length / 2
    hallwayEntranceWall.rotateY(Math.PI)

    // Left wall
    const hallwayLeftWall = new Mesh(
        new PlaneGeometry(dimensions.hallway.length, dimensions.hallway.height, 100, 100),
        wallMaterial
    )
    hallwayLeftWall.position.y = (dimensions.hallway.height / 2)
    hallwayLeftWall.position.x = -dimensions.hallway.width / 2
    hallwayLeftWall.rotateY(Math.PI * 0.5)

    // Right wall
    const hallwayRightWall = new Mesh(
        new PlaneGeometry(dimensions.hallway.length * 0.58, dimensions.hallway.height, 100, 100),
        wallMaterial
    )
    hallwayRightWall.position.y = (dimensions.hallway.height / 2)
    hallwayRightWall.position.x = dimensions.hallway.width / 2
    hallwayRightWall.position.z = dimensions.hallway.length / 2 - (dimensions.hallway.length * 0.58) / 2
    hallwayRightWall.rotateY(-Math.PI * 0.5)

    hallwayFolder.add(hallwayRightWall.position, 'x').name('move right wall back').min(-10).max(10).step(0.001)
    hallwayFolder.add(hallwayRightWall.position, 'y').name('move right wall up').min(-10).max(10).step(0.001)
    hallwayFolder.add(hallwayRightWall.position, 'z').name('move right wall left').min(-10).max(10).step(0.001)

    // Roof
    const hallwayRoof = new Mesh(
        new PlaneGeometry(dimensions.hallway.width, dimensions.hallway.length, 100, 100),
        wallMaterial
    )
    hallwayRoof.position.y = dimensions.hallway.height
    hallwayRoof.rotateX(Math.PI * 0.5)

    hallwayGroup.add(hallwayFloor, hallwayLeftWall, hallwayRightWall, hallwayRoof, hallwayEntranceWall, hallwayEntranceDoor)

}
