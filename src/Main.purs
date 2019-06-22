module Main where

import Effect.Console
import Effect (Effect)
import Prelude
import Signal
import Signal.Channel (channel, send)        


type Entry =
  { firstName :: String
  , lastName  :: String
  , address   :: Address
  }
type Address =
  { street :: String
  , city   :: String
  , state  :: String
  }

addr :: Address
addr = {street: "hehe", city: "cc", state: "ss"}

hello :: Signal Address
hello = constant addr

helloEffect :: Signal (Effect Unit)
helloEffect = hello ~> log <<< show

main = runSignal helloEffect
