import { hunters } from '../json/characters.js';

const summonBtn = document.getElementById('summonBtn');
const progressFill = document.getElementById('progressFill');
const progressPercent = document.getElementById('progressPercent');
const statusTitle = document.getElementById('statusTitle');
const statusSubtitle = document.getElementById('statusSubtitle');
const cardShirt = document.getElementById('cardShirt');
const cardWrapper = document.getElementById('cardWrapper');
const characterCard = document.getElementById('characterCard');
const charImage = document.getElementById('charImage');
const charRank = document.getElementById('charRank');
const charName = document.getElementById('charName');
const manaCountEl = document.getElementById('manaCount');
const collectionSlots = document.getElementById('collectionSlots');

const viewAllBtn = document.querySelector('.view-all');
const collectionModal = document.getElementById('collectionModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const collectionGallery = document.getElementById('collectionGallery');

const charModal = document.getElementById('char-modal');
const closeCharModalBtn = document.getElementById('closeCharModalBtn');

const navbar = document.querySelector('.navbar');

let mana = parseInt(localStorage.getItem('gacha_mana')) || 1250;
let collection = JSON.parse(localStorage.getItem('gacha_collection')) || [];

updateManaDisplay();
renderCollection();

summonBtn.addEventListener('click', startSummonProcess);

function startSummonProcess() {
    if (mana < 50) {
        alert("Недостаточно маны! Кристаллы восстановлены Системой.");
        mana = 500;
        updateManaDisplay();
        return;
    }

    const availableHunters = hunters.filter(h => !collection.some(item => item.name === h.name));
    if (availableHunters.length === 0) {
        alert("[СИСТЕМА] Все доступные солдаты тени уже призваны в вашу коллекцию!");
        return;
    }

    mana -= 50;
    updateManaDisplay();
    summonBtn.disabled = true;
    cardWrapper.classList.remove('show');
    cardShirt.style.opacity = '1';
    cardShirt.style.transform = 'scale(1)';

    statusTitle.textContent = 'ОТКРЫТИЕ ВРАТ ПРИЗЫВА';
    statusSubtitle.textContent = '[СИСТЕМА]РЕЗОНАНС С МАНОЙ...';

    executeRouletteSummon(availableHunters);
}

function executeRouletteSummon(availableHunters) {
    let rouletteContainer = document.getElementById('rouletteContainer');
    if (!rouletteContainer) {
        rouletteContainer = document.createElement('div');
        rouletteContainer.id = 'rouletteContainer';
        progressFill.parentElement.replaceWith(rouletteContainer);
    }

    rouletteContainer.innerHTML = '';
    const track = document.createElement('div');
    track.className = 'roulette-track';
    rouletteContainer.appendChild(track);

    const rolledHunter = rollHunter(availableHunters);
    const totalCards = 30;
    const targetIndex = 25;

    for (let i = 0; i < totalCards; i++) {
        let hunterSample;
        if (i === targetIndex) {
            hunterSample = rolledHunter;
        } else {
            hunterSample = hunters[Math.floor(Math.random() * hunters.length)];
        }

        const item = document.createElement('div');
        item.className = `roulette-item Rank-${hunterSample.rank}`;
        item.innerHTML = `<img src="${hunterSample.img}" alt="${hunterSample.name}">`;
        track.appendChild(item);
    }

    setTimeout(() => {
        const cardWidth = 90;
        const cardMargin = 10;
        const step = cardWidth + cardMargin;

        const containerWidth = rouletteContainer.offsetWidth;
        const targetPosition = (targetIndex * step) + (step / 2) - (containerWidth / 2);

        track.style.transform = `translateX(-${targetPosition}px)`;
    }, 100);

    setTimeout(() => {
        statusTitle.textContent = 'ПРИЗЫВ ЗАВЕРШЕН';
        statusSubtitle.textContent = `[СИСТЕМА] ВЫСОКИЙ СИГНАЛ МАНИФЕСТАЦИИ`;

        charImage.src = rolledHunter.img;
        charName.textContent = rolledHunter.name;
        charRank.textContent = `${rolledHunter.rank}-RANK`;
        characterCard.className = 'character-card';
        characterCard.classList.add(`Rank-${rolledHunter.rank}`);

        addToCollection(rolledHunter);

        setTimeout(() => {
            cardShirt.style.opacity = '0';
            cardShirt.style.transform = 'scale(0) rotateY(180deg)';
            setTimeout(() => {
                cardWrapper.classList.add('show');
                summonBtn.disabled = false;
            }, 150);
        }, 400);

    }, 5100);
}

function rollHunter(availableHunters) {
    const rand = Math.random() * 100;
    let targetRank = "D";

    if (rand < 3) targetRank = "S";
    else if (rand < 15) targetRank = "A";
    else if (rand < 45) targetRank = "B";
    else if (rand < 80) targetRank = "C";
    else targetRank = "D";

    let candidates = availableHunters.filter(h => h.rank === targetRank);
    if (candidates.length === 0) {
        candidates = availableHunters;
    }

    const randomIndex = Math.floor(Math.random() * candidates.length);
    return candidates[randomIndex];
}

function updateManaDisplay() {
    manaCountEl.textContent = mana;
    localStorage.setItem('gacha_mana', mana);
}

function addToCollection(hunter) {
    if (!collection.some(item => item.name === hunter.name)) {
        collection.unshift(hunter);
        localStorage.setItem('gacha_collection', JSON.stringify(collection));
        renderCollection();
    }
}

function renderCollection() {
    collectionSlots.innerHTML = '';
    if (collection.length === 0) {
        collectionSlots.innerHTML = '<div class="empty-slot-msg">Коллекция пуста</div>';
        return;
    }

    const previewList = collection.slice(0, 9);

    previewList.forEach(hunter => {
        const avatar = document.createElement('div');
        avatar.className = 'collection-avatar';
        avatar.title = `${hunter.name} (${hunter.rank}-Rank)`;
        avatar.style.cursor = 'pointer';
        avatar.innerHTML = `
            <img src="${hunter.img}" alt="${hunter.name}">
            <span class="avatar-rank-badge badge-${hunter.rank}">${hunter.rank}</span>
        `;

        avatar.addEventListener('click', () => {
            openHunterDetails(hunter);
        });

        collectionSlots.appendChild(avatar);
    });
}

function enableFocusMode() {
    document.body.classList.add('no-scroll');
    if (navbar) {
        navbar.classList.add('navbar--hidden');
    }
}

function disableFocusMode() {
    const isGalleryOpen = collectionModal.classList.contains('active');
    const isDetailsOpen = charModal.style.display === 'flex';

    if (!isGalleryOpen && !isDetailsOpen) {
        document.body.classList.remove('no-scroll');
        if (navbar) {
            navbar.classList.remove('navbar--hidden');
        }
    }
}

viewAllBtn.addEventListener('click', () => {
    renderFullGallery();
    collectionModal.classList.add('active');
    enableFocusMode();
});

closeModalBtn.addEventListener('click', () => {
    collectionModal.classList.remove('active');
    disableFocusMode();
});

collectionModal.addEventListener('click', (e) => {
    if (e.target === collectionModal) {
        collectionModal.classList.remove('active');
        disableFocusMode();
    }
});

function renderFullGallery() {
    collectionGallery.innerHTML = '';
    if (collection.length === 0) {
        collectionGallery.innerHTML = `
            <div class="no-hunters-msg">
                [ОШИБКА] В РЕЕСТРЕ НЕТ ЗАПИСЕЙ.<br>Совершите хотя бы один призыв.
            </div>`;
        return;
    }

    collection.forEach(hunter => {
        const card = document.createElement('div');
        card.className = `gallery-card Rank-${hunter.rank}`;
        card.style.cursor = 'pointer';
        card.innerHTML = `
            <img src="${hunter.img}" alt="${hunter.name}">
            <div class="gallery-info">
                <span class="gallery-rank Rank-${hunter.rank}">${hunter.rank}-RANK</span>
                <div class="gallery-name">${hunter.name}</div>
            </div>
        `;

        card.addEventListener('click', () => {
            openHunterDetails(hunter);
        });

        collectionGallery.appendChild(card);
    });
}

function openHunterDetails(hunter) {
    document.getElementById('modal-title').innerText = hunter.name;
    document.getElementById('modal-img').src = hunter.img;
    document.getElementById('modal-guild').innerText = hunter.guild || 'Нет данных';
    document.getElementById('modal-age').innerText = hunter.age || 'Неизвестно';
    document.getElementById('modal-status').innerText = hunter.status || 'Активен';
    document.getElementById('modal-loc').innerText = hunter.loc || 'Неизвестно';
    document.getElementById('modal-contact').innerText = hunter.contact || 'Нет связей';
    document.getElementById('modal-bio').innerText = hunter.bio || 'Описание засекречено Системой.';

    charModal.style.display = "flex";
    enableFocusMode();
}

if (closeCharModalBtn) {
    closeCharModalBtn.onclick = () => {
        charModal.style.display = "none";
        disableFocusMode();
    };
}

window.addEventListener('click', (event) => {
    if (event.target === charModal) {
        charModal.style.display = "none";
        disableFocusMode();
    }
});