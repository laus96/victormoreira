$(function () {
  [
    { id: 'navbar', url: '/assets/components/navbar.html', callback: initNavbar },
    { id: 'footer', url: '/assets/components/footer.html', callback: initFooter },
    { id: 'legal', url: '/assets/sections/aviso-legal/cookies.html', callback: initLegal },
  ].forEach(c => loadComponent(c.id, c.url, c.callback));

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