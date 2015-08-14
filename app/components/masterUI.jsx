// npm
import React, { Component } from 'react'

// components
import TimeScale from './timeScale.jsx'
import EventList from './eventList.jsx'

const styles = {
  masterUIDiv: {
    backgroundColor: '#5d6071',
    height: 785,
  },
}

class MasterUI extends Component {

  render () {
    const { masterUIDiv } = styles

    return (
      <div style={masterUIDiv}>
        <TimeScale />
        <EventList />
      </div>
    )
  }

}

export default MasterUI