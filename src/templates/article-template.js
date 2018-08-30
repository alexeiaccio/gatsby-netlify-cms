/* global tw */
import React from 'react'
import { css } from 'react-emotion'
import PropTypes from 'prop-types'
import { startCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { getCategory, tp, localDate } from '../utils'

import Content, { HTMLContent } from '../components/Content'
import Layout from '../components/Layout'

export const ArticleTemplate = ({
  authors,
  content,
  category,
  contentComponent,
  date,
  title,
  helmet,
}) => {
  const ArticleContent = contentComponent || Content
  return (
    <section
      className={css`
        ${tw(['w-full'])};
      `}
    >
      {helmet || ''}
      <h1
        className={css`
          ${tw(['mb-8'])};
        `}
      >
        {title}
      </h1>
      <div
        className={css`
          ${tw(['font-montserrat', 'italic', 'mb-4', 'text-xs'])};
        `}
      >
        <span>{startCase(getCategory(category))}</span>
        <span> · </span>
        <span>{localDate(date)}</span>
        {authors && authors.length ? (
          <span>
            <span> ·</span>
            {authors.map(author => (
              <span key={author + `author`}> {author} ·</span>
            ))}
          </span>
        ) : null}
      </div>
      <ArticleContent content={tp.execute(content)} />
    </section>
  )
}

ArticleTemplate.propTypes = {
  authors: PropTypes.arrayOf(PropTypes.string),
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  helmet: PropTypes.instanceOf(Object),
}

const Article = ({ data }) => {
  const { markdownRemark: article } = data
  return (
    <Layout>
      <ArticleTemplate
        authors={article.frontmatter.authors}
        category={article.frontmatter.category}
        content={article.html}
        contentComponent={HTMLContent}
        date={article.frontmatter.date}
        helmet={<Helmet title={article.frontmatter.title} />}
        title={article.frontmatter.title}
      />
    </Layout>
  )
}

Article.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Article

export const pageQuery = graphql`
  query ArticleByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        authors
        category
        date(formatString: "DD MMMM YYYY")
        title
      }
    }
  }
`
