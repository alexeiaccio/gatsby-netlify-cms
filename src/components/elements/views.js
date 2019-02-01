import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { API, graphqlOperation } from 'aws-amplify'
import { Connect } from 'aws-amplify-react'
import { Location } from '@reach/router'
import get from 'lodash/get'
import delay from 'lodash/delay'

import { createPage, updatePage } from '../../graphql/mutations'
import { listPages } from '../../graphql/queries'

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

class Views extends Component {
  static propTypes = {
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      burn: get(this.getCurrentPage(props), 'burn', 0),
      id: get(this.getCurrentPage(props), 'id', null),
      slug: get(this.getCurrentPage(props), 'slug', null),
      view: get(this.getCurrentPage(props), 'view', 0),
    }
  }

  componentDidMount() {
    this.handleLocation()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.handleLocation()
    }
  }

  handleLocation = async () => {
    const { location } = this.props
    const currentPage = this.getCurrentPage(this.props)

    if (!currentPage) {
      const input = {
        id: Date.parse(new Date()).toString(),
        slug: location.pathname,
        view: 0,
        burn: 0,
      }
      const { data } = await API.graphql(graphqlOperation(createPage, { input }))
      const { burn, id, slug, view } = get(data, 'createPage')
      this.setState({ burn, id, slug, view })
    } else {
      const { burn: stateBurn, view: stateView } = this.state
      const burn = get(currentPage, 'burn', 0)
      const view = get(currentPage, 'view', 0)
      if (burn !== stateBurn || view !== stateView) {
        this.setState({ burn, view })
      }
      this.timeout = null
      this.timeout = delay(this.handleView, 10000)
    }
  }

  componentWillUnmount() {
    this.timeout = null
  }

  handleView = async () => {
    const { id, slug, view } = this.state
    if (id && slug) {
      const input = {
        id,
        slug,
        view: view + 1,
      }
      const { data } = await API.graphql(graphqlOperation(updatePage, { input }))
      this.setState({ view: get(data, 'updatePage.view') })
    }
  }

  getCurrentPage = props => {
    return get(props, 'data.listPages.items', []).find(
      item => get(props, 'location.pathname') === get(item, 'slug')
    )
  }

  render() {
    const { burn, view } = this.state

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
}

function WithConnect() {
  return (
    <Connect
      query={graphqlOperation(listPages)}
    >
      {({ data, loading, error }) => {
        if (error) return <span>{error}</span>
        if (loading || !data) return <span>...</span>
        return (
          <Location>
            {({ location }) => (
              <Views data={data} location={location} />
            )}
          </Location>
        )
      }}
    </Connect>
  )
}

export default WithConnect
