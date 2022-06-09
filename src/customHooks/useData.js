import { useState, useEffect } from 'react'
import { json } from 'd3'
import { feature } from 'topojson-client'

export const useData = () => {
   // world atlas topoJson files - small and medium resolution
   const topoJson110mURL = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json"
   const topoJson50mURL = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json"

   const [data, setData] = useState({})
   const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
      Promise.all([
         json(topoJson110mURL),
         json(topoJson50mURL)
      ]).then(([loResJson, hiResJson]) => {
         const countriesLoRes = loResJson.objects.countries
         const countriesHiRes = hiResJson.objects.countries
         // set state
         setData({
            loResTopology: feature(loResJson, countriesLoRes),
            hiResTopology: feature(hiResJson, countriesHiRes),
         })
         setIsLoading(false)
      })
   }, [isLoading])
   return data
}