import React, { Component } from "react"

class Yo extends Component {

  render () {
    const { props } = this
    const { name } = props

    return (
      <div>
        Yo, {name}
      </div>
    )
  }

}

export default Yo