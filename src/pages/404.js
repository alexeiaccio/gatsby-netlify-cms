import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/Layout'

const NotFoundPage = () => (
  <Layout>
    <h1>404</h1>
    <p>Извините, нет такой страницы.</p>
    <p>
      <Link to="/">Вернутся на главную</Link>
    </p>
  </Layout>
)

export default NotFoundPage
