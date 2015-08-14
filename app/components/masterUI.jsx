// npm
import React, { Component } from 'react'

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
        no,... I'm the UI
      </div>
    )
  }

}

export default MasterUI