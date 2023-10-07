import * as THREE from 'three'
import { type Mesh, type MeshPhongMaterial, type SphereGeometry } from 'three'

const createEarth = (): Mesh<SphereGeometry, MeshPhongMaterial> => {
  const geometry = new THREE.SphereGeometry(5, 50, 50)
  const material = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load('images/ground.jpg'),
    bumpMap: new THREE.TextureLoader().load('images/bump.jpg'),
    bumpScale: 1.0,
    specularMap: new THREE.TextureLoader().load('images/specular.png')
  })

  const earth = new THREE.Mesh(geometry, material)
  earth.receiveShadow = true

  return earth
}

export const earth = createEarth()
