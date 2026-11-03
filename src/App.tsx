import { useEffect, useState } from 'react'
import TarjetaTerremoto from './components/TarjetaTerremoto'
import { obtenerTerremotos } from './services/api'
import Resumen from './components/Resumen'
import Filtros from './components/Filtros'

import {
  calcularResumen,
  filtrarTerremotos,
  transformarTerremotos,
  type Terremoto,
} from './utils/terremotos'

function App() {
  const [terremotos, setTerremotos] = useState<Terremoto[]>([])
  const [busqueda, setBusqueda] = useState('')
  const [magnitudMinima, setMagnitudMinima] = useState(0)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function cargarTerremotos() {
      try {
        const eventosApi = await obtenerTerremotos()
        const terremotosPreparados = transformarTerremotos(eventosApi)
        setTerremotos(terremotosPreparados)
      } catch {
        setError(
          'No se pudieron cargar los terremotos. Comprueba tu conexión e inténtalo de nuevo.',
        )
      } finally {
        setCargando(false)
      }
    }

    cargarTerremotos()
  }, [])

  const terremotosFiltrados = filtrarTerremotos(
    terremotos,
    busqueda,
    magnitudMinima,
  )
  const resumen = calcularResumen(terremotosFiltrados)

  function limpiarFiltros() {
    setBusqueda('')
    setMagnitudMinima(0)
  }

  return (
    <>
      <header className="cabecera">
        <h1>SismoTrack</h1>
        <p>
          Terremotos registrados en todo el mundo durante las últimas 24 horas.
        </p>
      </header>

      <main>
        <Resumen resumen={resumen} />
        <Filtros
          busqueda={busqueda}
          magnitudMinima={magnitudMinima}
          onCambiarBusqueda={setBusqueda}
          onCambiarMagnitud={setMagnitudMinima}
          onLimpiar={limpiarFiltros}
        />

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
                <TarjetaTerremoto
                  key={terremoto.id}
                  terremoto={terremoto}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer>
        <p>SismoTrack · Datos proporcionados por USGS</p>
      </footer>
    </>
  )
}

export default App
