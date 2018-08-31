/* global tw */
import React from 'react'
import { Link } from 'gatsby'
import styled, { css } from 'react-emotion'
import 'whatwg-fetch'
import { withStateHandlers } from 'recompose'

import { Appear } from './Appear'
import RunningString from './RunningString'
import logo from '../img/logo.svg'

const Input = css`
  ${tw([
    'border-black',
    'focus:border-green',
    'font-montserrat',
    'mx-q4',
    'my-q4',
    'md:my-0',
    'outline-none',
    'p-q12',
    'rounded-lg',
    'text-semibold',
    'uppercase',
  ])};
`

const SubmitButton = styled('button')`
  ${tw([
    'bg-green',
    'hover:bg-black',
    'md:hover:bg-white',
    'border-none',
    'font-montserrat',
    'font-medium',
    'inline-flex',
    'items-center',
    'justify-center',
    'mx-q4',
    'my-q4',
    'md:my-0',
    'outline-none',
    'px-q24',
    'py-q12',
    'rounded-lg',
    'text-black',
    'hover:text-green',
    'md:hover:text-black',
    'text-md',
    'uppercase',
  ])};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  &,
  &:hover {
    background-color: ${({ disabled }) => disabled && '#08a676'};
  }
  transition: all 200ms ease-in-out;
`

const withToggle = withStateHandlers(
  ({ init = false }) => ({
    email: '',
    name: '',
    submit: init,
    success: init,
    toggledOn: init,
  }),
  {
    toggle: ({ toggledOn }) => () => ({ toggledOn: !toggledOn }),
    handleChange: ({ email, name }) => event => {
      const target = event.target
      const value = target.value
      const key = target.name

      if (name.length > 1 && email.length > 6) {
        return {
          [key]: value,
          submit: true,
        }
      } else {
        return {
          [key]: value,
          submit: false,
        }
      }
    },
    subscribe: ({ email, name }) => e => {
      e.preventDefault()
      if (document.getElementsByName('bot-field')[0].value.length === 0) {
        console.log(`An email was submitted: ${email}, ${name} `)

        fetch(`${process.env.SLS}/subscribe?name=${name}&email=${email}`, {
          mode: 'no-cors',
        })
          .then(response => console.log('parsed json', response))
          .catch(error => console.log('parsing failed', error))

        return {
          submit: false,
          success: true,
        }
      }
      return null
    },
    good: () => () => ({ email: '', name: '', success: false }),
  }
)

const Navbar = withToggle(
  ({ handleChange, good, subscribe, submit, success, toggle, toggledOn }) => (
    <header
      className={css`
        position: fixed;
        ${tw([
          'bg-white',
          'md:bg-black',
          'overflow-hidden',
          'pin-l',
          'pin-r',
          'pin-t',
          'sticky',
          'z-1000',
        ])};
      `}
    >
      <nav
        className={css`
          ${tw([
            'flex',
            'flex-row',
            'justify-center',
            'sm:justify-between',
            'w-full',
          ])};
        `}
      >
        <Link
          to="/"
          className={css`
            ${tw([
              'bg-center',
              'bg-contain',
              'bg-no-repeat',
              'hidden',
              'md:block',
              'mr-q48',
            ])};
            background-image: url(${logo});
            width: 60px;
          `}
        />
        <Link
          to="/"
          className={css`
            ${tw([
              'inline-block',
              'font-extrabold',
              'font-montserrat',
              'px-8',
              'pt-q8',
              'sm:pt-0',
              'text-black',
              'md:text-white',
              'hover:text-green',
              'text-sm',
              'sm:text-heading5',
            ])};
            letter-spacing: 0.3em;
            line-height: 1.45;
          `}
        >
          ·К·Р·А·П·И·В·А·
        </Link>
        <span
          className={css`
            ${tw([
              'bg-black',
              'md:bg-white',
              'hover:bg-green',
              'cursor-pointer',
              'font-montserrat',
              'font-medium',
              'hidden',
              'sm:inline-flex',
              'items-center',
              'justify-center',
              'px-q24',
              'text-white',
              'md:text-black',
              'hover:text-white',
              'text-md',
              'uppercase',
            ])};
            min-width: 6.25rem;
            transition: all 200ms ease-in-out;
          `}
          onClick={toggle}
        >
          {toggledOn ? '֍' : 'Подписка'}
        </span>
      </nav>
      <Appear inProp={toggledOn}>
        <Appear inProp={success}>
          <div
            className={css`
              ${tw([
                'flex',
                'flex-col',
                'md:flex-row',
                'items-center',
                'justify-center',
                'py-q48',
                'w-full',
              ])};
            `}
          >
            <span
              className={css`
                ${tw([
                  'font-montserrat',
                  'font-medium',
                  'items-center',
                  'justify-center',
                  'mb-q24',
                  'md:mb-0',
                  'px-q24',
                  'py-q12',
                  'text-black',
                  'md:text-white',
                  'text-center',
                  'text-md',
                  'uppercase',
                ])};
              `}
            >
              Вы подписаны на обновления ·К·Р·А·П·И·В·А·
            </span>
            <span
              className={css`
                ${tw([
                  'bg-green',
                  'hover:bg-white',
                  'cursor-pointer',
                  'font-montserrat',
                  'font-medium',
                  'inline-flex',
                  'items-center',
                  'justify-center',
                  'px-q24',
                  'py-q12',
                  'md:text-black',
                  'text-md',
                  'uppercase',
                ])};
                min-width: 6.25rem;
                transition: all 200ms ease-in-out;
              `}
              onClick={() => {
                toggle()
                setTimeout(() => good(), 400)
              }}
            >
              Хорошо
            </span>
          </div>
        </Appear>
        <Appear inProp={!success}>
          <div
            className={css`
              ${tw(['flex', 'justify-center', 'py-q48', 'w-full'])};
            `}
          >
            <form
              className={css`
                ${tw(['flex', 'flex-col', 'md:flex-row'])};
              `}
              name="SubscriptionForm"
              onSubmit={subscribe}
            >
              <p hidden>
                <label>
                  Don’t fill this out: <input name="bot-field" />
                </label>
              </p>
              <input
                className={Input}
                id="name"
                minLength={2}
                name="name"
                onChange={handleChange}
                placeholder={'Ваше имя'}
                required
                type="text"
              />
              <input
                className={Input}
                id="email"
                minLength={7}
                name="email"
                onChange={handleChange}
                placeholder={'Ваш email'}
                required
                type="email"
              />
              <SubmitButton type="submit" disabled={!submit}>
                Отправить →
              </SubmitButton>
            </form>
          </div>
        </Appear>
      </Appear>
      <div
        className={css`
          ${tw([
            'font-semibold',
            'font-montserrat',
            'overflow-hidden',
            'text-black',
            'text-center',
            'text-green-dark',
            'text-xs',
            'md:text-md',
            'tracking-wide',
          ])};
          line-height: 2;
          font-variant-caps: all-small-caps;
        `}
        onClick={toggle}
      >
        <RunningString string="· культура · ревью · аналитика · петербург · искусство · вовлеченность · активизм " />
      </div>
    </header>
  )
)

export default Navbar
