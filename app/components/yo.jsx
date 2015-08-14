// npm
import React, { Component } from "react"
import { extend } from 'lodash'

const styles = {
  layoutDivs: {
    float: 'left',
  },
  leftLayoutDiv: {
    width: 350,
    marginRight: 20,
  },
  rightLayoutDiv: {
    width: 590,
  },
}

class Yo extends Component {

  render () {
    const { props } = this
    const {
      name,
      events,
    } = props
    const {
      layoutDivs,
      leftLayoutDiv,
      rightLayoutDiv,
    } = styles

    return (
      <div>
        <div
          style={extend(
            {},
            layoutDivs,
            leftLayoutDiv
          )}
        >
          Yo yo yo, {name},... break it dowwwwwnnnnnnnn
          <pre><code>
{JSON.stringify(events, true, 2)}
          </code></pre>
        </div>
        <div
          style={extend(
            {},
            layoutDivs,
            rightLayoutDiv
          )}
        >
          I'm the UI
        </div>
      </div>
    )
  }

}

export default Yo