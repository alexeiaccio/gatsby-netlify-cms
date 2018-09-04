/* global tw */
import React from 'react'
import { css } from 'react-emotion'
import { lifecycle } from 'recompose'
import 'whatwg-fetch'

export const Views = lifecycle({
  state: {
    views: 0,
    burned: 0,
  },
  componentDidMount() {
    fetch(
      `${process.env.SLS ||
        'https://ndfukiacve.execute-api.us-east-1.amazonaws.com/dev/'}get`,
      {
        mode: 'no-cors',
      }
    )
      .then(response => console.log('parsed json', response))
      .catch(error => console.log('parsing failed', error))
    return false //({views, burned})
  },
})(({ views, burned }) => (
  <span
    className={css`
      ${tw([''])};
    `}
  >
    {views}
  </span>
))
