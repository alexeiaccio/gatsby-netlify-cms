import React from 'react'

import { popupStyles, fadeStyles} from './styles'

export function Popup(props) {
  return (
    <React.Fragment>
      <div
        css={fadeStyles}
        onClick={props.onClose}
      />
      <div css={popupStyles}>
        {props.children}
      </div>
    </React.Fragment>
  )
}
