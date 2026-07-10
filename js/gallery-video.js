const titleElement = document.getElementById('series-title');
const player = document.getElementById('main-player');
const seasonSelect = document.getElementById('season-select');
const episodesGrid = document.querySelector('.episodes-grid');

let seasonsData = {};
let currentIndex = 0;
async function fetchEpisodes() {
    const response = await fetch('../json/series.json');
    seasonsData = await response.json();
    loadSeason("1");
}

function loadSeason(seasonId) {
    episodesGrid.innerHTML = '';
    const episodes = seasonsData[seasonId] || [];

    episodes.forEach((ep, index) => {
        const btn = document.createElement('button');
        btn.className = 'ep-btn';
        btn.textContent = ep.title;
        btn.dataset.url = ep.url;
        btn.dataset.fullTitle = ep.fullTitle;

        btn.addEventListener('click', function () {
            player.src = this.dataset.url;
            titleElement.textContent = this.dataset.fullTitle;
            document.querySelectorAll('.ep-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentIndex = index;
        });

        episodesGrid.appendChild(btn);
    });

    if (episodes.length > 0) {
        episodesGrid.firstChild.click();
    }
}

seasonSelect.addEventListener('change', (e) => loadSeason(e.target.value));

// Инициализация
fetchEpisodes();

let currentSeason = "1";

const prevBtn = document.getElementById('prev-ep');
const nextBtn = document.getElementById('next-ep');
function setActiveEpisode(index) {
    const buttons = document.querySelectorAll('.ep-btn');
    if (index >= 0 && index < buttons.length) {
        buttons[index].click();
        currentIndex = index;
    }
}
prevBtn.addEventListener('click', () => setActiveEpisode(currentIndex - 1));
nextBtn.addEventListener('click', () => setActiveEpisode(currentIndex + 1));