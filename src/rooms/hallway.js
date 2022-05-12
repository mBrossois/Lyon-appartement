// Hallway
import {Group, Mesh, MeshStandardMaterial, PlaneGeometry} from "three";

export const hallwayGroup = new Group()

export const initializeHallway = (wallMaterial, gui) => {
    const hallwayFolder = gui.addFolder('hallway')

    const hallwayFloor = new Mesh(
        new PlaneGeometry(2, 3.5, 10, 100, 100),
        new MeshStandardMaterial({color: '#cc6b0f'})
    )
    hallwayFloor.rotateX(- Math.PI * 0.5)

// Door
    const hallwayEntranceDoor = new Mesh(
        new PlaneGeometry(1.5, 2.28, 100, 100),
        new MeshStandardMaterial({color: '#000985'})
    )
    hallwayEntranceDoor.position.y = (2.28 / 2)
    hallwayEntranceDoor.position.z = 3.5/2 - 0.01
    hallwayEntranceDoor.rotateY(Math.PI)

// Entrance wall
    const hallwayEntranceWall = new Mesh(
        new PlaneGeometry(2, 2.28, 100, 100),
        wallMaterial
    )
    hallwayEntranceWall.position.y = (2.28 / 2)
    hallwayEntranceWall.position.z = 3.5/2
    hallwayEntranceWall.rotateY(Math.PI)

// Left wall
    const hallwayLeftWall = new Mesh(
        new PlaneGeometry(3.5, 2.28, 100, 100),
        wallMaterial
    )
    hallwayLeftWall.position.y = (2.28 / 2)
    hallwayLeftWall.position.x = - 2 / 2
    hallwayLeftWall.rotateY(Math.PI * 0.5)

// Right wall
    const hallwayRightWall = new Mesh(
        new PlaneGeometry(2, 2.28, 100, 100),
        wallMaterial
    )
    hallwayRightWall.position.y = (2.28 / 2)
    hallwayRightWall.position.x = 2 / 2
    hallwayRightWall.position.z = 3.5/2 - 2/2
    hallwayRightWall.rotateY(- Math.PI * 0.5)

    hallwayFolder.add(hallwayRightWall.position, 'x').name('move right wall back').min(-10).max(10).step(0.001)
    hallwayFolder.add(hallwayRightWall.position, 'y').name('move right wall up').min(-10).max(10).step(0.001)
    hallwayFolder.add(hallwayRightWall.position, 'z').name('move right wall left').min(-10).max(10).step(0.001)

// Roof
    const hallwayRoof = new Mesh(
        new PlaneGeometry(2, 3.5, 100, 100),
        wallMaterial
    )
    hallwayRoof.position.y = 2.28
    hallwayRoof.rotateX(Math.PI * 0.5)

    hallwayGroup.add(hallwayFloor, hallwayLeftWall, hallwayRightWall, hallwayRoof, hallwayEntranceWall, hallwayEntranceDoor)

}
