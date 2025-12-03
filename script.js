/* Particle background + small UI helpers */

/* Canvas particle system - lightweight */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let W = canvas.width = innerWidth;
let H = canvas.height = innerHeight;

window.addEventListener('resize', () => {
    W = canvas.width = innerWidth;
    H = canvas.height = innerHeight;
    initParticles();
});

function rand(min, max) { return Math.random() * (max - min) + min; }

let particles = [];

function initParticles() {
    particles = [];
    const count = Math.floor((W * H) / 90000); // scale
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 2 + 0.6,
            vx: rand(-0.25, 0.25),
            vy: rand(-0.2, 0.2),
            alpha: rand(0.15, 0.9),
            tw: Math.random() * 0.02 + 0.002
        });
    }
}
initParticles();

function draw() {
    // subtle background fill
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(6,8,12,0.3)';
    ctx.fillRect(0, 0, W, H);

    // draw particles
    for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += Math.sin(Date.now() * p.tw) * 0.003;

        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        ctx.beginPath();
        ctx.fillStyle = `rgba(22,182,206,${Math.max(0.06, Math.min(0.95, p.alpha))})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(22,182,206,0.9)';
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    requestAnimationFrame(draw);
}
draw();

/* Smooth scroll for anchor links */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* small hover effect for icon boxes */
document.querySelectorAll('.icon-box').forEach(el => {
    el.addEventListener('mouseenter', () => el.style.transform = 'translateY(-6px) scale(1.05)');
    el.addEventListener('mouseleave', () => el.style.transform = 'translateY(0) scale(1)');
});