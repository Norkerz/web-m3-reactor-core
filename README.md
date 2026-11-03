# SismoTrack · M3 Reactor Core

Aplicación en React 19 y TypeScript para consultar los terremotos registrados por USGS durante las últimas 24 horas. Permite buscar por lugar, filtrar por magnitud y comparar dos eventos. Parte de la aplicación SismoTrack de M2, adaptada a la misión M3.

## Arranque

Requisitos: Node.js y npm. Desde la carpeta del proyecto:

```bash
npm ci
npm run dev
```

Abre la dirección local que muestra Vite. Para comprobar el proyecto:

```bash
npm run lint
npm run build
```

## Cómo funciona

- `src/services/api.ts` pide mediante `fetch` el feed público `all_day.geojson` de USGS. Devuelve su lista `features`; lanza un error si HTTP no responde correctamente o si la lista no existe. Un fallo de red también llega al `catch` de `App`.
- `src/utils/terremotos.ts` convierte cada evento de la API en un `Terremoto` con los campos que usa la interfaz. También clasifica magnitudes, filtra por lugar y magnitud mínima y calcula la cantidad y la media. La lista filtrada y el resumen se derivan de los datos originales, sin guardarse como otro estado.
- `src/App.tsx` guarda los datos, los filtros, la selección para comparar y los estados de carga y error. El `useEffect` hace la petición al montar el componente y al pulsar «Reintentar»; `AbortController` cancela la petición anterior al limpiar el efecto.
- `src/components/Filtros.tsx` muestra los controles y avisa a `App` mediante callbacks. `Resumen.tsx` muestra la cantidad y media de los resultados actuales. `Resultados.tsx` decide entre carga, error, lista vacía, filtros sin coincidencias y tarjetas. `TarjetaTerremoto.tsx` muestra cada evento. `Comparador.tsx` muestra hasta dos eventos seleccionados y la diferencia absoluta de sus magnitudes.

La comparación guarda solo los identificadores de los eventos. Si se elige un tercero, reemplaza al primero seleccionado; si se pulsa otra vez un evento seleccionado, se quita. Los objetos completos se buscan en la lista original al renderizar.

## Uso de IA

Se usó **Codex (OpenAI)** para esta misión. Dos extractos literales de instrucciones relevantes fueron:

> «hagamos la practica 3 de web, pero vamos de la mano tu me vas diciendo que lineas reemplazar y que hace cada cosa que hacemos, podriamos utilizar el proyecto que ya tenemos hecho»

> «deja la practica lista, encargate de dejar el codigo listo, solo interrumpe tu creacion de codigo cuando me pidas que haga commits»

El alumno conectó a mano los primeros componentes `Resumen` y `Filtros` en `App.tsx`, escribió el primer borrador de `Resultados.tsx` e hizo los commits. Codex completó la extracción de resultados, implementó la comparación, el reintento, la cancelación de la petición y este README. Se reutilizó el código existente de SismoTrack M2 como punto de partida; no se escribió M3 desde cero.

Codex comprobó los cambios con `npm run lint`, `npm run build` y revisión de los archivos modificados. La comprobación visual completa en navegador queda pendiente de hacer por el alumno antes de entregar: abrir la app, probar un filtro, seleccionar dos tarjetas y comprobar el botón «Reintentar» si falla la red.

## Autopsia

1. **Guardar IDs para comparar.** Se guardan en estado dos identificadores, no dos objetos `Terremoto`. La alternativa era guardar los objetos completos, pero duplicaría información que ya existe en `terremotos` y podría quedar desactualizada si se repite la carga. El coste de esta decisión es buscar cada ID en la lista al renderizar.
2. **Cancelar la petición al limpiar el efecto.** `AbortController` impide que una respuesta tardía actualice la interfaz tras desmontar o repetir la carga. La alternativa era hacer `fetch` sin limpieza: sería menos código, pero permitiría que una petición antigua compitiera con la nueva. `intento` cambia solo al pulsar «Reintentar» y es la dependencia del efecto.

La defensa escrita debe explicar el código real: el README documenta las decisiones, pero no sustituye comprenderlas.
