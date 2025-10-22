$(function () {
  [
    { id: 'navbar', url: '/victormoreira/assets/components/navbar.html', callback: initNavbar },
    { id: 'footer', url: '/victormoreira/assets/components/footer.html', callback: initFooter },
    { id: 'legal', url: '/victormoreira/assets/sections/aviso-legal/privacidad.html', callback: initLegal },
  ].forEach(c => loadComponent(c.id, c.url, c.callback));

});

/*
$(function () {
  [
    { id: 'navbar', url: '/victor-doblaje/components/navbar.html', callback: initNavbar },
    { id: 'footer', url: '/victor-doblaje/components/footer.html', callback: initFooter },
    { id: 'legal', url: '/victor-doblaje/sections/aviso-legal/privacidad.html', callback: initLegal },
  ].forEach(c => loadComponent(c.id, c.url, c.callback));

});
*/
