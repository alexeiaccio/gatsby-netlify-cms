import React, { Component } from 'react'
import { uuid } from '../../utils'

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
    }
  }

  getSearchResults = query => {
    if (!query || !window.__LUNR__) return [] // eslint-disable-line
    const lunrIndexRu = window.__LUNR__.ru // eslint-disable-line
    const lunrIndexEn = window.__LUNR__.en // eslint-disable-line
    if (!lunrIndexRu || !lunrIndexEn) return []
    const resultsRu = lunrIndexRu.index.search(query)
    const resultsEn = lunrIndexEn.index.search(query)
    const resRu = resultsRu.map(({ ref }) => lunrIndexRu.store[ref])
    if (resRu.length) return resRu
    return resultsEn.map(({ ref }) => lunrIndexEn.store[ref])
  }

  search = event => {
    const query = event.target.value
    const results = this.getSearchResults(query)
    this.setState({
      results,
      query,
    })
  }

  render() {
    return (
      <div>
        <input
          placeholder="Search..."
          type="text"
          value={this.state.query}
          onChange={this.search}
        />
        <ul>
          {this.state.results.map(page => (
            <li key={uuid()}>{page.title}</li>
          ))}
        </ul>
      </div>
    )
  }
}
