import { select } from 'd3'

export const useTooltip = () => {
   const Tooltip = () => (
      <div className='Tooltip'>
      </div>
   )
   const showTooltip = (e, svgRef) => {
      const tooltip = select('div.Tooltip')
      tooltip.style('opacity', 0.8)
      tooltip.text(e.target.dataset.state)
      // tooltip positioning
      const { width, height } = svgRef.getBoundingClientRect()
      const xPos = e.clientX < width/2
         ? e.clientX
         : e.clientX - (e.target.dataset.state.length * 10)
      const yPos = e.clientY < height/2
         ? e.clientY + 30
         : e.clientY - 20
      tooltip.style('left', xPos + 'px')
      tooltip.style('top', yPos + 'px')
   }
   const hideTooltip = () => {
      select('div.Tooltip').style('opacity', 0)
   }
   return {
      Tooltip,
      showTooltip,
      hideTooltip
   }
}