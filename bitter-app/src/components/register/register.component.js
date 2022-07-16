import React, { Component } from 'react'
import { Modal, Container, Row, Col, Form } from 'react-bootstrap'
import AuthService from '../../services/auth.service.js'
import Alerts from '../alerts/alert.component'

const initialState = {
  name: '',
  email: '',
  password: '',
  selectedMonth: undefined,
  selectedDay: undefined,
  selectedYear: undefined,
  days: [],
  months: [],
  years: [],
  validations: {},
  showAlert: false,
  variant: '',
  message: ''
}

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = initialState

    this.handleMonthChange = this.handleMonthChange.bind(this)
    this.handleYearChange = this.handleYearChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleDayChange = this.handleDayChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmission = this.handleSubmission.bind(this)
    this.closeAlerts = this.closeAlerts.bind(this)
  }

  componentDidMount() {
    this.setState({
      days: [...Array(31).keys()].map(x => x + 1),
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      years: [...Array(100).keys()].map(x => x + 1922)
    })
  }

  handleYearChange(event) {
    let year = event.target.value
    this.setState({ selectedYear: year }, () => this.repopulateDays())
  }

  handleMonthChange(event) {
    let currentMonth = event.target.value
    this.setState({ selectedMonth: currentMonth }, () => this.repopulateDays())
  }

  handleDayChange(event) {
    this.setState({ selectedDay: event.target.value })
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value })
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value })
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value })
  }

  handleSubmission(event) {
    event.preventDefault()
    this.validateParameters()
  }

  repopulateDays() {
    let daysOfMonth = this.state.days
    let currentMonth = Number(this.state.selectedMonth)
    let currentYear = Number(this.state.selectedYear)
    if (currentMonth === 1 || currentMonth === 3 || currentMonth === 5 || currentMonth === 7 || currentMonth === 8 || currentMonth === 10 || currentMonth === 12) {
      daysOfMonth = [...Array(31).keys()].map(x => x + 1)
    } else if (currentMonth === 4 || currentMonth === 6 || currentMonth === 9 || currentMonth === 11) {
      daysOfMonth = [...Array(30).keys()].map(x => x + 1)
    } else if (currentMonth === 2) {
      daysOfMonth = currentYear ? currentYear % 4 === 0 ? [...Array(29).keys()].map(x => x + 1) : [...Array(28).keys()].map(x => x + 1) : [...Array(28).keys()].map(x => x + 1)
    } else {
      daysOfMonth = [...Array(31).keys()].map(x => x + 1)
    }
    this.setState({ days: daysOfMonth })
  }

  validateParameters() {
    let isValid = true
    let validations = {}
    if (!this.state.name) {
      validations['name'] = 'Please enter a name.'
      isValid = false
    }
    if (!this.state.email || !this.checkEmail(this.state.email)) {
      validations['email'] = 'Please enter a valid email.'
      isValid = false
    }
    if (!this.state.password) {
      validations['password'] = 'Please enter a password.'
      isValid = false
    } else if (!this.checkPassword(this.state.password)) {
      validations['password'] = 'Password must contain atleast 8 characters, one letter and one special character'
      isValid = false
    }
    if (!this.state.selectedDay) {
      validations['day'] = 'Please enter a day.'
      isValid = false
    }
    if (!this.state.selectedMonth) {
      validations['month'] = 'Please enter a month.'
      isValid = false
    }
    if (!this.state.selectedYear) {
      validations['year'] = 'Please enter a year.'
      isValid = false
    }
    this.setState({ validations: validations })
    
    if (isValid) {
      this.handleRegister()
    }

  }

  checkEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  checkPassword(password) {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)
  }

  handleRegister() {
    AuthService.register(
      this.state.name, this.state.email, this.state.password
    ).then(response => {
      console.log(response)
    }).catch(( { response }) => {
      console.log(response)
      this.setState({ showAlert: true, variant: 'danger', message: response.data.message })
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
                  <Modal.Title>Create your account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Alerts show={this.state.showAlert} variant={this.state.variant} message={this.state.message} close={this.closeAlerts} />
                  <>
                    <div className='container-fluid'>
                      <form className='row g-3' onSubmit={this.handleSubmission}>
                        <div className='col-md-12'>
                          <div className='row pb-4'>
                            <div className='col-sm-12 p-0 input-group input-group-lg'>
                              <div className='row w-100'>
                                <div className='col-sm-12 d-flex justify-content-end p-0 name-len'>{this.state.name.length + '/' + 50}</div>
                              </div>
                              <div className='row w-100'>
                                <div className='col-sm-12 p-0'>
                                  <input className={`form-control w-100 ${!this.state.validations['name'] ? '' : 'invalid-control'}`} type="text" placeholder="Name" maxLength={50} value={this.state.name} onChange={this.handleNameChange} />
                                  <span className='invalid'>{this.state.validations['name']}</span>
                                </div>
                              </div>
                            </div>
                          </div>
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
                          <div className='row pt-4'>
                            <div className='col-sm-12 p-0'>
                              <p>Date of birth</p>
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-sm-6 p-0'>
                              <Form.Select className={`form-control ${!this.state.validations['month'] ? '' : 'invalid-control'}`} aria-label='' value={this.state.selectedMonth} onChange={this.handleMonthChange}>
                                <option>Month</option>
                                {this.state.months.map((row, index) => (<option key={index + 1} value={index + 1}>{row}</option>))}
                              </Form.Select>
                              <span className='invalid'>{this.state.validations['day']}</span>
                            </div>
                            <div className='col-sm-3'>
                              <Form.Select className={`form-control ${!this.state.validations['day'] ? '' : 'invalid-control'}`} aria-label='' value={this.state.selectedDay} onChange={this.handleDayChange}>
                                <option>Day</option>
                                {this.state.days.map((row, index) => (<option key={index} value={index}>{row}</option>))}
                              </Form.Select>
                              <span className='invalid'>{this.state.validations['month']}</span>
                            </div>
                            <div className='col-sm-3 p-0'>
                              <Form.Select className={`form-control ${!this.state.validations['year'] ? '' : 'invalid-control'}`} aria-label='' value={this.state.selectedYear} onChange={this.handleYearChange}>
                                <option>Year</option>
                                {this.state.years.map((row, index) => (<option key={index}>{row}</option>))}
                              </Form.Select>
                              <span className='invalid'>{this.state.validations['year']}</span>
                            </div>
                          </div>
                          <div className='row pt-5'>
                            <div className='col-sm-12'>
                              <button type='submit' className='btn btn-info btn-lg rounded-pill w-100 p-1 login'>Next</button>
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

export default Register