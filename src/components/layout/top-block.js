import React, { PureComponent } from 'react'
import get from 'lodash/get'
import { css } from '@emotion/core'

import { ButtonOutlinedBlock } from '../elements/buttons'
import Link from '../elements/link'
import Search from './search'

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
    'md:px-q24',
  ])};
`

const buttonStyles = css`
  ${tw([
    'bg-green',
    'border-none',
    'ml-q8',
    'rounded-lg',
    'hover:bg-black',
    'hover:text-green',
    'md:hover:bg-white',
    'md:hover:text-black',
  ])};
`
const searchWrapperStyles = css`
  ${tw(['ml-auto', 'relative'])};
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
    const SupportButton =  ButtonOutlinedBlock.withComponent('a')
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
        <SupportButton
          css={buttonStyles}
          href="https://money.yandex.ru/to/410012396039377"
          rel="noopener noreferrer"
          target="_blank"
        >
          Поддержать
        </SupportButton>
        <ButtonOutlinedBlock
          css={buttonStyles}
          onClick={this.handleSubscribe}
        >
          Подписаться
        </ButtonOutlinedBlock>
        <div css={searchWrapperStyles}>
          <Search />
        </div>
      </div>
    )
  }
}

export default TopBlock
