const canvas = document.getElementById("stars");
if (canvas) {
    const ctx = canvas.getContext("2d");
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    const stars = [];
    for (let i = 0; i < 250; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 0.3,
            speed: Math.random() * 0.5 + 0.1
        });
    }

    function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#9befff";
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(
                star.x,
                star.y,
                star.radius,
                0,
                Math.PI * 2
            );
            ctx.fill();
            star.y += star.speed;
            if (star.y > canvas.height) {
                star.y = -5;
                star.x = Math.random() * canvas.width;
            }
        });
        requestAnimationFrame(animateStars);
    }
    animateStars();
}

const wrap = document.getElementById(
    "particles"
);

for (let i = 0; i < 180; i++) {
    const p = document.createElement(
        "div"
    );
    p.className = "particle";
    const size = Math.random() * 5 + 2;
    p.style.width = size + "px";
    p.style.height = size + "px";
    p.style.left = Math.random() * 100 + "%";
    p.style.top = Math.random() * 100 + "%";
    p.style.animationDuration =
        8 + Math.random() * 10 + "s";
    p.style.animationDelay =
        Math.random() * 8 + "s";
    wrap.appendChild(p);
}