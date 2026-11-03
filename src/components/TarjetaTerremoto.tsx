import type { Terremoto } from '../utils/terremotos'

interface TarjetaTerremotoProps {
  terremoto: Terremoto
  comparado: boolean
  onAlternarComparacion: (id: string) => void
}

function obtenerClaseNivel(nivel: string): string {
  if (nivel === 'Baja') return 'nivel-baja'
  if (nivel === 'Moderada') return 'nivel-moderada'
  if (nivel === 'Fuerte') return 'nivel-fuerte'
  return 'nivel-muy-fuerte'
}

function TarjetaTerremoto({
  terremoto,
  comparado,
  onAlternarComparacion,
}: TarjetaTerremotoProps) {
  return (
    <article className="tarjeta-terremoto">
      <div className="tarjeta-encabezado">
        <h3>{terremoto.lugar}</h3>
        <p className={'nivel ' + obtenerClaseNivel(terremoto.nivel)}>
          {terremoto.nivel}
        </p>
      </div>

      <dl className="datos-terremoto">
        <div>
          <dt>Magnitud</dt>
          <dd>{terremoto.magnitud.toFixed(1)}</dd>
        </div>
        <div>
          <dt>Fecha y hora</dt>
          <dd>{new Date(terremoto.fecha).toLocaleString('es-ES')}</dd>
        </div>
        <div>
          <dt>Profundidad</dt>
          <dd>{terremoto.profundidad.toFixed(1)} km</dd>
        </div>
      </dl>

      <button
        type="button"
        className="boton-comparar"
        aria-pressed={comparado}
        onClick={() => onAlternarComparacion(terremoto.id)}
      >
        {comparado ? 'Quitar de comparación' : 'Añadir a comparación'}
      </button>

      <a href={terremoto.enlace} target="_blank" rel="noreferrer">
        Ver evento en USGS
      </a>
    </article>
  )
}

export default TarjetaTerremoto
