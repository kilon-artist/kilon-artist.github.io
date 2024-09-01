const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');
let stars = [];
const numStars = 300;

const starTypes = [
    { name: 'small', prob: 0.40, size: [0.3, 0.5], speed: [0.08, 0.1], blinkSpeed: [0.005, 0.03], color: 'white', maxOpacity: [0.3, 0.7], minOpacity: [0.2, 0.7] },
    { name: 'middle', prob: 0.32, size: [0.6, 0.8], speed: [0.04, 0.07], blinkSpeed: [0.005, 0.02], color: 'white', maxOpacity: [0.3, 0.7], minOpacity: [0.2, 0.7] },
    { name: 'big', prob: 0.25, size: [0.9, 1.1], speed: [0.02, 0.03], blinkSpeed: [0.01, 0.015], color: 'white', maxOpacity: [0.6, 1], minOpacity: [0.3, 1] },
    { name: 'mercury', prob: 0.007, size: [0.7, 0.7], speed: [0.12, 0.12], blinkSpeed: [0.04, 0.04], color: 'rgb(98, 200, 80)', maxOpacity: [0.9, 0.9], minOpacity: [0.6, 0.6] },
    { name: 'venus', prob: 0.006, size: [0.8, 0.8], speed: [0.08, 0.08], blinkSpeed: [0.01, 0.01], color: 'rgb(252, 252, 252)', maxOpacity: [1, 1], minOpacity: [0.9, 0.9] },
    { name: 'mars', prob: 0.005, size: [1, 1], speed: [0.06, 0.06], blinkSpeed: [0.02, 0.02], color: 'rgb(255, 51, 51)', maxOpacity: [0.7, 0.7], minOpacity: [0.5, 0.5] },
    { name: 'jupiter', prob: 0.0032, size: [3, 3], speed: [0.04, 0.04], blinkSpeed: [0.005, 0.005], color: 'rgb(255, 179, 77)', maxOpacity: [0.9, 0.9], minOpacity: [0.6, 0.6] },
    { name: 'saturn', prob: 0.0028, size: [2, 2], speed: [0.03, 0.03], blinkSpeed: [0, 0], color: 'rgb(181, 159, 82)', maxOpacity: [0.8, 0.8], minOpacity: [0.8, 0.8] },
    { name: 'uranus', prob: 0.0025, size: [1.2, 1.8], speed: [0.03, 0.06], blinkSpeed: [0.005, 0.04], color: 'rgb(95, 226, 172)', maxOpacity: [0.6, 1], minOpacity: [0.1, 0.5] },
    { name: 'neptune', prob: 0.002, size: [1.5, 1.5], speed: [0.02, 0.02], blinkSpeed: [0.001, 0.001], color: 'rgb(64, 147, 221)', maxOpacity: [0.4, 0.4], minOpacity: [0.3, 0.3] },
    { name: 'pluto', prob: 0.0015, size: [0.9, 0.9], speed: [0.03, 0.03], blinkSpeed: [0.005, 0.015], color: 'rgb(178, 82, 255)', maxOpacity: [0.4, 0.5], minOpacity: [0.2, 0.3] }
];

function getStarType() {
    const totalProb = starTypes.reduce((sum, type) => sum + type.prob, 0);
    let rand = Math.random() * totalProb;
    for (const type of starTypes) {
        if (rand < type.prob) {
            return type;
        }
        rand -= type.prob;
    }
    return starTypes[0]; // Default case
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createStars();
}

function createStars() {
    stars = [];
    for (let i = 0; i < numStars; i++) {
        const starType = getStarType();
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * (starType.size[1] - starType.size[0]) + starType.size[0];
        const speed = Math.random() * (starType.speed[1] - starType.speed[0]) + starType.speed[0];
        const blinkSpeed = Math.random() * (starType.blinkSpeed[1] - starType.blinkSpeed[0]) + starType.blinkSpeed[0];
        const maxOpacity = Math.random() * (starType.maxOpacity[1] - starType.minOpacity[0]) + starType.minOpacity[0];
        const minOpacity = Math.random() * (starType.minOpacity[1] - starType.minOpacity[0]) + starType.minOpacity[0];

        stars.push({
            x,
            y,
            size,
            speed,
            blinkSpeed,
            opacity: Math.random() * (maxOpacity - minOpacity) + minOpacity,
            maxOpacity,
            minOpacity,
            color: starType.color
        });
    }
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        
        // Determine if the color is in rgb format
        let colorParts = star.color.match(/\d+/g);
        if (colorParts) {
            ctx.fillStyle = `rgba(${colorParts.join(',')}, ${star.opacity})`;
        } else {
            // Default to white if color parsing fails
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        }
        
        ctx.fill();
    }
}

function updateStars() {
    for (let star of stars) {
        star.y -= star.speed;
        if (star.y < -star.size) {
            star.y = canvas.height + star.size;
            star.x = Math.random() * canvas.width;
        }
        star.opacity += (Math.random() - 0.5) * star.blinkSpeed;
        if (star.opacity < star.minOpacity) {
            star.opacity = star.minOpacity;
        } else if (star.opacity > star.maxOpacity) {
            star.opacity = star.maxOpacity;
        }
    }
}

function animate() {
    drawStars();
    updateStars();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
animate();