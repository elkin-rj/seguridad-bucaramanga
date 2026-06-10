import { ComunaData } from './types'

const API_BASE = 'https://www.datos.gov.co/resource/x46e-abhz.json'

function buildURL(anio: string, delito: string, limit = 50): string {
  const conds: string[] = []
  if (delito) conds.push(`delito_solo='${delito}'`)
  if (anio)   conds.push(`a_o_num='${anio}'`)
  const where = conds.length
    ? '&$where=' + encodeURIComponent(conds.join(' AND '))
    : ''
  return (
    API_BASE +
    '?$select=' + encodeURIComponent('nom_com,num_com,count(*) as total') +
    '&$group='  + encodeURIComponent('nom_com,num_com') +
    '&$order='  + encodeURIComponent('total DESC') +
    `&$limit=${limit}` +
    where
  )
}

export async function fetchComunasData(
  anio: string,
  delito: string
): Promise<ComunaData[]> {
  const url = buildURL(anio, delito)
  const resp = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
  return resp.json()
}

export async function fetchComparativo(
  anioA: string,
  anioB: string,
  delito: string
): Promise<[ComunaData[], ComunaData[]]> {
  const [dA, dB] = await Promise.all([
    fetchComunasData(anioA, delito),
    fetchComunasData(anioB, delito),
  ])
  return [dA, dB]
}
