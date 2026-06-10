'use client'

import { ComunaData } from '@/lib/types'

interface Props {
  datos: ComunaData[]
}

export default function PanelComunas({ datos }: Props) {
  if (!datos.length) return null

  return (
    <div className="absolute bottom-5 right-3 z-[999] bg-[#1a1d2eee] border border-[#2d3250] rounded-xl p-3 min-w-[200px] max-h-[55vh] overflow-y-auto">
      <div className="flex justify-between text-[11px] text-slate-400 uppercase tracking-wider mb-2 pb-2 border-b border-[#2d3250]">
        <span>Top Comunas</span>
        <span>Eventos</span>
      </div>
      {datos.slice(0, 10).map((d, i) => (
        <div
          key={d.nom_com}
          className="flex justify-between items-center py-1 border-b border-[#2d3250] last:border-0 text-[12px]"
        >
          <span className="text-slate-300 max-w-[120px] truncate">
            {i + 1}. {d.nom_com || '—'}
          </span>
          <span className="text-red-400 font-semibold">
            {Math.round(parseFloat(d.total)).toLocaleString('es-CO')}
          </span>
        </div>
      ))}
    </div>
  )
}
