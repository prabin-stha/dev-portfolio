import 'vanilla-tilt';
import SmoothScrollbar from 'smooth-scrollbar';

//* Card Animation
VanillaTilt.init(document.querySelectorAll('.skills__card'), {
  max: 25,
  speed: 400,
  scale: 1.1,
  glare: true,
  'max-glare': 0.8,
});

//* Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document
      .querySelector(this.getAttribute('href'))
      .scrollIntoView({ behavior: 'auto' });
  });
});

//* Momentum Page Scrollbar
SmoothScrollbar.init(document.querySelector('main'));

//* Section Page Animations
const sectionContainer = document.querySelectorAll('.section__container');
const sectionObserver = new IntersectionObserver(
  (entries, observer) => {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section__hidden');
    observer.unobserve(entry.target);
  },
  {
    root: null,
    threshold: 0.17,
  }
);
sectionContainer.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section__hidden');
});
