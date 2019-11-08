import * as React from 'react'
import * as uuid from 'uuid/v1'
import { get } from 'lodash'
import { Link } from 'gatsby'
import { css } from '@emotion/core'
import { useMedia } from 'react-use'

import { sortArticlesByDate } from '../../utils/sort-by-date'
import { BodyImage } from '../slices/image/index'
import { Card } from '../card/index'
import { HTML } from '../html/index'
import { LinkButton } from '../button/link'
import { Row, Col } from '../row/index'
import { TextContainer } from '../main/index'
import { buttonStyles, leadStyles, sectionStyles, rowStyles } from './styles'

interface SectionProps {
  key: string
  data: {
    id: string
    description: string
    title: string
    articles: any[]
    about?: any
  }
}

export function IndexSection({ data }: SectionProps) {
  const items = data.articles.sort(sortArticlesByDate).slice(0, 6)
  const mdScreen = useMedia('(min-width: 640px)')

  if (mdScreen && (items.length % 2) !== 0) {
    items.push({})
  }
  if (items.length === 0) {
    if (mdScreen) items.push({})
    items.push({})
  }

  return (
    <section css={sectionStyles}>
      <TextContainer>
        <h2 id={data.id}>{data.title}</h2>
        {data.description && (
          <HTML>{data.description}</HTML>
        )}
        {data.about && (
          <div css={leadStyles}>
            <HTML>{get(data, 'about.body.0.primary.text.html', '')}</HTML>
          </div>
        )}
      </TextContainer>
      {data.about ? (
        <div css={rowStyles}>
          <BodyImage
            image={get(data, 'about.body.1.primary.imageimage')}
            caption={get(data, 'about.body.1.primary.imagecaption.html')}
          />
          <div css={css`${buttonStyles};${rowStyles}`}>
            <LinkButton
              color="#08a676"
              component={Link}
              inverted
              rounded={0.25}
              to={`/o-nas`}
            >
              <span>
                {data.title} →
            </span>
            </LinkButton>
          </div>
        </div>
      ) : (
          <Row gap={1} css={rowStyles}>
            {items.map(item => (
              <Col
                key={uuid()}
                gap={1}
                cols={2}
              >
                <Card data={item} />
              </Col>
            ))}
          </Row>
        )}
      {(data.articles.length > 6) && (
        <div css={buttonStyles}>
          <LinkButton
            color="#08a676"
            component={Link}
            inverted
            rounded={0.25}
            to={`/${data.id}`}
          >
            <span>
              {data.title} →
            </span>
          </LinkButton>
        </div>
      )}
    </section>
  )
}
