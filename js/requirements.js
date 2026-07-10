function calculateFPS() {
    const gpuMult = parseFloat(document.getElementById('gpu-select').value);
    const cpuMult = parseFloat(document.getElementById('cpu-select').value);
    const ramMult = parseFloat(document.getElementById('ram-select').value);
    const totalMultiplier = (gpuMult * 0.34) + (cpuMult * 0.45) + (ramMult * 0.1);

    const cells = document.querySelectorAll('.fps-val');
    let minFPS = 0;

    cells.forEach(cell => {
        let startValue = 0;
        let duration = 700;
        let startTime = null;

        function animateValue(timestamp) {
            if (!startTime) startTime = timestamp;
            let progress = timestamp - startTime;
            let current = Math.min(Math.floor(progress / duration * newValue), newValue);
            cell.innerText = current + "+ FPS";
            if (progress < duration) {
                requestAnimationFrame(animateValue);
            }
        }
        requestAnimationFrame(animateValue);
        const baseValue = parseInt(cell.getAttribute('data-base'));
        const newValue = Math.floor(baseValue * totalMultiplier);
        cell.innerText = newValue + "+ FPS";
        cell.classList.add('highlight');
        setTimeout(() => {
            cell.classList.remove('highlight');
        }, 700);
        minFPS = newValue;
    });
}


calculateFPS();