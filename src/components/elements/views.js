import React, { Component, memo } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { API, graphqlOperation } from 'aws-amplify'
import { Location } from '@reach/router'
import get from 'lodash/get'
import debounce from 'lodash/debounce'

import { createPage, updatePage } from '../../graphql/mutations'
import { getPage } from '../../graphql/queries'
import { uuidv5 } from '../../utils'

import burnBlack from '../../img/burn-black.svg'
import eyeBlack from '../../img/eye-black.svg'

const iconStyles = css`
  content: '';
  ${tw([
    'block',
    'absolute',
    'bg-contain',
    'bg-center',
    'bg-no-repeat',
    'h-full',
    'inline-block',
    'pin-l',
    'pin-t',
    'w-q20',
  ])};
`

function Views({ burn, view }) {
  return (
    <span>
      <span
        css={css`
          ${tw(['ml-q8', 'pl-q24', 'relative'])};
          &::before {
            ${iconStyles};
            background-image: url(${eyeBlack});
          }
        `}
        title={`${view} просмотр${view < 5 ? (view === 1 ? '' : 'a') : 'ов'}`}
      >
        {view}
      </span>
      <span
        css={css`
          ${tw(['ml-q12', 'relative'])};
          padding-left: 1.75rem;
          &::before {
            ${iconStyles};
            background-image: url(${burnBlack});
          }
        `}
        title={`${burn} раз${burn > 1 && burn < 5 ? 'a' : ''} прижгло`}
      >
        {burn}
      </span>
    </span>
  )
}

Views.propTypes = {
  burn: PropTypes.number.isRequired,
  view: PropTypes.number.isRequired,
}

class WithQuery extends Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props)
    this.handleLocation = debounce(this.handleLocation, 200)
    this.handleView = debounce(this.handleView, 10000)
    this.state = {
      burn: 0,
      view: 0,
    }
  }

  componentDidMount() {
    this.handleLocation()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.handleView.cancel()
      this.handleLocation.cancel()
      this.handleLocation()
    }
  }

  async handleLocation() {
    const { location } = this.props
    const slug = location.pathname
    const id = uuidv5(slug, uuidv5.URL)
    const { data } = await API.graphql(graphqlOperation(getPage, { id, slug }))
    const getPageResult = data.getPage

    if (getPageResult) {
      const { burn: stateBurn, view: stateView } = this.state
      const { burn, view } = getPageResult
      if (burn !== stateBurn || view !== stateView) {
        this.setState({ burn, view })
      }
    } else {
      const { data: createPageData } = await API.graphql(
        graphqlOperation(createPage, {
          input: {
            id,
            slug,
            view: 0,
            burn: 0,
          },
        })
      )
      const { burn, view } = await get(createPageData, 'createPage')
      this.setState({ burn, view })
    }
    await this.handleView()
  }

  componentWillUnmount() {
    this.handleLocation.cancel()
    this.handleView.cancel()
  }

  async handleView() {
    const { location } = this.props
    const slug = location.pathname
    const id = uuidv5(slug, uuidv5.URL)
    const { view } = this.state
    const input = {
      id,
      slug,
      view: view + 1,
    }
    const { data } = await API.graphql(graphqlOperation(updatePage, { input }))
    this.setState({ view: get(data, 'updatePage.view') })
  }

  render() {
    const { burn, view } = this.state
    return <Views burn={burn} view={view} />
  }
}

function WithLocation() {
  return (
    <Location>{({ location }) => <WithQuery location={location} />}</Location>
  )
}

export default memo(WithLocation)
