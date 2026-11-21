const menuToggle = document.getElementById('menuToggle');
const sideDrawer = document.getElementById('sideDrawer');
const closeDrawer = document.getElementById('closeDrawer');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const drawerLinks = document.querySelectorAll('.drawer-links a');

function openMenu() {
    sideDrawer.classList.add('open');
    sidebarOverlay.classList.add('show');
}

function closeMenu() {
    sideDrawer.classList.remove('open');
    sidebarOverlay.classList.remove('show');
}

menuToggle.addEventListener('click', openMenu);
closeDrawer.addEventListener('click', closeMenu);
sidebarOverlay.addEventListener('click', closeMenu);

drawerLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

const hoursTrigger = document.getElementById('hoursTrigger');
const hoursOverlay = document.getElementById('hoursOverlay');
const closeHoursModal = document.getElementById('closeHoursModal');

const todayIndex = new Date().getDay().toString();
document.querySelectorAll('#hoursList li').forEach(li => {
    if (li.getAttribute('data-day') === todayIndex) {
        li.classList.add('today');
    }
});

function openHoursModal() {
    hoursOverlay.classList.add('show');
}

function closeHoursModalFn() {
    hoursOverlay.classList.remove('show');
}

hoursTrigger.addEventListener('click', openHoursModal);
closeHoursModal.addEventListener('click', closeHoursModalFn);

hoursOverlay.addEventListener('click', (e) => {
    if (e.target === hoursOverlay) {
        closeHoursModalFn();
    }
});

const searchBox = document.getElementById('searchBox');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener('click', () => {
    searchBox.classList.toggle('active');
    if (searchBox.classList.contains('active')) {
        searchInput.focus();
    } else {
        searchInput.value = '';
        filterMenu('');
    }
});

searchInput.addEventListener('input', (e) => {
    filterMenu(e.target.value.toLowerCase().trim());
});

function filterMenu(query) {
    const allSections = document.querySelectorAll('.menu-section');

    allSections.forEach(section => {
        const cards = section.querySelectorAll('.food-card');
        let visibleCount = 0;

        cards.forEach(card => {
            const title = card.querySelector('h3')?.innerText.toLowerCase() || '';
            const desc = card.querySelector('p')?.innerText.toLowerCase() || '';
            const used = (card.getAttribute('data-used') || '').toLowerCase();

            if (title.includes(query) || desc.includes(query) || used.includes(query)) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        section.style.display = visibleCount > 0 ? 'block' : 'none';
    });
}

const catPills = document.querySelectorAll('.cat-pill');
const sections = document.querySelectorAll('.menu-section');
const scrollBtn = document.getElementById('scrollTopBtn');

catPills.forEach(pill => {
    pill.addEventListener('click', function () {
        catPills.forEach(p => p.classList.remove('active'));
        this.classList.add('active');
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollBtn.style.display = 'block';
    } else {
        scrollBtn.style.display = 'none';
    }

    let current = '';
    sections.forEach(section => {
        if (section.style.display !== 'none') {
            const sectionTop = section.offsetTop - 185;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        }
    });

    if (current) {
        catPills.forEach(pill => {
            pill.classList.remove('active');
            if (pill.getAttribute('href') === `#${current}`) {
                pill.classList.add('active');
                pill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        });
    }
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

const miniDetailWindow = document.getElementById('miniDetailWindow');
const closeMiniWindow = document.getElementById('closeMiniWindow');
const miniImg = document.getElementById('miniImg');
const miniTitle = document.getElementById('miniTitle');
const miniDesc = document.getElementById('miniDesc');
const miniPrice = document.getElementById('miniPrice');
const miniTime = document.getElementById('miniTime');
const miniUsed = document.getElementById('miniUsed');

document.querySelectorAll('.food-card').forEach(card => {
    card.addEventListener('click', (e) => {
        e.stopPropagation();

        const imgEl = card.querySelector('.card-img img');
        const titleEl = card.querySelector('h3');
        const descEl = card.querySelector('p');
        const priceEl = card.querySelector('.price');

        if (imgEl && imgEl.getAttribute('src')) {
            miniImg.src = imgEl.getAttribute('src');
            miniImg.alt = titleEl ? titleEl.innerText : 'Item';
            miniImg.parentElement.style.display = 'block';
        } else {
            miniImg.parentElement.style.display = 'none';
        }

        miniTitle.innerText = titleEl ? titleEl.innerText : '';
        miniDesc.innerText = descEl ? descEl.innerText : '';
        miniPrice.innerText = priceEl ? priceEl.innerText : '';

        miniTime.innerText = card.getAttribute('data-time') || '15 - 25 mins (Freshly prepared)';
        miniUsed.innerText = card.getAttribute('data-used') || (descEl ? descEl.innerText : 'Fresh quality ingredients');

        miniDetailWindow.classList.remove('open');
        void miniDetailWindow.offsetWidth;
        miniDetailWindow.classList.add('open');
    });
});

closeMiniWindow.addEventListener('click', () => {
    miniDetailWindow.classList.remove('open');
});

document.addEventListener('click', (e) => {
    if (
        miniDetailWindow.classList.contains('open') &&
        !miniDetailWindow.contains(e.target) &&
        !e.target.closest('.food-card')
    ) {
        miniDetailWindow.classList.remove('open');
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        miniDetailWindow.classList.remove('open');
        closeHoursModalFn();
        closeMenu();
    }
});