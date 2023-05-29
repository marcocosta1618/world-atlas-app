import { useState, useEffect, useRef } from "react";
import { geoOrthographic, geoPath, geoGraticule, select, drag } from "d3";
import { versorDrag } from "../helperFunctions/versorDrag";
import { useTooltip } from "../customHooks/useTooltip";

export const SvgGlobe = ({
    dim,
    topology,
    setTopology,
    loResCountries,
    hiResCountries,
    setCountry,
}) => {
    const [rotation, setRotation] = useState([0, 0, 0]);
    const svgRef = useRef(null);            // (1)
    const { Tooltip, showTooltip, hideTooltip } = useTooltip();

    const projection = geoOrthographic()
        .translate([dim.w / 2, dim.h / 2]) // (2)
        .scale(300)                        // (3)
        .rotate(rotation);
    const path = geoPath(projection);
    const graticule = geoGraticule();

    const { 
        dragStart, 
        dragged, 
        dragEnd 
    } = versorDrag(projection, setRotation, setTopology, loResCountries, hiResCountries);

    useEffect(() => {
        const globe = select('g.globe')
        globe.call(drag() // 2
          .on('start', dragStart)
          .on('drag', dragged)
          .on('end', dragEnd)
       //add support for touch devices here
       )
    }, [dragStart, dragged, dragEnd]);

    return (
        <>
            <Tooltip/>
            <div className='svgContainer'>
                <svg className='GlobeMap'
                    width={dim.w} height={dim.h}
                    viewBox={`0 0 ${dim.w} ${dim.h}`}
                    preserveAspectRatio='xMidYMid meet'
                    ref={svgRef}
                >
                    <g className='globe'
                    // onMouseMove={e => console.log(projection.invert([e.nativeEvent.offsetX, e.nativeEvent.offsetY]))}
                    >
                        {/* Sphere (4) */}
                        <path className='sphere' d={path({ type: 'Sphere' })}></path>
                        {/* Countries */}
                        {topology.features.map(feature => (
                            <path
                                className='country'
                                d={path(feature)}
                                data-state={feature.properties.name}
                                key={feature.properties.name}
                                onClick={() => setCountry(feature.properties.name)}
                                onMouseEnter={e => showTooltip(e, svgRef.current)}
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
        </>
    )
}

/*
(1) Reference to the svg element to calculate its current dims (for Tooltip positioning)
(2) The default translation offset places ⟨0°,0°⟩ at the center of a 960×500 area.
(3) geoOrtographic projection default scale value is 249.5. 
(4) Renders the globe surface passing an object of type 'Sphere' to geoPath.
*/