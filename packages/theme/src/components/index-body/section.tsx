import * as React from 'react'
import * as uuid from 'uuid/v1'
import { get } from 'lodash'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

import { Button } from '../button/index'
import { Card } from '../card/index'
import { Img } from '../img/index'
import { HTML } from '../html/index'
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
  const items = data.articles.slice(0, 6)

  if ((items.length % 2) !== 0) {
    items.push({})
  }
  if (items.length === 0) {
    items.push({})
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
          <Img src={get(data, 'about.body.1.primary.imageimage')} />
        <div css={css`${buttonStyles};${rowStyles}`}>
          <Button
            color="#08a676"
            component={Link}
            inverted
            rounded={0.25}
            to={`/o-nas`}
          >
            <span>
              {data.title} →
            </span>
          </Button>
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
          <Button
            color="#08a676"
            component={Link}
            inverted
            rounded={0.25}
            to={`/${data.id}`}
          >
            <span>
              {data.title} →
            </span>
          </Button>
        </div>
      )}
    </section>
  )
}
