// main.js
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


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

	const sphereGeometry = new THREE.SphereGeometry(5, 50, 50);
	const sphereMaterial = new THREE.ShaderMaterial({
		vertexShader: document.getElementById("vertex").textContent,
		fragmentShader: document.getElementById("fragment").textContent,
		uniforms: {
			globeTexture: {
				value: new THREE.TextureLoader().load("https://threejs-earth.s3.ap-northeast-1.amazonaws.com/earth.jpeg")
			},
		},
	});

	// 球体の作成
	const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
	scene.add(sphere);
	// 球体の枠をシェーダーで強調する
	const atmosphere = new THREE.Mesh(
		new THREE.SphereGeometry(5, 50, 50),
		new THREE.ShaderMaterial({
			vertexShader: document.getElementById("atmosphereVertex").textContent,
			fragmentShader: document.getElementById("atmosphereFragment").textContent,
			blending: THREE.AdditiveBlending,
			side: THREE.BackSide,
		})
	);
	atmosphere.scale.set(1.0, 1.0, 1.0);

	scene.add(atmosphere);
	// シーンに追加する。
	scene.add(sphere);

	// カメラ制御の設定(マウス制御できる)
	const controls = new OrbitControls(camera, document.querySelector<HTMLDivElement>('#app')!);
	controls.enableDamping = true;

	// ワンフレーム毎に更新する関数をそれぞれ実行する。
	function tick() {
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