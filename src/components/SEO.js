import React from 'react'
import Helmet from 'react-helmet'

import defaultImage from '../img/default-image.jpg'
import favicon from '../img/favicon.png'

const getSchemaOrgJSONLD = ({ url, title, getImage, description }) => [
  {
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    url,
    name: title,
    alternateName: title,
  },
  {
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@id': url,
          name: title,
          getImage,
        },
      },
    ],
  },
]

export const SEO = ({ slug, title, description, keywords, image }) => {
  const siteUrl = 'https://www.krapiva.org'
  const fbAppID = '2138336363160205'
  const type = 'website'
  const url = `${siteUrl}${slug}`
  const getImage =
    image && image.localFile
      ? image.localFile.childImageSharp.fluid.src
      : defaultImage
  const schemaOrgJSONLD = getSchemaOrgJSONLD({
    url,
    title,
    getImage,
    description,
  })

  return (
    <Helmet
      defaultTitle="·К·Р·А·П·И·В·А·"
      titleTemplate={`%s | ·К·Р·А·П·И·В·А·`}
      title={title}
    >
      <link rel="icon" type="image/png" href={favicon} />
      {/* General tags */}
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="image" content={getImage} />

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content={type} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={getImage} />
      <meta property="fb:app_id" content={fbAppID} />
    </Helmet>
  )
}
