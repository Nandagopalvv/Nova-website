
// 3D Animation Background
// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded');
        return;
    }

    const container = document.getElementById('bg-animation');
    if (!container) return;

    // SCENE SETUP
    const scene = new THREE.Scene();

    // CAMERA SETUP
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // RENDERER SETUP
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // CREATE GEOMETRY (Floating Math Shapes)
    const shapes = [];
    const particleCount = 15; // increased count for better background fill

    // Use specific math shapes: Icosahedron (D20), Octahedron (D8), Tetrahedron (D4)
    const geometries = [
        new THREE.IcosahedronGeometry(1, 0),
        new THREE.OctahedronGeometry(1, 0),
        new THREE.TetrahedronGeometry(1, 0)
    ];

    const material = new THREE.MeshBasicMaterial({
        color: 0x4FC3F7, // Light Blue / Cyan
        wireframe: true,
        transparent: true,
        opacity: 0.15 // Subtle opacity
    });

    for (let i = 0; i < particleCount; i++) {
        // Randomly pick a geometry
        const geom = geometries[Math.floor(Math.random() * geometries.length)];
        const mesh = new THREE.Mesh(geom, material);

        // Random position spread (wide enough to cover screen)
        mesh.position.x = (Math.random() - 0.5) * 20;
        mesh.position.y = (Math.random() - 0.5) * 20; // Spread vertically
        mesh.position.z = (Math.random() - 0.5) * 10 - 2; // Spread in depth, push back slightly

        // Random rotation speed and movement speed
        mesh.userData = {
            rotX: (Math.random() - 0.5) * 0.01,
            rotY: (Math.random() - 0.5) * 0.01,
            speedX: (Math.random() - 0.5) * 0.005,
            speedY: (Math.random() - 0.5) * 0.005
        };

        // Random scale variation
        const scale = Math.random() * 0.5 + 0.3;
        mesh.scale.set(scale, scale, scale);

        scene.add(mesh);
        shapes.push(mesh);
    }

    // Add Ambient Light (optional for basic material but good practice)
    const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
    scene.add(ambientLight);

    // MOUSE INTERACTION
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - window.innerWidth / 2) * 0.001;
        mouseY = (event.clientY - window.innerHeight / 2) * 0.001;
    });

    // ANIMATION LOOP
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        // Rotate scene slightly based on time for global movement
        scene.rotation.y = Math.sin(elapsedTime * 0.1) * 0.1;

        // Smooth mouse movement
        targetX = mouseX * 0.5;
        targetY = mouseY * 0.5;

        shapes.forEach(shape => {
            // Constant rotation
            shape.rotation.x += shape.userData.rotX;
            shape.rotation.y += shape.userData.rotY;

            // Drift movement
            shape.position.x += shape.userData.speedX;
            shape.position.y += shape.userData.speedY;

            // Simple boundary check to keep them in view (wrap around)
            if (shape.position.x > 12) shape.position.x = -12;
            if (shape.position.x < -12) shape.position.x = 12;
            if (shape.position.y > 8) shape.position.y = -8;
            if (shape.position.y < -8) shape.position.y = 8;
        });

        // Parallax effect on camera or scene group
        // Move opposite to mouse for depth
        scene.position.x += (mouseX * -5 - scene.position.x) * 0.05;
        scene.position.y += (mouseY * -5 - scene.position.y) * 0.05;

        renderer.render(scene, camera);
    }

    animate();

    // HANDLE RESIZE
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix(); // Update camera frustum
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});
