import {BoxGeometry, Float32BufferAttribute, Group, Mesh, MeshStandardMaterial, PlaneGeometry} from "three";
import {dimensions} from "../utils/dimensions.const";
import {addToGui} from "../utils/gui.util";

export const bathroomGroup = new Group()

export const initializeBathroom = (wallMaterial, floorMaterial, gui) => {
    const bathroomFolder = gui.addFolder('bathroom')

    const parameter = {
        bathroomFloorColor: '#2e2e2e'
    }

    // Floor
    const floor = new Mesh(
        new PlaneGeometry(dimensions.bathroom.width, dimensions.bathroom.length, 10, 10),
        floorMaterial
    )
    floor.geometry.setAttribute('uv2', new Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))
    floor.rotation.x = -Math.PI * 0.5

    bathroomFolder.addColor(parameter, 'bathroomFloorColor', parameter.bathroomFloorColor)
        .onChange(() => {
            floor.material.color.set(parameter.bathroomFloorColor)
        })

    addToGui(bathroomFolder, floor, 'floor')

    // Front wall
    const frontWall = new Mesh(
        new PlaneGeometry(dimensions.bathroom.width, dimensions.bathroom.height, 10, 10),
        wallMaterial
    )
    frontWall.position.y = dimensions.bathroom.height / 2
    frontWall.position.z = dimensions.bathroom.length / 2
    frontWall.rotation.y = Math.PI

    addToGui(bathroomFolder, frontWall, 'front wall')
    // Left wall
    const leftWall = new Mesh(
        new PlaneGeometry(dimensions.bathroom.width, dimensions.bathroom.height, 10, 10),
        wallMaterial
    )
    leftWall.position.x = - dimensions.bathroom.width / 2
    leftWall.position.y = dimensions.bathroom.height / 2
    leftWall.rotation.y = Math.PI * 0.5

    addToGui(bathroomFolder, leftWall, 'left wall')

    // Back extra wall
    const backExtraWall = new Mesh(
        new BoxGeometry(dimensions.bathroom.backExtraWall.length, dimensions.bathroom.height, dimensions.bathroom.backExtraWall.wallDepth, 10, 10),
        wallMaterial
    )
    backExtraWall.position.x = 0.2
    backExtraWall.position.y = dimensions.bathroom.height / 2
    backExtraWall.position.z = - (dimensions.bathroom.length - dimensions.bathroom.backExtraWall.length) / 2
    backExtraWall.rotation.y = Math.PI * 0.5

    addToGui(bathroomFolder, backExtraWall, 'back extra wall')

    // Roof
    const roof = new Mesh(
        new PlaneGeometry(dimensions.bathroom.width, dimensions.bathroom.length, 10, 10),
        wallMaterial
    )
    roof.position.y = dimensions.bathroom.height
    roof.rotation.x = Math.PI * 0.5

    addToGui(bathroomFolder, roof, 'roof')
    bathroomGroup.add(floor, frontWall, leftWall, roof, backExtraWall)
}
