/* global tw */
import React, { Component } from 'react'
import { css } from 'react-emotion'
import { add, isNull } from 'lodash'
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
  }
  async burn() {
    fetch(
      `${process.env.SLS ||
        'https://ndfukiacve.execute-api.us-east-1.amazonaws.com/dev/'}counter?path=${this.props.location.pathname.replace(
        /\/$/,
        ''
      )}/&view=0&burned=1`
    )
      .then(res => console.log('parsing done', res))
      .catch(error => console.log('parsing failed', error))

    const get = await fetch(
      `${process.env.SLS ||
        'https://ndfukiacve.execute-api.us-east-1.amazonaws.com/dev/'}get`
    )
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
          ${tw(['flex', 'items-center', 'justify-center', 'my-q72', 'w-full'])};
        `}
      >
        <div
          className={css`
            ${tw([
              'border-2',
              'border-solid',
              'cursor-pointer',
              'flex',
              'items-center',
              'h-q64',
              'justify-center',
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
          onMouseUp={() => {
            this.count(1)
            this.click(true)
            this.burn()
            setTimeout(() => this.click(false), 2000)
          }}
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
        </div>
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
    )
  }
}
