// function createViewer(containerId, url){

// const container = document.getElementById(containerId)

// const scene = new THREE.Scene()

// scene.background = new THREE.Color(0x111111)

// const camera = new THREE.PerspectiveCamera(
// 60,
// container.clientWidth/350,
// 0.1,
// 100000
// )

// const renderer = new THREE.WebGLRenderer({antialias:true})

// renderer.setSize(container.clientWidth,350)

// container.appendChild(renderer.domElement)

// const controls = new THREE.OrbitControls(camera,renderer.domElement)

// scene.add(new THREE.AmbientLight(0xffffff,0.8))

// const light = new THREE.DirectionalLight(0xffffff,0.6)

// light.position.set(100,200,100)

// scene.add(light)

// const loader = new THREE.STLLoader()

// loader.load(url,function(geometry){

// geometry.computeVertexNormals()

// const material = new THREE.MeshStandardMaterial({
// color:0x3a86ff,
// metalness:0.3,
// roughness:0.5
// })

// const mesh = new THREE.Mesh(geometry,material)

// scene.add(mesh)

// const box = new THREE.Box3().setFromObject(mesh)

// const size = box.getSize(new THREE.Vector3())

// const maxDim = Math.max(size.x,size.y,size.z)

// camera.position.set(maxDim*2,maxDim*1.5,maxDim*2)

// })

// function animate(){

// requestAnimationFrame(animate)

// renderer.render(scene,camera)

// }

// animate()

// }

function createViewer(containerId, url) {

    const container = document.getElementById(containerId);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf3f4f6); // Light Gray

    const width = container.clientWidth;
    const height = 400;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 10000);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // 🔥 CONTROLS (smooth)
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // 🌟 LIGHTING (professional)
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
    scene.add(hemiLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight1.position.set(100, 100, 100);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight2.position.set(-100, -100, -100);
    scene.add(dirLight2);

    // 🔳 GRID (like CAD)
    const gridHelper = new THREE.GridHelper(200, 50);
    scene.add(gridHelper);

    // 📏 AXES
    const axesHelper = new THREE.AxesHelper(50);
    scene.add(axesHelper);

    // 📦 LOAD MODEL
    const loader = new THREE.STLLoader();

    loader.load(url, function (geometry) {

        geometry.computeVertexNormals();

        const material = new THREE.MeshStandardMaterial({
            color: 0x3b82f6,
            metalness: 0.4,
            roughness: 0.3
        });

        const mesh = new THREE.Mesh(geometry, material);

        // 🔥 CENTER MODEL
        // geometry.center();

        scene.add(mesh);

        // 📐 AUTO SCALE + CAMERA FIT
        const box = new THREE.Box3().setFromObject(mesh);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);

        // Center X and Z only
        mesh.position.x -= center.x;
        mesh.position.z -= center.z;

        // Move object UP so it sits on grid
        mesh.position.y -= box.min.y;

        const distance = maxDim * 2;

        camera.position.set(distance, distance, distance);
        camera.lookAt(center);

        controls.target.copy(center);
        controls.update();
    });

    // 🔁 RESIZE HANDLING
    window.addEventListener("resize", () => {
        const width = container.clientWidth;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });

    // 🎬 ANIMATION LOOP
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

    animate();
}