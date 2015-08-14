// npm
import React, { Component } from 'react'
import moment from 'moment'
import { extend } from 'lodash'

const styles = {
  li: {
    marginRight: 12,
    marginBottom: 10,
  },
  span: {
    fontFamily: 'Arial, Helvetica',
    fontSize: 14,
    fontWeight: 300,
    color: '#989baf',
  },
  emphasizedSpan: {
    fontWeight: 700,
  },
  emphasizedInnerSpan: {
    fontSize: 18,
    color: 'white',
  },
}

class TimeTicks extends Component {

  render () {
    const { props } = this
    const {
      time,
      emphasis,
    } = props
    let {
      li,
      span,
      emphasizedSpan,
      emphasizedInnerSpan,
    } = styles

    emphasizedSpan = extend(
      {},
      span,
      emphasizedSpan
    )
    emphasizedInnerSpan = extend(
      {},
      span,
      emphasizedSpan,
      emphasizedInnerSpan
    )

    const meridiem = emphasis ? ` ${time.format('A')}` : ''
    const formattedTime = (
      <span
        style={emphasis
          ? emphasizedSpan
          : span
        }
      >
        <span
          style={emphasis
            ? emphasizedInnerSpan
            : null
          }
        >
          {time.format('h:mm')}
        </span>{meridiem}
      </span>
    )

    return (
      <li style={li}>
        {formattedTime}
      </li>
    )
  }

}

export default TimeTicks