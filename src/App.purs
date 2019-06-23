module App where

import Effect.Console
import Effect (Effect)
import Prelude

type Count = { click :: Int }

action :: Count -> Count
action c = {click: c.click + 1}