import * as React from 'react'
import * as axios from 'axios'
import {
  get, chunk, map, keyBy,
  split, flowRight, drop, parseInt,
} from 'lodash/fp'

import { StateContext } from '../layout/index'

const parseCSV = flowRight(
  keyBy('path'),
  map(x => ({
    path: x[0].replace(/\/+$/g, ''),
    views: parseInt(10, x[1]),
    burns: parseInt(10, x[2]),
  })),
  drop(1),
  chunk(3),
  split(/,/),
  split(/\n/),
  get('data')
)

export function useGetViews() {
  const { views,  setViews } = React.useContext(StateContext)

  const getViews = () => {
    if (meta.clientApi) {
      axios.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vQWl4mxUk47e8inBIEIYYC1P4K9cns_6sqEc-Mxa5j-dHAfAyvPgTLBLW7irATROLWgokETbXSdTpPI/pub?gid=674555330&single=true&output=csv')
        .then(function (response) {
          setViews(parseCSV(response))
        })
        .catch(function (error) {
          setViews(error);
        })
    }
  }

  React.useEffect(() => {
    if (!views) {
      getViews()
    }
  }, [])

  return null;
}