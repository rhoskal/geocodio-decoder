module Main
  ( Address(..)
  , AddressComponents(..)
  , GeoCoords(..)
  , batchValidate_
  , format_
  , parts_
  , toJson_
  , validate_
  ) where

import Prelude

import Affjax as AX
import Affjax.Node as AN
import Affjax.ResponseFormat as ResponseFormat
import Data.Argonaut (class DecodeJson, class EncodeJson, Json, JsonDecodeError, (.:), (.:?), (:=), (:=?), (~>), (~>?))
import Data.Argonaut as J
import Data.Either (Either(..))
import Data.Generic.Rep (class Generic)
import Data.Maybe (Maybe)
import Data.Newtype (class Newtype, unwrap)
import Data.Show.Generic (genericShow)
import Effect (Effect)
import Effect.Aff (launchAff)
import Effect.Class.Console (log)

newtype Address = Address
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

derive instance newtypeAddress :: Newtype Address _

instance showAddress :: Show Address where
  show = genericShow

instance decodeJsonAddress :: DecodeJson Address where
  decodeJson json = do
    o <- J.decodeJson json
    accuracy <- o .: "accuracy"
    accuracyType <- o .: "accuracy_type"
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
      ~> ("accuracy_type" := a.accuracyType)
      ~> ("address_components" := a.components)
      ~> ("formatted_address" := a.formatted)
      ~> ("location" := a.location)
      ~> ("source" := a.source)
      ~> J.jsonEmptyObject

newtype AddressComponents = AddressComponents
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

derive instance newtypeAddressComponents :: Newtype AddressComponents _

instance showAddressComponents :: Show AddressComponents where
  show = genericShow

instance decodeJsonAddressComponents :: DecodeJson AddressComponents where
  decodeJson json = do
    o <- J.decodeJson json
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
      ~> ("country" := ac.country)
      ~> ("county" := ac.county)
      ~> ("formatted_street" := ac.formattedStreet)
      ~> ("number" := ac.number)
      ~> ("pre_directional" :=? ac.preDirectional)
      ~>? ("secondary_number" :=? ac.secondaryNumber)
      ~>? ("secondary_unit" :=? ac.secondaryUnit)
      ~>? ("state" := ac.state)
      ~> ("street" := ac.street)
      ~> ("suffix" := ac.suffix)
      ~> ("zip" := ac.zip)
      ~> J.jsonEmptyObject

newtype GeoCoords = GeoCoords
  { lat :: Number
  , lng :: Number
  }

derive instance Eq GeoCoords

derive instance Ord GeoCoords

derive instance genericGeoCoords :: Generic GeoCoords _

derive instance newtypeGeoCoords :: Newtype GeoCoords _

instance showGeoCoords :: Show GeoCoords where
  show = genericShow

instance decodeJsonGeoCoords :: DecodeJson GeoCoords where
  decodeJson json = do
    o <- J.decodeJson json
    lat <- o .: "lat"
    lng <- o .: "lng"
    pure $ GeoCoords { lat, lng }

instance encodeJsonGeoCoords :: EncodeJson GeoCoords where
  encodeJson (GeoCoords c) = do
    "lat" := c.lat
      ~> ("lng" := c.lng)
      ~> J.jsonEmptyObject

-- | INTERNAL
decoder :: Json -> Either JsonDecodeError (Array Address)
decoder =
  J.decodeJson
    <=< (_ .: "results")
    <=< J.decodeJson

-- | Pretty format Address e.g. "1109 N Highland St, Arlington, VA"
format_ :: Address -> String
format_ = _.formatted <$> unwrap

-- | Return AddressComponents as JSON format
parts_ :: Address -> AddressComponents
parts_ = _.components <$> unwrap

toJson_ :: forall a. EncodeJson a => a -> Json
toJson_ = J.encodeJson

-- | Validate incoming address against Geocodio API
validate_ :: String -> Effect Unit
validate_ apiKey = void $ launchAff $ do
  let
    path = "https://api.geocod.io/v1.7/geocode"
    query = "?q=" <> "1109+N+Highland+St%2c+Arlington+VA"
  -- https://github.com/purescript-contrib/purescript-form-urlencoded
  result <- AN.get ResponseFormat.json $ path <> query <> "&api_key=" <> apiKey
  case result of
    Left err -> log $ "GET /api response failed to decode: " <> AX.printError err
    Right response -> log $ genericShow $ decoder response.body

-- Right response -> log $ "GET /api response: " <> J.stringify response.body

-- | Batch validate incoming address against Geocodio API
batchValidate_ :: Effect Unit
batchValidate_ =
  log "not implemented"
