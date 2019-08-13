import React from 'react'
import { graphql } from 'gatsby'
import { Layout } from '@krapiva-org/theme'

import '@krapiva-org/theme/src/utils/globals.css'

function IndexPage({ data }: any) {
  console.log(data)
  return (
    <Layout>
      <h1>{data.site.siteMetadata.title}</h1>
      <div style={{ height: '2000px' }} />
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
