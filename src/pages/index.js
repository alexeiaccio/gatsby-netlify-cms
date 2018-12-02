/* global tw */
import React, { Fragment } from 'react'
import { Link, graphql } from 'gatsby'
import { css } from 'react-emotion'

import { AboutBody } from '../components/AboutBody'
import { ButtonOutlined, ButtonOutlinedBlock } from '../components/Buttons'
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
    <Layout {...{ index }} {...{ location }} title={'·К·Р·А·П·И·В·А·'}>
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
          <div
            className={css`
              ${tw(['flex', 'flex-row', 'flex-wrap', '-mx-1'])};
            `}
          >
            <Link
              className={css`
                ${tw(['flex-1', 'mb-q8', 'px-q4'])};
              `}
              to="#new"
            >
              <ButtonOutlinedBlock>Новое</ButtonOutlinedBlock>
            </Link>
            <Link
              className={css`
                ${tw(['flex-1', 'mb-q8', 'px-q4'])};
              `}
              to="#afisha"
            >
              <ButtonOutlinedBlock>Афиша</ButtonOutlinedBlock>
            </Link>
            {index.categories.map(category => (
              <Link
                className={css`
                  ${tw(['flex-1', 'mb-q8', 'px-q4'])};
                `}
                key={uuid()}
                to={`#${category.categoryid}`}
              >
                <ButtonOutlinedBlock key={uuid()}>
                  {category.categorytitle.text}
                </ButtonOutlinedBlock>
              </Link>
            ))}
          </div>
          <>
            <div id="new" />
            <h2
              className={css`
                ${Heading3};
                ${tw(['mb-q48', 'mt-q72', 'text-center'])};
              `}
            >
              Новое
            </h2>
            <Row>
              {articles
                .filter(({ node })  => node.data.category !== 'afisha')
                .filter(({ node })  => node.data.category !== 'documents')
                .slice(0, 4)
                .map(({ node: article }) => (
                <Column key={uuid()}>
                  <PreviewCard {...{ article }} key={uuid()} />
                </Column>
              ))}
            </Row>
            <div
              className={css`
                ${tw(['mb-q144', 'mx-auto', 'text-center'])};
              `}
            >
              <Link to="/new">
                <span
                  className={css`
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
              className={css`
                ${Heading3};
                ${tw(['mb-q48', 'mt-q72', 'text-center'])};
              `}
            >
              Афиша
            </h2>
            <Row className={css`${tw(['justify-center'])}`}>
              {articles
                .filter(({ node })  => node.data.category === 'afisha')
                .slice(0, 1)
                .map(({ node: article }) => (
                  <PreviewCard {...{ article }} key={uuid()} />
              ))}
            </Row>
          </>
          {/* Cateroties */}
          {index.categories.map(category => {
            const filteredArticles = getFiltered(category.categoryid)(articles)
            return (
              <Fragment key={uuid()}>
                <div key={uuid()} id={category.categoryid} />
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
  query IndexQuery {
    articles: allPrismicArticles(
      sort: {
        order: DESC,
        fields: [first_publication_date]
      },
      limit: 40
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
