$(function () {
  [
    { id: 'navbar', url: '/victoremoreira/assets/components/navbar.html', callback: initNavbar },
    { id: 'footer', url: '/victoremoreira/assets/components/footer.html', callback: initFooter },
    { id: 'legal', url: '/victoremoreira/assets/sections/aviso-legal/privacidad.html', callback: initLegal },
  ].forEach(c => loadComponent(c.id, c.url, c.callback));

});
