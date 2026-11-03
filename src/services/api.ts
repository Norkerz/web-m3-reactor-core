import type { EventoApi } from '../utils/terremotos'

const URL_TERREMOTOS =
  'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'

interface RespuestaApi {
  features: EventoApi[]
}

export async function obtenerTerremotos(): Promise<EventoApi[]> {
  const respuesta = await fetch(URL_TERREMOTOS)

  if (!respuesta.ok) {
    throw new Error('La API ha respondido con un error.')
  }

  const datos = (await respuesta.json()) as RespuestaApi

  if (!Array.isArray(datos.features)) {
    throw new Error('La API no ha devuelto una lista de terremotos.')
  }

  return datos.features
}
