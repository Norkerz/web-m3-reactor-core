import type { ResumenTerremotos } from '../utils/terremotos'

interface ResumenProps {
  resumen: ResumenTerremotos
}

function Resumen({ resumen }: ResumenProps) {
  return (
    <section className="resumen" aria-labelledby="titulo-resumen">
      <h2 id="titulo-resumen">Resumen de resultados</h2>
      <div className="resumen-datos">
        <p>
          <strong>{resumen.cantidad}</strong>
          Terremotos encontrados
        </p>
        <p>
          <strong>{resumen.magnitudMedia.toFixed(1)}</strong>
          Magnitud media
        </p>
      </div>
    </section>
  )
}

export default Resumen
