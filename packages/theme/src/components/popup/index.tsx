import React from 'react'

import { popupStyles, fadeStyles} from './styles'

export const Popup = React.forwardRef((props: any, ref: any) => {
  return (
    <React.Fragment>
      <div css={fadeStyles} />
      <div css={popupStyles} ref={ref}>
        {props.children}
      </div>
    </React.Fragment>
  )
})
