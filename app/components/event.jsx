// npm
import React, { Component } from 'react'
import moment from 'moment'
import { extend } from 'lodash'

const style = {
  eventLi: {
    position: 'absolute',
    display: 'block',
    overflow: 'hidden',
    paddingTop: 5,
    paddingLeft: 4,
    boxSizing: 'border-box',
    borderTop: 5,
    borderRight: 0,
    borderBottom: 0,
    borderLeft: 1,
    borderStyle: 'solid',
    backgroundColor: '#e5e5e5',
    color: '#5e6172',
    fontFamily: 'Arial, Helvetica',
    fontSize: 12,
    fontWeight: 700,
  },
  timeSpan: {
    fontSize: 11,
    fontWeight: 500,
  },
}

const borderColors = [
  '#45d3ab',
  '#fe6c6c',
  '#ad83d9',
  '#ffb180',
]

class Event extends Component {

  render () {
    let {
      eventLi,
      timeSpan,
    } = style
    const { props } = this
    const {
      start,
      end,
      denominator,
      xFactor,
      ulWidth,
      index,
    } = props

    eventLi = extend(
      {},
      eventLi,
      {
        top: start,
        left: 10 + ((ulWidth / denominator) * xFactor),
        width: ulWidth / denominator,
        height: end - start,
        borderColor: borderColors[index % 4],
      }
    )

    const dayStartTime = moment('1981-04-25 09:00')
    const startTime = dayStartTime
      .add(start, 'minutes')
      .format('h:mm a')
    const endTime = dayStartTime
      .add(end, 'minutes')
      .subtract(start, 'minutes')
      .format('h:mm a')

    return (
      <li
        key={index}
        style={eventLi}
      >
        <span>event {index + 1}</span>&nbsp;
        <span style={timeSpan}>({startTime} - {endTime})</span>
      </li>
    )    
  }

}

export default Event