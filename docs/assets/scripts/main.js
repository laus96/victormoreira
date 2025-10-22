/*$(function () {
  [
    { id: 'navbar', url: '/victor-doblaje/components/navbar.html', callback: initNavbar },
    { id: 'footer', url: '/victor-doblaje/components/footer.html', callback: initFooter },
    { id: 'hero', url: '/victor-doblaje/sections/landing/hero.html' },
    { id: 'services', url: '/victor-doblaje/sections/landing/services.html' },
    { id: 'demos', url: '/victor-doblaje/sections/landing/demos.html', callback: initDemos },
    { id: 'contact', url: '/victor-doblaje/sections/landing/contact.html', callback: initContact },
  ].forEach(c => loadComponent(c.id, c.url, c.callback));
});
*/


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
