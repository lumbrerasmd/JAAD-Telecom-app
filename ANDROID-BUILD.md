# Compilar el APK de JAAD Telecom (Android)

Esto empaqueta el prototipo como una app de Android de verdad, instalable
en cualquier celular, usando Capacitor. La compilación en sí ocurre en los
servidores de GitHub (gratis, no necesitas instalar Android Studio), así
que solo tienes que subir estos archivos a tu repositorio y darle un botón.

## 1. Subir estos archivos a tu repositorio

Tu repo ya existente: `lumbrerasmd/JAAD-Telecom-app`

Copia dentro de él, respetando las carpetas:
```
capacitor.config.json
package.json
.github/workflows/build-android.yml
www/index.html   ← el prototipo (este archivo pesa ~1.5 MB, es normal)
```

Luego, desde tu computadora, dentro de la carpeta del repo:
```
git add .
git commit -m "Agregar empaquetado Android con Capacitor"
git push
```

## 2. Lanzar la compilación

1. Entra a tu repositorio en GitHub.com
2. Pestaña **Actions** (arriba)
3. En la lista de la izquierda, click en **"Compilar APK de Android"**
4. Botón **"Run workflow"** (arriba a la derecha) → **Run workflow**
5. Espera 3-6 minutos. Verás un círculo amarillo girando y luego un
   check verde ✅ cuando termine.

Si sale una ❌ roja, click en el proceso para ver el error — lo más común
es un error de sintaxis si algo se copió mal; pégame el mensaje y lo
resolvemos.

## 3. Descargar el APK

1. Click en la ejecución que acaba de terminar (la de arriba, con el ✅)
2. Baja hasta la sección **Artifacts**
3. Descarga `jaad-telecom-debug-apk` (es un .zip que trae el .apk adentro)

## 4. Instalarlo en tu celular para probar

1. Pasa el archivo `.apk` a tu teléfono (por WhatsApp, correo, cable, o
   directo desde el navegador del celular si descargas ahí el zip)
2. Android va a bloquear la instalación la primera vez — te va a pedir
   permiso para "instalar apps de origen desconocido". Es normal: pasa
   siempre que instalas un APK que no viene de la Play Store. Acéptalo
   solo para este archivo.
3. Ábrelo, y listo — ya tienes la app corriendo nativa en tu celular,
   no en un navegador.

Este es un build de **prueba (debug)**: sirve perfecto para que tú y tus
compañeros la instalen y la prueben, pero Android la marca como "no
verificada" porque no está firmada con una llave de verdad. Para eso
está la sección de abajo.

## 5. Compartir con tus compañeros

Mientras están en fase de pruebas, lo más simple es mandarles el mismo
.apk por WhatsApp o Drive — cada quien lo instala igual que en el paso 4.
No hace falta subir nada a la Play Store para esto.

## 6. Cuando quieras una versión "release" firmada (más adelante)

Esto solo hace falta cuando ya quieras una versión más formal (por
ejemplo para subirla a la Play Store algún día, o para que Android deje
de marcarla como "no verificada"). No es necesario para las pruebas con
el equipo.

1. Generar tu llave de firma (una sola vez, en tu computadora):
   ```
   keytool -genkey -v -keystore release.keystore -alias jaad -keyalg RSA -keysize 2048 -validity 10000
   ```
   Te va a pedir una contraseña — **guárdala bien, si la pierdes no hay
   forma de recuperarla ni de volver a firmar futuras versiones con la
   misma llave.**

2. Convertir la llave a texto para guardarla como secreto de GitHub:
   ```
   base64 -i release.keystore | pbcopy
   ```
   (en Windows: `certutil -encode release.keystore release.b64`)

3. En GitHub: **Settings → Secrets and variables → Actions → New repository secret**,
   crea estos 4 secretos:
   - `ANDROID_KEYSTORE_BASE64` (lo que copiaste en el paso 2)
   - `ANDROID_KEYSTORE_PASSWORD`
   - `ANDROID_KEY_ALIAS` (pusiste `jaad` en el ejemplo de arriba)
   - `ANDROID_KEY_PASSWORD`

4. En `.github/workflows/build-android.yml`, descomenta el bloque
   `build-release` que está al final del archivo.

5. Vuelve a correr el workflow — ahora también te va a dejar descargar
   `jaad-telecom-release-apk`, ya firmado.

## Nota sobre el ícono y la pantalla de carga de la app

Ahora mismo la app va a usar el ícono y splash por defecto de Capacitor.
Cuando quieras, dime y te preparo el ícono con el logo de JAAD en todos
los tamaños que pide Android (esto es un paso aparte, con la herramienta
`@capacitor/assets`).
