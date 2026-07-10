function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString("ru-RU");
    const clock = document.getElementById("clock");
    if (clock) {
        clock.textContent = time;
    }
}
updateClock();
setInterval(updateClock, 1000);

const statuses =
    document.querySelectorAll(
        ".status"
    );
setInterval(() => {
    statuses.forEach(status => {
        status.animate(
            [
                {
                    opacity: 1
                },
                {
                    opacity: .5
                },
                {
                    opacity: 1
                }
            ],

            {
                duration: 1200
            }
        );
    });
}, 3000);

const modal = document.getElementById('video-modal');
const modalVideo = document.getElementById('modal-video');
const closeBtn = document.querySelector('.close-modal');

let clickTimer = null;

document.querySelectorAll('.skill-item').forEach(item => {
    const video = item.querySelector('video');
    const playBtn = item.querySelector('.play-btn');

    playBtn.addEventListener('click', (e) => {
        if (clickTimer) clearTimeout(clickTimer);
        clickTimer = setTimeout(() => {
            if (video.paused) {
                video.play();
                playBtn.style.opacity = '0';
            } else {
                video.pause();
                playBtn.style.opacity = '1';
            }
        }, 250);
    });
    video.addEventListener('ended', () => {
        playBtn.style.opacity = '1';
    });
    video.addEventListener('dblclick', (e) => {
        if (clickTimer) clearTimeout(clickTimer);
        modal.style.display = 'flex';
        modalVideo.src = video.src;
        modalVideo.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    });
});

function closeModalFn() {
    modal.style.display = 'none';
    modalVideo.pause();
    modalVideo.src = "";
}

closeBtn.addEventListener('click', closeModalFn);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalFn();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModalFn();
    }
});

const video = document.getElementById('modal-video');
const progressBar = document.querySelector('.progress-bar');
const progressContainer = document.querySelector('.progress-container');

const playBtn = document.querySelector('.btn-play');
const playIcon = document.querySelector('.play-icon');
const pauseIcon = document.querySelector('.pause-icon');

function togglePlay() {
    if (video.paused) {
        video.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    } else {
        video.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    }
}

playBtn.addEventListener('click', togglePlay);

video.addEventListener('ended', () => {
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
});

function openModal(videoSrc) {
    modal.style.display = 'flex';
    modalVideo.src = videoSrc;
    modalVideo.play();
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
}

video.addEventListener('timeupdate', () => {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${percent}%`;
});

progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    video.currentTime = (clickX / width) * video.duration;
});

const ranks = document.querySelectorAll(".rank");
const swordImage = document.getElementById("swordImage");

const swords = {
    e: "/assets/swords/sword_e.png",
    d: "/assets/swords/sword_d.png",
    c: "/assets/swords/sword_c.png",
    b: "/assets/swords/sword_b.png",
    a: "/assets/swords/sword_a.png",
    s: "/assets/swords/sword_s.png"
};

function changeSword(rankElement) {
    ranks.forEach(r => r.classList.remove("active"));
    rankElement.classList.add("active");
    const rankName = [...rankElement.classList].find(c => swords.hasOwnProperty(c));
    swordImage.style.opacity = 0;
    swordImage.style.transform = "scale(.8)";

    setTimeout(() => {
        swordImage.src = swords[rankName];
        swordImage.onload = () => {
            swordImage.style.opacity = 1;
            swordImage.style.transform = "scale(1)";
        };
    }, 200);
}

ranks.forEach(rank => {
    rank.addEventListener("click", () => changeSword(rank));
});
function navigate(direction) {
    const keys = Object.keys(swords);
    const activeRank = document.querySelector(".rank.active");
    const currentKey = [...activeRank.classList].find(c => swords.hasOwnProperty(c));
    let nextIndex = keys.indexOf(currentKey) + direction;
    if (nextIndex < 0) nextIndex = keys.length - 1;
    if (nextIndex >= keys.length) nextIndex = 0;
    const nextRankElement = document.querySelector(`.rank.${keys[nextIndex]}`);
    changeSword(nextRankElement);
}

const dot = document.querySelector(".status-dot");
setInterval(() => {
    dot.animate(
        [
            {
                transform: "scale(1)",
                opacity: 1
            },
            {
                transform: "scale(1.4)",
                opacity: .4
            },
            {
                transform: "scale(1)",
                opacity: 1
            }
        ],
        {
            duration: 900
        }
    );
}, 1000);

const shadowList = [
    { id: 1, thumb: '/assets/shadow_list/chibi/t1.png', full: '/assets/shadow_list/full-body/f1.png' }, // Igris (Рыцарь)
    { id: 2, thumb: '/assets/shadow_list/chibi/t2.png', full: '/assets/shadow_list/full-body/f2.png' }, // Beru (Муравей)
    { id: 3, thumb: '/assets/shadow_list/chibi/t3.png', full: '/assets/shadow_list/full-body/f3.png' }, // Tank (Медведь)
    { id: 4, thumb: '/assets/shadow_list/chibi/t4.png', full: '/assets/shadow_list/full-body/f4.png' }, // Kaisel (Дракон)
    { id: 5, thumb: '/assets/shadow_list/chibi/t5.png', full: '/assets/shadow_list/full-body/f5.png' }, // Tusk (Колдун)
    { id: 6, thumb: '/assets/shadow_list/chibi/t6.png', full: '/assets/shadow_list/full-body/f6.png' }, // Iron
    { id: 7, thumb: '/assets/shadow_list/chibi/t7.png', full: '/assets/shadow_list/full-body/f7.png' }, // Bellion
    { id: 8, thumb: '/assets/shadow_list/chibi/t8.png', full: '/assets/shadow_list/full-body/f8.png' }, // Ashborn
];

const grid = document.getElementById('shadow-grid');
const bigImg = document.getElementById('big-chibi-img');

function selectShadow(fullUrl, clickedElement) {
    if (!bigImg) return;
    bigImg.src = fullUrl;

    document.querySelectorAll('.shadow-item').forEach(item => {
        item.classList.remove('active');
    });
    if (clickedElement) {
        clickedElement.classList.add('active');
    }
}

function initShadows() {
    if (!grid) {
        console.error("Элемент shadow-grid не найден!");
        return;
    }

    shadowList.forEach((shadow, index) => {
        const div = document.createElement('div');
        div.className = 'shadow-item';

        const img = document.createElement('img');
        img.src = shadow.thumb;
        img.alt = `Shadow ${shadow.id}`;

        div.appendChild(img);
        div.onclick = () => selectShadow(shadow.full, div);
        grid.appendChild(div);
        if (index === 0) selectShadow(shadow.full, div);
    });
}
document.addEventListener('DOMContentLoaded', initShadows);

function selectShadow(fullUrl, clickedElement) {
    bigImg.src = fullUrl;

    document.querySelectorAll('.shadow-item').forEach(item => {
        item.classList.remove('active');
    });
    clickedElement.classList.add('active');
}


document.addEventListener('DOMContentLoaded', () => {
    // 1. База данных описаний
    const statData = {
        'Сила': {
            impact: 'Определяет физическую мощь и наносимый урон в ближнем бою.',
            details: ['Увеличивает базовый физический урон', 'Повышает грузоподъемность персонажа', 'Улучшает эффективность блокирования ударов']
        },
        'Живучесть': {
            impact: 'Базовый показатель выживаемости и физического состояния.',
            details: ['Увеличивает максимальный запас здоровья', 'Повышает скорость регенерации вне боя', 'Дает бонус к сопротивлению ядам и кровотечению']
        },
        'Интеллект': {
            impact: 'Влияет на ментальные способности и владение магией.',
            details: ['Увеличивает запас маны и магический урон', 'Ускоряет скорость восстановления маны', 'Открывает доступ к более сложным заклинаниям']
        },
        'Восприятие': {
            impact: 'Способность замечать детали и точность движений.',
            details: ['Повышает точность стрельбы из дальнобойного оружия', 'Позволяет находить скрытые предметы', 'Увеличивает шанс критического попадания']
        },
        'Ловкость': {
            impact: 'Отвечает за скорость реакции и общую подвижность.',
            details: ['Увеличивает шанс уклонения от атак', 'Повышает скорость атаки', 'Улучшает маневренность при перемещении']
        },
        'Дух': {
            impact: 'Сила воли и внутренняя стойкость персонажа.',
            details: ['Повышает сопротивление к эффектам контроля', 'Увеличивает точность применения магических навыков', 'Улучшает ауры и пассивные эффекты']
        }
    };

    // 2. Ссылки на элементы
    const modal3 = document.getElementById('stat-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImpact = document.getElementById('modal-impact');
    const modalDetails = document.getElementById('modal-details');
    const closeBtn3 = document.querySelector('.close-btn');

    function openModal3(name) {
        const data = statData[name];
        if (!data) return;
        modalTitle.innerText = name;
        modalImpact.innerText = data.impact;

        modalDetails.innerHTML = '';
        data.details.forEach(item => {
            const li = document.createElement('li');
            li.innerText = item;
            modalDetails.appendChild(li);
        });
        modal3.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal3() {
        modal3.classList.remove('active');
        document.body.style.overflow = '';
    }
    document.querySelectorAll('.ring-item').forEach(item => {
        item.addEventListener('click', () => {
            const name = item.getAttribute('data-title');
            openModal3(name);
        });
    });
    if (closeBtn3) {
        closeBtn3.addEventListener('click', closeModal3);
    }
    window.addEventListener('click', (e) => {
        if (e.target === modal3) {
            closeModal3();
        }
    });
});