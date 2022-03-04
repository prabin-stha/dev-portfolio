import 'vanilla-tilt';

/**
 ** Tilt card animation for Desktop and Laptop
 *! ResizeObserver is observing width of 1200 so desktop falling less than that width will not have tilt effect, section title hover gif animation and custom cursor animation
 */
(function () {
  const bodyObserver = new ResizeObserver(entries => {
    const bodyObj = entries[0];

    if (bodyObj.contentRect.width >= 1200) {
      //* Tilt Animations
      VanillaTilt.init(document.querySelectorAll('.about__card'), {
        max: 25,
        speed: 400,
        scale: 1.1,
        glare: true,
        'max-glare': 0.3,
      });

      VanillaTilt.init(document.querySelectorAll('.about__quality'), {
        max: 25,
        speed: 400,
        scale: 1.1,
        glare: true,
        'max-glare': 0.1,
      });

      VanillaTilt.init(document.querySelectorAll('.works__card'), {
        max: 25,
        speed: 400,
        scale: 1.1,
        glare: true,
        'max-glare': 0.5,
      });

      //* Custom cursor and cursor hover animations
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
    }
  });
  bodyObserver.observe(document.body);
})();

/**
 ** Observing current position of window and applying section animations
 */
(function () {
  // Fade-in Animation for About and Contact Section
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

  // Fade-in and Contact Button Line Animation for Works Section
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
      observer.unobserve(entry.target);
    },
    {
      root: null,
      threshold: 0.17,
    }
  );
  contactObserver.observe(contactContainer);
  contactContainer.classList.add('section__hidden');
})();

/**
 **  Active Links Change on Windows Scroll
 */
(function () {
  // Active link Change for Home, About and Contact Section
  const sections = document.querySelectorAll('.section');
  const sectionsScrollObserver = new IntersectionObserver(
    entries => {
      const [entry] = entries;
      if (!entry.isIntersecting) return;
      document
        .querySelector('a[href="#' + entry.target.id + '"')
        .classList.add('active');
      ['header', 'about', 'works', 'contact']
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
      threshold: 0.7,
    }
  );
  sections.forEach(section => {
    sectionsScrollObserver.observe(section);
  });

  // Active link Change for Works Section
  const workSection = document.querySelector('#works');
  const workSectionScroll = new IntersectionObserver(
    entries => {
      const [entry] = entries;
      if (!entry.isIntersecting) return;
      document.querySelector('a[href="#works"').classList.add('active');
      ['header', 'about', 'contact']
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
      threshold: 0.7,
    }
  );
  workSectionScroll.observe(workSection);
})();

/**
 ** Function for Making Navigation Bar Sticky to the Footer
 */
(function () {
  const footer = document.querySelector('.footer');
  const footerObserver = new IntersectionObserver((entries, observer) => {
    if (!entries[0].isIntersecting) return;
    const nav = document.querySelector('.nav');
    observer.unobserve(entries[0].target);
    observer.observe(footer);
    entries[0].isIntersecting
      ? (nav.style.bottom = entries[0].intersectionRect.height + 8 + 'px')
      : (nav.style.bottom = 16 + 'px');
  });
  footerObserver.observe(footer);
})();
