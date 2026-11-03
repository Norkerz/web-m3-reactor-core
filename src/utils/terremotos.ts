export interface EventoApi {
  id: string
  properties: {
    mag: number | null
    place: string | null
    time: number
    url: string
  }
  geometry: {
    coordinates: number[]
  }
}

export type NivelMagnitud =
  | 'Baja'
  | 'Moderada'
  | 'Fuerte'
  | 'Muy fuerte'

export interface Terremoto {
  id: string
  magnitud: number
  lugar: string
  fecha: number
  profundidad: number
  enlace: string
  nivel: NivelMagnitud
}

export interface ResumenTerremotos {
  cantidad: number
  magnitudMedia: number
}

export function clasificarMagnitud(magnitud: number): NivelMagnitud {
  if (magnitud < 2.5) return 'Baja'
  if (magnitud < 4.5) return 'Moderada'
  if (magnitud < 6) return 'Fuerte'
  return 'Muy fuerte'
}

export function transformarTerremotos(
  eventos: EventoApi[],
): Terremoto[] {
  return eventos.map((evento) => {
    const magnitud = evento.properties.mag ?? 0

    return {
      id: evento.id,
      magnitud,
      lugar: evento.properties.place ?? 'Lugar desconocido',
      fecha: evento.properties.time,
      profundidad: evento.geometry.coordinates[2] ?? 0,
      enlace: evento.properties.url,
      nivel: clasificarMagnitud(magnitud),
    }
  })
}

export function filtrarTerremotos(
  terremotos: Terremoto[],
  busqueda: string,
  magnitudMinima: number,
): Terremoto[] {
  const textoBuscado = busqueda.toLowerCase().trim()

  return terremotos.filter((terremoto) => {
    const coincideLugar = terremoto.lugar
      .toLowerCase()
      .includes(textoBuscado)
    const coincideMagnitud = terremoto.magnitud >= magnitudMinima

    return coincideLugar && coincideMagnitud
  })
}

export function calcularResumen(
  terremotos: Terremoto[],
): ResumenTerremotos {
  const cantidad = terremotos.length
  const sumaMagnitudes = terremotos.reduce(
    (suma, terremoto) => suma + terremoto.magnitud,
    0,
  )
  const magnitudMedia = cantidad === 0 ? 0 : sumaMagnitudes / cantidad

  return {
    cantidad,
    magnitudMedia,
  }
}
