// Script para detectar y manejar errores de extensiones del navegador
(function() {
  'use strict';
  
  // Capturar errores no manejados
  window.addEventListener('error', function(event) {
    // Filtrar errores de extensiones del navegador
    if (event.filename && (
        event.filename.includes('content-scripts') ||
        event.filename.includes('extension') ||
        event.filename.includes('chrome-extension') ||
        event.filename.includes('moz-extension')
    )) {
      console.warn('Error de extensión del navegador detectado y filtrado:', event.message);
      event.preventDefault();
      return true;
    }
  });

  // Capturar promesas rechazadas
  window.addEventListener('unhandledrejection', function(event) {
    if (event.reason && event.reason.message && 
        event.reason.message.includes('Failed to parse selector')) {
      console.warn('Error de selector CSS de extensión detectado y filtrado:', event.reason.message);
      event.preventDefault();
      return true;
    }
  });

  console.log('Error handler para extensiones del navegador cargado');
})();
