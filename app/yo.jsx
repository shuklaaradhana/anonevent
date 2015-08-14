import React, { Component } from "react"

class Yo extends Component {

  render () {
    const { props } = this
    const { name } = props

    return (
      <div>
        Yo yo yo, {name},... break it dowwwwwnnnnnnnn
      </div>
    )
  }

}

export default Yo