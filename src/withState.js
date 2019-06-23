import React from 'react';
import {send, subscribe, channel} from './purs/Signal.Channel'
import {unsafePerformEffect} from './purs/Effect.Unsafe'
import {pure} from "./purs/Control.Applicative"
import {applicativeEffect} from "./purs/Effect"
import Signal, {functorSignal} from "./purs/Signal"

function subChannel(ch) {
    return function (setState) {
        return Signal.runSignal(
            Signal.flippedMap(functorSignal)(
                subscribe(ch)
            )(fn => pure(applicativeEffect)(setState(fn)))
        )
    }
}

export default function withState(WrappedComponent, initState, initAction) {
    const doNothing = a => a
    const context = React.createContext({
        state: initState,
        dispatch: () => {
        }
    })

    class Component extends React.Component {
        constructor(props) {
            super(props)
            this.state = initState
            this.channel = unsafePerformEffect(channel(initAction || doNothing))
        }

        componentDidMount() {
            const setState = this.setState.bind(this)
            unsafePerformEffect(subChannel(this.channel)(setState))
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
