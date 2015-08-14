// npm
import React, { Component } from 'react'

const styles = {
  timeScale: {
    width: 100,
  },
}

class TimeScale extends Component {

  render () {
    const { timeScale } = styles

    return (
      <div style={timeScale}>
        I'm the time scale
      </div>
    )
  }

}

export default TimeScale