import React from 'react'
import { graphql } from 'gatsby'
import { Layout as ThemeLayout, Header } from 'theme-ui'
import { Layout } from '@krapiva-org/theme'

/**
 *
 * @param {{ data: any }} data
 */

function IndexPage({ data }) {
  console.log(data)
  return (
    <ThemeLayout>
      <Layout>
        <Header>{data.site.siteMetadata.title}</Header>
      </Layout>
    </ThemeLayout>
  )
}

export const query = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        prismicApi
      }
    }
  }
`

export default IndexPage
