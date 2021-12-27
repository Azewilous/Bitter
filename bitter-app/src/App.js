import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import background from './assets/938300.jpg'
import React, { Component } from 'react'

class App extends Component {
  render() {
    return (
      <div className='container-fluid'>
        <div className='row intro'>
          <div className='col-sm-7 p-0'>
            <img src={background} alt='background' className='w-100'></img>
          </div>
          <div className='col-sm-5 center pr-1'>
            <div className='row h-15'>
              <div className='col-sm-8'>
                <h1><strong>What are y'all on about</strong></h1>
              </div>
              <div className='col-sm-4'></div>
            </div>
            <div className='row pt-5'>
              <div className='col-sm-8'>
                <h4><strong>Join bitter today</strong></h4>
              </div>
              <div className='col-sm-3'></div>
            </div>
            <div className='row pt-3'>
              <div className='col-sm-4'>
                <button type='button' className='btn btn-info btn-lg rounded-pill w-100 p-0 sign-up'>Sign up with email</button>
              </div>
            </div>
            <div className='row pt-5'>
              <div className='col-md-12'>
                <h6>Already have an account?</h6>
              </div>
            </div>
            <div className='row pt-2'>
              <div className='col-sm-4'>
                <button type='button' className='btn btn-outline-dark btn-lg rounded-pill w-100 p-0 sign-in'>Sign in</button>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
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
