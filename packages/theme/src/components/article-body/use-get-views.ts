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
    if (process.env.SHEET_ID) {
      axios.get(`https://docs.google.com/spreadsheets/d/e/${process.env.SHEET_ID}/pub?gid=674555330&single=true&output=csv`)
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