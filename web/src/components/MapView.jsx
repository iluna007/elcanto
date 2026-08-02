import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import MapboxWorker from 'mapbox-gl/dist/mapbox-gl-csp-worker?worker'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useLanguage } from '../i18n/LanguageContext'
import { getLocalizedProperty } from '../i18n/helpers'
import {
  MAPBOX_STYLE,
  MAPBOX_TOKEN,
  MAP_CENTER,
  MAP_BOUNDS,
  MAP_ZOOM,
  properties,
} from '../data/properties'

mapboxgl.workerClass = MapboxWorker
mapboxgl.accessToken = MAPBOX_TOKEN

const SOURCE_ID = 'properties-source'
const FILL_LAYER_ID = 'properties-fill'
const GLOW_LAYER_ID = 'properties-glow'
const LINE_LAYER_ID = 'properties-outline'
const BOUNDS_LAYER_ID = 'nav-bounds-outline'

function buildGeoJSON() {
  return {
    type: 'FeatureCollection',
    features: properties.map((property) => ({
      type: 'Feature',
      properties: {
        id: property.id,
        name: property.name,
        description: property.description,
        price: property.price,
        image: property.image,
        link: property.link,
        fillColor: property.fillColor,
        fillHover: property.fillHover,
        lineColor: property.lineColor,
        accentColor: property.accentColor,
        fillOpacity: property.fillOpacity,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [property.polygon],
      },
    })),
  }
}

function buildBoundsGeoJSON() {
  const [[west, south], [east, north]] = MAP_BOUNDS
  return {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [west, south],
          [east, south],
          [east, north],
          [west, north],
          [west, south],
        ],
      ],
    },
  }
}

function MapView() {
  const containerRef = useRef(null)
  const popupRef = useRef(null)
  const popupCtaRef = useRef('')
  const langRef = useRef('es')
  const { t, lang } = useLanguage()

  popupCtaRef.current = t.map.popupCta
  langRef.current = lang

  const buildPopupHTML = (feature) => {
    const { id, name, image, link, lineColor, accentColor } = feature.properties
    const localized = getLocalizedProperty(id, langRef.current)
    const description = localized?.description ?? feature.properties.description
    const price = localized?.price ?? feature.properties.price
    return `
      <div class="map-popup" style="--popup-accent: ${lineColor}; --popup-bg: ${accentColor}">
        <div class="map-popup__accent"></div>
        <img src="${image}" alt="${name}" />
        <h3>${name}</h3>
        <p>${description}</p>
        <p class="map-popup__price">${price}</p>
        <a href="${link}" class="map-popup__link">${popupCtaRef.current}</a>
      </div>
    `
  }

  useEffect(() => {
    if (!containerRef.current) return

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: MAPBOX_STYLE,
      center: [MAP_CENTER.lng, MAP_CENTER.lat],
      zoom: MAP_CENTER.zoom,
      pitch: MAP_CENTER.pitch,
      bearing: MAP_CENTER.bearing,
      antialias: true,
      maxBounds: MAP_BOUNDS,
      minZoom: MAP_ZOOM.min,
      maxZoom: MAP_ZOOM.max,
    })

    map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), 'top-right')
    map.addControl(new mapboxgl.ScaleControl(), 'bottom-left')

    map.on('load', () => {
      map.addSource(SOURCE_ID, {
        type: 'geojson',
        data: buildGeoJSON(),
        promoteId: 'id',
      })

      map.addSource('nav-bounds', {
        type: 'geojson',
        data: buildBoundsGeoJSON(),
      })

      map.addLayer({
        id: BOUNDS_LAYER_ID,
        type: 'line',
        source: 'nav-bounds',
        paint: {
          'line-color': 'rgba(255, 255, 255, 0.35)',
          'line-width': 1.5,
          'line-dasharray': [3, 2],
        },
      })

      map.addLayer({
        id: FILL_LAYER_ID,
        type: 'fill',
        source: SOURCE_ID,
        paint: {
          'fill-color': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            ['get', 'fillHover'],
            ['get', 'fillColor'],
          ],
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            0.62,
            ['get', 'fillOpacity'],
          ],
        },
      })

      map.addLayer({
        id: GLOW_LAYER_ID,
        type: 'line',
        source: SOURCE_ID,
        paint: {
          'line-color': ['get', 'lineColor'],
          'line-width': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            10,
            6,
          ],
          'line-opacity': 0.35,
          'line-blur': 2,
        },
      })

      map.addLayer({
        id: LINE_LAYER_ID,
        type: 'line',
        source: SOURCE_ID,
        paint: {
          'line-color': ['get', 'lineColor'],
          'line-width': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            4,
            2.5,
          ],
          'line-opacity': 1,
        },
      })

      let hoveredId = null

      map.on('mousemove', FILL_LAYER_ID, (event) => {
        if (!event.features?.length) return
        map.getCanvas().style.cursor = 'pointer'
        const featureId = event.features[0].properties.id
        if (hoveredId !== null && hoveredId !== featureId) {
          map.setFeatureState({ source: SOURCE_ID, id: hoveredId }, { hover: false })
        }
        hoveredId = featureId
        map.setFeatureState({ source: SOURCE_ID, id: featureId }, { hover: true })
      })

      map.on('mouseleave', FILL_LAYER_ID, () => {
        map.getCanvas().style.cursor = ''
        if (hoveredId !== null) {
          map.setFeatureState({ source: SOURCE_ID, id: hoveredId }, { hover: false })
          hoveredId = null
        }
      })

      map.on('click', FILL_LAYER_ID, (event) => {
        if (!event.features?.length) return
        const feature = event.features[0]

        popupRef.current?.remove()

        popupRef.current = new mapboxgl.Popup({
          closeButton: true,
          maxWidth: '320px',
          className: 'property-popup',
        })
          .setLngLat(event.lngLat)
          .setHTML(buildPopupHTML(feature))
          .addTo(map)
      })

      map.resize()
    })

    const handleResize = () => map.resize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      popupRef.current?.remove()
      map.remove()
    }
  }, [])

  return <div ref={containerRef} className="map-view" />
}

export default MapView
