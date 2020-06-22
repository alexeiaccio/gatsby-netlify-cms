import * as React from 'react'
import { get, filter } from 'lodash'
import { css } from '@emotion/core'
import {
  useLockBodyScroll,
  useToggle,
  useLocalStorage,
  useClickAway,
} from 'react-use'

import { Bunner } from '../bunner/index'
import { MetaContext } from '../layout/index'

const Bunners = React.memo(function Bunners() {
  const { index, location } = React.useContext(MetaContext)
  const bunners = filter(
    get(index, 'body', []),
    x =>
      get(x, '__typename') === 'PrismicIndexBodyBanner' &&
      get(x, 'primary.expiredate') <= 0
  )
  const [current, setCurrent] = useLocalStorage('current-banner', 0)
  const [locked, toggleLocked] = useToggle(bunners.length > 0)
  useLockBodyScroll(locked)
  const ref = React.useRef(null)

  const handleClick = () => {
    toggleLocked(false)
    setCurrent(current + 1)
  }

  useClickAway(ref, () => {
    handleClick()
  })

  if (!get(bunners, [current, 'primary'])) {
    return null
  }

  return (
    <div
      className="fixed inset-0 overflow-y-auto p-8"
      css={css`
        z-index: 10000;
      `}
    >
      <div className="fixed inset-0 bg-black opacity-75 cursor-pointer" />
      <div className="p-8" ref={ref}>
        <Bunner
          bunner={get(bunners, [current, 'primary'])}
          onClick={handleClick}
        />
      </div>
    </div>
  )
})

export { Bunners }
