import 'vanilla-tilt';

/**
 ** Tilt card animation
 */
(function () {
  VanillaTilt.init(document.querySelectorAll('.about__card'), {
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
})();

/**
 ** Observing current position of window and applying section animations
 */
(function () {
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

  // Animation for contact button line and social media icons
  const contactContainer = document.querySelector(
    '.section__contact-container'
  );
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

  // Active link change for navigation menu
  const sections = document.querySelectorAll('.section');
  const sectionsScrollObserver = new IntersectionObserver(
    entries => {
      const [entry] = entries;
      if (!entry.isIntersecting) return;
      document
        .querySelector('a[href="#' + entry.target.id + '"')
        .classList.add('active');
      ['header', 'about', 'works', 'skills', 'contact']
        .filter(el => el != entry.target.id)
        .forEach(el => {
          const element = document.querySelector('a[href="#' + el + '"]');
          if (element.classList.contains('active')) {
            element.classList.remove('active');
          }
        });
    },
    {
      root: null,
      threshold: 0.8,
      rootMargin: '20px',
    }
  );
  sections.forEach(section => {
    sectionsScrollObserver.observe(section);
  });

  // Active link for works section
  new IntersectionObserver(
    entries => {
      const [entry] = entries;
      if (!entry.isIntersecting) return;
      document.querySelector('a[href="#works"').classList.add('active');
      ['header', 'about', 'skills', 'contact']
        .filter(el => el != entry.target.id)
        .forEach(el => {
          const element = document.querySelector('a[href="#' + el + '"]');
          if (element.classList.contains('active')) {
            element.classList.remove('active');
          }
        });
    },
    {
      root: null,
      threshold: 0.5,
      rootMargin: '20px',
    }
  ).observe(document.querySelector('#works'));
})();

/**
 * *Custom cursor and cursor hover animations
 */
(function () {
  const mouseCursor = document.querySelector('.cursor');
  const mouseHoverEl = document.querySelectorAll('.cursor-hover');

  window.addEventListener('mousemove', e => {
    mouseCursor.style.left = e.clientX + 'px';
    mouseCursor.style.top = e.clientY + 'px';
  });

  // On hovering scale and fill cursor
  mouseHoverEl.forEach(el => {
    el.addEventListener('mouseover', () => {
      mouseCursor.classList.add('hover');
    });

    el.addEventListener('mouseleave', () => {
      mouseCursor.classList.remove('hover');
    });
  });

  // On hovering section title, show gifs
  document.querySelectorAll('.section__title-gif').forEach(el => {
    el.addEventListener('mousemove', e => {
      const gif = e.target.childNodes[1];
      gif.classList.add('show');
      gif.style.left = e.clientX + 25 + 'px';
      gif.style.top = e.clientY + 25 + 'px';
    });
    el.addEventListener('mouseleave', e => {
      const gif = e.target.childNodes[1];
      gif.classList.remove('show');
    });
  });
})();
