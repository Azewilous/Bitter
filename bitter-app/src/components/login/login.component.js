import './login.component.css'
import { Component } from 'react'
import AuthService from '../../services/auth.service'

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
      if (response.data.account.token) {
        localStorage.setItem('account', JSON.stringify(response.data.account))
        this.setState({ showAlert: true, variant: 'success', message: 'Login Successful' })
        setTimeout(() => {
          this.setState({ isLoggedIn: true })
          window.history.pushState({}, undefined, '/home')
          window.location.reload()
        }, 1500)
      }
    }).catch(({ response }) => {
      console.log(response)
      if (response.status === 401) {
        this.setState({ showAlert: true, variant: 'danger', message: response.data.message })
        console.log(this.state.showAlert)
      }
    })
  }

  closeAlerts() {
    this.setState({ showAlert: false })
  }

  render() {
    return (
      <form className='row g-3 container-fluid mt-3' onSubmit={this.handleSubmission}>
        <div className='col-sm-12'>
          <div className='row pb-3'>
            <div className='col-sm-12 p-0 input-group input-group-lg'>
              <input className={`form-control w-100 ${!this.state.validations['email'] ? '' : 'invalid-control'}`} type="text" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} />
              <span className='invalid'>{this.state.validations['email']}</span>
            </div>
          </div>
          <div className='row pb-3'>
            <div className='col-sm-12 p-0 input-group input-group-lg'>
              <input className={`form-control w-100 ${!this.state.validations['password'] ? '' : 'invalid-control'}`} type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} />
              <span className='invalid'>{this.state.validations['password']}</span>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-12'>
              {
                this.state.showAlert && <div class={`alert alert-${this.state.variant} p-1`} role='alert'>
                  {this.state.message}
                </div>
              }
            </div>
          </div>
          <div className='row pt-2'>
            <div className='col-sm-12 p-0'>
              <button type='submit' className='btn btn-info btn-lg rounded-pill w-100 p-0 login'>Next</button>
            </div>
          </div>
        </div>
      </form>
    )
  }

}

export default Login