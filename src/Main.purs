module Main
  ( Address(..)
  , AddressComponents(..)
  , GeoCoords(..)
  , batchValidate_
  , format_
  , parts_
  , validate_
  ) where

import Prelude

import Affjax as AX
import Affjax.Node as AN
import Affjax.RequestBody as RequestBody
import Affjax.ResponseFormat as ResponseFormat
import Data.Argonaut (class DecodeJson)
import Data.Argonaut.Core (Json)
import Data.Argonaut.Core as J
import Data.Argonaut.Decode (JsonDecodeError, (.:))
import Data.Argonaut.Decode as JD
import Data.Either (Either(..))
import Data.Maybe (Maybe)
import Effect (Effect)
import Effect.Aff (launchAff)
-- import Effect.Console (log)
import Effect.Class.Console (log)

data Address = Address
  { accuracy :: Int
  , accuracyType :: String
  , components :: AddressComponents
  , formatted :: String
  , location :: GeoCoords
  , source :: String
  }

derive instance Eq Address
derive instance Ord Address
-- derive instance Show Address

instance decodeJsonAddress :: DecodeJson Address where
  decodeJson json = do
    obj <- JD.decodeJson json
    o <- obj .: "location"
    accuracy <- o .: "accuracy"
    accuracyType <- o .: "accuracyType"
    formatted <- o .: "formatted_address"
    source <- o .: "source"
    pure $ Address
      { accuracy
      , accuracyType
      , formatted
      , source
      }

data AddressComponents = AddressComponents
  { city :: String
  , country :: String
  , county :: String
  , formattedStreet :: String
  , number :: String
  , predirectional :: Maybe String
  , secondarynumber :: Maybe String
  , secondaryunit :: Maybe String
  , state :: String
  , street :: String
  , suffix :: String
  , zip :: String
  }

derive instance Eq AddressComponents
derive instance Ord AddressComponents
-- derive instance Show AddressComponents

instance decodeJsonAddressComponents :: DecodeJson AddressComponents where
  decodeJson json = do
    obj <- JD.decodeJson json
    o <- obj .: "address_components"
    city <- o .: "city"
    country <- o .: "country"
    county <- o .: "county"
    formattedStreet <- o .: "formatted_street"
    number <- o .: "number"
    predirectional <- o .: "predirectional "
    secondarynumber <- o .: "secondarynumber"
    secondaryunit <- o .: "secondaryunit"
    state <- o .: "state"
    street <- o .: "street"
    suffix <- o .: "suffix"
    zip <- o .: "zip"
    pure $ AddressComponents
      { city
      , country
      , county
      , formattedStreet
      , number
      , predirectional
      , secondarynumber
      , secondaryunit
      , state
      , street
      , suffix
      , zip
      }

data GeoCoords = GeoCoords
  { lat :: Number
  , lng :: Number
  }

derive instance Eq GeoCoords
derive instance Ord GeoCoords
-- derive instance Show GeoCoords

instance decodeJsonGeoCoords :: DecodeJson GeoCoords where
  decodeJson json = do
    obj <- JD.decodeJson json
    o <- obj .: "location"
    lat <- o .: "lat"
    lng <- o .: "lng"
    pure $ GeoCoords { lat, lng }

-- | INTERNAL
addressDecoder :: Json -> Either JsonDecodeError Address
addressDecoder = JD.decodeJson

-- | Pretty format Address e.g. "1109 N Highland St, Arlington, VA"
format_ :: Address -> String
format_ (Address address) = address.formatted

-- | Return Address components
parts_ :: Address -> AddressComponents
parts_ (Address address) = address.components

-- | Validate incoming address against Geocodio API
validate_ :: String -> Effect Unit
validate_ apiKey = void $ launchAff $ do
  result <- AN.get ResponseFormat.json
    $ "https://api.geocod.io/v1.7/geocode?q=1109+N+Highland+St%2c+Arlington+VA&api_key=" <> apiKey
  case result of
    Left err -> log $ "GET /api response failed to decode: " <> AX.printError err
    Right response -> log $ show $ addressDecoder response.body

-- Right response -> log $ "GET /api response: " <> J.stringify response.body

-- | Batch validate incoming address against Geocodio API
batchValidate_ :: Effect Unit
batchValidate_ =
  log "not implemented"
