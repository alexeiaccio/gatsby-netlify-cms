import PropTypes from 'prop-types'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import { RoundedButtonTemplate } from '../elements/buttons'
import { HeaderContext } from './header'
import { uuid } from '../../utils'
import withLocation from '../elements/with-location'

const Button = styled('button')`
  ${RoundedButtonTemplate};
  ${tw(['font-montserrat', 'font-semibold', 'px-q12', 'py-q8', 'text-xs'])};
  font-variant: small-caps;
`

const Input = styled('input')`
  ${tw([
    'bg-white',
    'inline-flex',
    'border',
    'border-white',
    'border-solid',
    'font-montserrat',
    'items-center',
    'justify-center',
    'outline-none',
    'px-q12',
    'py-q8',
    'rounded-sm',
    'text-black',
    'text-xs',
    'uppercase',
    'focus:border-green',
  ])};
  box-sizing: border-box;
  transition: all 200ms ease-in-out;
`

const listStyles = css`
  ${tw(['fixed', 'bg-white', 'm-0', 'px-0', 'py-q8', 'rounded-sm'])};
  list-style-type: none;
  right: 24px;
  top: 48px;
  & li {
    ${tw([
      'font-montserrat',
      'px-q12',
      'py-q4',
      'text-xs',
      'uppercase',
      'hover:bg-green',
    ])};
    transition: all 200ms ease-in-out;
  }
`

function Search({ location }) {
  const [isInputOpened, setInputOpened] = useState(false)
  const [queryState, setQuery] = useState('')
  const [results, setResult] = useState([])
  const sticked = useContext(HeaderContext)
  const inputRef = useRef(null)
  // console.log(location)
  useEffect(() => {
    if (sticked) {
      setQuery('')
      setResult([])
      setInputOpened(false)
    }
  }, [sticked])

  useEffect(() => {
    if (inputRef.current && inputRef.current.focus) {
      inputRef.current.focus()
    }
  }, [isInputOpened])

  const getSearchResults = query => {
    if (!query || !window.__LUNR__) {
      return []
    }

    const lunrIndexRu = window.__LUNR__.ru
    const lunrIndexEn = window.__LUNR__.en

    if (!lunrIndexRu || !lunrIndexEn) {
      return []
    }

    const resultsRu = lunrIndexRu.index.search(query)
    const resultsEn = lunrIndexEn.index.search(query)
    const resRu = resultsRu.map(({ ref }) => lunrIndexRu.store[ref])

    if (resRu.length) {
      return resRu
    }

    return resultsEn.map(({ ref }) => lunrIndexEn.store[ref])
  }

  const search = event => {
    const query = event.target.value
    setQuery(query)
    setResult(getSearchResults(query))
  }

  const ButtonOrInput = isInputOpened ? Input : Button
  console.log(results)
  return useMemo(
    () => (
      <>
        <ButtonOrInput
          onChange={e => isInputOpened && search(e)}
          onClick={() => !isInputOpened && setInputOpened(true)}
          placeholder="Начните поиск..."
          ref={inputRef}
          type="search"
          value={queryState}
        >
          {!isInputOpened ? 'Поиск' : null}
        </ButtonOrInput>
        {!sticked && results.length > 0 && (
          <ul css={listStyles}>
            {results.map(page => (
              <li key={uuid()}>{page.title}</li>
            ))}
          </ul>
        )}
      </>
    ),
    [isInputOpened, results, queryState]
  )
}

Search.propTypes = {
  location: PropTypes.shape({
    host: PropTypes.string.isRequired,
  }).isRequired,
}

export default withLocation(Search)
