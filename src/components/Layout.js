/* global tw */
import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'react-emotion'
import { injectGlobal } from 'emotion'

import { Footer } from './Footer'
import { SEO } from './SEO'
import Navbar from './Navbar'

injectGlobal`
  body {
    ${tw(['m-0', 'font-cormorant', 'font-medium'])};
  }
  a, a:hover {
    ${tw(['no-underline', 'text-green-dark'])}
  }
`

const Layout = ({ children, image, location }) => (
  <div>
    <SEO
      slug={location.pathname}
      title={'К·Р·А·П·И·В·А'}
      description={
        'К.Р.А.П.И.В.А. — это онлайн-издание о современном искусстве в Санкт-Петербурге. Так получилось, что на сегодняшний день в пятимиллионном мегаполисе нет ни одного профильного издания по искусству. Наша основная задача — восполнить ощутимые пробелы в критическом и теоретическом осмыслении современной местной культурной ситуации, а также локальных историй искусств. '
      }
      keywords={
        'Культура, Ревью, Аналитика, Петербург, Искусство, Вовлечённость, Активизм'
      }
      image={image}
    />
    <div
      className={css`
        ${tw([
          'bg-black',
          'md:bg-white',
          'border-4',
          'md:border-8',
          'border-white',
          'md:border-black',
          'border-solid',
          'fixed',
          'pin',
        ])};
      `}
    />
    <div
      className={css`
        ${tw([
          'border-2',
          'md:border-4',
          'border-white',
          'md:border-black',
          'border-solid',
          'fixed',
          'pin-b',
          'pin-l',
          'pin-r',
          'z-1000',
        ])};
      `}
    />
    <Navbar />
    <div
      className={css`
        ${tw([
          'flex',
          'flex-col',
          'items-center',
          'max-w-md',
          'mx-auto',
          'px-q24',
          'md:px-q48',
          'py-q72',
          'relative',
          'text-white',
          'md:text-black',
        ])};
      `}
    >
      <div>{children}</div>
    </div>
    <Footer />
  </div>
)

Layout.propTypes = {
  children: PropTypes.object,
}

export default Layout
