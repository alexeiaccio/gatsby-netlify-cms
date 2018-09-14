/* global tw */
import React from 'react'
import { Link, graphql } from 'gatsby'
import { css } from 'react-emotion'
import { withStateHandlers } from 'recompose'
import { compose, get, sortBy, startCase, uniqBy } from 'lodash/fp'

import { AboutBody } from '../components/AboutBody'
import { ButtonOutlined, ButtonOutlinedBlock } from '../components/Buttons'
import Layout from '../components/Layout'
import { Preview } from '../components/Preview'
import { Heading1, Heading3 } from '../components/Typography'
import logo from '../img/logo.svg'
import { getCategory, uuid } from '../utils'

const enhance = withStateHandlers(({ init = null }) => ({ filter: init }), {
  chooseFilter: () => value => ({
    filter: value,
  }),
})

const IndexPage = enhance(({ chooseFilter, data, filter, location }) => {
  const { edges: articles } = data.articles
  const about = data.about.data
  const getCategoryPath = get(['node', 'data', 'category'])
  const getCategoriesList = compose(
    sortBy(getCategoryPath),
    uniqBy(getCategoryPath)
  )
  const getFiltered = filter => xs =>
    xs.filter(({ node }) => node.data.category === filter)
  const filteredArticles = filter ? getFiltered(filter)(articles) : articles

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
                'flex-no-wrap',
                'justify-beetween',
                'sm:justify-center',
                'overflow-x-scroll',
                'md:overflow-hidden',
                'md:w-full',
              ])};
            `}
          >
            <ButtonOutlinedBlock
              active={filter === null}
              key={uuid()}
              onClick={() => chooseFilter(null)}
            >
              Все статьи
            </ButtonOutlinedBlock>
            {getCategoriesList(articles).map(({ node }) => (
              <ButtonOutlinedBlock
                active={filter === node.data.category}
                key={uuid()}
                onClick={() => chooseFilter(node.data.category)}
              >
                {startCase(getCategory(node.data.category))}
              </ButtonOutlinedBlock>
            ))}
          </div>
          {filter && (
            <h2
              className={css`
                ${Heading3};
                ${tw(['mt-q36', 'text-center'])};
              `}
            >
              {startCase(getCategory(filter))}
            </h2>
          )}
          <div
            className={css`
              ${tw(['flex', 'flex-row', 'flex-wrap', 'mt-q64', 'w-full'])};
            `}
          >
            {filteredArticles.map(({ node: article }) => (
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
})

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
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
