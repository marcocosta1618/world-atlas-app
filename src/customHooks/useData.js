import { useState, useEffect } from 'react'
import { json } from 'd3'
import { feature } from 'topojson-client'

export const useData = () => {
   // world atlas topoJson files - small and medium resolution
   const topoJson110mURL = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json"
   const topoJson50mURL = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json"

   const [data, setData] = useState({})

   useEffect(() => {
      Promise.all([
         json(topoJson110mURL),
         json(topoJson50mURL)
      ]).then(([loResJson, hiResJson]) => {
         const countriesLoRes = loResJson.objects.countries
         const countriesHiRes = hiResJson.objects.countries
         // pick a random init country
         const randIdx = Math.round(Math.random() * countriesHiRes.geometries.length);
         const initCountry = countriesHiRes.geometries[randIdx].properties.name;
         setData({
            loResCountries: feature(loResJson, countriesLoRes),
            hiResCountries: feature(hiResJson, countriesHiRes),
            initCountry
         })
      })
   }, [])
   return data
}