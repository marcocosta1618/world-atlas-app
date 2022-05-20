import { select } from 'd3'

export const useTooltip = () => {
   const Tooltip = () => (
      <div className='Tooltip'>
      </div>
   )
   const showTooltip = e => {
      const tooltip = select('div.Tooltip')
      tooltip.style('opacity', 0.5)
      tooltip.text(e.target.dataset.state)
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