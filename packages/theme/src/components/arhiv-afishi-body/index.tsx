import * as React from 'react'
import { navigate } from '@reach/router'

import { Article } from '../../typings/article'
import { Row } from '../row/index'
import { TextContainer } from '../main/index'
import { Container, Wrapper } from '../main/index'

import { AfishaItem } from './item'
import { sectionStyles, rowStyles } from './styles'

interface ArhivAfishiBodyProps {
  articles: Article[]
  title: string
  location: any
}

export function ArhivAfishiBody({ articles, title, location }: ArhivAfishiBodyProps) {
  const [active, setActive] = React.useState<string | null>(null)
  const handleClick = (slug) => {
    setActive(active === slug ? null : slug)
    navigate(`#${slug}`, { replace: true })
  }

  React.useEffect(() => {
    const { hash } = location
    if (hash) {
      setActive(hash.replace('#', ''))
      navigate(hash, { replace: true })
    }
  }, [])

  return (
    <Wrapper>
      <Container>
        <TextContainer>
          <h1>{title}</h1>
        </TextContainer>
        <section css={sectionStyles}>
          <Row gap={1} css={rowStyles}>
            {articles.slice(0, 12).map(item => (
              <AfishaItem
                key={item.fields.slug}
                active={active === item.fields.slug}
                data={item}
                onClick={() => handleClick(item.fields.slug)}
              />
            ))}
          </Row>
        </section>
      </Container>
    </Wrapper>
  )
}
