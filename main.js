import 'vanilla-tilt';

//* Card Animation
VanillaTilt.init(document.querySelectorAll('.skills__card'), {
  max: 25,
  speed: 400,
  scale: 1.1,
  glare: true,
  'max-glare': 0.8,
});

VanillaTilt.init(document.querySelectorAll('.works__card'), {
  max: 25,
  speed: 400,
  scale: 1.1,
  glare: true,
  'max-glare': 0.5,
});

//* Observing current position of window and applying section animations
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

const contactContainer = document.querySelector('.section__contact-container');
const contactObserver = new IntersectionObserver(
  (entries, observer) => {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section__hidden');
    document
      .querySelector('.contact__form')
      .classList.add('contact__button-show-line');
    document
      .querySelector('.contact__social-links')
      .classList.add('contact__show-socials');
    document
      .querySelector('.contact__social-line')
      .classList.add('contact__show-social-line');
    observer.unobserve(entry.target);
  },
  {
    root: null,
    threshold: 0.17,
  }
);
contactObserver.observe(contactContainer);
contactContainer.classList.add('section__hidden');

//* Observing the size of the body element and performing some operations
const bodyObserver = new ResizeObserver(entries => {
  // const aboutTitle = document.querySelector('.about__title');
  // const bodyObj = entries[0];
  // if (bodyObj.contentRect.width >= 468) {
  //   aboutTitle.innerHTML =
  //     'A LITTLE BIT ABOUT <div class="about__me cursor-hover">ME</div>';
  // } else if (bodyObj.contentRect.width < 468) {
  //   aboutTitle.innerHTML = 'ABOUT <div class="about__me cursor-hover">ME</div>';
  // }
});

bodyObserver.observe(document.body);

//* Cursor
const mouseCursor = document.querySelector('.cursor');
const mouseHoverEl = document.querySelectorAll('.cursor-hover');

window.addEventListener('mousemove', e => {
  mouseCursor.style.top = e.clientY + 'px';
  mouseCursor.style.left = e.clientX + 'px';
});

mouseHoverEl.forEach(el => {
  el.addEventListener('mouseover', () => {
    mouseCursor.classList.add('hover');
  });

  el.addEventListener('mouseleave', () => {
    mouseCursor.classList.remove('hover');
  });
});
