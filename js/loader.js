window.addEventListener("load", () => {
    notify(
        "Система",
        "Инициализация завершена"
    );
});

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (!loader) return;
    setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
        }, 400);
    }, 400);
});

function notify(title, text) {
    const wrap = document.getElementById("notifications");
    if (!wrap) return;
    const n = document.createElement("div");
    n.className = "notification";
    n.innerHTML = `
        <strong>${title}</strong>
        <br><br>
        ${text}
    `;
    wrap.appendChild(n);
    setTimeout(() => {
        n.remove();
    }, 4500);
}