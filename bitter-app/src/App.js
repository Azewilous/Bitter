import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import background from './assets/490500.jpg'
import React, { Component } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Register from './components/register/register.component'
import Login from './components/login/login.component'
import AuthService from './services/auth.service'
import Home from './components/home/home.component'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showRegister: false,
      showLogin: false,
      account: undefined
    }
    this.handleRegisterModalState = this.handleRegisterModalState.bind(this)
    this.handleLoginModalState = this.handleLoginModalState.bind(this)
  }

  componentDidMount() {
    const account = AuthService.getAccount()

    if (account) {
      this.setState({
        account: account
      })
    }
  }

  handleRegisterModalState() {
    this.setState({
      showRegister: !this.state.showRegister
    })
  }

  handleLoginModalState() {
    this.setState({
      showLogin: !this.state.showLogin
    })
  }

  render() {
    return (
      <div className='container-fluid'>
        <div className='row intro'>
          <div className='col-sm-7 p-0'>
            <img src={background} alt='background' className='w-100 background'></img>
          </div>
          <div className='col-sm-5 center pr-1'>
            <div className='row h-15'>
              <div className='col-sm-10'>
                <h1><strong>What are y'all on about</strong></h1>
              </div>
              <div className='col-sm-2'></div>
            </div>
            <div className='row pt-4'>
              <div className='col-sm-8'>
                <h4><strong>Join bitter today</strong></h4>
              </div>
              <div className='col-sm-3'></div>
            </div>
            <div className='row pt-3'>
              <div className='col-sm-5'>
                <button type='button' className='btn btn-info btn-lg rounded-pill w-100 p-1 sign-up' onClick={this.handleRegisterModalState}>Sign up with email</button>
                <Register show={this.state.showRegister} hide={this.handleRegisterModalState} />
              </div>
            </div>
            <div className='row pt-5'>
              <div className='col-md-12'>
                <h6>Already have an account?</h6>
              </div>
            </div>
            <div className='row pt-2'>
              <div className='col-sm-5'>
                <button type='button' className='btn btn-outline-dark btn-lg rounded-pill w-100 p-1 sign-in' onClick={this.handleLoginModalState}>Sign in</button>
                <Login show={this.state.showLogin} hide={this.handleLoginModalState} />
              </div>
            </div>
          </div>
        </div>
        <div className='row pt-3'>
          <div className='col-sm-5'></div>
          <div className='col-sm-2 d-flex justify-content-center'>
            <h6>© 2021 Bitter</h6>
          </div>
          <div className='col-sm-5'></div>
        </div>
      </div>
    );
  }
}

export default App
