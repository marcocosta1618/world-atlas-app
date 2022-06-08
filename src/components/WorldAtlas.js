import { useState, useEffect, useRef } from "react"
import { useData } from "../customHooks/useData"
import { geoOrthographic, geoPath, geoGraticule, select, drag } from "d3"
import { useTooltip } from "../customHooks/useTooltip"
import { versorDrag } from "../helperFunctions/versorDrag"
import { WikiData } from "./WikiData"

export const WorldAtlas = ({ dim }) => {
   const { loResTopology, hiResTopology, initCountry, isLoading } = useData()
   const [topology, setTopology] = useState(null)
   const [country, setCountry] = useState(null)
   const [rotation, setRotation] = useState([0, 0, 0])
   const svgRef = useRef() // 1
   const { Tooltip, showTooltip, hideTooltip } = useTooltip()

   useEffect(() => { // 2
      setTopology(hiResTopology)
   }, [isLoading, hiResTopology])

   const projection = geoOrthographic()
      .translate([dim.w / 2, dim.h / 2]) // 3
      .scale(300)                        // 4
      .rotate(rotation)
   const path = geoPath(projection)
   const graticule = geoGraticule()

   // rotate the globe (D3 drag and versor pkg update rotation state and topology used)
   const { dragStart, dragged, dragEnd } = versorDrag(projection, setRotation, setTopology, loResTopology, hiResTopology)

   const globe = select('g.globe')
   globe.call(drag() // 2
      .on('start', dragStart)
      .on('drag', dragged)
      .on('end', dragEnd)
   // (add support for touch devices)
   )

   // render
   if (!topology || isLoading) {
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
                  <path className='sphere' d={path({ type: 'Sphere' })}></path> {/* 5 */}
                  {/* Countries */}
                  {topology.features.map(feature => (
                     <path
                        className='country'
                        d={path(feature)}
                        data-state={feature.properties.name}
                        key={feature.properties.name}
                        onClick={() => setCountry(feature.properties.name)}
                        onMouseEnter={e => showTooltip(e, svgRef.current, dim)}
                        onMouseLeave={e => hideTooltip(e)}
                     >
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
1) A reference to the svg element to calculate its current dims (for positioning the Tooltip)
2) Re-render when data is ready - D3 selection 'globe' (line 31) is null after the first render
3) The default translation offset places ⟨0°,0°⟩ at the center of a 960×500 area.
4) geoOrtographic projection default scale value is 249.5.
5) Renders the globe surface passing an object of type 'Sphere' to geoPath 
*/