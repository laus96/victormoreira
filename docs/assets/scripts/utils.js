const loadComponent = (id, url, callback) => {
  $('#' + id).load(url, () => {
    lucide.createIcons();
    if (callback) callback();
  });
};

const initDemos = () => {
  const tabs = document.querySelectorAll(".tab");
  const cards = document.querySelectorAll(".demo-card");
  const grid = document.querySelector('.demos__grid');
  let players = [];

  document.querySelectorAll('.video-placeholder').forEach(placeholder => {
    placeholder.addEventListener('click', () => {
      const videoId = placeholder.dataset.videoId;
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&showinfo=0`;
      iframe.allow = "autoplay; fullscreen";
      iframe.setAttribute('loading', 'lazy');
      iframe.classList.add('plyr-player');

      placeholder.replaceWith(iframe);

      const player = new Plyr(iframe, {
        controls: ['play', 'progress', 'mute', 'volume', 'fullscreen'],
        disableContextMenu: true
      });
      players.push(player);

      player.on('play', () => {
        players.forEach(p => { if (p !== player) p.pause(); });
      });
    });
  });

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const category = tab.dataset.tab;
      cards.forEach(card => {
        card.style.display = (category === "all" || card.dataset.category === category) ? "block" : "none";
      });

      players.forEach(p => p.pause());

      const visibleCards = Array.from(cards).filter(c => c.style.display !== 'none');
      grid.classList.remove('single-demo', 'two-demos');
      if (visibleCards.length === 1) grid.classList.add('single-demo');
      else grid.classList.add('two-demos');
    });
  });

  const visibleCards = Array.from(cards).filter(c => c.style.display !== 'none');
  grid.classList.remove('single-demo', 'two-demos');
  if (visibleCards.length === 1) grid.classList.add('single-demo');
  else grid.classList.add('two-demos');
};

const initNavbar = () => {
  const $toggle = $('.navbar__toggle');
  const $links = $('.navbar__links');
  $toggle.off('click');
  $links.find('a').off('click');
  $(document).off('click.navbarOutside');
  $(window).off('resize.navbarResize');

  $links.attr('data-collapsed', 'true');

  const toggleNavbar = () => {
    const isOpen = $links.hasClass('navbar__links--active');
    $toggle.toggleClass('navbar__toggle--open', !isOpen);
    $links.toggleClass('navbar__links--active', !isOpen)
      .attr('data-collapsed', isOpen ? 'true' : null);
  };

  $toggle.on('click', e => { e.preventDefault(); toggleNavbar(); });
  $links.on('click', 'a', () => { if ($(window).width() <= 768) toggleNavbar(); });
  $(document).on('click.navbarOutside', e => {
    if (
      !$toggle.is(e.target) &&
      $toggle.has(e.target).length === 0 &&
      !$links.is(e.target) &&
      $links.has(e.target).length === 0 &&
      $links.hasClass('navbar__links--active')
    ) toggleNavbar();
  });
  $(window).on('resize.navbarResize', () => {
    if ($(window).width() > 768 && $links.hasClass('navbar__links--active')) toggleNavbar();
  });

  const logo = document.getElementById("headerLogo");
  if (logo) {
    logo.addEventListener("click", () => {
      window.location.href = "/victor-doblaje/";
    });
  }
};

const setActiveNavbarButton = (buttonId) => {
  const buttons = document.querySelectorAll('.navbar__links .button--nav');
  buttons.forEach(btn => btn.classList.remove('active'));

  const activeBtn = document.getElementById(buttonId);
  if (activeBtn) activeBtn.classList.add('active');
};

const initCopyEmail = (scopeSelector = 'body') => {
  const emailLinks = document.querySelectorAll(`${scopeSelector} .email-text`);
  if (emailLinks.length === 0) return;

  let modal = document.getElementById('copy-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'copy-modal';
    modal.textContent = 'Email copiado al portapapeles';
    document.body.appendChild(modal);
  }

  emailLinks.forEach(emailLink => {
    if (emailLink.dataset.copyListener) return;
    emailLink.dataset.copyListener = "true";

    emailLink.addEventListener('click', () => {
      navigator.clipboard.writeText(emailLink.textContent.trim())
        .then(() => {
          const rect = emailLink.getBoundingClientRect();

          modal.style.top = `${rect.bottom + 6}px`;
          modal.style.left = `${rect.left + rect.width / 2}px`;
          modal.style.transform = 'translateX(-50%)';
          modal.style.opacity = 1;
          modal.style.pointerEvents = 'auto';
          modal.classList.add('show');

          const hideModal = () => {
            modal.style.opacity = 0;
            modal.style.pointerEvents = 'none';
            modal.classList.remove('show');
            window.removeEventListener('scroll', hideModal);
            clearTimeout(timeoutId);
          };

          const timeoutId = setTimeout(hideModal, 3000);
          window.addEventListener('scroll', hideModal, { once: true });
        })
        .catch(err => console.error('Error copiando email: ', err));
    });
  });
};

const initFooter = () => {
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  initCopyEmail('#footer');
};

const initContact = () => {
  initCopyEmail('#contact');
};

const initLegal = () => {
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  initCopyEmail('#legal');
};

function initMediaElements(API_BASE) {
  const mediaEls = document.querySelectorAll('.demo-media');
  const players = {};

  mediaEls.forEach(el => {
    const id = el.dataset.mediaId;
    const type = el.dataset.type;
    const apiUrl = type === 'audio'
      ? `${API_BASE}/api/get-audio?id=${id}`
      : `${API_BASE}/api/get-video?id=${id}`;

    fetch(apiUrl, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        el.src = `${API_BASE}${data.url}`;
        const features = type === 'audio'
          ? ['playpause', 'progress', 'current', 'duration', 'volume']
          : ['playpause', 'progress', 'current', 'duration', 'volume', 'fullscreen'];

        const player = new MediaElementPlayer(el, {
          features,
          startVolume: 0.9,
          alwaysShowControls: true,
          success: function (media) {
            setupMediaUI(el, media, type, players);
          }
        });

        players[id] = player;
      })
      .catch(err => console.error(`Error cargando ${type} ${id}:`, err));
  });

  return players;
}

function setupMediaUI(el, media, type, players) {
  const wrapper = el.closest('.demo-thumb-wrapper');
  const card = el.closest('.demo-card');
  const playBtn = card.querySelector('.demo-play-button');

  playBtn.classList.add('paused');

  if (type === 'audio') {
    const img = document.createElement('img');
    img.src = el.getAttribute('poster');
    img.classList.add('demo-thumb', 'audio-thumb');
    el.parentNode.insertBefore(img, el);
  }

  playBtn.addEventListener('click', e => {
    e.stopPropagation();
    if (media.paused) media.play();
    else media.pause();
  });

  media.addEventListener('play', () => {
    playBtn.classList.remove('paused');
    playBtn.classList.add('playing');
    Object.values(players).forEach(p => { if (p !== media) p.pause(); });
    if (type === 'video') {
      const thumb = wrapper.querySelector('.demo-thumb');
      if (thumb) thumb.style.display = 'none';
    }
  });

  media.addEventListener('pause', () => {
    playBtn.classList.remove('playing');
    playBtn.classList.add('paused');
    if (type === 'video') {
      const thumb = wrapper.querySelector('.demo-thumb');
      if (thumb) thumb.style.display = 'block';
    }
  });
}

function scrollToAccordionById(id) {
  const navbar = document.querySelector('.navbar');
  const navbarHeight = navbar ? navbar.offsetHeight : 0;
  const offset = 10; 

  const el = document.getElementById(id);
  if (!el) return;

  window.scrollTo({
    top: el.offsetTop - navbarHeight - offset,
    behavior: 'smooth'
  });
}
const initTabsAndAccordion = () => {
  const $accordions = $('.accordion-item');

  $accordions.each(function () {
    const $body = $(this).find('.accordion-body');
    $(this).addClass('active');
    $body.css('max-height', $body[0].scrollHeight + 'px');
  });

  $('.accordion-header').off('click').on('click', function () {
    const $item = $(this).closest('.accordion-item');
    const $body = $item.find('.accordion-body');

    $item.toggleClass('active');

    if ($item.hasClass('active')) {
      $body.css('max-height', $body[0].scrollHeight + 'px');
    } else {
      $body.css('max-height', 0);
    }
  });

  $('.tab').off('click').on('click', function () {
    const category = $(this).data('tab');

    $('.tab').removeClass('active');
    $(this).addClass('active');

    $accordions.each(function () {
      const $item = $(this);
      const $body = $item.find('.accordion-body');
      const cat = $item.data('category');

      if (category === 'all' || category === cat) {
        $item.show();
        $item.addClass('active');
        $body.css('max-height', $body[0].scrollHeight + 'px');
      } else {
        $item.hide();
        $item.removeClass('active');
        $body.css('max-height', 0);
      }
    });
  });
};
function initMediaElementsLocal() {
  const mediaEls = document.querySelectorAll('.demo-media');
  const players = {};

  mediaEls.forEach(el => {
    const type = el.tagName.toLowerCase(); // 'audio' o 'video'
    const id = el.id || Math.random().toString(36).substring(2, 9);

    const features = type === 'audio'
      ? ['playpause', 'progress', 'current', 'duration', 'volume']
      : ['playpause', 'progress', 'current', 'duration', 'volume', 'fullscreen'];

    const player = new MediaElementPlayer(el, {
      features,
      startVolume: 0.9,
      stretching: 'responsive',
      classPrefix: 'mejs__',
      success: function (media) {
        setTimeout(() => {
          if (typeof setupMediaUI === 'function') {
            setupMediaUI(el, media, type, players);
          } else {
            console.warn('⚠️ setupMediaUI no está definido todavía');
          }
        }, 0);
      }
    });

    players[id] = player;
  });

  return players;
}
function initPortfolio() {
  const API_BASE = "https://victormoreira.onrender.com";

  const players = initMediaElementsLocal();
  initTabsAndAccordion();
}