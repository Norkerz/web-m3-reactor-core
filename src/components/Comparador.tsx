import type { Terremoto } from '../utils/terremotos'

interface ComparadorProps {
  seleccionados: Terremoto[]
  onLimpiar: () => void
}

function Comparador({ seleccionados, onLimpiar }: ComparadorProps) {
  const [primero, segundo] = seleccionados

  return (
    <section className="comparador" aria-labelledby="titulo-comparador">
      <div className="comparador-cabecera">
        <div>
          <h2 id="titulo-comparador">Compara dos terremotos</h2>
          <p>Selecciona dos tarjetas. Si eliges una tercera, sustituye la primera.</p>
        </div>
        <button type="button" onClick={onLimpiar} disabled={seleccionados.length === 0}>
          Vaciar comparación
        </button>
      </div>

      <div className="comparador-seleccion" aria-live="polite">
        {seleccionados.length === 0 && <p>Aún no has elegido ningún terremoto.</p>}
        {seleccionados.map((terremoto) => (
          <p key={terremoto.id}>
            <strong>{terremoto.magnitud.toFixed(1)}</strong> · {terremoto.lugar}
          </p>
        ))}
        {primero && segundo && (
          <p className="comparador-diferencia">
            Diferencia de magnitud: <strong>{Math.abs(primero.magnitud - segundo.magnitud).toFixed(1)}</strong>
          </p>
        )}
      </div>
    </section>
  )
}

export default Comparador
