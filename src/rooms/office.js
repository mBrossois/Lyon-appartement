import {Group, Mesh, MeshStandardMaterial, PlaneGeometry} from "three";
import {dimensions} from "../utils/dimensions.const.js";
import {addToGui} from "../utils/gui.util.js";

export const officeGroup = new Group()

export const initializeOffice = (wallMaterial, gui) => {
    const officeFolder = gui.addFolder('Office')
    officeFolder.close()
    const parameters = {
        floorColor: '#e6e6e6',

    }
    // Floor
    const officeFloor = new Mesh(
        new PlaneGeometry(dimensions.office.width, dimensions.office.length, 10, 100, 100),
        new MeshStandardMaterial({color: parameters.floorColor})
    )

    officeFolder.addColor(parameters, 'floorColor', '#e6e6e6')
        .onChange(() => {
            officeFloor.material.color.set(parameters.floorColor)
        })

    officeFloor.rotation.x = - Math.PI * 0.5

    addToGui(officeFolder, officeFloor, 'floor')

    // Back wall
    const officeBackWall = new Mesh(
        new PlaneGeometry(dimensions.office.width, dimensions.office.height, 100, 100),
        wallMaterial
    )

    officeBackWall.position.y = dimensions.office.height / 2
    officeBackWall.position.z = dimensions.office.length / 2
    officeBackWall.rotation.x = Math.PI

    addToGui(officeFolder, officeBackWall, 'back wall')

    // Right wall
    const officeRightWall = new Mesh(
        new PlaneGeometry(dimensions.office.length, dimensions.office.height),
        wallMaterial
    )

    officeRightWall.position.x = dimensions.office.width / 2
    officeRightWall.position.y = dimensions.office.height / 2
    officeRightWall.rotation.y = - Math.PI * 0.5

    addToGui(officeFolder, officeRightWall, 'right wall')

    // Roof
    const officeRoof = new Mesh(
        new PlaneGeometry(dimensions.office.width, dimensions.office.length, 100, 100),
        wallMaterial
    )

    officeRoof.position.y = dimensions.office.height
    officeRoof.rotation.x = Math.PI * 0.5

    addToGui(officeFolder, officeRoof, 'roof')

    officeGroup.add(officeFloor, officeBackWall, officeRightWall, officeRoof)
}
