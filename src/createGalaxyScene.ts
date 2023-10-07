import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { earth } from './objects/earth'
import { cloud } from './objects/cloud'
import { moon } from './objects/moon'
import { stars } from './objects/stars'

export const createGalaxyScene = (width, height): HTMLCanvasElement => {
  // レンダラーの作成
  const renderer = new THREE.WebGLRenderer({
    antialias: true // 地球の画質をよくする
  })
  renderer.setSize(width, height)
  // 地球の画質をよくする
  renderer.setPixelRatio(window.devicePixelRatio)

  // シーンの作成
  const scene = new THREE.Scene()

  // カメラの作成
  const camera = new THREE.PerspectiveCamera(
    75,
    width / height,
    0.1,
    1000
  )
  camera.position.set(1, 1, 10)

  // 地球
  scene.add(earth)

  // 雲
  scene.add(cloud)

  // 月
  scene.add(moon)

  // 星
  scene.add(stars)

  // 太陽から降り注ぐ光を表現
  const dirLight = new THREE.DirectionalLight(0xffffff, 1)
  dirLight.position.set(5, 3, 5)// 光の向き
  scene.add(dirLight)
  // 太陽光(赤色)を表現
  const pointLight = new THREE.PointLight(0xff4000, 0.5, 100)
  pointLight.position.set(15, 15, 40)// 光の向き
  scene.add(pointLight)
  const pointLightHelper = new THREE.PointLightHelper(pointLight)
  scene.add(pointLightHelper)

  // カメラ制御の設定(マウス制御できる)
  const controls = new OrbitControls(camera, document.querySelector<HTMLDivElement>('#app'))
  controls.enableDamping = true

  // ワンフレーム毎に更新する関数をそれぞれ実行する。
  let rot = 0

  function tick (): void {
    rot += 0.005 // 毎フレーム角度を0.2度ずつ足していく
    // ラジアンに変換する
    // const radian = (rot * Math.PI) / 180

    // 地球の自転
    earth.rotation.y += 0.002

    // 雲の動き
    cloud.rotation.y += 0.004

    // 月の自転
    moon.rotation.y += 0.002

    // 月の公転
    moon.position.x = 20 * Math.cos(rot)
    moon.position.z = 20 * Math.sin(rot)

    requestAnimationFrame(tick)
    renderer.render(scene, camera)
    controls.update()
  }
  tick()

  // リサイズされる度に更新する関数を実行する。
  addEventListener('resize', () => {
    // カメラを更新する
    camera.aspect = width / height
    camera.updateProjectionMatrix()

    // レンダラーを更新する
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  })

  return renderer.domElement
}
