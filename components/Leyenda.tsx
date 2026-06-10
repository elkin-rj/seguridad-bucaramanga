'use client'

export default function Leyenda() {
  return (
    <div className="absolute bottom-6 left-3 z-[999] bg-[#1a1d2e] border border-[#2d3250] rounded-xl p-3">
      <h3 className="text-[10px] text-slate-400 uppercase tracking-widest mb-2">
        Intensidad
      </h3>
      <div
        className="w-32 h-2 rounded-full mb-1"
        style={{
          background: 'linear-gradient(to right, #22c55e, #eab308, #f97316, #ef4444)',
        }}
      />
      <div className="flex justify-between text-[10px] text-slate-500">
        <span>Menor</span>
        <span>Mayor</span>
      </div>
    </div>
  )
}
