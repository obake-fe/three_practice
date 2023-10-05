// main.js
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import createEarth from "./createObjects/createEarth";


export const createGalaxyScene = (width, height) => {
	// レンダラーの作成
	const renderer = new THREE.WebGLRenderer({
		antialias: true, // 地球の画質をよくする
	});
	renderer.setSize(width, height);
	// 地球の画質をよくする
	renderer.setPixelRatio(window.devicePixelRatio);

	// シーンの作成
	const scene = new THREE.Scene();

	// カメラの作成
	const camera = new THREE.PerspectiveCamera(
		75,
		width / height,
		0.1,
		1000
	);
	camera.position.set(1, 1, 10);

	const earth = createEarth();
	scene.add(earth);

	// 星を追加する
	const starGeometry = new THREE.BufferGeometry();
	const starMaterial = new THREE.PointsMaterial({
		color: 0xffffff,
	});
	const starCount = 12000;
	const starPositionArray = new Float32Array(starCount * 3);
	for (let i = 0; i < starCount; i++) {
		starPositionArray[i] = (Math.random() - 0.5) * 1000;
	}
	starGeometry.setAttribute(
		"position",
		new THREE.Float32BufferAttribute(starPositionArray, 3)
	);
	const stars = new THREE.Points(starGeometry, starMaterial);
	scene.add(stars);


	// 太陽から降り注ぐ光を表現
	const dirLight = new THREE.DirectionalLight(0xffffff, 1);
	dirLight.position.set(5,3,5);// 光の向き
	scene.add(dirLight);
	// 太陽光(赤色)を表現
	const pointLight = new THREE.PointLight(0xff4000,0.5, 100)
	pointLight.position.set(15,15,40);// 光の向き
	scene.add(pointLight);
	const pointLightHelper = new THREE.PointLightHelper( pointLight );
	scene.add( pointLightHelper );


	// 月を作る
	const moonGeometry = new THREE.SphereGeometry(2, 10, 10);
	const moonTxLoader = new THREE.TextureLoader();
	const moonMaterial = new THREE.MeshPhongMaterial({
		color:0xffffff,
		map: moonTxLoader.load("https://threejs-earth.s3.ap-northeast-1.amazonaws.com/2k_moon.jpeg")
	});
	const moon = new THREE.Mesh(moonGeometry, moonMaterial)
	scene.add(moon);


	// カメラ制御の設定(マウス制御できる)
	const controls = new OrbitControls(camera, document.querySelector<HTMLDivElement>('#app')!);
	controls.enableDamping = true;

	// ワンフレーム毎に更新する関数をそれぞれ実行する。
	let rot = 0;

	function tick() {
		rot += 0.005; // 毎フレーム角度を0.2度ずつ足していく
		// ラジアンに変換する
		const radian = (rot * Math.PI) / 180;

		// 地球の自転
		earth.rotation.y += 0.002;

		moon.rotation.y += 0.002;
		// 月の円運動を実現
		moon.position.x = 20 * Math.cos(rot);
		moon.position.z =20 * Math.sin(rot);

		requestAnimationFrame(tick);
		renderer.render(scene, camera);
		controls.update();
	}
	tick();

// リサイズされる度に更新する関数を実行する。
	addEventListener("resize", () => {

		// カメラを更新する
		camera.aspect = width / height;
		camera.updateProjectionMatrix();

		// レンダラーを更新する
		renderer.setSize(width, height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	});

	return renderer.domElement

}