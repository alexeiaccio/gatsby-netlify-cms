import * as React from 'react'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import { useSetState } from 'react-use'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'

import { MetaContext } from '../layout/index'
import { Button } from '../button/index'

import { formStyles, inputStyles, buttonStyles, resultStyles } from './styles'

export function SubscriptionForm() {
  const { location } = React.useContext(MetaContext)
  const [{ msg, result, email, NAME, PATHNAME }, setState] = useSetState({
    email: '',
    NAME: '',
    PATHNAME: location.pathname,
    msg: null,
    result: null,
  })

  const handleChange = e => {
    const { value, id } = e.target
    setState({ [id]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const { msg: error, result } = await addToMailchimp(email, { NAME, PATHNAME })
    const msg = (result === 'success') ?
      'Вы подписаны на обновления ·К·Р·А·П·И·В·А·'
      :
      error || 'Ошибка'
    setState({ msg, result, email: '', NAME: '' })
  }

  return (
    <form
      css={formStyles}
      onSubmit={handleSubmit}
    >
      <input
        css={inputStyles}
        onChange={handleChange}
        id="NAME"
        placeholder="Ваше имя"
        type="text"
        value={NAME}
      />
      <input
        css={inputStyles}
        onChange={handleChange}
        id="email"
        placeholder="Ваш email"
        type="email"
        value={email}
      />
      <Button
        css={buttonStyles}
        color="#0cf3ad"
        inverted
        contrast
        rounded={0.25}
        type="submit"
      >
        Отправить
        </Button>
      {msg && (
        <div
          css={css`
            ${resultStyles};
            ${result === 'success' ? tw`text-green-600` : tw`text-pink-600`};
          `}
        >
          {msg}
        </div>
      )}
    </form>
  )
}