import {
    BoxGeometry,
    BufferAttribute,
    Float16BufferAttribute,
    Group,
    Mesh,
    MeshStandardMaterial,
    TorusGeometry
} from "three";
import scene from "three/examples/jsm/offscreen/scene";
import {addToGui} from "../utils/gui.util";
import {removeObject, updateObject} from "../utils/update-object.util";
import {dimensions} from "../utils/dimensions.const";

export const archwayGroup = new Group()

export const initializeArchway = (gui) => {
    const archwayFolder = gui.addFolder('archway')
    const parameters = {
        archwayTopColor: '#fbcbb1',
        archWaySideColor: '#ffdfcc'
    }

    // Left pilar
    const archwayLeftPilar= new Mesh(
        new BoxGeometry(0.4, dimensions.hallway.height - 0.4, 0.56, 10, 10),
        new MeshStandardMaterial({color: parameters.archWaySideColor})
    )
    archwayLeftPilar.position.x = -1 - ( ((dimensions.hallway.width + dimensions.office.width) / 2) - (0.4/2))
    archwayLeftPilar.position.y = dimensions.hallway.height/2 - (0.4/2)
    archwayLeftPilar.position.z = -0.9

    archwayFolder.addColor(parameters, 'archWaySideColor', '#ef9361')
        .onChange(() =>{
            archwayLeftPilar.material.color.set(parameters.archWaySideColor)
        })

    addToGui(archwayFolder, archwayLeftPilar, 'archway left pilar')

    // Right pilar
    const archwayRightPilar = new Mesh(
        new BoxGeometry(0.4, dimensions.hallway.height - 0.4, 0.56, 10, 10),
        new MeshStandardMaterial({color: parameters.archWaySideColor})
    )
    archwayRightPilar.position.x = ((dimensions.hallway.width + dimensions.office.width) / 2) - (0.4/2) - 1
    archwayRightPilar.position.y = dimensions.hallway.height/2 - (0.4/2)
    archwayRightPilar.position.z = -0.9

    archwayFolder.addColor(parameters, 'archWaySideColor', '#ef9361')
        .onChange(() =>{
            archwayRightPilar.material.color.set(parameters.archWaySideColor)
        })

    addToGui(archwayFolder, archwayRightPilar, 'archway right pilar')

    // Top archwayGroup
    const archwayTop = new Mesh(
        new BoxGeometry(dimensions.hallway.width + dimensions.office.width, 0.4, 0.56, 10, 10),
        new MeshStandardMaterial({color: parameters.archwayTopColor})
    )
    archwayTop.position.x = -1
    archwayTop.position.y = dimensions.hallway.height - 0.4 / 2
    archwayTop.position.z = -0.9

    archwayFolder.addColor(parameters, 'archwayTopColor', '#ef9361')
        .onChange(() =>{
            archwayTop.material.color.set(parameters.archwayTopColor)
        })

    addToGui(archwayFolder, archwayTop, 'archway top')

    archwayGroup.add(archwayTop, archwayLeftPilar, archwayRightPilar)
}
