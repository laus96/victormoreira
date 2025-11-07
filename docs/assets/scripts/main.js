$(function () {
  [
    { id: 'navbar', url: '/victormoreira/assets/components/navbar.html', callback: initNavbar, },
    { id: 'footer', url: '/victormoreira/assets/components/footer.html', callback: initFooter },
    { id: 'hero', url: '/victormoreira/assets/sections/landing/hero.html' },
    { id: 'services', url: '/victormoreira/assets/sections/landing/services.html' },
    { id: 'demos', url: '/victormoreira/assets/sections/landing/demos.html', callback: initDemos },
    { id: 'contact', url: '/victormoreira/assets/sections/landing/contact.html', callback: initContact },
  ].forEach(c => loadComponent(c.id, c.url, c.callback));
});
