'use client'

import { useEffect, useState } from 'react'
import { fetchComparativo } from '@/lib/api'
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement,
  Title, Tooltip, Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const DELITOS_CMP = [
  { value: '', label: 'Todos los delitos' },
  { value: 'HOMICIDIO', label: 'Homicidio' },
  { value: 'FEMINICIDIO', label: 'Feminicidio' },
  { value: 'HURTO PERSONAS', label: 'Hurto a personas' },
  { value: 'HURTO RESIDENCIAS', label: 'Hurto a residencias' },
  { value: 'HURTO AUTOMOTORES', label: 'Hurto automotores' },
  { value: 'HURTO MOTOCICLETAS', label: 'Hurto motocicletas' },
  { value: 'HURTO ENTIDADES COMERCIALES', label: 'Hurto a comercio' },
  { value: 'VIOLENCIA INTRAFAMILIAR', label: 'Violencia intrafamiliar' },
  { value: 'LESIONES PERSONALES', label: 'Lesiones personales' },
  { value: 'AMENAZAS', label: 'Amenazas' },
  { value: 'EXTORSIÓN', label: 'Extorsión' },
]

const ANIOS = ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018']

interface Props {
  abierto: boolean
  onCerrar: () => void
}

export default function ModalComparador({ abierto, onCerrar }: Props) {
  const [delito, setDelito] = useState('')
  const [anioA, setAnioA] = useState('2024')
  const [anioB, setAnioB] = useState('2023')
  const [cargando, setCargando] = useState(false)
  const [chartData, setChartData] = useState<{ labels: string[]; valA: number[]; valB: number[] } | null>(null)
  const [error, setError] = useState('')

  const selectClass = 'bg-[#0f1117] border text-slate-200 px-2 py-1.5 rounded-md text-xs cursor-pointer focus:outline-none'

  async function consultar() {
    setCargando(true)
    setError('')
    try {
      const [dA, dB] = await fetchComparativo(anioA, anioB, delito)
      const mapaA: Record<string, number> = {}
      const mapaB: Record<string, number> = {}
      dA.forEach(d => { mapaA[d.nom_com] = parseFloat(d.total) || 0 })
      dB.forEach(d => { mapaB[d.nom_com] = parseFloat(d.total) || 0 })

      const comunas = [...new Set([...Object.keys(mapaA), ...Object.keys(mapaB)])]
        .filter(c => c && c !== 'null')
        .sort((a, b) => ((mapaA[b] || 0) + (mapaB[b] || 0)) - ((mapaA[a] || 0) + (mapaB[a] || 0)))
        .slice(0, 15)

      setChartData({
        labels: comunas,
        valA: comunas.map(c => mapaA[c] || 0),
        valB: comunas.map(c => mapaB[c] || 0),
      })
    } catch {
      setError('Error al consultar la API')
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => { if (abierto) consultar() }, [delito, anioA, anioB, abierto])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onCerrar() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onCerrar])

  if (!abierto) return null

  const delitoLabel = DELITOS_CMP.find(d => d.value === delito)?.label || 'Todos'

  return (
    <div className="fixed inset-0 bg-black/80 z-[3000] flex items-center justify-center p-4">
      <div className="bg-[#1a1d2e] border border-[#2d3250] rounded-2xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
        <button onClick={onCerrar} className="absolute top-3 right-4 text-slate-400 hover:text-white text-xl">✕</button>
        <h2 className="text-sm font-bold text-slate-100 mb-4">📊 Comparativo por Comunas</h2>

        <div className="flex gap-3 flex-wrap items-center mb-5">
          <div className="flex items-center gap-1.5">
            <label className="text-[11px] text-slate-400">Delito</label>
            <select className={`${selectClass} border-[#2d3250]`} value={delito} onChange={e => setDelito(e.target.value)}>
              {DELITOS_CMP.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-1.5">
            <label className="text-[11px] text-red-400 font-semibold">Año A</label>
            <select className={`${selectClass} border-red-500 text-red-400 font-semibold`} value={anioA} onChange={e => setAnioA(e.target.value)}>
              {ANIOS.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-1.5">
            <label className="text-[11px] text-blue-400 font-semibold">Año B</label>
            <select className={`${selectClass} border-blue-500 text-blue-400 font-semibold`} value={anioB} onChange={e => setAnioB(e.target.value)}>
              {ANIOS.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
        </div>

        {cargando && <p className="text-slate-400 text-sm text-center py-10">Consultando datos...</p>}
        {error && <p className="text-red-400 text-sm text-center py-6">{error}</p>}
        {!cargando && chartData && (
          <>
            <Bar
              data={{
                labels: chartData.labels,
                datasets: [
                  { label: `Año ${anioA}`, data: chartData.valA, backgroundColor: '#ef444499', borderColor: '#ef4444', borderWidth: 1.5, borderRadius: 4 },
                  { label: `Año ${anioB}`, data: chartData.valB, backgroundColor: '#60a5fa99', borderColor: '#60a5fa', borderWidth: 1.5, borderRadius: 4 },
                ],
              }}
              options={{
                indexAxis: 'y',
                responsive: true,
                plugins: { legend: { labels: { color: '#cbd5e1', font: { size: 12 } } } },
                scales: {
                  x: { ticks: { color: '#94a3b8' }, grid: { color: '#2d325055' } },
                  y: { ticks: { color: '#cbd5e1', font: { size: 11 } }, grid: { display: false } },
                },
              }}
            />
            <p className="text-[10px] text-slate-500 text-center mt-3">
              {delitoLabel} · Top 15 comunas · Fuente: Alcaldía de Bucaramanga / datos.gov.co
            </p>
          </>
        )}
      </div>
    </div>
  )
}
