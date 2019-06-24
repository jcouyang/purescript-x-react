module App where

import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)        
import Prelude
import Effect.Aff
import Effect.Aff (makeAff, runAff_)
import Effect.Aff.Compat (EffectFnAff, fromEffectFnAff)        
import Data.Either (Either(..))
import Data.Generic.Rep (class Generic)
import Data.Generic.Rep.Show (genericShow)
import Foreign.Generic (defaultOptions)
import Control.Monad.Except (runExcept)
import Foreign.Generic (genericDecodeJSON)
import Fetch (fetch)
import Data.List.NonEmpty (singleton)
import Data.Maybe
import Data.Lens
import Data.Lens.Record(prop)
import Data.Symbol (SProxy(..))
import Data.Newtype (class Newtype)
import Data.Lens.Iso.Newtype (_Newtype)

opts = defaultOptions { unwrapSingleConstructors = true }

newtype Data = Data {
      id:: Int
    ,status:: Maybe String
    ,completed :: Boolean
    }
derive instance newtypeData ∷ Newtype Data _
derive instance genericData :: Generic Data _
instance showData :: Show Data where show = genericShow

_id = (_Newtype <<< prop (SProxy ::SProxy "id"))
action :: Data -> Effect Data
action c = pure  $ over _id (\id -> id +1) c

remoteLoad :: Data -> Aff Data
remoteLoad c = do
  resp <- fetch "https://jsonplaceholder.typicode.com/todos/1"
  case runExcept $ genericDecodeJSON opts resp :: _ Data of
    Right a -> pure a
    Left err -> throwError $ error $ show err
