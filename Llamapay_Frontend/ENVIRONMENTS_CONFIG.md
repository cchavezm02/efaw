# Configuración de Environments

## URLs configuradas:

### Desarrollo (environment.ts):
- URL: `http://localhost:8080`
- Producción: `false`

### Producción (environment.prod.ts):
- URL: `https://llamapay-arquiweb-80yh.onrender.com`
- Producción: `true`

## Comandos importantes:

### Para desarrollo local:
```bash
ng serve
# Usa environment.ts con localhost:8080
```

### Para build de producción:
```bash
ng build --configuration production
# Usa environment.prod.ts con tu backend de Render
```

### Para desplegar en Vercel:
```bash
vercel --prod
# Automáticamente usa la configuración de producción
```

## Notas:
- El archivo `angular.json` está configurado para reemplazar automáticamente el environment en builds de producción
- Todos los servicios importan desde `../../environments/environment`
- En producción, Angular automáticamente usará `environment.prod.ts`
