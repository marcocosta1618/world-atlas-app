import wiki from "wikipedia"
import { useState, useEffect, useRef } from "react"
import { handleNames } from "./helperFunctions/handleNames"
import { filterImages } from "./helperFunctions/filterImages"

export const WikiData = ({ country }) => {

   const [summary, setSummary] = useState(null)
   const [images, setImages] = useState(null)

   const wikiDataDiv = useRef(null)

   useEffect(() => {
      async function fetchWikiData(searchStr) {
         // console.log(searchStr)
         // scroll to top when clicking on a country 
         const scrollToTop = {top: 0, behavior: 'smooth'}
         wikiDataDiv.current && wikiDataDiv.current.scroll(scrollToTop)
         try {
            const search = await wiki.search(searchStr, { limit: 1 })
            const page = await wiki.page(search.results[0].pageid)
            const summary = await page.summary()
            const images = await page.images({ limit: 12 })
            setSummary(summary)
            setImages(filterImages(images).slice(0, 6))
         } catch (error) {
            console.log(error)
            return (
               <div className='WikiData'>
                  <h3>Something went wrong, try again...</h3>
               </div>
            )
         }
      }
      fetchWikiData(handleNames(country))
   }, [country])

   if (!(summary || images)) {
      return null
   }
   return (
      <div className='WikiData' ref={wikiDataDiv}>
         <h2>{summary.title}</h2>
         <h3>{summary.description}</h3>
         <p className='coord'>
            <strong>Coordinates:</strong>
            {summary.coordinates
               ? ` latitude: ${summary.coordinates.lat}, longitude: ${summary.coordinates.lon}.`
               : ` not found`
            }
         </p>
         <img className='countryFlag' alt={`${handleNames(country)} flag.`} src={summary.thumbnail.source}></img>
         <p className='summary'>{summary.extract}</p>
         {images.map(img => 
            <div className='imgContainer' key={img.url}>
               <img className='countryImg' width='300' height='auto' alt={img.title} src={img.url}></img>
               <p>{img.title.replace('File:', '')}</p>
            </div>
         )}
      </div>
   )
}