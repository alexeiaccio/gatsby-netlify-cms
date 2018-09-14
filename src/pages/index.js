/* global tw */
import React from 'react'
import { Link, graphql } from 'gatsby'
import { css } from 'react-emotion'

import { AboutBody } from '../components/AboutBody'
import Layout from '../components/Layout'
import { Preview } from '../components/Preview'
import { Heading1 } from '../components/Typography'
import logo from '../img/logo.svg'
import { uuid } from '../utils'

const IndexPage = ({ data, location }) => {
  const { edges: articles } = data.articles
  const about = data.about.data

  return (
    <Layout {...{ location }} title={'·К·Р·А·П·И·В·А·'}>
      <>
        <section>
          <div
            to="/"
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
              transform: rotateZ(90deg);
              width: 90px;
            `}
          />
          <h1
            className={css`
              ${Heading1};
              ${tw(['text-center', 'my-q72', 'text-black'])};
            `}
          >
            ·К·Р·А·П·И·В·А·
          </h1>
          <div
            className={css`
              ${tw([
                'flex',
                'flex-row',
                'flex-wrap',
                '-mx-4',
                'mt-q64',
                'w-full',
              ])};
            `}
          >
            {articles.map(({ node: article }) => (
              <Preview {...{ article }} key={uuid()} />
            ))}
          </div>
        </section>
        <section
          className={css`
            ${tw(['mb-q144'])};
          `}
        >
          <div
            to="/"
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
            {about.title.text}
          </h1>
          <AboutBody {...{ about }} />
          <Link
            className={css`
              ${tw(['block', 'mt-q48', 'mx-auto', 'text-center'])};
            `}
            to={'/o-nas'}
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
              Редакция →
            </span>
          </Link>
        </section>
      </>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    articles: allPrismicArticles(
      sort: { order: DESC, fields: [first_publication_date] }
    ) {
      edges {
        node {
          ...ArticleHeader
          ...ArticleBody
          first_publication_date
          type
          fields {
            slug
          }
          data {
            title {
              text
            }
          }
        }
      }
    }
    about: prismicAbout {
      ...AboutBody
      data {
        title {
          text
        }
      }
    }
  }
`
