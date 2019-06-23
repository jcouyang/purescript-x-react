module App where

import Effect.Console
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)        
import Prelude
import Effect.Aff
import Effect.Aff (makeAff, runAff_)
import Data.Either (Either(..))
type Count = { click :: Int }

action :: Count -> Effect Count
action c = pure {click: c.click + 1}

asyncAction :: Count -> Aff Count
asyncAction c = makeAff \cb -> cb (Right {click: c.click + 1}) *> mempty
