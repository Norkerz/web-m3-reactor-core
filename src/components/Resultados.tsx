import TarjetaTerremoto from './TarjetaTerremoto'
import type { Terremoto } from '../utils/terremotos'

interface ResultadosProps {
  cargando: boolean
  error: string
  terremotos: Terremoto[]
  terremotosFiltrados: Terremoto[]
}

function Resultados({
  cargando,
  error,
  terremotos,
  terremotosFiltrados,
}: ResultadosProps) {
  return (
    <section className="resultados" aria-labelledby="titulo-resultados">
      <h2 id="titulo-resultados">Terremotos recientes</h2>

      {cargando && <p className="mensaje">Cargando terremotos...</p>}

      {error && (
        <p className="mensaje mensaje-error" role="alert">
          {error}
        </p>
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
            <TarjetaTerremoto key={terremoto.id} terremoto={terremoto} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Resultados
