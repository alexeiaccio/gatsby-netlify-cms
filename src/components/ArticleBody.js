import React, { Fragment, Component, createRef } from 'react'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { delay, throttle } from 'lodash'

import { Appear } from './Appear'
import { PreviewCard } from './Cards'
import { HTMLContent, SpanHTMLContent } from './Content'
import { Column, Row } from './Grid'
import { Img } from './Img'
import { MediaLink } from './MediaLink'
import { RichText, RichTextSmall } from './RichText'
import TextWithReference from './TextWithReference'
import { LeadText } from './Typography'
import { uuid } from '../utils'

import Next from '../img/next.svg'

const Reference = styled('div')`
  ${RichTextSmall};
  ${tw([
    'absolute',
    'bg-black',
    'px-q24',
    'text-center',
    'text-white',
    'w-full',
  ])};
  box-sizing: border-box;
  top: ${({ coords }) => parseInt(coords.top) + parseInt(coords.height) + 24}px;
  &:before {
    ${tw(['absolute', 'bg-black', 'block', 'h-q24', 'w-q24'])};
    content: '';
    left: ${({ coords }) =>
      parseInt(coords.left) < 6
        ? 6
        : parseInt(coords.left) > parseInt(coords.width) - 24
        ? parseInt(coords.width) - 30
        : parseInt(coords.left) - 2}px;
    top: -11px;
    transform: rotateZ(45deg);
  }
`

export class ArticleBody extends Component {
  constructor(props) {
    super(props)
    this.textRefs = props.article.body.map(() => createRef())
    this.getCoords = throttle(this.handleResize, 100)
    this.state = {
      sliders: Array.from(props.article.body, () => 0),
      referenceIsOpen: null,
      references: {},
    }
  }

  componentDidMount() {
    delay(this.handleResize, 600)
    if (window !== 'undefined') {
      window.addEventListener('resize', this.handleResize)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.referenceIsOpen !== this.state.referenceIsOpen) {
      this.handleReference()
    }
  }

  componentWillUnmount() {
    this.textRefs.forEach(({ current }) => {
      if (current) {
        const references = current.querySelectorAll(
          'span[data-type="reference"]'
        )
        if (references.length) {
          for (let node of references) {
            node.removeEventListener('click', this.toggleReference)
          }
        }
      }
    })
    if (window !== 'undefined') {
      window.removeEventListener('resize', this.handleResize)
    }
  }

  handleScroll = ref => {
    if (window !== undefined) {
      window.scrollTo({
        top: this.state.references[ref].top,
        behavior: 'smooth',
      })
    }
  }

  handleResize = () => {
    let newReferences = {}
    this.textRefs.forEach(({ current }) => {
      if (current) {
        const references = current.querySelectorAll(
          'span[data-type="reference"]'
        )
        if (references.length) {
          for (let node of references) {
            node.textContent = `[${node.textContent}]`
            newReferences = {
              ...newReferences,
              [node.dataset.href]: {
                height: node.offsetHeight,
                left: node.offsetLeft,
                top: node.offsetTop,
                width: node.parentNode.offsetWidth,
              },
            }
          }
        }
      }
    })
    this.setState({ references: newReferences }, () => this.handleReference())
  }

  handleReference = () => {
    this.textRefs.forEach(({ current }) => {
      if (current) {
        const references = current.querySelectorAll(
          'span[data-type="reference"]'
        )
        if (references.length) {
          for (let node of references) {
            node.addEventListener('click', () =>
              this.toggleReference(node.dataset.href)
            )
            node.textContent = `[${node.textContent}]`
          }
        }
      }
    })
  }

  previous = count => {
    const sliderLength = this.props.article.body[count].items.length - 1
    this.setState({
      sliders: this.state.sliders.map((x, i) =>
        i === count ? (this.state.sliders[count] > 0 ? x - 1 : sliderLength) : x
      ),
    })
  }

  next = count => {
    const sliderLength = this.props.article.body[count].items.length - 1
    this.setState({
      sliders: this.state.sliders.map((x, i) =>
        i === count ? (this.state.sliders[count] < sliderLength ? x + 1 : 0) : x
      ),
    })
  }

  toggleReference = i => {
    const { referenceIsOpen } = this.state
    this.setState({ referenceIsOpen: referenceIsOpen === i ? null : i })
  }

  render() {
    const { article } = this.props

    return (
      <div>
        {article.body.map(({ items, primary, __typename }, i) => {
          return (
            <Fragment key={uuid()}>
              {__typename === 'PrismicArticlesBodyImage' && (
                <figure
                  className={css`
                    ${tw(['m-0', 'mt-q36', 'md:mt-q48'])};
                  `}
                  key={uuid()}
                >
                  <Img
                    imgStyle={{ objectFit: 'contain' }}
                    src={primary.imageimage}
                    key={uuid()}
                  />
                  <figcaption
                    className={css`
                      ${tw(['italic', 'mb-q48', 'text-center', 'text-list'])};
                    `}
                    key={uuid()}
                  >
                    <HTMLContent
                      content={primary.imagecaption.html}
                      key={uuid()}
                    />
                  </figcaption>
                </figure>
              )}
              {__typename === 'PrismicArticlesBodySlider' && (
                <figure
                  className={css`
                    ${tw(['m-0', 'mt-q36', 'md:mt-q48'])};
                  `}
                  key={uuid()}
                >
                  <div
                    className={css`
                      ${tw(['relative'])};
                    `}
                  >
                    {items[this.state.sliders[i]].sliderimage && (
                      <Img
                        imgStyle={{ objectFit: 'contain' }}                      
                        src={items[this.state.sliders[i]].sliderimage}
                        key={uuid()}
                      />
                    )}
                    <div
                      className={css`
                        ${tw([
                          'absolute',
                          'bg-center',
                          'bg-no-repeat',
                          'cursor-pointer',
                          'pin-b',
                          'pin-t',
                          'pin-l',
                          'w-1/2',
                        ])};
                        transform: rotateZ(180deg);
                        &:hover {
                          background-image: url(${Next});
                        }
                      `}
                      key={uuid()}
                      onClick={() => this.previous(i)}
                    />
                    <div
                      className={css`
                        ${tw([
                          'absolute',
                          'bg-center',
                          'bg-no-repeat',
                          'cursor-pointer',
                          'pin-b',
                          'pin-t',
                          'pin-r',
                          'w-1/2',
                        ])};
                        &:hover {
                          background-image: url(${Next});
                        }
                      `}
                      key={uuid()}
                      onClick={() => this.next(i)}
                    />
                  </div>
                  <figcaption
                    className={css`
                      ${tw([
                        'flex',
                        'flex-row',
                        'italic',
                        'justify-between',
                        'mb-q48',
                        'text-center',
                        'text-list',
                      ])};
                    `}
                    key={uuid()}
                  >
                    <p>
                      <span>{this.state.sliders[i] + 1}</span>
                      <span> · </span>
                      <span>{this.props.article.body[i].items.length}</span>
                    </p>
                    <HTMLContent
                      content={items[this.state.sliders[i]].slidercaptions.html}
                      key={uuid()}
                    />
                  </figcaption>
                </figure>
              )}
              {__typename === 'PrismicArticlesBodyMedialink' && (
                <MediaLink {...{ primary }} />
              )}
              {__typename === 'PrismicArticlesBodyLead' && (
                <HTMLContent
                  className={css`
                    ${LeadText};
                    ${tw(['mb-q48'])};
                  `}
                  content={primary.text.html}
                  key={uuid()}
                />
              )}
              {__typename === 'PrismicArticlesBodyText' && (
                <TextWithReference
                  className={css`
                    ${RichText};
                    & .reference {
                      ${tw(['cursor-pointer', 'text-green-dark'])};
                    }
                  `}
                  content={primary.text.html}
                  contentRef={this.textRefs[i]}
                  key={uuid()}
                />
              )}
              {__typename === 'PrismicArticlesBodyReference' && (
                <Appear
                  inProp={
                    this.state.referenceIsOpen === primary.referenceanchor
                  }
                >
                  <Reference
                    coords={
                      this.state.references[primary.referenceanchor] || {
                        height: 0,
                        left: 0,
                        top: 0,
                      }
                    }
                    key={uuid()}
                  >
                    <h5 key={uuid()}>[ {primary.referenceanchor} ]</h5>
                    <HTMLContent
                      content={primary.referencetext.html}
                      key={uuid()}
                    />
                    <div
                      className={css`
                        ${tw([
                          'cursor-pointer',
                          'font-montserrat',
                          'font-medium',
                          'py-q20',
                          'text-xxs',
                          'text-green',
                          'uppercase',
                        ])}
                      `}
                      onClick={this.toggleReference}
                      key={uuid()}
                    >
                      закрыть
                    </div>
                  </Reference>
                </Appear>
              )}
              {__typename === 'PrismicArticlesBodyListOfArticles' && (
                <Row>
                  {items.map(({ articlelink }) => {
                    const article = articlelink.document[0]
                    return (
                      <Column key={uuid()}>
                        <PreviewCard {...{ article }} />
                      </Column>
                    )
                  })}
                </Row>
              )}
              {__typename === 'PrismicArticlesBodyYoutube' && (
                <figure
                  className={css`
                    ${tw(['m-0'])};
                  `}
                  key={uuid()}
                >
                  <HTMLContent
                    className={css`
                      & iframe {
                        ${tw(['w-full'])};
                        height: 50vh;
                      }
                    `}
                    content={primary.youtubeid.html}
                    key={uuid()}
                  />
                  <figcaption
                    className={css`
                      ${tw([
                        'flex',
                        'flex-row',
                        'italic',
                        'justify-between',
                        'mb-q48',
                        'text-center',
                        'text-list',
                      ])};
                    `}
                    key={uuid()}
                  >
                    <HTMLContent
                      content={primary.videoresource.html}
                      key={uuid()}
                    />
                  </figcaption>
                </figure>
              )}
              {__typename === 'PrismicArticlesBodyQuote' && (
                <figure
                  className={css`
                    ${tw(['m-0'])};
                  `}
                  key={uuid()}
                >
                  <blockquote
                    className={css`
                      ${LeadText};
                      ${tw(['m-0', 'mb-q36'])};
                    `}
                    key={uuid()}
                  >
                    <HTMLContent
                      className={css`
                        ${tw(['italic'])};
                        & em {
                          letter-spacing: 0.2em;
                        }
                      `}
                      content={primary.quote.html}
                      key={uuid()}
                    />
                  </blockquote>
                  <footer>
                    <cite>
                      <HTMLContent
                        className={css`
                          ${tw([
                            'italic',
                            'mt-q36',
                            'mb-q48',
                            'text-right',
                            'text-body',
                          ])};
                          & p {
                            ${tw(['leading-normal', 'm-0'])};
                          }
                        `}
                        content={primary.cite.html}
                        key={uuid()}
                      />
                    </cite>
                  </footer>
                </figure>
              )}
              {__typename === 'PrismicArticlesBodyReferencesList' && (
                <div
                  key={uuid()}
                  className={css`
                    ${RichTextSmall};
                    ${tw(['mb-q48'])};
                  `}
                >
                  {article.body
                    .filter(
                      ({ __typename }) =>
                        __typename === 'PrismicArticlesBodyReference'
                    )
                    .map(({ primary }) => (
                      <p key={uuid()}>
                        <span
                          className={css`
                            ${tw(['cursor-pointer', 'text-green-dark'])};
                          `}
                          onClick={() =>
                            this.handleScroll(primary.referenceanchor)
                          }
                          key={uuid()}
                        >
                          <span key={uuid()}>[ </span>
                          {primary.referenceanchor}
                          <span key={uuid()}> ]</span>
                        </span>
                        <span key={uuid()}> </span>
                        <SpanHTMLContent
                          content={primary.referencetext.html}
                          key={uuid()}
                        />
                      </p>
                    ))}
                </div>
              )}
            </Fragment>
          )
        })}
      </div>
    )
  }
}

export const articleBodyQuery = graphql`
  fragment ArticleBody on PrismicArticles {
    data {
      body {
        __typename
        ... on PrismicArticlesBodyText {
          primary {
            text {
              html
            }
          }
        }
        ... on PrismicArticlesBodyQuote {
          primary {
            quote {
              html
            }
            cite {
              html
            }
          }
        }
        ... on PrismicArticlesBodyCut {
          id
        }
        ... on PrismicArticlesBodyLead {
          primary {
            text {
              html
            }
          }
        }
        ... on PrismicArticlesBodyImage {
          primary {
            imageimage {
              url
              localFile {
                childImageSharp {
                  fluid(maxWidth: 640, quality: 80) {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
            imagecaption {
              html
            }
          }
        }
        ... on PrismicArticlesBodyListOfArticles {
          items {
            articlelink {
              document {
                first_publication_date
                fields {
                  slug
                }
                data {
                  title {
                    text
                  }
                  authors {
                    author {
                      document {
                        data {
                          name
                        }
                      }
                    }
                  }
                  image {
                    url
                    localFile {
                      childImageSharp {
                        fluid(maxWidth: 640, quality: 80) {
                          ...GatsbyImageSharpFluid_tracedSVG
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        ... on PrismicArticlesBodyMedialink {
          primary {
            mediacover {
              url
              localFile {
                childImageSharp {
                  fluid(maxWidth: 640, quality: 80) {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
            mediacaption {
              html
            }
            medialink {
              url
            }
          }
        }
        ... on PrismicArticlesBodySlider {
          items {
            sliderimage {
              url
              localFile {
                childImageSharp {
                  fluid(maxWidth: 640, quality: 80) {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
            slidercaptions {
              html
            }
          }
        }
        ... on PrismicArticlesBodyYoutube {
          primary {
            youtubeid {
              html
            }
            videoresource {
              html
            }
          }
        }
        ... on PrismicArticlesBodyReference {
          primary {
            referenceanchor
            referencetext {
              html
            }
          }
        }
        ... on PrismicArticlesBodyReferencesList {
          id
        }
      }
    }
  }
`
