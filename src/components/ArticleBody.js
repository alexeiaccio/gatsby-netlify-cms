/* global tw */
import React, { Fragment, Component, createRef } from 'react'
import { graphql } from 'gatsby'
import { css } from 'react-emotion'

import { Appear } from './Appear'
import { PreviewCard } from './Cards'
import { HTMLContent, SpanHTMLContent } from './Content'
import { Column, Row } from './Grid'
import { Img } from './Img'
import { MediaLink } from './MediaLink'
import { RichText, RichTextSmall } from './RichText'
import { LeadText } from './Typography'
import { uuid } from '../utils'

import Next from '../img/next.svg'

export class ArticleBody extends Component {
  constructor(props) {
    super(props)
    this.refReference = props.article.body.map((_, i) => createRef())
    this.state = {
      sliders: Array.from(props.article.body, () => 0),
      referenceIsOpen: {},
      coords: {},
    }
  }

  componentDidMount() {
    if (window !== 'undefined') {
      window.addEventListener('resize', this.getCoords)
      this.getCoords()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getCoords)
  }

  getCoords = () => {
    let newCoords = {}
    this.refReference.forEach(
      ({ current }, i) =>
        current
          ? (newCoords = Object.assign(newCoords, {
              [i]: {
                x: current.offsetLeft + 12 - current.offsetWidth / 2,
                y: current.offsetTop + 13 + current.offsetHeight,
              },
            }))
          : false
    )
    this.setState({
      coords: newCoords,
    })
  }

  previous = count => {
    const sliderLength = this.props.article.body[count].items.length - 1
    this.setState({
      sliders: this.state.sliders.map(
        (x, i) =>
          i === count
            ? this.state.sliders[count] > 0
              ? x - 1
              : sliderLength
            : x
      ),
    })
  }

  next = count => {
    const sliderLength = this.props.article.body[count].items.length - 1
    this.setState({
      sliders: this.state.sliders.map(
        (x, i) =>
          i === count
            ? this.state.sliders[count] < sliderLength
              ? x + 1
              : 0
            : x
      ),
    })
  }

  toggleReference = i => {
    const { referenceIsOpen } = this.state
    this.setState({
      referenceIsOpen: {
        ...referenceIsOpen,
        [i]: referenceIsOpen[i] ? !referenceIsOpen[i] : true,
      },
    })
    setTimeout(() => this.getCoords(), 0)
  }

  render() {
    const { article } = this.props
    const hasNext = i => article.body[i + 1]
    const hasPrevious = i => article.body[i - 1]
    const isNextReference = i =>
      hasNext(i) &&
      article.body[i + 1].__typename === 'PrismicArticlesBodyReference'
    const isPreviousReference = i =>
      hasPrevious(i) &&
      article.body[i - 1].__typename === 'PrismicArticlesBodyReference'
    const isPreviousRedline = i =>
      hasPrevious(i) && article.body[i - 1].primary.referenceredline === 'yes'
    const withoutLastP = str => str.replace(/<p>.+<\/p>$/, '')
    const withoutFirstP = str => str.replace(/^<p>.+<\/p>/, '')
    const LastPContent = i =>
      hasNext(i) &&
      article.body[i - 1].primary.text.html.match(/<p>(.+)<\/p>$/)[1]
    const FirstPContent = i =>
      hasPrevious(i) &&
      !isPreviousRedline(i) &&
      article.body[i + 1].primary.text.html.match(/^<p>(.+)<\/p>/)[1]
    const makeText = i => {
      let res = article.body[i].primary.text.html
      if (isPreviousReference(i) && !isPreviousRedline(i)) {
        res = withoutFirstP(res)
      }
      if (isNextReference(i)) {
        res = withoutLastP(res)
      }
      return res
    }
    return (
      <div>
        {article.body.map(({ items, primary, __typename }, i) => {
          return (
            <Fragment key={uuid()}>
              {__typename === 'PrismicArticlesBodyImage' && (
                <figure
                  className={css`
                    ${tw(['m-0'])};
                  `}
                  key={uuid()}
                >
                  <Img src={primary.imageimage} key={uuid()} />
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
                    ${tw(['m-0'])};
                  `}
                  key={uuid()}
                >
                  <div
                    className={css`
                      ${tw(['relative'])};
                    `}
                  >
                    {items[this.state.sliders[i]].sliderimage.localFile && (
                      <Img
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
              {__typename === 'PrismicArticlesBodyText' &&
                makeText(i) && (
                  <HTMLContent
                    className={css`
                      ${RichText};
                      & span {
                        float: right;
                        margin-top: -2.75rem;
                      }
                    `}
                    content={makeText(i)}
                    key={uuid()}
                  />
                )}
              {__typename === 'PrismicArticlesBodyReference' && (
                <span key={uuid()} className={RichText}>
                  {LastPContent(i) && (
                    <SpanHTMLContent key={uuid()} content={LastPContent(i)} />
                  )}
                  <span key={uuid()}> </span>
                  <span
                    key={uuid()}
                    className={css`
                      ${tw(['cursor-pointer', 'text-green', 'text-list'])};
                    `}
                    onClick={() => this.toggleReference(i)}
                    ref={this.refReference[i]}
                    id={primary.referenceanchor.replace(/\s/g, '')}
                  >
                    {primary.referenceanchor}
                  </span>
                  <Appear key={uuid()} inProp={this.state.referenceIsOpen[i]}>
                    <span key={uuid()} onClick={() => this.toggleReference(i)}>
                      <SpanHTMLContent
                        className={css`
                          ${RichTextSmall};
                          ${tw([
                            'bg-black',
                            'cursor-pointer',
                            'inline-flex',
                            'flex-col',
                            'my-q24',
                            'p-q24',
                            'text-white',
                            'text-center',
                            'w-full',
                          ])};
                          box-sizing: border-box;
                          &::after {
                            ${tw([
                              'absolute',
                              'bg-black',
                              'block',
                              'h-q24',
                              'w-q24',
                            ])};
                            content: '';
                            top: ${this.state.coords[i] &&
                              this.state.coords[i].y}px;
                            left: ${this.state.coords[i] &&
                              this.state.coords[i].x}px;
                            transform: rotateZ(45deg);
                          }
                        `}
                        content={`<p>${primary.referenceanchor} </p>${
                          primary.referencetext.html
                        }`}
                        key={uuid()}
                      />
                    </span>
                  </Appear>
                  {!isPreviousRedline &&
                    FirstPContent(i) && (
                      <SpanHTMLContent
                        key={uuid()}
                        content={FirstPContent(i)}
                      />
                    )}
                </span>
              )}
              {__typename === 'PrismicArticlesBodyListOfArticles' && (
                <Row>
                  {items.map(({ articlelink }) => {
                    const article = articlelink.document[0]
                    return (
                      <Column>
                        <PreviewCard {...{ article }} key={uuid()} />
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
                        <a
                          href={`#${primary.referenceanchor.replace(
                            /\s/g,
                            ''
                          )}`}
                          key={uuid()}
                        >
                          {primary.referenceanchor}
                        </a>
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
                  category
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
            referenceredline
          }
        }
        ... on PrismicArticlesBodyReferencesList {
          id
        }
      }
    }
  }
`
