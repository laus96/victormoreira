$(function () {
  [
    { id: 'navbar', url: '/victormoreira/assets/components/navbar.html', callback: initNavbar },
    { id: 'footer', url: '/victormoreira/assets/components/footer.html', callback: initFooter },
    { id: 'legal', url: '/victormoreira/assets/sections/aviso-legal/cookies.html', callback: initLegal }, 
  ].forEach(c => loadComponent(c.id, c.url, c.callback));

});
