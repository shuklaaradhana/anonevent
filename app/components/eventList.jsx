// npm
import React, { Component } from 'react'

const styles = {
  eventListUl: {
    float: 'left',
    display: 'block',
    width: 620,
    height: 720,
    marginTop: 23,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: '#454b5a',
    listStyle: 'none',
  },
}

class EventList extends Component {

  render () {
    const { eventListUl } = styles
    return (
      <ul style={eventListUl}>
        I'm the event list
      </ul>
    )
  }

}

export default EventList