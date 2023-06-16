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
-- import Affjax.RequestBody as RequestBody
import Affjax.ResponseFormat as ResponseFormat
import Data.Argonaut (class DecodeJson, class EncodeJson, Json)
import Data.Argonaut as J
import Data.Argonaut.Decode (JsonDecodeError, (.:), (.:?))
import Data.Argonaut.Decode as JD
import Data.Argonaut.Encode ((:=), (:=?), (~>), (~>?))
import Data.Either (Either(..))
import Data.Generic.Rep (class Generic)
import Data.Maybe (Maybe)
import Data.Show.Generic (genericShow)
import Effect (Effect)
import Effect.Aff (launchAff)
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
derive instance genericAddress :: Generic Address _

instance showAddress :: Show Address where
  show = genericShow

instance decodeJsonAddress :: DecodeJson Address where
  decodeJson json = do
    obj <- JD.decodeJson json
    o <- obj .: "results"
    accuracy <- o .: "accuracy"
    accuracyType <- o .: "accuracyType"
    components <- o .: "address_components"
    formatted <- o .: "formatted_address"
    location <- o .: "location"
    source <- o .: "source"
    pure $ Address
      { accuracy
      , accuracyType
      , components
      , formatted
      , location
      , source
      }

instance encodeJsonAddress :: EncodeJson Address where
  encodeJson (Address a) = do
    "accuracy" := a.accuracy
      ~> "accuracy_type" := a.accuracyType
      ~> "address_components" := a.components
      ~> "formatted_address" := a.formatted
      ~> "location" := a.location
      ~> "source" := a.source
      ~> J.jsonEmptyObject

data AddressComponents = AddressComponents
  { city :: String
  , country :: String
  , county :: String
  , formattedStreet :: String
  , number :: String
  , preDirectional :: Maybe String
  , secondaryNumber :: Maybe String
  , secondaryUnit :: Maybe String
  , state :: String
  , street :: String
  , suffix :: String
  , zip :: String
  }

derive instance Eq AddressComponents
derive instance Ord AddressComponents
derive instance genericAddressComponents :: Generic AddressComponents _

instance showAddressComponents :: Show AddressComponents where
  show = genericShow

instance decodeJsonAddressComponents :: DecodeJson AddressComponents where
  decodeJson json = do
    o <- JD.decodeJson json
    city <- o .: "city"
    country <- o .: "country"
    county <- o .: "county"
    formattedStreet <- o .: "formatted_street"
    number <- o .: "number"
    preDirectional <- o .:? "predirectional "
    secondaryNumber <- o .:? "secondarynumber"
    secondaryUnit <- o .:? "secondaryunit"
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
      , preDirectional
      , secondaryNumber
      , secondaryUnit
      , state
      , street
      , suffix
      , zip
      }

instance encodeJsonAddressComponents :: EncodeJson AddressComponents where
  encodeJson (AddressComponents ac) = do
    "city" := ac.city
      ~> "country" := ac.country
      ~> "county" := ac.county
      ~> "formatted_street" := ac.formattedStreet
      ~> "number" := ac.number
      ~> "predirectional" :=? ac.preDirectional
      ~>? "secondarynumber" :=? ac.secondaryNumber
      ~>? "secondaryunit" :=? ac.secondaryUnit
      ~>? "state" := ac.state
      ~> "street" := ac.street
      ~> "suffix" := ac.suffix
      ~> "zip" := ac.zip
      ~> J.jsonEmptyObject

data GeoCoords = GeoCoords
  { lat :: Number
  , lng :: Number
  }

derive instance Eq GeoCoords
derive instance Ord GeoCoords
derive instance genericGeoCoords :: Generic GeoCoords _

instance showGeoCoords :: Show GeoCoords where
  show = genericShow

instance decodeJsonGeoCoords :: DecodeJson GeoCoords where
  decodeJson json = do
    o <- JD.decodeJson json
    lat <- o .: "lat"
    lng <- o .: "lng"
    pure $ GeoCoords { lat, lng }

instance encodeJsonGeoCoords :: EncodeJson GeoCoords where
  encodeJson (GeoCoords c) = do
    "lat" := c.lat
      ~> "lng" := c.lng
      ~> J.jsonEmptyObject

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
  let path = "https://api.geocod.io/v1.7/geocode"
      query = "?q=" <> "1109+N+Highland+St%2c+Arlington+VA"
  result <- AN.get ResponseFormat.json $ path <> query <> "&api_key=" <> apiKey
  case result of
    Left err -> log $ "GET /api response failed to decode: " <> AX.printError err
    Right response -> log $ genericShow $ addressDecoder response.body

-- Right response -> log $ "GET /api response: " <> J.stringify response.body

-- | Batch validate incoming address against Geocodio API
batchValidate_ :: Effect Unit
batchValidate_ =
  log "not implemented"
