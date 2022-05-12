import {Group, Mesh, MeshStandardMaterial, PlaneGeometry} from "three";

export const officeGroup = new Group()

export const initializeOffice = (wallMaterial, gui) => {
    const officeGuiGroup = gui.addFolder('Office')
    const parameters = {
        floorColor: '#cc6b0f',

    }

    const officeFloor = new Mesh(
        new PlaneGeometry(1, 2, 10, 100, 100),
        new MeshStandardMaterial({color: parameters.floorColor})
    )

    officeGuiGroup.addColor(parameters, 'floorColor', '#8a4300')
        .onChange(() => {
            officeFloor.material.color.set(parameters.floorColor)
        })

    console.log(officeFloor)
    officeFloor.rotation.x = - Math.PI * 0.5

    officeGuiGroup.add(officeFloor.scale, 'x').name('width floor').min(0).max(10).step(0.01)
    officeGuiGroup.add(officeFloor.scale, 'y').name('length floor').min(0).max(10).step(0.01)
    officeGuiGroup.add(officeFloor.position, 'x').name('width floor left').min(-10).max(10).step(0.01)
    officeGuiGroup.add(officeFloor.position, 'z').name('move floor back').min(-10).max(10).step(0.01)
    officeGuiGroup.add(officeFloor.position, 'y').name('move floor up').min(-10).max(10).step(0.01)
    officeGuiGroup.add(officeFloor.rotation, 'x').name('rotate floor over length').min(- Math.PI * 2).max(Math.PI * 2).step(0.01)
    officeGuiGroup.add(officeFloor.rotation, 'y').name('rotate floor over width').min(0).max(10).step(0.01)


    officeGroup.add(officeFloor)
}
