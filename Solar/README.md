# 3D Solar System Simulation

A web-based 3D solar system simulation built with Three.js that allows users to control the orbital speed of planets.

## Features

- 3D visualization of the solar system with the Sun and all eight planets
- Individual speed controls for each planet
- Pause/Resume functionality
- Dark/Light theme toggle
- Mobile-responsive design
- Realistic planet orbits and rotations

## How to Run

1. Clone or download this repository
2. Open the project folder in your code editor
3. Start a local server in the project directory. You can use one of these methods:

   Using Python:
   ```bash
   # If you have Python 3 installed
   python -m http.server 8000
   
   # If you have Python 2 installed
   python -m SimpleHTTPServer 8000
   ```

   Using Node.js:
   ```bash
   # Install http-server globally if you haven't already
   npm install -g http-server
   
   # Start the server
   http-server
   ```

4. Open your web browser and navigate to:
   - If using Python: `http://localhost:8000`
   - If using Node.js: `http://localhost:8080`

## Controls

- Use the sliders in the control panel to adjust the orbital speed of each planet
- Click the "Pause" button to stop all animations
- Click the "Toggle Theme" button to switch between dark and light themes

## Technical Details

- Built with Three.js for 3D rendering
- Pure HTML, CSS, and JavaScript (no frameworks)
- Responsive design that works on both desktop and mobile devices
- Uses requestAnimationFrame for smooth animations

## Browser Compatibility

This project works best in modern browsers that support WebGL:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is open source and available under the MIT License. 