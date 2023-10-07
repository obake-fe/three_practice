import * as THREE from "three";

const createMoon = () => {

	const geometry = new THREE.SphereGeometry(2, 10, 10);
	const material = new THREE.MeshPhongMaterial({
		color:0xffffff,
		map: new THREE.TextureLoader().load("https://threejs-earth.s3.ap-northeast-1.amazonaws.com/2k_moon.jpeg")
	});
	const moon = new THREE.Mesh(geometry, material)

	return moon;

}

export const moon =  createMoon();