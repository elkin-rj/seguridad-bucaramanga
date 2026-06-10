'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect, useCallback } from 'react'
import { fetchComunasData } from '@/lib/api'
import { ComunaData, FiltroState } from '@/lib/types'
import Controles from '@/components/Controles'
import PanelComunas from '@/components/PanelComunas'
import Leyenda from '@/components/Leyenda'
import ModalComparador from '@/components/ModalComparador'

const MapaCalor = dynamic(() => import('@/components/MapaCalor'), { ssr: false })

type TileMode = 'oscuro' | 'claro'

export default function Home() {
  const [filtros, setFiltros]           = useState<FiltroState>({ delito: '', anio: '' })
  const [datos, setDatos]               = useState<ComunaData[]>([])
  const [total, setTotal]               = useState(0)
  const [cargando, setCargando]         = useState(false)
  const [modoMapa, setModoMapa]         = useState<TileMode>('oscuro')
  const [modalAbierto, setModalAbierto] = useState(false)
  const [filtroLabel, setFiltroLabel]   = useState('Cargando...')

  const cargarDatos = useCallback(async (f: FiltroState) => {
    setCargando(true)
    try {
      const result = await fetchComunasData(f.anio, f.delito)
      setDatos(result)
      const totalSum = result.reduce((acc, d) => acc + (parseFloat(d.total) || 0), 0)
      setTotal(Math.round(totalSum))
      const delitoLabel = f.delito || 'Todos los delitos'
      const anioLabel   = f.anio   || 'Todos los años'
      setFiltroLabel(`${delitoLabel} · ${anioLabel} · ${Math.round(totalSum).toLocaleString('es-CO')} eventos`)
    } catch {
      console.error('Error al cargar datos')
    } finally {
      setCargando(false)
    }
  }, [])

  useEffect(() => { cargarDatos(filtros) }, [filtros])

  return (
    <div className="flex flex-col h-screen bg-[#0f1117] text-slate-200 overflow-hidden">

      {/* Header */}
      <header className="bg-[#1a1d2e] border-b border-[#2d3250] px-5 py-3 flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-base font-semibold text-slate-100">
            🔥 Mapa de Calor Delictivo — Bucaramanga
          </h1>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Fuente: Alcaldía de Bucaramanga · datos.gov.co · Ene 2016 – Mar 2026
            &nbsp;·&nbsp;
            <span className="text-red-400 font-semibold">{filtroLabel}</span>
          </p>
        </div>
        <span className="bg-red-500 text-white text-[11px] font-semibold px-3 py-1 rounded-full">
          DATOS ABIERTOS
        </span>
      </header>

      {/* Controles */}
      <Controles
        filtros={filtros}
        total={total}
        cargando={cargando}
        modoMapa={modoMapa}
        onFiltroChange={setFiltros}
        onActualizar={() => cargarDatos(filtros)}
        onToggleMapa={() => setModoMapa(m => m === 'oscuro' ? 'claro' : 'oscuro')}
        onAbrirComparador={() => setModalAbierto(true)}
      />

      {/* Mapa */}
      <div className="relative flex-1 overflow-hidden">
        <MapaCalor datos={datos} modoMapa={modoMapa} anio={filtros.anio} />
        <Leyenda />
        <PanelComunas datos={datos} />
      </div>

      {/* Modal */}
      <ModalComparador
        abierto={modalAbierto}
        onCerrar={() => setModalAbierto(false)}
      />
    </div>
  )
}
