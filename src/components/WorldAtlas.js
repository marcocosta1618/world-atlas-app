import { useState, useEffect, useRef } from "react"
import { useData } from "../customHooks/useData"
import { WikiData } from "./WikiData"
import { geoOrthographic, geoPath, geoGraticule, select, drag } from "d3"
import { useTooltip } from "../customHooks/useTooltip"
import { versorDrag } from "../helperFunctions/versorDrag"

export const WorldAtlas = ({ dim }) => {
   // eslint-disable-next-line
   const [isLoading, setIsLoading] = useState(true) // 1
   const { geoData, initCountry } = useData()
   const [country, setCountry] = useState(null)
   const [rotation, setRotation] = useState([0, 0, 0])

   useEffect(() => { // 1
      setIsLoading(false)
   }, [geoData])

   const svgRef = useRef()
   const { Tooltip, showTooltip, hideTooltip } = useTooltip()

   const projection = geoOrthographic()
      .translate([dim.w / 2, dim.h / 2]) // 2
      .scale(300)                        // 3
      .rotate(rotation)
   const path = geoPath(projection)
   const graticule = geoGraticule()

   // rotate the globe (D3 drag and versor pkg update rotation state)
   const { dragStart, dragged, dragEnd } = versorDrag(projection, setRotation)

   const globe = select('g.globe')

   globe.call(drag() // 1
      .on('start', dragStart)
      .on('drag', dragged)
      .on('end', dragEnd)
   )
   // (add support for touch devices)

   // render
   if (!(geoData || initCountry)) {
      return (
         <div className='layout'>'Loading...'</div>
      )
   }
   return (
      <div className='layout'>
         <Tooltip />
         <div className='svgContainer'>
            <svg className='GlobeMap'
               width={dim.w} height={dim.h}
               viewBox={`0 0 ${dim.w} ${dim.h}`}
               preserveAspectRatio='xMidYMid meet'
               ref={svgRef}
            >
               <g className='globe'>
                  {/* Sphere */}
                  <path className='sphere' d={path({ type: 'Sphere' })}></path> {/* 4 */}
                  {/* Countries */}
                  {geoData.features.map(feature => (
                     <path
                        className='country'
                        d={path(feature)}
                        data-state={feature.properties.name}
                        key={feature.properties.name}
                        onClick={() => {
                           setCountry(feature.properties.name);
                        }}
                        onMouseEnter={e => showTooltip(e, svgRef.current, dim)}
                        onMouseLeave={e => hideTooltip(e)}
                     >
                        {/* <title>{feature.properties.name}</title> */}
                     </path>
                  ))}
                  {/* <path d={path({ type: 'Point', coordinates: [0, 0] })} /> */}
                  {/* Meridians and Parallels graticule */}
                  <path className='graticule' d={path(graticule())}></path>
               </g>
            </svg>
         </div>
         <WikiData country={country ?? initCountry}></WikiData>
      </div>
   )
}

/*
1) Forcing a re-render with a dummy state for lines 38-44 (which assign D3 drag behavior to 'globe' selection) 
   to have an effect ('globe' is null after the first render)
2) The default translation offset places ⟨0°,0°⟩ at the center of a 960×500 area.
3) geoOrtographic projection default scale value is 249.5.
4) Renders the globe surface passing an object of type 'Sphere' to geoPath 
*/