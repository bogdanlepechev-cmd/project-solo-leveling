import { hunters } from '../json/characters.js';

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('char-modal');
    const closeBtn = document.querySelector('.close-btn');
    const grid = document.getElementById('cards-grid');

    window.openModal = (name, img, guild, age, status, loc, contact, bio) => {
        document.getElementById('modal-title').innerText = name;
        document.getElementById('modal-img').src = img;
        document.getElementById('modal-guild').innerText = guild;
        document.getElementById('modal-age').innerText = age;
        document.getElementById('modal-status').innerText = status;
        document.getElementById('modal-loc').innerText = loc;
        document.getElementById('modal-contact').innerText = contact;
        document.getElementById('modal-bio').innerText = bio;

        modal.style.display = "flex";
    };

    if (closeBtn) {
        closeBtn.onclick = () => { modal.style.display = "none"; };
    }

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
    window.renderCards = (data = hunters) => {
        if (!grid) return;
        grid.innerHTML = '';
        data.forEach(h => {
            const card = document.createElement('div');
            card.className = 'char-card';
            card.innerHTML = `
                <div class="char-rank rank-${h.rank.toLowerCase()}">${h.rank}</div>
                <img src="${h.img}" alt="${h.name}">
                <h3 class="ranked-${h.rank.toLowerCase()}">${h.name}</h3>
                <p>Класс: ${h.rank === 'S' ? 'Элита' : 'Охотник'}</p>
            `;
            card.onclick = () => openModal(h.name, h.img, h.guild, h.age, h.status, h.loc, h.contact, h.bio);
            grid.appendChild(card);
        });
    }
    let currentRank = 'All';
    let currentGender = 'All';

    function applyFilters() {
        let filtered = hunters;
        if (currentRank !== 'All') filtered = filtered.filter(h => h.rank === currentRank);
        if (currentGender !== 'All') filtered = filtered.filter(h => h.gender === currentGender);
        renderCards(filtered);
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentRank = e.target.getAttribute('data-rank');
            applyFilters();
        });
    });

    document.querySelectorAll('.gender-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentGender = e.target.getAttribute('data-gender');
            applyFilters();
        });
    });

    renderCards();

    const modal2 = document.getElementById('download-modal');
    const btn2 = document.getElementById('play-btn');
    const footerBtn = document.getElementById('download-footer-btn');
    const close2 = document.querySelector('.close-btn2');
    function openDownloadModal() {
        if (modal2) {
            modal2.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }
    function closeModal() {
        if (modal2) {
            modal2.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    [btn2, footerBtn].forEach(btn => {
        if (!btn) return;
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openDownloadModal();
        });
    });
    if (close2) {
        close2.addEventListener('click', closeModal);
    }
    window.addEventListener('click', (e) => {
        if (e.target === modal2) {
            closeModal();
        }
    });
});

document.querySelectorAll(".faq-question").forEach(btn => {
    btn.addEventListener("click", () => {
        const item = btn.parentElement;
        document.querySelectorAll(".faq-item").forEach(el => {
            if (el !== item) {
                el.classList.remove("active");
            }
        });
        item.classList.toggle("active");
    });
});

const track = document.querySelector(".slider-track");
if (track) {
    const images = [...track.querySelectorAll("img")];
    let index = 0;
    function slide() {
        index++;
        if (index > images.length - 3) {
            index = 0;
        }
        track.style.transform = `translateX(${-index * 445}px)`;
    }
    setInterval(slide, 3500);
    document.querySelector(".next").onclick = slide;
    document.querySelector(".prev").onclick = () => {
        index--;
        if (index < 0) {
            index = images.length - 3;
        }
        track.style.transform = `translateX(${-index * 445}px)`;
    };
    const lightbox = document.querySelector(".lightbox");
    const lightboxImg = document.querySelector(".lightbox-img");
    images.forEach(img => {
        img.onclick = () => {
            lightbox.style.display = "flex";
            lightboxImg.src = img.src;
            document.body.style.overflow = "hidden";
        };
    });
    document.querySelector(".close-lightbox").onclick = () => {
        lightbox.style.display = "none";
        document.body.style.overflow = "";
    };
    lightbox.onclick = e => {
        if (e.target === lightbox)
            lightbox.style.display = "none";
        document.body.style.overflow = "";
    };
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: .2
});

document.querySelectorAll(".hidden").forEach(el => observer.observe(el));
const news = document.querySelectorAll(".news-card");
const newsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            news.forEach((card, i) => {
                setTimeout(() => {
                    card.classList.add("animate");
                }, i * 250);
            });
        }
    });
});

const section = document.querySelector(".news-section");
if (section)
    newsObserver.observe(section);