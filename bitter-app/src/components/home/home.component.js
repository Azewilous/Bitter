import './home.component.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import profileTemp from '../../assets/360_F_169738378_8v5hNI7i7zMm6YCWWSZhfwrGpKkTEOLC.jpg'
import { Component } from 'react'
import AuthService from '../../services/auth.service'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      account: AuthService.getAccount()
    }
  }

  render() {
    return (
      <>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-3 navigations'>
              <div className='row'>
                <div className='col-sm-12'>
                  <span><i className="bi bi-house"></i>Home</span>
                </div>
              </div>
              <div className='row'>
                <div className='col-sm-2'>
                  <i className="bi bi-map"></i>
                </div>
                <div className='col-sm-10'>
                  <p>Explore</p>
                </div>
              </div>
              <div className='row'>
                <div className='col-sm-2'>
                  <i className="bi bi-bell"></i>
                </div>
                <div className='col-sm-10'>
                  <p>Notifcations</p>
                </div>
              </div>
              <div className='row'>
                <div className='col-sm-2'>
                  <i className="bi bi-chat-left-dots"></i>
                </div>
                <div className='col-sm-10'>
                  <p>Messages</p>
                </div>
              </div>
              <div className='row'>
                <div className='col-sm-2'>
                  <i className="bi bi-person-circle"></i>
                </div>
                <div className='col-sm-10'>
                  <p>Profile</p>
                </div>
              </div>
            </div>
            <div className='col-sm-6 narratives'>
              <div className='row'>
                <div className='col-sm-12'>
                  <div className='row'>
                    <div className='col-sm-10'>
                      <p>Home</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='row'>
                    <div className='col-sm-1'>
                      <img src={profileTemp} alt='profile' className='w-100'></img>
                    </div>
                    <div className='col-sm-11'>
                      <textarea className={`form-control w-100 new-narrative`} rows={1} type="text" placeholder="What's happening?"></textarea>
                    </div>
                  </div>
                  <hr />
                  <div className='row'>
                    <div className='col-sm-8'></div>
                    <div className='col-sm-4 d-flex justify-content-end'>
                      <button type='submit' className='btn btn-info btn-lg rounded-pill w-50 p-1 new-narrative'>Next</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-sm-3'>

            </div>
          </div>
        </div>
      </>
    )
  }

}

export default Home