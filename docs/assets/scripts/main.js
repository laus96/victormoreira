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
    { id: 'navbar', url: '/assets/components/navbar.html', callback: initNavbar, },
    { id: 'footer', url: '/assets/components/footer.html', callback: initFooter },
    { id: 'hero', url: '/assets/sections/landing/hero.html' },
    { id: 'services', url: '/assets/sections/landing/services.html' },
    { id: 'demos', url: '/assets/sections/landing/demos.html', callback: initDemos },
    { id: 'contact', url: '/assets/sections/landing/contact.html', callback: initContact },
  ].forEach(c => loadComponent(c.id, c.url, c.callback));
});
