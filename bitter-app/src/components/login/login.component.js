import { Component } from "react"
import { Modal, Container, Row, Col } from 'react-bootstrap'
import { Navigate, useNavigate } from "react-router-dom"
import AuthService from "../../services/auth.service"
import Alerts from '../alerts/alert.component'

class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      validations: {},
      showAlert: false,
      variant: '',
      message: '',
      isLoggedIn: false
    }
    
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmission = this.handleSubmission.bind(this)
    this.closeAlerts = this.closeAlerts.bind(this)
  }

  handleSubmission(event) {
    event.preventDefault()
    this.validateParameters()
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value })
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value })
  }

  validateParameters() {
    let isValid = true
    let validations = {}
    if (!this.state.email || !this.checkEmail(this.state.email)) {
      validations['email'] = 'Please enter a valid email.'
      isValid = false
    }
    if (!this.state.password) {
      validations['password'] = 'Please enter a password.'
      isValid = false
    }
    this.setState({ validations: validations })
    if (isValid) {
      this.handleLogin()
    }
  }

  checkEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  handleLogin() {
    AuthService.loign(
      this.state.email, this.state.password
    ).then(response => {
      console.log(response)
      if (response.data.account.token) {
        localStorage.setItem('account', JSON.stringify(response.data.account))
        this.setState({ showAlert: true, variant: 'success', message: 'Login Successful' })
        setTimeout(() => {
          this.setState({ isLoggedIn: true })
          window.history.pushState({}, undefined, '/home')
          window.location.reload()
        }, 2000)
      }
    }).catch(({ response }) => {
      console.log(response)
      this.setState({ showAlert: true, variant: 'danger', message: response.data.account.message })
    })
  }

  closeAlerts() {
    this.setState({ showAlert: false })
  }

  render() {
    return (
      <>
				<Container>
          <Row>
            <Col sm={12}>
              <Modal show={this.props.show} onHide={this.props.hide}>
                <Modal.Header closeButton>
                  <Modal.Title>Sign in</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Alerts show={this.state.showAlert} variant={this.state.variant} message={this.state.message} close={this.closeAlerts} />
                  <>
                  <div className='container-fluid'>
                      <form className='row g-3' onSubmit={this.handleSubmission}>
                        <div className='col-md-12'>
                          <div className='row pb-4'>
                            <div className='col-sm-12 p-0 input-group input-group-lg'>
                              <input className={`form-control w-100 ${!this.state.validations['email'] ? '' : 'invalid-control'}`} type="text" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} />
                              <span className='invalid'>{this.state.validations['email']}</span>
                            </div>
                          </div>
                          <div className='row pb-4'>
                            <div className='col-sm-12 p-0 input-group input-group-lg'>
                              <input className={`form-control w-100 ${!this.state.validations['password'] ? '' : 'invalid-control'}`} type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} />
                              <span className='invalid'>{this.state.validations['password']}</span>
                            </div>
                          </div>
                          <div className='row pt-5'>
                            <div className='col-sm-12'>
                              <button type='submit' className='btn btn-info btn-lg rounded-pill w-100 p-1 sign-up'>Next</button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </>
                </Modal.Body>
              </Modal>
            </Col>
          </Row>
        </Container>
      </>
    )
  }

}

export default Login