import * as React from 'react'
import { get, filter, identity, size } from 'lodash'

import { Bunner } from '../bunner/index'
import { MetaContext } from '../layout/index'

export function FooterBunners() {

  const { index, location } = React.useContext(MetaContext)
  const bunners = filter(get(index, 'body', []), x => (
    (get(x, '__typename') === 'PrismicIndexBodyBanner') &&
    (get(x, 'primary.expiredate') <= 0)
  ))
  const getCurrent = max => Math.floor(Math.random() * Math.floor(max))
  const [current, setCurrent] = React.useState(getCurrent(size(bunners)))

  React.useEffect(() => {
    return () => {
      setCurrent(getCurrent(size(bunners)))
    }
  }, [get(location, 'pathname')])

  return (
    <Bunner
      bunner={get(bunners, [current, 'primary'])}
      onClick={identity}
      atFooter
    />
  )
}