import React, { PureComponent } from 'react'
import get from 'lodash/get'
import { css } from '@emotion/core'

import { ButtonOutlinedBlock } from '../elements/buttons'
import Link from '../elements/link'

const wrapperStyles = css`
  ${tw([
    'flex',
    'flex-row',
    'flex-wrap',
    'items-center',
    'justify-between',
    'p-q12',
    'select-none',
    'text-xs',
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
    return (
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
    )
  }
}

export default TopBlock
