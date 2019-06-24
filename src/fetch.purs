module Fetch where
import Prelude    
import Effect.Aff
import Effect.Aff.Compat (EffectFnAff, fromEffectFnAff)        

foreign import _fetch :: forall a. String -> EffectFnAff a

fetch :: forall a. String -> Aff a
fetch = fromEffectFnAff <<< _fetch
