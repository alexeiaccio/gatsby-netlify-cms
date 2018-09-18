/* global tw */
import React, { Fragment } from 'react'
import { Link, graphql } from 'gatsby'
import { css } from 'react-emotion'

import { AboutBody } from '../components/AboutBody'
import { ButtonOutlined } from '../components/Buttons'
import { Placeholder, PreviewCard } from '../components/Cards'
import { HTMLContent } from '../components/Content'
import { Column, Row } from '../components/Grid'
import Layout from '../components/Layout'
import logo from '../img/logo.svg'
import { Heading1, Heading3 } from '../components/Typography'
import { uuid } from '../utils'

export default ({ data, location }) => {
  const { edges: articles } = data.articles
  const about = data.about.data
  const index = data.index.data
  const getFiltered = filter => xs =>
    xs
      .filter(({ node }) => node.data.category === filter)
      .filter((_, i) => i < 4)

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
              ${tw(['text-center', 'my-q72'])};
            `}
          >
            {index.title.text}{' '}
          </h1>
          {index.categories.map(category => {
            const filteredArticles = getFiltered(category.categoryid)(articles)
            return (
              <Fragment key={uuid()}>
                <h2
                  className={css`
                    ${Heading3};
                    ${tw(['mt-q72', 'text-center'])};
                  `}
                  key={uuid()}
                >
                  {category.categorytitle.text}
                </h2>
                <div
                  className={css`
                    ${tw(['my-q48', 'sm:px-q12', 'text-body', 'text-justify'])};
                  `}
                  key={uuid()}
                >
                  <HTMLContent
                    content={category.categorydescription.html}
                    key={uuid()}
                  />
                </div>
                <Row key={uuid()}>
                  {filteredArticles.length > 0 ? (
                    filteredArticles.map(({ node: article }) => (
                      <Column key={uuid()}>
                        <PreviewCard {...{ article }} key={uuid()} />
                      </Column>
                    ))
                  ) : (
                    <>
                      <Column key={uuid()}>
                        <Placeholder />
                      </Column>
                      <Column
                        className={css`
                          ${tw(['hidden', 'sm:block'])};
                        `}
                        key={uuid()}
                      >
                        <Placeholder />
                      </Column>
                    </>
                  )}
                </Row>
                {filteredArticles.length > 0 && (
                  <div
                    className={css`
                      ${tw(['mb-q144', 'mx-auto', 'text-center'])};
                    `}
                    key={uuid()}
                  >
                    <Link to={category.categoryid} key={uuid()}>
                      <span
                        className={css`
                          ${ButtonOutlined};
                        `}
                        key={uuid()}
                      >
                        {`Все статьи рубрики «${
                          category.categorytitle.text
                        }» →`}
                      </span>
                    </Link>
                  </div>
                )}
              </Fragment>
            )
          })}
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
                ${ButtonOutlined};
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

export const pageQuery = graphql`
  query TestQuery {
    articles: allPrismicArticles(
      sort: { order: DESC, fields: [first_publication_date] }
    ) {
      edges {
        node {
          ...ArticleHeader
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
    index: prismicIndex {
      data {
        title {
          text
        }
        categories {
          categoryid
          categorytitle {
            text
          }
          categorydescription {
            html
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
