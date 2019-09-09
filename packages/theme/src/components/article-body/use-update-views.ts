import * as React from 'react'
import * as axios from 'axios'
import { get } from 'lodash'
import { useUpdateEffect } from 'react-use'

import { MetaContext, StateContext } from '../layout/index'

export function useUpdateViews(update: boolean) {
  const { views, setViews } = React.useContext(StateContext)
  const { location } = React.useContext(MetaContext)
  const pathname = get(location, 'pathname', '//').replace(/\/$/, '')
  const [done, setDone] = React.useState(false)
  const defaultViews = {
    path: pathname,
    views: 0,
    burns: 0,
  }

  useUpdateEffect(() => {
    if (update && !done) {
      axios.get(`${process.env.SLS_API}/counter?path=${pathname}/&view=1&burned=0`)
      .then(function () {
        setDone(true)
        setViews({
          ...views,
          [pathname]: {
            ...get(views, [pathname], defaultViews),
            views: get(views, [pathname, 'views'], 0) + 1,
          },
        })
      })
      .catch(function (error) {
        console.log(error);
      })
    }
  }, [update])

  useUpdateEffect(() => {
    return () => {
      if (done) {
        setDone(false)
      }
    }
  }, [pathname])

  return false
}
