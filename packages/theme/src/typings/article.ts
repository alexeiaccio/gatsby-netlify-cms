export interface ArticleHeader {
  first_publication_date: string
  tags: string[]
  data: {
    title: { text: string }
    image: {
      url: string
    }
    authors: [
      {
        author: {
          document: [{ data: { name: string } }]
          slug: string
        }
      }
    ]
  }
}
