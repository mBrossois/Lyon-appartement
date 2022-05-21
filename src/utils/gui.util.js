export const addToGui = (folder, mesh, name) => {
    const newFolder = folder.addFolder(name)
    newFolder.close()

    newFolder.add(mesh.scale, 'x').name(`width ${name}`).min(0).max(10).step(0.01)
    newFolder.add(mesh.scale, 'y').name(`length ${name}`).min(0).max(10).step(0.01)
    newFolder.add(mesh.position, 'x').name(`move ${name} left`).min(-10).max(10).step(0.01)
    newFolder.add(mesh.position, 'z').name(`move ${name} back`).min(-10).max(10).step(0.01)
    newFolder.add(mesh.position, 'y').name(`move ${name} up`).min(-10).max(10).step(0.01)
    newFolder.add(mesh.rotation, 'x').name(`rotate ${name} over length`).min(-Math.PI * 2).max(Math.PI * 2).step(0.01)
    newFolder.add(mesh.rotation, 'y').name(`rotate ${name} over width`).min(0).max(10).step(0.01)
}
