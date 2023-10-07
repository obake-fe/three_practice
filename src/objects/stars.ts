import * as THREE from 'three'
import { type BufferGeometry, type Points, type PointsMaterial } from 'three'

const createStars = (): Points<BufferGeometry, PointsMaterial> => {
  // 星を追加する
  const starGeometry = new THREE.BufferGeometry()
  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff
  })
  const starCount = 12000
  const starPositionArray = new Float32Array(starCount * 3)
  for (let i = 0; i < starCount; i++) {
    starPositionArray[i] = (Math.random() - 0.5) * 1000
  }
  starGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(starPositionArray, 3)
  )
  const stars = new THREE.Points(starGeometry, starMaterial)

  return stars
}

export const stars = createStars()
