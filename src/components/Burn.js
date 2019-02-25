/* global tw */
import React, { Component } from 'react'
import { css } from 'react-emotion'
import { add, throttle, isNull, debounce } from 'lodash'
import 'whatwg-fetch'

import { AppearSpan } from './Appear'
import { BurnDefs } from './BurnDefs'
import { Fly } from './Fly'

export class Burn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      burned: null,
      clickCount: 0,
      clicked: false,
    }
    this.burn = debounce(this.burn, 1000)
  }

  async burn() {
    fetch(
      `${'https://ndfukiacve.execute-api.us-east-1.amazonaws.com/dev/'}counter?path=${this.props.location.pathname.replace(
        /\/$/,
        ''
      )}/&view=0&burned=1`
    , { mode: 'no-cors'})
      .then(res => console.log('parsing done', res))
      .catch(error => console.log('parsing failed', error))

    const get = await fetch(
      `${'https://ndfukiacve.execute-api.us-east-1.amazonaws.com/dev/'}get`
    , { mode: 'no-cors'})
      .then(res => res.json())
      .then(json => json.values)
      .then(arr =>
        arr.filter(
          x => x[0] === `${this.props.location.pathname.replace(/\/$/, '')}/`
        )
      )
      .then(cont => cont[0])
      .then(data => add(Number(data[2]), 1))
      .catch(error => console.log('parsing failed', error))

    this.setState({ burned: await get })
  }

  count(value) {
    this.setState({ clickCount: add(this.state.clickCount, value) })
  }

  click(value) {
    this.setState({ clicked: value })
  }

  componentDidUpdate(prevProps) {
    prevProps.location.pathname !== this.props.location.pathname &&
      this.setState({ burned: null, clickCount: 0 })
  }

  render() {
    const { burned, clicked, clickCount } = this.state

    return (
      <div
        className={css`
          ${tw([
            'flex',
            'flex-col',
            'sm:flex-row',
            'items-center',
            'justify-center',
            'my-q72',
            'md:my-q112',
            'w-full',
          ])};
        `}
      >
        <div
          className={css`
            ${tw(['font-montserrat', 'text-body', 'text-right'])};
          `}
        >
          Понравилось?
          <span
            className={css`
              ${tw(['hidden', 'md:inline-block'])};
            `}
          >
            →
          </span>
        </div>
        <div
          className={css`
            ${tw([
              'flex',
              'flex-row',
              'items-center',
              'justify-center',
              'mx-q24',
              'md:mx-q36',
              'my-q24',
              'md:my-0',
            ])};
          `}
        >
          <button
            className={css`
              ${tw([
                'border-2',
                'border-solid',
                'cursor-pointer',
                'flex',
                'flex-no-shrink',
                'flex-row',
                'items-center',
                'h-q64',
                'justify-center',
                'outline-none',
                'relative',
                'rounded-full',
                'w-q64',
              ])};
              ${clicked
                ? tw([
                    'bg-red-lightest',
                    'hover:bg-red-lightest',
                    'border-red-lighter',
                    'hover:border-red-lighter',
                  ])
                : tw([
                    'bg-green',
                    'hover:bg-black',
                    'border-green-darker',
                    'hover:border-black',
                  ])};
              transition: all 400ms ease-in-out;
              & svg {
                * {
                  transition: all 400ms ease-in-out;
                }
                #leaf {
                  opacity: ${clicked ? 0 : 1};
                }
                #shadow {
                  fill: ${clicked && '#ff7e9d'};
                }
              }
              &:hover svg {
                #leaf {
                  transform: ${!clicked &&
                    'rotateZ(-15deg) translate(-11px, 4px)'};
                }
                #leaf-fill {
                  fill: ${!clicked && '#0cf3ad'};
                }
                #shadow {
                  fill: ${!clicked && '#ffffff'};
                }
              }
              &:active {
                background-color: #ffceda;
                border-color: #ff7e9d;
                & svg {
                  #leaf {
                    transform: ${!clicked && 'rotateZ(0deg) translate(0, 0)'};
                  }
                  #shadow {
                    fill: ${!clicked && '#ff7e9d'};
                  }
                }
              }
            `}
            onMouseUp={throttle(
              () => {
                this.count(1)
                this.click(true)
                this.burn()
                setTimeout(() => this.click(false), 2000)
              },
              2000,
              { trailing: false }
            )}
            title={'Прижги!'}
          >
            <svg
              width="42"
              height="50"
              viewBox="0 0 42 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <use id="shadow" xlinkHref="#fill" />
              <g id="leaf">
                <use id="leaf-fill" xlinkHref="#fill" fill="#ffffff" />
                <use id="leaf-stroke" xlinkHref="#stroke" fill="#067352" />
              </g>
              <BurnDefs />
            </svg>
            <Fly inProp={clicked}>
              <span
                className={css`
                  ${tw([
                    'font-montserrat',
                    'font-semibold',
                    'text-body',
                    'text-red-lighter',
                  ])};
                `}
              >
                {`+${clickCount}`}
              </span>
            </Fly>
          </button>
          <AppearSpan inProp={!isNull(burned)}>
            <span
              className={css`
                ${tw(['font-montserrat', 'font-semibold', 'ml-q8', 'text-sm'])};
                ${clicked && tw(['text-red-lightest'])};
                transition: all 200ms ease-in-out;
              `}
            >
              {burned}
            </span>
          </AppearSpan>
        </div>
        <div
          className={css`
            ${tw(['font-montserrat', 'text-body'])};
          `}
        >
          <span
            className={css`
              ${tw(['hidden', 'md:inline-block'])};
            `}
          >
            ←
          </span>
          Прижги!
        </div>
      </div>
    )
  }
}
