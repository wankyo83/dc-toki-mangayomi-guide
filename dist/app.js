const toast = document.querySelector('.toast');
let toastTimer;

const weekdayCards = [
  ['sunday', '일요일'],
  ['monday', '월요일'],
  ['tuesday', '화요일'],
  ['wednesday', '수요일'],
  ['thursday', '목요일'],
  ['friday', '금요일'],
  ['saturday', '토요일'],
];
const currentWeekday = weekdayCards[new Date().getDay()];
const currentWeekdayCard = document.getElementById('current-weekday-card');
const currentWeekdayLabel = document.getElementById('current-weekday-label');
if (currentWeekdayCard && currentWeekdayLabel) {
  currentWeekdayCard.src = `https://dc-toki-mangayomi-media.pages.dev/card/weekday-${currentWeekday[0]}.gif`;
  currentWeekdayCard.alt = `현재 ${currentWeekday[1]} 기본 요일 목록 카드`;
  currentWeekdayLabel.textContent = `현재 ${currentWeekday[1]} 기본 요일 목록 카드`;
}

function showToast(message = '복사했습니다.') {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}

async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value);
    showToast();
  } catch {
    const input = document.createElement('textarea');
    input.value = value;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    input.remove();
    showToast();
  }
}

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', () => copyText(button.dataset.copy));
});

document.querySelectorAll('[data-copy-target]').forEach((button) => {
  button.addEventListener('click', () => {
    const target = document.getElementById(button.dataset.copyTarget);
    copyText(target.innerText);
  });
});

document.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach((item) => {
      item.classList.toggle('active', item === tab);
      item.setAttribute('aria-selected', String(item === tab));
    });
    document.querySelectorAll('.code-panel').forEach((panel) => {
      panel.classList.toggle('active', panel.dataset.panel === tab.dataset.tab);
    });
  });
});

const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('.mobile-nav');
menuButton.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
function closeLightbox() { lightbox.classList.remove('open'); }
document.querySelectorAll('[data-lightbox]').forEach((button) => button.addEventListener('click', () => {
  lightboxImage.src = button.dataset.lightbox;
  lightbox.classList.add('open');
}));
lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeLightbox(); });
