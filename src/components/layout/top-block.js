import React, { PureComponent, createRef } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import { css } from '@emotion/core'

import { ButtonOutlinedBlock } from '../elements/buttons'
import Link from '../elements/link'

const divStyles = css`
  ${tw(['p-q12', 'overflow-hidden', 'w-full'])};
  box-sizing: border-box;
  will-change: height;
`

const wrapperStyles = css`
  ${tw([
    'flex',
    'flex-row',
    'flex-wrap',
    'items-center',
    'justify-between',
    'md:flex-no-wrap',
  ])};
`

const supportStyles = css`
  ${tw([
    'bg-green',
    'border-none',
    'font-montserrat',
    'font-medium',
    'inline-flex',
    'items-center',
    'justify-center',
    'mx-q4',
    'my-q24',
    'outline-none',
    'px-q24',
    'py-q12',
    'rounded-lg',
    'text-black',
    'text-md',
    'uppercase',
    'sm:my-0',
    'hover:bg-black',
    'hover:text-green',
    'md:hover:bg-white',
    'md:hover:text-black',
  ])};
`

const buttonStyles = css`
  ${tw(['ml-auto', 'mr-q12'])};
`

class TopBlock extends PureComponent {
  static propTypes = {
    scroll: PropTypes.number,
  }

  static defaultProps = {
    scroll: null,
  }

  constructor() {
    super()
    this.topRef = createRef()
    this.state = {
      topHeight: null,
    }
  }

  componentDidMount() {
    if (this.topRef.current && this.state.topHeight === null) {
      this.setState({
        topHeight: this.topRef.current.getBoundingClientRect().height,
      })
    }
  }

  handleSubscribe = e => {
    console.log(e)
  }

  renderButton(link, text) {
    const isDocument = get(link, 'document')
    const LinkButton = isDocument
      ? ButtonOutlinedBlock.withComponent(Link)
      : ButtonOutlinedBlock.withComponent('a')

    return isDocument ? (
      <LinkButton
        css={buttonStyles}
        target={get(link, 'target')}
        to={get(link, 'document[0].fields.slug', '/')}
      >
        {text}
      </LinkButton>
    ) : (
      <LinkButton
        css={buttonStyles}
        href={get(link, 'url')}
        target={get(link, 'target')}
      >
        {text}
      </LinkButton>
    )
  }

  render() {
    const { topHeight } = this.state
    const { scroll } = this.props
    const minusScroll = num =>
      `${num + scroll < 0 ? 0 : num + scroll >= num ? num : num + scroll}px`

    return scroll !== null ? (
      <div
        css={css`
          ${divStyles};
          height: ${minusScroll(topHeight)};
        `}
        ref={this.topRef}
      >
        <div css={wrapperStyles}>
          <div
            css={css`
              ${tw(['font-montserrat', 'font-semibold', 'mr-auto'])};
              font-variant: small-caps;
            `}
          >
            <a
              href="mailto:krapiva@krapiva.org"
              rel="noopener noreferrer"
              target="_blank"
            >
              MAIL
            </a>
            <span>{' · '}</span>
            <a
              href="https://www.facebook.com/krapivapiter"
              rel="noopener noreferrer"
              target="_blank"
            >
              FB
            </a>
            <span>{' · '}</span>
            <a
              href="https://vk.com/krapiva_piter"
              rel="noopener noreferrer"
              target="_blank"
            >
              VK
            </a>
          </div>
          <a
            css={supportStyles}
            href="https://money.yandex.ru/to/410012396039377"
            rel="noopener noreferrer"
            target="_blank"
          >
            Поддержать
          </a>
          <ButtonOutlinedBlock
            css={css`
              ${tw(['ml-auto'])};
            `}
            onClick={this.handleSubscribe}
          >
            Подписаться
          </ButtonOutlinedBlock>
        </div>
      </div>
    ) : null
  }
}

export default TopBlock
