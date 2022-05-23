import { useState, useEffect } from 'react'
import { json } from 'd3'
import { feature } from 'topojson-client'

export const useData = () => {
   // world atlas topoJson file - smallest resolution
   // other res: https://unpkg.com/browse/world-atlas@2.0.2/
   const topoJsonURL = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json"

   const [data, setData] = useState({})

   useEffect(() => {
      // fetch topoJsonURL, convert it to geoJson, and save it as state,
      // along a randomly choosen country for the first render
      json(topoJsonURL).then(topoJsonData => {
         const { countries } = topoJsonData.objects
         // random country
         const randIdx = Math.round(Math.random() * countries.geometries.length)
         const initCountry = countries.geometries[randIdx].properties.name
         setData({
            geoData: feature(topoJsonData, countries),
            initCountry
         })
      })
   }, [])
   return data
}