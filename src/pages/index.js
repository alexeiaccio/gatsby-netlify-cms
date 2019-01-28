import React, { Fragment } from 'react'
import { Link, graphql } from 'gatsby'
import { css } from '@emotion/core'

import { AboutBody } from '../components/AboutBody'
import { ButtonOutlined, ButtonOutlinedBlock } from '../components/Buttons'
import { Placeholder, PreviewCard } from '../components/Cards'
import { HTMLContent } from '../components/Content'
import { Column, Row } from '../components/Grid'
import logo from '../img/logo.svg'
import { Heading1, Heading3 } from '../components/Typography'
import { uuid } from '../utils'
import { translite } from '../utils/makePath'

export default ({ data, location }) => {
  const { edges: articles } = data.articles
  const about = data.about.data
  const index = data.index.data
  const getFiltered = filter => xs =>
    xs.filter(({ node }) => node.tags.some(tag => tag === filter)).slice(0, 4)

  return (
    <>
      <section>
        <>
          <div id="novoe" />
          <h2
            css={css`
              ${Heading3};
              ${tw(['mb-q48', 'mt-q72', 'text-center'])};
            `}
          >
            Новое
          </h2>
          <Row>
            {articles
              .filter(({ node }) => node.tags.some(tag => tag !== 'Афиша'))
              .slice(0, 4)
              .map(({ node: article }) => (
                <Column key={uuid()}>
                  <PreviewCard {...{ article }} {...{ location }} />
                </Column>
              ))}
          </Row>
          <div
            css={css`
              ${tw(['mb-q144', 'mx-auto', 'text-center'])};
            `}
          >
            <Link to="/novoe">
              <span
                css={css`
                  ${ButtonOutlined};
                `}
              >
                {`Все новые статьи →`}
              </span>
            </Link>
          </div>
        </>
        {/* Afisha */}
        <>
          <div id="afisha" />
          <h2
            css={css`
              ${Heading3};
              ${tw(['mb-q48', 'mt-q72', 'text-center'])};
            `}
          >
            Афиша
          </h2>
          <Row
            css={css`
              ${tw(['justify-center'])}
            `}
          >
            {articles
              .filter(({ node }) => node.tags.some(tag => tag === 'Афиша'))
              .slice(0, 1)
              .map(({ node: article }) => (
                <PreviewCard {...{ article }} key={uuid()} {...{ location }} />
              ))}
          </Row>
        </>
        {/* Cateroties */}
        {index.categories.map(category => {
          const filteredArticles = getFiltered(category.categorytitle.text)(
            articles
          )
          return (
            <Fragment key={uuid()}>
              <div id={translite(category.categorytitle.text)} />
              <h2
                css={css`
                  ${Heading3};
                  ${tw(['mt-q72', 'text-center'])};
                `}
                key={uuid()}
              >
                {category.categorytitle.text}
              </h2>
              <div
                css={css`
                  ${tw(['my-q48', 'text-body', 'text-justify'])};
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
                      <PreviewCard
                        {...{ article }}
                        key={uuid()}
                        {...{ location }}
                      />
                    </Column>
                  ))
                ) : (
                  <>
                    <Column key={uuid()}>
                      <Placeholder />
                    </Column>
                    <Column
                      css={css`
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
                  css={css`
                    ${tw(['mb-q144', 'mx-auto', 'text-center'])};
                  `}
                  key={uuid()}
                >
                  <Link
                    to={`/${translite(category.categorytitle.text)}`}
                    key={uuid()}
                  >
                    <span
                      css={css`
                        ${ButtonOutlined};
                      `}
                      key={uuid()}
                    >
                      {`Все статьи «${category.categorytitle.text}» →`}
                    </span>
                  </Link>
                </div>
              )}
            </Fragment>
          )
        })}
      </section>
      <section
        css={css`
          ${tw(['mb-q144'])};
        `}
      >
        <div
          to="/"
          css={css`
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
          css={css`
            ${Heading1};
            ${tw(['text-center', 'my-q64'])};
          `}
        >
          {about.title.text}
        </h1>
        <AboutBody {...{ about }} />
        <Link
          css={css`
            ${tw(['block', 'mt-q48', 'mx-auto', 'text-center'])};
          `}
          to={'/o-nas'}
        >
          <span
            css={css`
              ${ButtonOutlined};
            `}
          >
            Редакция →
          </span>
        </Link>
      </section>
    </>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    articles: allPrismicArticles(
      sort: { order: DESC, fields: [first_publication_date] }
      limit: 200
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
