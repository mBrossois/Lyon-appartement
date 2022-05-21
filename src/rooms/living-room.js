import {BoxGeometry, Group, Mesh, PlaneGeometry} from "three";
import {dimensions} from "../utils/dimensions.const";
import {addToGui} from "../utils/gui.util";

export const livingRoomGroup = new Group()

export const initializeLivingRoom = (wallMaterial, floorMaterial, gui) => {
    const livingRoomFolder = gui.addFolder('living room')
    livingRoomFolder.close()

    // Floor
    const floor = new Mesh(
        new PlaneGeometry(dimensions.livingRoom.width, dimensions.livingRoom.length, 10, 10),
        floorMaterial
    )
    floor.rotation.x = -Math.PI * 0.5
    addToGui(livingRoomFolder, floor, 'floor')

    // Ceiling
    const ceiling = new Mesh(
        new PlaneGeometry(dimensions.livingRoom.width, dimensions.livingRoom.length, 10, 10),
        wallMaterial
    )
    ceiling.rotation.x = Math.PI * 0.5
    ceiling.position.y = dimensions.livingRoom.height

    addToGui(livingRoomFolder, ceiling, 'ceiling')

    // Right wall
    const rightWall = new Mesh(
        new PlaneGeometry(dimensions.livingRoom.length, dimensions.livingRoom.height, 10, 10),
        wallMaterial
    )
    rightWall.rotation.y = -Math.PI * 0.5
    rightWall.position.x = dimensions.livingRoom.width / 2
    rightWall.position.y = dimensions.livingRoom.height / 2

    addToGui(livingRoomFolder, rightWall, 'right wall')

    // Left wall
    const leftWall = new Mesh(
        new BoxGeometry(dimensions.livingRoom.length, dimensions.livingRoom.height, dimensions.livingRoom.wallDepth, 10, 10, 10),
        wallMaterial
    )
    leftWall.position.x = -(dimensions.livingRoom.width + dimensions.livingRoom.wallDepth) / 2
    leftWall.position.y = dimensions.livingRoom.height / 2
    leftWall.rotation.y = Math.PI * 0.5

    // Back wall
    const backWall = new Mesh(
        new PlaneGeometry(dimensions.livingRoom.width, dimensions.livingRoom.height, 10, 10),
        wallMaterial
    )

    backWall.position.y = dimensions.livingRoom.height / 2
    backWall.position.z = -dimensions.livingRoom.length / 2

    addToGui(livingRoomFolder, backWall, 'back wall')


    livingRoomGroup.add(floor, ceiling, rightWall, backWall, leftWall)
}
