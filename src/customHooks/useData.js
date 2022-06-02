import { useState, useEffect } from 'react'
import { json } from 'd3'
import { feature } from 'topojson-client'

export const useData = () => {
   // world atlas topoJson files - small and medium resolution
   const topoJson110mURL = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json"
   const topoJson50mURL = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json"

   const [data, setData] = useState({})

   useEffect(() => {
      // fetch topoJsons, convert them to geoJson, and save them as state,
      // along a randomly choosen country for the first render
      Promise.all([
         json(topoJson110mURL),
         json(topoJson50mURL)
      ]).then(([lowResJson, highResJson]) => {
         const countriesLowRes = lowResJson.objects.countries
         const countriesHighRes = highResJson.objects.countries
         // pick a random country
         const randIdx = Math.round(Math.random() * countriesHighRes.geometries.length)
         const initCountry = countriesHighRes.geometries[randIdx].properties.name
         // set state
         setData({
            lowResTopology: feature(lowResJson, countriesLowRes),
            highResTopology: feature(highResJson, countriesHighRes),
            initCountry
         })
      })
   }, [])

   return data
}