import React from 'react';
import {send, subscribe, channel} from './purs/Signal.Channel'
import {unsafePerformEffect} from './purs/Effect.Unsafe'
import {pure} from "./purs/Control.Applicative"
import Effect, {applicativeEffect} from "./purs/Effect"
import {runAff_} from "./purs/Effect.Aff"
import Signal, {functorSignal} from "./purs/Signal"

function performEff(eff, setState) {
  if(eff && eff.tag){
    return unsafePerformEffect(runAff_(a=>{
      if(a.value0) {
        console.debug("updateting state to:", a.value0)
       return ()=>setState(a.value0) 
      }
      else return ()=>{
        console.error('meh..')
      }
    })(eff))
  }else if(typeof(eff) === 'function'){
    let newState = unsafePerformEffect(eff)
    console.debug("updateting state to:", newState)
    return setState(newState)
  }
}

export default function withState(WrappedComponent, initState, initAction) {
    const doNothing = a => pure(applicativeEffect)(a)
    const context = React.createContext({
        state: initState,
        dispatch: () => pure(applicativeEffect)({})
    })

    class Component extends React.Component {
        constructor(props) {
            super(props)
            this.state = initState
            this.channel = unsafePerformEffect(channel(initAction || doNothing))
        }

        componentDidMount() {
            unsafePerformEffect(this.subscribeChannel())
        }
      subscribeChannel() {
        return Signal.runSignal(
            Signal.flippedMap(functorSignal)(
              subscribe(this.channel)
            )(fn => pure(applicativeEffect)(performEff(fn(this.state), this.setState.bind(this)))))
      }

        render() {
            return (
                <context.Provider
                    value={{
                        state: this.state,
                        dispatch: (action) => {
                            unsafePerformEffect(send(this.channel)(action))
                        }
                    }}
                >
                    <WrappedComponent {...this.props} />
                </context.Provider>
            )
        }
    }

    return {context, Component}
}
