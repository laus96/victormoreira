$(function () {

  [
    { id: 'navbar', url: '/assets/components/navbar.html', callback: initNavbar },
    { id: 'footer', url: '/assets/components/footer.html', callback: initFooter },
    { id: 'hero', url: '/assets/sections/doblaje/hero-sub.html' },
    { id: 'demos', url: '/assets/sections/doblaje/demos-sub.html', callback: initPortfolio  },
    { id: 'services', url: '/assets/sections/doblaje/services-sub.html' },
  ].forEach(c => loadComponent(c.id, c.url, c.callback));
});

document.addEventListener('DOMContentLoaded', () => {
    setActiveNavbarButton("nav-doblaje");
});


/*
$(function () {
  [
    { id: 'navbar', url: '/victor-doblaje/components/navbar.html', callback: initNavbar },
    { id: 'footer', url: '/victor-doblaje/components/footer.html', callback: initFooter },
    { id: 'legal', url: '/victor-doblaje/sections/aviso-legal/cookies.html', callback: initLegal },
  ].forEach(c => loadComponent(c.id, c.url, c.callback));

});
*/