const canvas = document.getElementById('spores');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const numberOfParticles = 90;

const mouse = {
    x: null,
    y: null,
    radius: 120
};

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.color = `rgba(${Math.floor(Math.random() * 50 + 100)}, ${Math.floor(Math.random() * 100 + 150)}, 80, ${Math.random() * 0.7 + 0.3})`;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#4a6b46';
        ctx.fill();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
            let angle = Math.atan2(dy, dx);
            let force = (mouse.radius - distance) / mouse.radius;
            this.x -= Math.cos(angle) * force * 5;
            this.y -= Math.sin(angle) * force * 5;
        }
    }
}

function init() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].draw();
        particlesArray[i].update();
    }
    requestAnimationFrame(animate);
}

init();
animate();

// Alternar relatos ao clicar no título
const titulo = document.getElementById('titulo');
const cardTitulo = document.getElementById('card-titulo');
const cardTexto = document.getElementById('card-texto');

const relatos = [
    { t: "Joel", p: "Um homem marcado pela perda. No silêncio dos esporos, ele encontra uma nova razão para lutar." },
    { t: "Ellie", p: "A esperança imune. Ela carrega no sangue o peso do futuro de um mundo em ruínas." },
    { t: "O Surto", p: "Uma infecção fúngica transformou a humanidade em eco de sua própria existência." }
];
let index = 0;

titulo.addEventListener('click', () => {
    index = (index + 1) % relatos.length;
    cardTitulo.textContent = relatos[index].t;
    cardTexto.textContent = relatos[index].p;
});