import React from 'react'
import { css } from '@emotion/core'
import { compose, lifecycle, pure } from 'recompose'
import { isNull, debounce } from 'lodash'
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
      this.debounsedFetch = debounce(this.fetch, 500)
      this.debounsedFetch(this.props)
    },
    componentDidUpdate(prevProps) {
      this.debounsedFetch.cancel()
      prevProps !== this.props && this.setState({ views: null, burned: null })
      prevProps !== this.props && this.debounsedFetch(this.props)
    },
    componentWillUnmount() {
      this.debounsedFetch.cancel()
    }
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
