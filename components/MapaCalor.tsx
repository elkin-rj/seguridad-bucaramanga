'use client'

import { useEffect, useRef } from 'react'
import { ComunaData } from '@/lib/types'
import { BGA_CENTER, getCoords, colorPorIntensidad } from '@/lib/comunas'

type TileMode = 'oscuro' | 'claro'

const TILE_URLS: Record<TileMode, string> = {
  oscuro: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  claro:  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
}

interface Props {
  datos: ComunaData[]
  modoMapa: TileMode
  anio: string
}

export default function MapaCalor({ datos, modoMapa, anio }: Props) {
  const mapRef      = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<any>(null)
  const heatRef     = useRef<any>(null)
  const markersRef  = useRef<any[]>([])
  const tileRef     = useRef<any>(null)
  const primeraVez  = useRef(true)

  // Inicializar mapa
  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current || mapInstance.current) return
    const L = require('leaflet')
    require('leaflet.heat')

    const map = L.map(mapRef.current, {
      center: BGA_CENTER,
      zoom: 13,
      zoomSnap: 0.25,
      zoomDelta: 0.5,
      wheelPxPerZoomLevel: 100,
    })

    tileRef.current = L.tileLayer(TILE_URLS.oscuro, {
      attribution: '© OpenStreetMap © CARTO',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map)

    mapInstance.current = map
  }, [])

  // Cambiar tile
  useEffect(() => {
    if (!mapInstance.current) return
    const L = require('leaflet')
    if (tileRef.current) mapInstance.current.removeLayer(tileRef.current)
    tileRef.current = L.tileLayer(TILE_URLS[modoMapa], {
      attribution: '© OpenStreetMap © CARTO',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(mapInstance.current)
  }, [modoMapa])

  // Actualizar datos
  useEffect(() => {
    if (!mapInstance.current || !datos.length) return
    const L = require('leaflet')
    const map = mapInstance.current

    if (heatRef.current) map.removeLayer(heatRef.current)
    markersRef.current.forEach(m => map.removeLayer(m))
    markersRef.current = []

    const maxTotal = Math.max(...datos.map(d => parseFloat(d.total) || 0))
    const heatPts: [number, number, number][] = []
    const newMarkers: any[] = []

    datos.forEach(d => {
      const total  = parseFloat(d.total) || 0
      const coords = getCoords(d.nom_com)
      const intens = total / maxTotal
      const color  = colorPorIntensidad(intens)

      const puntos = Math.min(Math.ceil(intens * 60), 60)
      for (let i = 0; i < puntos; i++) {
        const j = () => (Math.random() - 0.5) * 0.006
        heatPts.push([coords[0] + j(), coords[1] + j(), intens])
      }

      const marker = L.circleMarker(coords, {
        radius: 8 + intens * 22,
        fillColor: color,
        fillOpacity: 0.75,
        color: '#fff',
        weight: 1.2,
      }).addTo(map)

      marker.bindPopup(`
        <div style="font-family:system-ui;padding:4px;min-width:150px">
          <strong style="font-size:13px">${d.nom_com || 'Sin nombre'}</strong><br/>
          <span style="color:#888;font-size:11px">Comuna ${d.num_com || '?'}</span><br/><br/>
          <span style="font-size:22px;font-weight:700;color:${color}">
            ${Math.round(total).toLocaleString('es-CO')}
          </span>
          <span style="font-size:11px;color:#888"> eventos ${anio || 'totales'}</span>
        </div>
      `)
      newMarkers.push(marker)
    })

    if (typeof L.heatLayer === 'function' && map.getSize().y > 0) {
      heatRef.current = L.heatLayer(heatPts, {
        radius: 38, blur: 28, maxZoom: 17,
        gradient: { 0.0: '#22c55e', 0.4: '#eab308', 0.7: '#f97316', 1.0: '#ef4444' },
      }).addTo(map)
    }

    markersRef.current = newMarkers

    if (!primeraVez.current && newMarkers.length > 0) {
      const group = L.featureGroup(newMarkers)
      map.flyToBounds(group.getBounds().pad(0.15), { duration: 1.0, easeLinearity: 0.25 })
    }
    primeraVez.current = false
  }, [datos, anio])

  return <div ref={mapRef} className="absolute inset-0" />
}
