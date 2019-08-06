/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import PropTypes from 'prop-types'
import tw from 'tailwind.macro'

/**
 * 
 * @param {{ angle?: number, fill?: string, height?: number, stroke?: string, width?: number }} props 
 */

function Logo({ angle = 90, fill = '#0cf3ad', height = 60, stroke, width }) {
  return (
    <div
      css={css`
        ${tw`flex items-center justify-center`};
        height: ${width || height}px;
        width: ${width || height}px;
      `}
    >
      <svg
        css={css`
          ${stroke ? tw`stroke-current` : tw`fill-current`};
          color: ${stroke || fill};
          transform: rotateZ(${angle}deg);
        `}
        width="100%"
        height="50%"
        viewBox="0 0 60 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 30L0 18V0L12 12L24 0L36 12L48 0L60 12V30L48 18L36 30L24 18L12 30Z" />
      </svg>
    </div>
  )
}

Logo.propTypes = {
  angle: PropTypes.number,
  fill: PropTypes.string,
  height: PropTypes.number,
  stroke: PropTypes.string,
  width: PropTypes.number,
}

export default Logo
