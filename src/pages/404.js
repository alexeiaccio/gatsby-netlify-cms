/* global tw */
import React from 'react'
import { Link } from 'gatsby'
import { css } from 'react-emotion'

import Layout from '../components/Layout'
import logo from '../img/logo.svg'
import { Heading1 } from '../components/Typography'

const NotFoundPage = ({ location }) => (
  <Layout {...{ location }}>
    <div
      className={css`
        ${tw(['h-screen'])};
      `}
    >
      <div
        className={css`
          ${tw([
            'bg-center',
            'bg-contain',
            'bg-no-repeat',
            'mx-auto',
            'my-q64',
          ])};
          background-image: url(${logo});
          height: 45px;
          width: 90px;
        `}
      />
      <h1
        className={css`
          ${Heading1};
          ${tw(['text-center', 'my-q64'])};
        `}
      >
        404
      </h1>
      <p
        className={css`
          ${tw(['text-center', 'text-heading5'])};
        `}
      >
        Извините, нет такой страницы.
      </p>
      <p>
        <Link
          className={css`
            ${tw(['block', 'mt-q48', 'mx-auto', 'text-center'])};
            max-width: 18rem;
          `}
          to={'/'}
        >
          <span
            className={css`
              ${tw([
                'bg-white',
                'hover:bg-black',
                'inline-flex',
                'border',
                'border-black',
                'border-solid',
                'font-montserrat',
                'items-center',
                'justify-center',
                'px-q24',
                'py-q12',
                'text-black',
                'hover:text-white',
                'text-sm',
                'uppercase',
              ])};
              transition: all 200ms ease-in-out;
            `}
          >
            Вернутся на главную
          </span>
        </Link>
      </p>
    </div>
  </Layout>
)

export default NotFoundPage
