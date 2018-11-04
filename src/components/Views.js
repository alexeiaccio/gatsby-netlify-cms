/* global tw */
import React from 'react'
import { css } from 'react-emotion'
import { compose, lifecycle, pure } from 'recompose'
import { isNull } from 'lodash'
import 'whatwg-fetch'

import { AppearSpan } from './Appear'
import burnBlack from '../img/burn-black.svg'
import eyeBlack from '../img/eye-black.svg'

export const Views = compose(
  pure,
  lifecycle({
    state: {
      views: null,
      burned: null,
    },
    fetch(props) {
      fetch(
        `${process.env.SLS ||
          'https://ndfukiacve.execute-api.us-east-1.amazonaws.com/dev/'}get`
      )
        .then(res => res.json())
        .then(json => json.values)
        .then(arr =>
          arr.filter(
            x => x[0] === `${props.location.pathname.replace(/\/$/, '')}/`
          )
        )
        .then(cont => cont[0])
        .then(data => {
          this.setState({ views: data[1], burned: data[2] })
        })
        .catch(error => console.log('parsing failed', error))
    },
    componentDidMount() {
      this.fetch(this.props)
    },
    componentDidUpdate(prevProps) {
      prevProps !== this.props && this.setState({ views: null, burned: null })
      prevProps !== this.props && this.fetch(this.props)
    },
  })
)(({ burned, views }) => (
  <>
    <AppearSpan inProp={!isNull(views)}>
      <span
        className={css`
          ${tw(['ml-q8', 'pl-q24', 'relative'])};
          &::before {
            content: '';
            ${tw([
              'block',
              'absolute',
              'bg-contain',
              'bg-center',
              'bg-no-repeat',
              'h-full',
              'inline-block',
              'pin-l',
              'pin-t',
              'w-q20',
            ])};
            background-image: url(${eyeBlack});
          }
        `}
        title={`${views} просмотр${views < 5 ? views === 1 ? '' : 'a' : 'ов'}`}
      >
        {views}
      </span>
    </AppearSpan>
    <AppearSpan inProp={!isNull(burned)}>
      <span
        className={css`
          ${tw(['ml-q12', 'relative'])};
          padding-left: 1.75rem;
          &::before {
            content: '';
            ${tw([
              'block',
              'absolute',
              'bg-contain',
              'bg-center',
              'bg-no-repeat',
              'h-full',
              'inline-block',
              'pin-l',
              'pin-t',
              'w-q20',
            ])};
            background-image: url(${burnBlack});
          }
        `}
        title={`${burned} раз${burned > 1 && burned < 5 ? 'a' : ''} прижгло`}
      >
        {burned}
      </span>
    </AppearSpan>
  </>
))
