import * as React from 'react'
import * as axios from 'axios'
import { get } from 'lodash'

import { MetaContext, StateContext } from '../layout/index'

import { Burn } from '../burn/index'

export function FooterBurn() {
  const { views, setViews } = React.useContext(StateContext)
  const { location, meta } = React.useContext(MetaContext)
  const pathname = get(location, 'pathname', '//').replace(/\/$/, '')
  const defaultViews = {
    path: pathname,
    views: 0,
    burns: 0,
  }

  const handleBurn = () => {
    axios.get(`${meta.clientApi}/counter?path=${pathname}/&view=0&burned=1`)
      .then(function () {
        setViews({
          ...views,
          [pathname]: {
            ...get(views, [pathname], defaultViews),
            burns: get(views, [pathname, 'burns'], 0) + 1,
          },
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  return (
    <Burn
      onClick={handleBurn}
      count={get(views, [pathname, 'burns'], 0)}
    />
  )
}
