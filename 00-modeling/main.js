import { Machine } from 'xstate';
import '../style.css';

// Create a state machine transition function either using:
// - a switch statement (or nested switch statements)
// - or an object (transition lookup table)

// state: { value: 'loading', ... }
// event: { type: 'LOADED', ... }

const machine = {
  initial: 'loading',
  states: {
    loading: {
      on: {
        LOADED: 'playing'
      }
    },
    playing: {
      on: {
        PAUSE: 'paused'
      }
    },
    paused: {
      on: {
        PLAY: 'playing'
      }
    }
  }
}

function transition(
  state = { value: machine.initial },
  event
) {
  console.log('transition(' + 'state: ' + state.value, ', event: ' + event.type + ')')
  const nextStateValue =
    machine.states[state.value].on?.[event.type]

  if (!nextStateValue) {
    return state
  }

  return {
    ...state,
    value: nextStateValue
  }
}

// Also, come up with a simple way to "interpret" it, and
// make it an object that you can `.send(...)` events to.

let currentState = { value: machine.initial}

const service = {
  send: (event) => {
    currentState = transition(currentState, event)
    console.log(currentState)
  }
}

// export
window.machine = machine
window.transition = transition
window.service = service