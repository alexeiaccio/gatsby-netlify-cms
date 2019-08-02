import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { Header } from 'theme-ui'

const H1 = styled.h1`
  color: blue;
`

/**
 *
 * @param {{ children: JSX.Element }} Nodes
 * @returns JSX.Element
 */

function Layout({ children }) {
  // console.log(tw);
  return (
    <>
      <h1 css={css`color: red;`}>Hello!</h1>
      <H1>Poop!</H1>
      <Header>Woop!</Header>
      {children}
    </>
  )
}

export default Layout
