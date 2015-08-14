// npm
import React from 'react'

// components
import Yo from './components/yo.jsx'

// data
import defaultEvents from './data/defaultEvents.js'

window.layOutDay = function layOutDay (events) {
  console.log('nom nom nom')

  return React.render(
    <Yo name='Bif' events={events} />,
    document.body
  )
}

layOutDay(defaultEvents)