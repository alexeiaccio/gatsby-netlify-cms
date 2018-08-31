/* global tw */
import React from 'react'
import { css } from 'react-emotion'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { ArticleHeader } from '../components/ArticleHeader'
import { ArticleBody } from '../components/ArticleBody'
import { Heading1 } from '../components/Typography'
import Layout from '../components/Layout'

const Article = ({ data }) => {
  const article = data.prismicArticles.data
  return (
    <Layout>
      <article
        className={css`
          ${tw(['mb-q48'])};
        `}
      >
        <h1 className={Heading1}>{article.title.text}</h1>
        <ArticleHeader {...{ article }} />
        <ArticleBody {...{ article }} />
      </article>
    </Layout>
  )
}

Article.propTypes = {
  data: PropTypes.shape({
    prismicArticles: PropTypes.object,
  }),
}

export default Article

export const pageQuery = graphql`
  query ArticleBySlug($slug: String!) {
    prismicArticles(fields: { slug: { eq: $slug } }) {
      ...ArticleHeader
      ...ArticleBody
    }
  }
`
