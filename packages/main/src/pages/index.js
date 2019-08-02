import React from 'react'
import { graphql } from 'gatsby'

import { Layout } from '@krapiva-org/theme';

/**
 * 
 * @param {{ data: any }} data
 */

function IndexPage({ data }) {
  console.log(data)
  return (
    <Layout>
      <h1>{data.site.siteMetadata.title}</h1>
    </Layout>
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
