// npm
import React, { Component } from 'react'
import moment from 'moment'
import { range } from 'lodash'

// components
import TimeTicks from './timeTicks.jsx'

const styles = {
  timeScale: {
    float: 'left',
    width: 100,
    marginTop: 13,
    paddingLeft: 0,
    listStyle: 'none',
    textAlign: 'right',
  },
}

const ticks = range(0,25).map(idx => {
    return {
      time: moment('1981-04-25 09:00').add(idx * 30, 'minutes'),
      emphasis: idx % 2 === 0 ? true : false,
    }
})

class TimeScale extends Component {

  render () {
    const { timeScale } = styles

    return (
      <ul style={timeScale}>
        {ticks.map((tick, index) => <TimeTicks key={index} {...tick} />)}
      </ul>
    )
  }

}

export default TimeScale