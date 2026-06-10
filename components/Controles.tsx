'use client'

import { FiltroState } from '@/lib/types'

const DELITOS = [
  { value: '', label: 'Todos los delitos' },
  { group: 'Homicidios', options: [
    { value: 'HOMICIDIO', label: 'Homicidio' },
    { value: 'FEMINICIDIO', label: 'Feminicidio' },
    { value: "HOMICIDIO CULPOSO ( EN ACCIDENTE DE TRÁNSITO)", label: 'Homicidio culposo (tránsito)' },
  ]},
  { group: 'Hurtos', options: [
    { value: 'HURTO PERSONAS', label: 'Hurto a personas' },
    { value: 'HURTO RESIDENCIAS', label: 'Hurto a residencias' },
    { value: 'HURTO AUTOMOTORES', label: 'Hurto automotores' },
    { value: 'HURTO MOTOCICLETAS', label: 'Hurto motocicletas' },
    { value: 'HURTO ENTIDADES COMERCIALES', label: 'Hurto a comercio' },
  ]},
  { group: 'Lesiones', options: [
    { value: 'LESIONES PERSONALES', label: 'Lesiones personales' },
    { value: 'LESIONES CULPOSAS', label: 'Lesiones culposas' },
  ]},
  { group: 'Violencia', options: [
    { value: 'VIOLENCIA INTRAFAMILIAR', label: 'Violencia intrafamiliar' },
    { value: 'AMENAZAS', label: 'Amenazas' },
    { value: 'EXTORSIÓN', label: 'Extorsión' },
  ]},
  { group: 'Tránsito', options: [
    { value: 'MUERTE EN ACCIDENTE DE TRANSITO', label: 'Muerte en accidente' },
  ]},
]

const ANIOS = ['', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018']

interface Props {
  filtros: FiltroState
  total: number
  cargando: boolean
  modoMapa: 'oscuro' | 'claro'
  onFiltroChange: (f: FiltroState) => void
  onActualizar: () => void
  onToggleMapa: () => void
  onAbrirComparador: () => void
}

export default function Controles({
  filtros, total, cargando, modoMapa,
  onFiltroChange, onActualizar, onToggleMapa, onAbrirComparador,
}: Props) {
  const selectClass =
    'bg-[#0f1117] border border-[#2d3250] text-slate-200 px-2 py-1.5 rounded-md text-xs cursor-pointer focus:outline-none focus:border-red-500'

  return (
    <div className="bg-[#1a1d2e] border-b border-[#2d3250] px-4 py-2 flex items-center gap-3 flex-wrap flex-shrink-0">
      <div className="flex items-center gap-1.5">
        <label className="text-[11px] text-slate-400">Delito</label>
        <select
          className={selectClass}
          value={filtros.delito}
          onChange={e => onFiltroChange({ ...filtros, delito: e.target.value })}
        >
          {DELITOS.map(item =>
            'group' in item ? (
              <optgroup key={item.group} label={`── ${item.group}`}>
                {item.options!.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </optgroup>
            ) : (
              <option key="todos" value={item.value}>{item.label}</option>
            )
          )}
        </select>
      </div>

      <div className="flex items-center gap-1.5">
        <label className="text-[11px] text-slate-400">Año</label>
        <select
          className={selectClass}
          value={filtros.anio}
          onChange={e => onFiltroChange({ ...filtros, anio: e.target.value })}
        >
          {ANIOS.map(a => (
            <option key={a} value={a}>{a || 'Todos'}</option>
          ))}
        </select>
      </div>

      <button
        onClick={onActualizar}
        disabled={cargando}
        className="bg-red-500 hover:bg-red-600 disabled:bg-slate-600 text-white px-4 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-colors"
      >
        ↺ Actualizar
      </button>

      <button
        onClick={onAbrirComparador}
        className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-colors"
      >
        📊 Comparar
      </button>

      <button
        onClick={onToggleMapa}
        className="bg-[#374151] hover:bg-[#4b5563] text-slate-200 px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-colors"
      >
        {modoMapa === 'oscuro' ? '🗺️ Mapa claro' : '🌙 Mapa oscuro'}
      </button>

      <div className="ml-auto text-xs text-slate-400">
        Registros: <strong className="text-slate-100 text-sm">{total.toLocaleString('es-CO')}</strong>
      </div>
    </div>
  )
}
