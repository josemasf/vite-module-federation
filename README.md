## Crear remote app

con la ayuda de vite crear una app a partir de una plantilla 

`
pnpm create vite remote --template vue
`

instalamos el plugin para vite de module federation

`
pnpm add @originjs/vite-plugin-federation -D -E
`

## crear un componente Button y usarlo App.vue

```
<script setup lang="ts">
import { useCounter } from '../composables/useCounter'

const { count, increment } = useCounter()
</script>

<template>
  <button @click="increment">Count is {{ count }}</button>
</template>

<style scoped>
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>

```

Así sería app.vue

```
<script setup>
import Button from './components/Button.vue';
</script>

<template>
  <h1>Remote</h1>
  <Button />
</template>

```

## Creamos el host

`
pnpm create vite host --template vue
`

instalamos el plugin para vite de module federation

`
pnpm add @originjs/vite-plugin-federation -D -E
`

## Copias el botón y el composable

Copiamos los archivos del botón y el composable en la app host

## Cambiamos el app.vue del host

```
<script setup>
import Button from './components/Button.vue';
</script>

<template>
  <h1>Host</h1>
  <Button />
</template>

<style>
body {
  background-color: tomato;
}
</style>
```

## Configuramos el plugin en el remoto

En el archivo vite.config


```
import federation from '@originjs/vite-plugin-federation'
export default defineConfig({
  plugins: [
    vue(),
    federation(
      {
        name: 'remote_app',
        filename: 'remoteEntry.js',
        exposes: {
          "./Button": "./src/components/Button.vue",
        },
        shared: ['vue']        
      }
    )
  ],
})
```

- **name**: nombre de aplicación
- **filename**: nombre del archivo de la app. entry.js es un estándar
- **exposes**: nombre del componente expuesto, path donde reside.
- **shared**: para evitar colisiones entre instancias de librerías o exceso de tamaño 


## Preparamos el build

en el archivo vite.config

añadimos

build:{
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  }

```
import federation from '@originjs/vite-plugin-federation'
export default defineConfig({
  plugins: [
    vue(),
    federation(
      {
        name: 'remote_app',
        filename: 'remote-entry.js',
        exposes: {
          "./Button": "./src/components/Button.vue",
        },
        shared: ['vue']        
      }
    )
  ],
  build:{
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  }
})
```

## Build and preview

Exponemos nuestro remoto

`pnpm build`
`pnpm preview`

## configuramos el host

```
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'app',
      remotes: {
        remoteApp: 'http://localhost:3001/assets/remote-entry.js',
      },
      shared: ['vue'],
    })
  ],
})
```

## Cambiamos el color del botón del remote

Usaremos estos estilos

```
<style scoped>
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: lightblue;
  color: #000;
}
</style>
```

Build + preview para que se aplique el cambio

## Exportando le composable

Actualizamos nuestra configuración de vite

```
export default defineConfig({
  plugins: [
    vue(),
    federation(
      {
        name: 'remote_app',
        filename: 'remote-entry.js',
        exposes: {
          "./Button": "./src/components/Button.vue",
          "./ButtonState": "./src/composables/useCounter.ts"
        },
        shared: ['vue']        
      }
    )
  ],
  build:{
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  }
})
```

Comentamos el composable local en host y usamos el composable compartido por el remoto

```

<script setup lang="ts">
//import { useCounter } from '../composables/useCounter'
import {useCounter} from 'remoteApp/ButtonState';

const { count, increment } = useCounter()
</script>

<template>
  <button @click="increment">Count is {{ count }} in host</button>
</template>

<style scoped>
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>

```