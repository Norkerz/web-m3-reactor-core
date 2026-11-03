import TarjetaTerremoto from './TarjetaTerremoto'
import type { Terremoto } from '../utils/terremotos'

interface ResultadosProps {
  cargando: boolean
  error: string
  terremotos: Terremoto[]
  terremotosFiltrados: Terremoto[]
  idsComparados: string[]
  onAlternarComparacion: (id: string) => void
  onReintentar: () => void
}

function Resultados({
  cargando,
  error,
  terremotos,
  terremotosFiltrados,
  idsComparados,
  onAlternarComparacion,
  onReintentar,
}: ResultadosProps) {
  return (
    <section className="resultados" aria-labelledby="titulo-resultados">
      <h2 id="titulo-resultados">Terremotos recientes</h2>

      {cargando && <p className="mensaje">Cargando terremotos...</p>}

      {error && (
        <div className="mensaje mensaje-error" role="alert">
          <p>{error}</p>
          <button type="button" onClick={onReintentar}>
            Reintentar
          </button>
        </div>
      )}

      {!cargando && !error && terremotos.length === 0 && (
        <p className="mensaje">
          La API no ha devuelto terremotos en las últimas 24 horas.
        </p>
      )}

      {!cargando &&
        !error &&
        terremotos.length > 0 &&
        terremotosFiltrados.length === 0 && (
          <p className="mensaje">
            No hay terremotos que coincidan con los filtros.
          </p>
        )}

      {!cargando && !error && terremotosFiltrados.length > 0 && (
        <div className="lista-terremotos">
          {terremotosFiltrados.map((terremoto) => (
            <TarjetaTerremoto
              key={terremoto.id}
              terremoto={terremoto}
              comparado={idsComparados.includes(terremoto.id)}
              onAlternarComparacion={onAlternarComparacion}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default Resultados
