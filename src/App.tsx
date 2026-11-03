import { useEffect, useState } from 'react'
import { obtenerTerremotos } from './services/api'
import Resumen from './components/Resumen'
import Filtros from './components/Filtros'
import Resultados from './components/Resultados'
import Comparador from './components/Comparador'

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
  const [idsComparados, setIdsComparados] = useState<string[]>([])

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
  const comparados: Terremoto[] = []
  for (const id of idsComparados) {
    const terremoto = terremotos.find((evento) => evento.id === id)
    if (terremoto) comparados.push(terremoto)
  }

  function limpiarFiltros() {
    setBusqueda('')
    setMagnitudMinima(0)
  }

  function alternarComparacion(id: string) {
    setIdsComparados((actuales) => {
      if (actuales.includes(id)) {
        return actuales.filter((idActual) => idActual !== id)
      }
      if (actuales.length === 2) {
        return [actuales[1], id]
      }
      return [...actuales, id]
    })
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

        <Comparador
          seleccionados={comparados}
          onLimpiar={() => setIdsComparados([])}
        />

        <Resultados
          cargando={cargando}
          error={error}
          terremotos={terremotos}
          terremotosFiltrados={terremotosFiltrados}
          idsComparados={idsComparados}
          onAlternarComparacion={alternarComparacion}
        />
      </main>

      <footer>
        <p>SismoTrack · Datos proporcionados por USGS</p>
      </footer>
    </>
  )
}

export default App
