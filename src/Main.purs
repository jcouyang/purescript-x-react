module App where

import Effect.Console
import Effect (Effect)
import Prelude
import Signal
import Signal.Channel
import Signal.Channel       (send, subscribe)
type Count =
  { click :: Int }

action :: Count -> Count
action c = {click: c.click + 1}

subChannel :: Channel (Count -> Count) -> ((Count -> Count) -> Unit) -> Effect Unit
subChannel ch ss = runSignal $ (subscribe ch) ~> pure <<< ss
  
