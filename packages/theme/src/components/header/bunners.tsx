import * as React from 'react'
import { get, filter } from 'lodash'
import { useLocalStorage } from 'react-use'

import { Bunner } from '../bunner/index'
import { MetaContext } from '../layout/index'

interface HeaderBunnersProps {
  sticked: boolean
}

export function HeaderBunners({ sticked }: HeaderBunnersProps) {
  if (sticked) { return null }

  const { index } = React.useContext(MetaContext)
  const bunners = filter(get(index, 'body', []), x => (
    (get(x, '__typename') === 'PrismicIndexBodyBanner') &&
    (get(x, 'primary.expiredate') <= 0)
  ))
  const [current, setCurrent] = useLocalStorage('bunner', 0)

  React.useEffect(() => {
    return () => {
      setCurrent(0)
    }
  }, [])

  const handleClick = () => {
    setCurrent(current + 1)
  }

  return (
    <div>
      <Bunner
        bunner={get(bunners, [current, 'primary'])}
        onClick={handleClick}
      />
    </div>
  )
}