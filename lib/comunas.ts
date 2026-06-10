export const COMUNAS_COORDS: Record<string, [number, number]> = {
  'ORIENTAL':                [7.1180, -73.1050],
  'SAN FRANCISCO':           [7.0960, -73.1130],
  'CABECERA DEL LLANO':      [7.1295, -73.1030],
  'CENTRO':                  [7.1130, -73.1255],
  'NORTE':                   [7.1510, -73.1175],
  'LA CONCORDIA':            [7.1100, -73.1350],
  'GARCIA ROVIRA':           [7.1190, -73.1270],
  'OCCIDENTAL':              [7.1215, -73.1360],
  'PROVENZA':                [7.1370, -73.1210],
  'NORORIENTAL':             [7.1440, -73.1075],
  'SUR':                     [7.0895, -73.1140],
  'SUR OCCIDENTE':           [7.0975, -73.1370],
  'SUROCCIDENTE':            [7.0975, -73.1370],
  'COMUNEROS':               [7.1240, -73.1170],
  'MORRORICO':               [7.1305, -73.0965],
  'LA CIUDADELA':            [7.1050, -73.1010],
  'CIUDADELA REAL DE MINAS': [7.1050, -73.1010],
  'LA JOYA':                 [7.1130, -73.1400],
  'RICAURTE':                [7.1045, -73.1255],
  'SAN LAZARO':              [7.1340, -73.1095],
  'LAGOS DEL CACIQUE':       [7.1175, -73.1055],
  'CONCORDIA':               [7.1100, -73.1350],
  'MUTIS':                   [7.1420, -73.1150],
  'LA PEDREGOSA':            [7.1350, -73.0940],
  'TEJAR':                   [7.1260, -73.1090],
}

export const BGA_CENTER: [number, number] = [7.1193, -73.1227]

export function getCoords(nombre: string): [number, number] {
  const key = nombre?.toUpperCase().trim()
  return COMUNAS_COORDS[key] ?? BGA_CENTER
}

export function colorPorIntensidad(v: number): string {
  if (v > 0.75) return '#ef4444'
  if (v > 0.50) return '#f97316'
  if (v > 0.25) return '#eab308'
  return '#22c55e'
}
