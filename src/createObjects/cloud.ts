import * as THREE from "three";

const createCloud = () => {

	const geometry = new THREE.SphereGeometry(5.1, 50, 50);
	const material = new THREE.MeshPhongMaterial({
		map: new THREE.TextureLoader().load("images/cloud.jpg"),
		transparent: true,
		blending: THREE.AdditiveBlending,
	});

	const cloud = new THREE.Mesh(geometry, material);
	cloud.castShadow = true;

	return cloud;

}

export const cloud = createCloud();