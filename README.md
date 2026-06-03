# 🔥 Mapa de Calor Delictivo — Bucaramanga

Aplicación web interactiva que visualiza la información delictiva del municipio de Bucaramanga mediante un **mapa de calor georreferenciado**, construida íntegramente con datos abiertos oficiales.

🔗 **Dataset:** [Información delictiva del municipio de Bucaramanga](https://www.datos.gov.co/Seguridad-y-Defensa/Informaci-n-delictiva-del-municipio-de-Bucaramanga/x46e-abhz) — Alcaldía de Bucaramanga / datos.gov.co

---

## 📌 Descripción

Este proyecto forma parte de una iniciativa de emprendimiento basada en **datos abiertos colombianos**, con el objetivo de transformar información pública en herramientas de análisis ciudadano accesibles y comprensibles.

La aplicación permite a ciudadanos, investigadores y entidades públicas explorar la distribución geográfica de la criminalidad en Bucaramanga, filtrar por tipo de delito y año, e identificar tendencias históricas por comuna.

---

## 🎯 Funcionalidades

- 🗺️ **Mapa de calor interactivo** por comunas de Bucaramanga
- 🔍 **Filtros en tiempo real** por tipo de delito y año (2016–2026)
- 📊 **Gráfico comparativo** entre dos años seleccionados
- 🏆 **Ranking Top 10** de comunas con mayor incidencia
- 🌙 **Modo oscuro / claro** del mapa base
- 📡 **Conexión directa** a la API Socrata de datos.gov.co (sin descargas)
- 📍 Popups informativos por comuna con número de eventos

---

## 🛠️ Stack tecnológico

| Tecnología | Uso |
|---|---|
| [Next.js 16](https://nextjs.org/) | Framework React con App Router |
| [TypeScript](https://www.typescriptlang.org/) | Tipado estático |
| [React-Leaflet](https://react-leaflet.js.org/) | Mapa interactivo |
| [Leaflet.heat](https://github.com/Leaflet/Leaflet.heat) | Capa de calor |
| [Chart.js](https://www.chartjs.org/) | Gráficos comparativos |
| [Tailwind CSS](https://tailwindcss.com/) | Estilos utilitarios |
| [Socrata API](https://dev.socrata.com/) | Consumo de datos abiertos |

---

## 📊 Fuente de datos

| Campo | Detalle |
|---|---|
| **Dataset** | Información delictiva del municipio de Bucaramanga |
| **Proveedor** | Alcaldía de Bucaramanga |
| **Portal** | datos.gov.co |
| **Registros** | ~130.000 eventos (Enero 2016 – Marzo 2026) |
| **Actualización** | Mayo 2026 |
| **Licencia** | Datos Abiertos Colombia |

---

## 🚀 Instalación y uso local

```bash
# Clonar el repositorio
git clone https://github.com/elkin-rj/seguridad-bucaramanga.git
cd seguridad-bucaramanga

# Instalar dependencias
npm install

# Correr en desarrollo
npm run dev -- -p 3001
```

Abre [http://localhost:3001](http://localhost:3001) en tu navegador.

---

## 📁 Estructura del proyecto

```
seguridad-bucaramanga/
├── app/                    # Páginas y layout (Next.js App Router)
├── components/             # Componentes React
│   ├── MapaCalor.tsx       # Mapa Leaflet + heat layer
│   ├── Controles.tsx       # Filtros interactivos
│   ├── PanelComunas.tsx    # Ranking Top 10
│   ├── ModalComparador.tsx # Gráfico comparativo
│   └── Leyenda.tsx         # Escala de intensidad
└── lib/                    # Lógica de negocio
    ├── api.ts              # Llamadas a Socrata API
    ├── comunas.ts          # Coordenadas geográficas
    └── types.ts            # Interfaces TypeScript
```

---

## 🗺️ Hallazgos preliminares

Del análisis exploratorio de los datos:

- Las comunas **Oriental** y **San Francisco** concentran históricamente el mayor número de eventos delictivos
- La criminalidad general muestra una **tendencia a la baja** desde 2021
- **Hurto a personas** es el delito más frecuente en todas las comunas
- La **Comuna Norte** lidera consistentemente en homicidios desde 2018

---

## 🌐 Contexto del proyecto

Este desarrollo es parte de **ZoneData / GeoCol**, una iniciativa de emprendimiento personal orientada a:

- Democratizar el acceso a datos públicos colombianos mediante visualizaciones interactivas
- Publicar herramientas en el portal [datos.gov.co](https://herramientas.datos.gov.co/usos)
- Participar en concursos de innovación con datos abiertos

**Proyectos relacionados:**
- [GeoCol Santander](https://github.com/elkin-rj) — Geolocalización de colegios públicos de Bucaramanga

---

## 👤 Autor

**Elkin** — Desarrollador de software & analista de datos  
Bucaramanga, Santander, Colombia  
Ingeniero de Sistemas · Magíster en Gestión de TI · Scrum Master

[![GitHub](https://img.shields.io/badge/GitHub-elkin--rj-181717?logo=github)](https://github.com/elkin-rj)

---

## 📄 Licencia

Este proyecto utiliza datos bajo licencia abierta de la Alcaldía de Bucaramanga a través de datos.gov.co.  
El código fuente está disponible bajo licencia [MIT](LICENSE).
