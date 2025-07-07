# Errores de Extensiones del Navegador

## Error: `Failed to parse selector ":has-text()"`

### ¿Qué es este error?
Este error proviene de extensiones del navegador (como adblockers, extensiones de privacidad, etc.) que intentan usar selectores CSS no estándar. **NO es un error de tu aplicación Angular**.

### Extensiones comunes que causan este error:
- AdBlock Plus
- uBlock Origin
- Ghostery
- Privacy Badger
- DuckDuckGo Privacy Essentials

### Soluciones implementadas:
1. **Error Handler**: Se agregó un script que captura y filtra estos errores
2. **Content Security Policy**: Se configuró en el HTML para mayor seguridad
3. **Meta tags mejoradas**: Se añadieron para mejor compatibilidad

### Para usuarios finales:
Si ves este error:
1. **Ignóralo**: No afecta la funcionalidad de la aplicación
2. **Desactiva temporalmente las extensiones** si quieres eliminar el error
3. **Actualiza las extensiones** a sus últimas versiones

### Para desarrolladores:
- El error aparece en la consola pero no rompe la aplicación
- Se puede filtrar en las herramientas de desarrollador
- Es un problema conocido en aplicaciones web modernas

### ¿Afecta el rendimiento?
No, este error no afecta el rendimiento ni la funcionalidad de LlamaPay.
