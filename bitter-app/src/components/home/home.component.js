import './home.component.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import profileTemp from '../../assets/360_F_169738378_8v5hNI7i7zMm6YCWWSZhfwrGpKkTEOLC.jpg'
import { Component } from 'react'
import AuthService from '../../services/auth.service'
import NarrationService from '../../services/narrative.service'
import Narrative from '../narrative/narrative.component'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      account: AuthService.getAccount(),
      narration: '',
      narrartives: []
    }

    this.handleNarrationSubmit = this.handleNarrationSubmit.bind(this)
    this.handleNarrationChange = this.handleNarrationChange.bind(this)
  }

  componentDidMount() {
    //this.interval = setInterval(() => this.loadNarratives(), 3000)
    this.loadNarratives()
  }

  handleNarrationSubmit(event) {
    event.preventDefault()
    NarrationService.createNarration(
      this.state.account.id, this.state.narration
    ).then(response => {
      this.loadNarratives()
      setTimeout(() => this.setState({ narration: '' }), 100)
    })
  }

  handleNarrationChange(event) {
    this.setState({ narration: event.target.value })
  }

  loadNarratives() {
    NarrationService.getAllNarratives().then(response => {
      this.setState({ narrartives: response.data })
    }).catch(err => {

    })
  }

  render() {
    return (
      <>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-3 navigations'>
              <div className='row'>
                <div className='col-sm-2'>
                  <i className="bi bi-house"></i>
                </div>
                <div className='col-sm-10'>
                  <p>Home</p>
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
              <div className='row h-75'>
                <div className='col-sm-2'>
                  <i className="bi bi-person-circle"></i>
                </div>
                <div className='col-sm-10'>
                  <p>Profile</p>
                </div>
              </div>
              <div className='row'>
                <div className='col-sm-12 account-details'>
                  <div className='row  pt-2 pb-2'>
                    <div className='col-sm-2 pr-0'>
                      <img src={profileTemp} alt='profile' className='profile-picture profile-picture-small'></img>
                    </div>
                    <div className='col-sm-8'>
                      <div className='row'>
                        <div className='col-sm-12 text-white'>
                          { this.state.account.fullname }
                        </div>
                        <div className='col-sm-12'>
                          @{ this.state.account.fullname }
                        </div>
                      </div>
                    </div>
                    <div className='col-sm-1'>
                      <i className='bi bi-three-dots'></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-sm-6 narratives p-0'>
              <div className='row narratives-header'>
                <div className='col-sm-12'>
                  <div className='row'>
                    <div className='col-sm-10'>
                      <p>Home</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row pb-3 narratives-narrate'>
                <form className='col-sm-12' onSubmit={this.handleNarrationSubmit}>
                  <div className='row'>
                    <div className='col-sm-1'>
                      <img src={profileTemp} alt='profile' className='profile-picture'></img>
                    </div>
                    <div className='col-sm-11'>
                      <textarea className={`form-control w-100 new-narrative`} rows={1} type="text" placeholder="What's happening?" value={this.state.narration} onChange={this.handleNarrationChange}></textarea>
                    </div>
                  </div>
                  <hr />
                  <div className='row'>
                    <div className='col-sm-8'></div>
                    <div className='col-sm-4 d-flex justify-content-end'>
                      <button type='submit' className='btn btn-info btn-lg rounded-pill w-50 p-1 new-narrative'>Next</button>
                    </div>
                  </div>
                </form>
              </div>
              <div className='row'>
                <div className='col-sm-12 p-0'>
                  { 
                    this.state.narrartives.map(narrartive => 
                      <Narrative key={narrartive.id} username={narrartive.username} narrative={narrartive.message} createdAt={narrartive.createdAt}></Narrative>
                    )
                  }
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