import { Component } from 'react'
import moment from 'moment'
import './narrative.component.css'

class Narrative extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      postedTime: ''
    }

  }

  componentDidMount() {
    this.interval = setInterval(() => this.calculateTimePosted(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  calculateTimePosted() {
    let createdDate = new Date(this.props.createdAt)
    let differenceInTime = this.convertMSToText(createdDate)
    this.setState({ postedTime: differenceInTime })
  }

  convertMSToText(createdDate) {
    let milliseconds = Math.abs(createdDate - new Date())
    let seconds = Math.floor(milliseconds / 1000)
    let minutes = Math.floor(seconds / 60)
    let hours = Math.floor(minutes / 60)
    
    if (seconds < 60) {
      return seconds + 's'
    }

    if (minutes < 60) {
      return minutes + 'm'
    }

    if (hours < 24) {
      return hours + 'h'
    }

    return moment(new Date(createdDate), 'YYYY-MM-DD').format('MMM D')
    
  }

  render() {
    return (
      <>
        <div className='container narrative-container'>
          <div className='row pb-2'>
            <div className='col-sm-6 text-white'>
              <strong>{ this.props.username}&nbsp;&nbsp;</strong>
              <span className='text-secondary'>@{this.props.username}&nbsp;</span>
              <span className='text-secondary narrative-dot'>&#8226;&nbsp;{ this.state.postedTime }</span>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-12 text-white'>
              { this.props.narrative }
            </div>
          </div>
        </div>
      </>
    )
  }

}

export default Narrative