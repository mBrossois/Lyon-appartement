// Example code for updating a object geometry
// archwayFolder.add(parameters, 'archwayRadius').min(0).max(2).step(0.001)
//     .onChange(() => {
//         removeObject(archwayGroup, archwayTop)
//         archwayTop = new Mesh(
//             new TorusGeometry(parameters.archwayRadius, parameters.tube, 16, 100, Math.PI),
//             new MeshStandardMaterial({color: parameters.archwayTopColor})
//         )
//         setPosition(archwayTop)
//         archwayGroup.add(archwayTop)
//     })

export const removeObject = (container, mesh) => {
    mesh.geometry.dispose()
    mesh.material.dispose()

    container.remove(mesh)
}
