# tfg
Evaluación de webrtc en redes móviles

Para poder utilizar Firebase se debe cambiar la configuración existente (ya que es mi cuenta) por una cuenta nueva. En la aplicación de Angular 4 (carpeta mapa), esta configuración está en: mapa->src ->environments-> environments.ts. En el proyecto IONIC 3 (carpeta movil) src -> app-> app.module.ts
Cada proyecto se debe ejecutar por separado, es decir, el proyecto del mapa se ejecutará con los comandos de Angular 4 y la aplicación móvil con los comandos de IONIC 3.

Una vez ejecutado una carpeta faltará instalar las dependencias mediante: npm install

Si aparece un error relacionado con el polyfill se soluciona con el siguiente comando:
npm install promise-polyfill --save --save-exact
