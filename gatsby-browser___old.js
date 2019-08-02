import ReactDOM from 'react-dom'
import Amplify from 'aws-amplify'
import config from './src/aws-exports'

export const replaceHydrateFunction = () => {
  return (element, container, callback) => {
    Amplify.configure(config)

    ReactDOM.render(element, container, callback)
  }
}
