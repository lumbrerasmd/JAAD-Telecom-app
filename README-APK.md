# JAAD Telecom — empaquetado como app de Android (APK)

Esta carpeta convierte la app web de JAAD Telecom en una app de Android real,
usando Capacitor + GitHub Actions (para compilarla en la nube, ya que tu PC
es de 32 bits y no puede correr Android Studio).

## Qué hay aquí

```
jaad-apk/
├── www/
│   ├── index.html      ← tu app completa (mapa, clientes, tickets, etc.)
│   ├── manifest.json   ← para que también funcione como PWA instalable
│   ├── sw.js           ← guarda el mapa y la app para usarlos sin señal
│   ├── icon-192.png
│   └── icon-512.png
├── package.json
├── capacitor.config.json
├── .github/workflows/build-apk.yml   ← el que compila el APK solo
└── .gitignore
```

## Pasos para generar el APK

1. **Sube esta carpeta a tu repositorio** `lumbrerasmd/JAAD-Telecom-app` en
   GitHub (todo el contenido de `jaad-apk/`, no la carpeta en sí, va a la
   raíz del repo).

   Si nunca lo has hecho desde tu PC, la forma más fácil es arrastrar los
   archivos directo en la página de GitHub ("Add file → Upload files"),
   ya que tu equipo no puede usar Git con comodidad.

2. En cuanto los archivos queden subidos a la rama `main`, GitHub empieza a
   compilar solo — no tienes que hacer nada más. Lo puedes ver en la
   pestaña **Actions** de tu repositorio (ahí verás "Build APK" corriendo).

3. Cuando termine (unos 3-5 minutos), entra a esa misma ejecución en
   **Actions** y baja hasta **Artifacts**. Ahí vas a encontrar
   `jaad-telecom-app` — descárgalo, ábrelo (es un .zip) y adentro está tu
   `app-debug.apk`.

4. Pasa ese `.apk` a tu Android (por USB, WhatsApp, Drive, lo que sea) y
   ábrelo para instalarlo. Android probablemente te va a pedir permiso de
   "instalar apps de orígenes desconocidos" la primera vez — es normal,
   solo pasa porque no viene de la Play Store.

5. Cada vez que quieras actualizar la app en tu Android: vuelve a subir el
   `index.html` actualizado a `www/`, espera a que termine "Actions" y baja
   el nuevo APK.

## Cosas a tener en cuenta

- Este primer APK usa el ícono genérico de Android (el que Capacitor pone
  por defecto) — cambiar el ícono de la app por tu logo real es un paso
  aparte que podemos hacer después, no es difícil pero necesita generar
  varios tamaños de imagen.
- Es un **APK de "debug"**, pensado para instalar directo en tu equipo y
  el de tus técnicos. Si algún día lo quieres subir a la Play Store, hay
  que generar una versión firmada distinta — otro paso aparte.
- El mapa (los tiles satelitales) necesita internet para verse la primera
  vez; una vez que los viste, quedan guardados para volver a verlos sin
  señal.
