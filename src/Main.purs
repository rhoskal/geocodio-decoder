module Main
  ( Address
  , AddressComponents
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
import Effect (Effect)
import Effect.Aff (launchAff)
-- import Effect.Console (log)
import Effect.Class.Console (log)

newtype Address = Address
  { components :: AddressComponents
  , formatted :: String
  , location :: GeoCoords
  , accuracy :: Int
  , accuracyType :: String
  , source :: String
  }

derive newtype instance Eq Address
derive newtype instance Ord Address
derive newtype instance Show Address

derive newtype instance DecodeJson Address
-- instance decodeJsonAddress :: DecodeJson Address where
--   decodeJson json = do
--     o <- JD.decodeJson json
--     o' <- o .: "location"
--     formatted <- o' .: "formatted_address"
--     accuracy <- o' .: "accuracy"
--     accuracyType <- o' .: "accuracyType"
--     source <- o' .: "source"
--     pure $ Address
--       { formatted
--       , accuracy
--       , accuracyType
--       , source
--       }

newtype AddressComponents = AddressComponents
  { number :: String
  , predirectional :: String
  , street :: String
  , suffix :: String
  , formattedStreet :: String
  , city :: String
  , county :: String
  , state :: String
  , zip :: String
  , country :: String
  }

derive newtype instance Eq AddressComponents
derive newtype instance Ord AddressComponents
derive newtype instance Show AddressComponents

instance decodeJsonAddressComponents :: DecodeJson AddressComponents where
  decodeJson json = do
    o <- JD.decodeJson json
    o' <- o .: "address_components"
    number <- o' .: "number"
    predirectional <- o' .: "predirectional "
    street <- o' .: "street"
    suffix <- o' .: "suffix"
    formattedStreet <- o' .: "formatted_street"
    city <- o' .: "city"
    county <- o' .: "county"
    state <- o' .: "state"
    zip <- o' .: "zip"
    country <- o' .: "country"
    pure $ AddressComponents
      { number
      , predirectional
      , street
      , suffix
      , formattedStreet
      , city
      , county
      , state
      , zip
      , country
      }

newtype GeoCoords = GeoCoords
  { lat :: Number
  , lng :: Number
  }

derive newtype instance Eq GeoCoords
derive newtype instance Ord GeoCoords
derive newtype instance Show GeoCoords

instance decodeJsonGeoCoords :: DecodeJson GeoCoords where
  decodeJson json = do
    o <- JD.decodeJson json
    o' <- o .: "location"
    lat <- o' .: "lat"
    lng <- o' .: "lng"
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
