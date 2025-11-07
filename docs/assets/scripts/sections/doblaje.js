$(function () {

  [
    { id: 'navbar', url: '/victormoreira/assets/components/navbar.html', callback: initNavbar },
    { id: 'footer', url: '/victormoreira/assets/components/footer.html', callback: initFooter },
    { id: 'hero', url: '/victormoreira/assets/sections/doblaje/hero-sub.html' },
    { id: 'demos', url: '/victormoreira/assets/sections/doblaje/demos-sub.html', callback: initPortfolio  },
    { id: 'services', url: '/victormoreira/assets/sections/doblaje/services-sub.html' }, 
  ].forEach(c => loadComponent(c.id, c.url, c.callback));
});

document.addEventListener('DOMContentLoaded', () => {
    setActiveNavbarButton("nav-doblaje");
});
