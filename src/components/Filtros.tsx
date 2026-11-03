interface FiltrosProps {
  busqueda: string
  magnitudMinima: number
  onCambiarBusqueda: (valor: string) => void
  onCambiarMagnitud: (valor: number) => void
  onLimpiar: () => void
}

function Filtros({
  busqueda,
  magnitudMinima,
  onCambiarBusqueda,
  onCambiarMagnitud,
  onLimpiar,
}: FiltrosProps) {
  return (
    <section className="filtros" aria-labelledby="titulo-filtros">
      <h2 id="titulo-filtros">Filtrar terremotos</h2>
      <form onSubmit={(evento) => evento.preventDefault()}>
        <div className="campo">
          <label htmlFor="busqueda">Buscar por lugar</label>
          <input
            id="busqueda"
            type="search"
            value={busqueda}
            onChange={(evento) => onCambiarBusqueda(evento.target.value)}
            placeholder="Ej.: California"
          />
        </div>

        <div className="campo">
          <label htmlFor="magnitud">Magnitud mínima</label>
          <select
            id="magnitud"
            value={magnitudMinima}
            onChange={(evento) =>
              onCambiarMagnitud(Number(evento.target.value))
            }
          >
            <option value={0}>Todos</option>
            <option value={1}>Magnitud 1 o superior</option>
            <option value={2.5}>Magnitud 2.5 o superior</option>
            <option value={4.5}>Magnitud 4.5 o superior</option>
            <option value={6}>Magnitud 6 o superior</option>
          </select>
        </div>

        <button type="button" onClick={onLimpiar}>
          Limpiar filtros
        </button>
      </form>
    </section>
  )
}

export default Filtros
