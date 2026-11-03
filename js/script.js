const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Открыть меню' : 'Закрыть меню');
  navigation.classList.toggle('open', !open);
});

navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Открыть меню');
}));

document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelector('.filter.active')?.classList.remove('active');
  button.classList.add('active');
  const kind = button.dataset.filter;
  document.querySelectorAll('.work-grid figure').forEach(item => {
    item.classList.toggle('hidden', kind !== 'all' && item.dataset.kind !== kind);
  });
}));

const dialog = document.querySelector('#booking-dialog');
const bookingForm = document.querySelector('#booking-form');
const bookingSuccess = document.querySelector('#booking-success');
let bookingHideTimer;

document.querySelector('#booking-open').addEventListener('click', () => {
  clearTimeout(bookingHideTimer);
  bookingForm.hidden = false;
  bookingSuccess.hidden = true;
  bookingForm.reset();
  dialog.showModal();
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});

bookingForm.addEventListener('submit', event => {
  event.preventDefault();
  clearTimeout(bookingHideTimer);
  bookingSuccess.hidden = false;
  bookingHideTimer = setTimeout(() => {
    document.querySelectorAll('form').forEach(form => {
      form.hidden = true;
    });
    if (dialog.open) dialog.close();
  }, 2000);
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.section-heading, .service-card, .work-grid figure, .master, .price-item, .contact-content').forEach(item => {
  item.classList.add('reveal');
  revealObserver.observe(item);
});
