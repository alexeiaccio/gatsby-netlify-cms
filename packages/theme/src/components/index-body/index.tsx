import * as React from 'react'

interface IndexBodyProps {
  articles: any[]
  location: any
}

export function IndexBody({ articles, location }: IndexBodyProps) {
  console.log(articles, location)
  return (
    <div>
      Poop
    </div>
  )
}
