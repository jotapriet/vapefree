# VapeFree

Producción: https://vapefree-opal.vercel.app

Despliegue en Vercel: `pnpm dlx vercel@latest deploy --prod`. El archivo `vercel.json` ejecuta `node build.mjs` para copiar únicamente los recursos de la aplicación a `dist/`. No se necesita servidor Node en producción.

Aplicación en español, 100 % client-side y sin dependencias. HTML, CSS y JavaScript modular, con servidor local de Node para servir los archivos.

## Ejecutar

Necesitas Node.js 20 o posterior. Desde esta carpeta:

```sh
node server.mjs
```

Abre http://localhost:5173. No necesitas instalar paquetes. También puedes usar `npm run dev` si tienes npm.

```sh
node --test tests.mjs
```

## Incluye

- Onboarding, contador por segundo, ahorro, consumo y nicotina del líquido evitados.
- Metas de ahorro, 22 datos y consejos, logros y registro de antojos.
- SOS: respiración 4-4-4-4, pausa de tres minutos y burbujas táctiles.
- Historial de intentos con conservación de estadísticas acumuladas.
- Exportación e importación validada de JSON, reinicio confirmado y modo oscuro.
- Manifest y service worker para uso sin conexión después de la primera carga. La instalación depende del navegador y requiere HTTPS o localhost.

## Datos y estimaciones

Los datos se guardan en `localStorage` con la clave `vapefree`. Borrar los datos del navegador elimina el progreso: exporta un respaldo desde Configuración. La importación sustituye los datos actuales con confirmación. No hay backend, analítica ni cuentas. Google Fonts es opcional; el diseño utiliza fuentes del sistema si no hay conexión.

El panel muestra estadísticas del intento actual; la meta y los logros de ahorro usan el total acumulado. Las recaídas guardan una instantánea del intento. Cambiar el consumo recalcula el intento actual, sin alterar intentos cerrados. Las fechas futuras producen cero consumo evitado hasta el comienzo.

El ahorro se estima por precio/duración del desechable o gasto semanal/7. Los ml semanales y caladas diarias se declaran por separado; no se convierten automáticamente. La nicotina del líquido evitada es ml × mg/ml y **no representa nicotina absorbida ni niveles en sangre**.

Los hitos de recuperación son hitos de constancia. Se evitan afirmaciones médicas con plazos universales extrapolados del tabaco al vapeo. Los consejos se apoyan en [NHS: cómo dejar de vapear](https://www.nhs.uk/better-health/quit-smoking/ready-to-quit-smoking/vaping-to-quit-smoking/how-to-quit-vaping/). La herramienta acompaña hábitos y no diagnostica.

## Diario y herramientas personales

«Mi diario» incluye check-in por fecha local (editable), ánimo de 1 a 5, intensidad de 0 a 10 y una pequeña victoria. Al superar un antojo puedes elegir el desencadenante o dejarlo sin especificar. Los patrones muestran frecuencias y tus alternativas personales. Los registros antiguos se mantienen sin inventar motivos.

La semana muestra siete días locales con gráficas de antojos, ánimo y ahorro, una tabla accesible y tus victorias. El ahorro se reparte por los intervalos de los intentos con fecha de cierre y por el intento actual. Los intentos antiguos sin fecha de cierre se conservan en los totales, pero no pueden ubicarse en el gráfico semanal. El consumo declarado actual se usa para el intento abierto.

En Configuración puedes elegir duración de pausa (1, 2, 3 o 5 minutos), volumen de burbujas y ejercicio favorito. El SOS ofrece respiración, temporizador, burbujas, grounding y actividades breves, además de consultar tu plan personal.

Los recordatorios son internos a VapeFree, con hora y mensaje personalizables. **Requieren que la app permanezca abierta**: no utilizan las automatizaciones de Codex, backend ni push. En segundo plano el navegador puede retrasarlos. Al volver durante el mismo día se muestra el aviso pendiente. Las notificaciones del sistema requieren permiso explícito desde Configuración y compatibilidad del navegador; siempre existe el aviso dentro de la app. No hay garantía de entrega con la app cerrada. Pulsar la notificación abre el SOS. El horario usa la zona local del dispositivo.

Los respaldos JSON incluyen diario, desencadenantes, plan, preferencias SOS y recordatorio; los respaldos anteriores se migran al cargarlos.

## Estructura

`app.js`: interfaz y eventos; `model.js`: validación, cálculos y contenido; `style.css`: diseño adaptable; `sw.js`: caché local; `tests.mjs`: comprobaciones del modelo.
