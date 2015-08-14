const eventsColls = [
  [ {start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670} ],
  [ {start: 30, end: 150}, {start: 540, end: 620}, {start: 560, end: 620}, {start: 610, end: 670} ],
  [ {start: 30, end: 150}, {start: 540, end: 620}, {start: 560, end: 620}, {start: 610, end: 670}, {start: 660, end: 670} ],
  [ {start: 30, end: 150}, {start: 540, end: 620}, {start: 560, end: 620}, {start: 610, end: 670}, {start: 615, end: 630} ],
  [ {start: 30, end: 150}, {start: 540, end: 620}, {start: 560, end: 620}, {start: 610, end: 670}, {start: 615, end: 630}, {start: 610, end: 620} ],
  [ {start: 30, end: 150}, {start: 540, end: 620}, {start: 560, end: 620}, {start: 610, end: 670}, {start: 615, end: 630}, {start: 610, end: 620}, {start: 160, end: 170} ],
  [ {start: 30, end: 150}, {start: 30, end: 150}, {start: 30, end: 150}, {start: 30, end: 150}, {start: 30, end: 150} ],
]

const answers = [
  [
    [1, 2, 2, 2],
    [0, 0, 1, 0],
  ],
  [
    [1, 3, 3, 3],
    [0, 0, 1, 2],
  ],
  [
    [1, 3, 3, 3, 2],
    [0, 0, 1, 2, 0],
  ],
  [
    [1, 4, 4, 4, 4],
    [0, 0, 1, 2, 3],
  ],
  [
    [1, 5, 5, 5, 5, 5],
    [0, 0, 1, 2, 3, 4],
  ],
  [
    [1, 5, 5, 5, 5, 5, 1],
    [0, 0, 1, 2, 3, 4, 0],
  ],
  [
    [5, 5, 5, 5, 5],
    [0, 1, 2, 3, 4],
  ],
]

// overlap predicate
/**
 * Determine if two events overlap
 * 
 * @param {object} - eventA first event to compare for overlaps
 * @param {object} - eventB second event to compare for overlaps
 * 
 * @return {boolean} - Truthiness of overlapping quality for two events
 * 
 */
const isOverlapping = (eventA, eventB) => {
  // A starts before B ends and A ends after B starts
  return eventA.start < eventB.end && eventA.end > eventB.start
}

// n (reduce)
// reduce a list of all events that overlap a given event
/**
 * Generate list of all events that overlap a given event
 * 
 * @param {array} - events collection of events to operate on
 * @param {object} - event event to compare all others against
 * @param {number} - index the index of the event in events
 * 
 * @return {array} - array of overlapping indices
 * 
 */
const reduceOverlaps = (events, event, index) => {
  return events.reduce((collidingEvents, reduceEvent, reduceIndex) => {
    //short circuit for same event
    if (reduceIndex === index) {
      return collidingEvents
    }
    //if
    return (isOverlapping(event, reduceEvent))
      //then
      ? collidingEvents.concat(reduceIndex)
      //else
      : collidingEvents
  }, [])
}

// n^2 (map with nested reduce)
// collect the overlapping events for each event
/**
 * The events with overlapping events for each event
 * 
 * @param {array} - events collection of events to operate on
 * 
 * @return {array} - collection of events with overlapping indices appended
 * 
 */
const collectOverlaps = (events) => {
  return events.map((event, index) => {
    return reduceOverlaps(events, event, index)
  })
}

// n (reduce overlaps)
// reduce concurrent events for a given set of overlapping indices to a count
//  - concurrent events means there are more than one events
//    overlapping eachother and the original event
/**
 * Count of concurrent events for a given set of overlapping indices
 * 
 * @param {array} - overlapIndices list of indices overlapping an event
 * @param {array} - allOverlaps list of list of overlaps for all events
 * @param {number} - index the index of the event in events
 * 
 * @return {number} - the number of concurrent events for a given event
 *                    meaning there are more than one events overlapping
 *                    eachother and the original event
 * 
 */
const countConcurrentEvents = (overlapIndices, allOverlaps, curIndex) => {
  return overlapIndices.reduce((accum, index) => {
    //if
    return _.intersection(allOverlaps[index], allOverlaps[curIndex]).length > 0
      //then
      ? accum.concat(index)
      //else
      : accum
  }, []).length
}

// marshall three types of event overlaps to number of events spanning width
//  - no overlaps become single span
//  - overlaps but no concurrent events become 2 spans
//  - overlaps with concurrent events become 
//    concurrent events count plus the event itself number of spans
/**
 * Marshall three types of event overlaps to number of events spanning width
 * 
 * @param {array} - overlapIndices list of indices of overlapping events
 * @param {number} - concurrentEventCount number of concurrent events
 * 
 * @return {number} - number of spans to split set of events into
 * 
 */
const calcDenominator = (overlapIndices, concurrentEventCount) => {
  // default for no overlaps
  let denominator = 1
  // if we find overlaps and concurrent events
  if (overlapIndices.length && concurrentEventCount) {
    denominator = concurrentEventCount + 1
  // if we find overlaps but no concurrent events
  } else if (overlapIndices.length && !concurrentEventCount) {
    denominator = 2
  }
  return denominator
}

// n^2 (map with nested reduce)
// TODO include y axis prop
// map over each events overlaping collection and calculate
//  - denominators for calculating widths
//  - xFactors for x axis positions
/**
 * Prepare props for render of events
 * 
 * @param {array} - events collection of events to render
 * @param {array} - overlaps events with overlapping indices appended
 * 
 * @return {array} - array of props needed to render list of events
 * 
 */
const renderEvents = (events, overlaps) => {
  // TODO get rid of counter if possible?
  let counter = 0
  return overlaps.map((overlapIndices, index) => {
    // use concurrentEventCount to calculate number of other events also
    // colliding with a collided event
    let concurrentEventCount = overlapIndices
      ? countConcurrentEvents(overlapIndices, overlaps, index)
      : 0
    
    // use denominator to keep track of how many concurrentEvents there are
    const denominator = calcDenominator(overlapIndices, concurrentEventCount)

    let xFactor = counter % denominator
    counter++
    if (counter === denominator) counter = 0
    
    return {
      start: events[index].start,
      end: events[index].end,
      denominator: denominator,
      xFactor: xFactor,
    }
  })
}

// TODO output jsx

// n^2 (really (n^2) * 2, but we eliminate constants)
const renderApp = (events) => {
  const overlaps = collectOverlaps(events)
  
  return renderEvents(events, overlaps)
}


// ad-hoc functional test
console.log('')
eventsColls.forEach((arr, idx) => {
  const yo = renderApp(arr)
  const answer = [
    yo.map(event => event.denominator),
    yo.map(event => event.xFactor),
  ]
  
  //if
  const verdict = _.isEqual(answer, answers[idx])
    //then
    ? 'pass'
    //else
    : 'fail'
  
  console.log(idx, verdict)
})

