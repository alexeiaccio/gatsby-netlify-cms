import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Layout } from '@krapiva-org/theme'

import '@krapiva-org/theme/src/utils/globals.css'

function IndexPage({ location }: any) {
  const { site } = useStaticQuery(graphql`
    query IndexQuery {
      site {
        siteMetadata {
          title
          motto
        }
      }
    }
  `)

  return (
    <Layout
      location={location}
      meta={site.siteMetadata}
    >
      <h1>{site.siteMetadata.title}</h1>
      <div style={{ height: '2000px' }} />
    </Layout>
  )
}

export default IndexPage
