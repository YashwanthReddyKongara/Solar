// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // Darker background
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth - 300, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0x111111); // Reduced ambient light
scene.add(ambientLight);
const sunLight = new THREE.PointLight(0xffffff, 1.5, 300);
scene.add(sunLight);

// Camera position and rotation
camera.position.set(0, 15, 50);
camera.lookAt(0, 0, 0);
camera.rotation.x = -Math.PI / 12;

// Planet data with adjusted sizes and distances
const planetData = {
    mercury: { radius: 0.3, distance: 8, speed: 1, color: 0x888888, name: "Mercury" },
    venus: { radius: 0.7, distance: 12, speed: 1, color: 0xe39e1c, name: "Venus" },
    earth: { radius: 0.8, distance: 16, speed: 1, color: 0x2233ff, name: "Earth" },
    mars: { radius: 0.4, distance: 20, speed: 1, color: 0xc1440e, name: "Mars" },
    jupiter: { radius: 2, distance: 28, speed: 1, color: 0xd8ca9d, name: "Jupiter" },
    saturn: { radius: 1.8, distance: 36, speed: 1, color: 0xead6b8, name: "Saturn" },
    uranus: { radius: 1.2, distance: 44, speed: 1, color: 0x5580aa, name: "Uranus" },
    neptune: { radius: 1.2, distance: 52, speed: 1, color: 0x366896, name: "Neptune" }
};

// Create Sun with glow effect
const sunGeometry = new THREE.SphereGeometry(4, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xffff00,
    transparent: true,
    opacity: 0.9
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Add sun glow
const sunGlowGeometry = new THREE.SphereGeometry(4.2, 32, 32);
const sunGlowMaterial = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    transparent: true,
    opacity: 0.3
});
const sunGlow = new THREE.Mesh(sunGlowGeometry, sunGlowMaterial);
scene.add(sunGlow);

// Create Sun label
const sunLabel = createLabel("Sun", 0xffff00);
sunLabel.position.set(0, 6, 0);
scene.add(sunLabel);

// Create planets and their labels
const planets = {};
const orbits = {};
const labels = {};

// Function to create text label
function createLabel(text, color) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 64;
    
    context.font = "Bold 40px Arial";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, 128, 32);
    
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ 
        map: texture,
        transparent: true,
        opacity: 0.8
    });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(5, 1.25, 1);
    
    return sprite;
}

Object.keys(planetData).forEach(planet => {
    const data = planetData[planet];
    
    // Create planet
    const geometry = new THREE.SphereGeometry(data.radius, 32, 32);
    const material = new THREE.MeshPhongMaterial({ 
        color: data.color,
        shininess: 30
    });
    const planetMesh = new THREE.Mesh(geometry, material);
    planets[planet] = planetMesh;
    scene.add(planetMesh);

    // Create orbit
    const orbitGeometry = new THREE.RingGeometry(data.distance - 0.1, data.distance + 0.1, 128);
    const orbitMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x444444, 
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.2
    });
    const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
    orbit.rotation.x = Math.PI / 2;
    orbits[planet] = orbit;
    scene.add(orbit);

    // Create label
    const label = createLabel(data.name, data.color);
    labels[planet] = label;
    scene.add(label);
});

// Animation state
let isPaused = false;
const clock = new THREE.Clock();

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    if (!isPaused) {
        const delta = clock.getDelta();

        // Rotate sun
        sun.rotation.y += 0.002;
        sunGlow.rotation.y += 0.002;

        // Update planet positions and labels
        Object.keys(planets).forEach(planet => {
            const data = planetData[planet];
            const speed = document.getElementById(`${planet}-speed`).value;
            
            // Update planet position
            const time = Date.now() * 0.001 * speed;
            planets[planet].position.x = Math.cos(time) * data.distance;
            planets[planet].position.z = Math.sin(time) * data.distance;
            
            // Update label position
            labels[planet].position.x = planets[planet].position.x;
            labels[planet].position.y = planets[planet].position.y + data.radius + 1;
            labels[planet].position.z = planets[planet].position.z;
            
            // Rotate planet
            planets[planet].rotation.y += 0.01 * speed;
        });
    }

    renderer.render(scene, camera);
}

// Event listeners
document.getElementById('pause-resume').addEventListener('click', function() {
    isPaused = !isPaused;
    this.textContent = isPaused ? 'Resume' : 'Pause';
});

document.getElementById('toggle-theme').addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
});

// Handle window resize
window.addEventListener('resize', function() {
    const width = window.innerWidth - 300;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});

// Start animation
animate(); 