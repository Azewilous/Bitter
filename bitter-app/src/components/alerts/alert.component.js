import { Component } from "react"
import { Alert } from 'react-bootstrap'

class Alerts extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Alert show={this.props.show} variant={this.props.variant} onClick={this.props.close} dismissible>
        {this.props.message}
      </Alert>
    )
  }
}

export default Alerts