import * as React from 'react'

import { HTML } from '../html/index'

import { matchedStyles } from './styles'

const parseMatch = (text, query) => {
  const regex = query.replace(/[-/\\^$*+?.()|[\]{}]/i, '\\$&')
  const match = text.match(regex)
  let matched: any = null

  if (match) {
    matched = match
  }

  if (!matched) return null

  return `...${text.slice(
    (matched.index - 24) < 0 ? 0 : matched.index - 24,
    matched.index
  )}<span class="matched">${matched}</span>${text.slice(
    matched.index + matched[0].length,
    matched.index + 120
  )}...`
}

type Props = Readonly<{
  result: {
    data: string
  }
  query: string
}>

export const Matched = React.memo((props: Props) => {
  const { result, query } = props

  if (!result || !(result && result.data)) return null
  
  const [text, setText] = React.useState<any>(null)
  const parsed = parseMatch(result.data, query)

  React.useEffect(() => {
    if (parsed !== null) {
      setText(parsed)
    }
  }, [parsed])

  if (!text) return null

  return (
    <div css={matchedStyles}>
      <HTML>
        {text}
      </HTML>
    </div>
  )
})
