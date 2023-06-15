module Main
  ( batchValidate_
  , format_
  , parts_
  , validate_
  ) where

import Prelude

import Effect (Effect)
import Effect.Console (log)

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

newtype AddressComponents = AddressComponets
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

newtype GeoCoords = GeoCoords
  { lat :: Number
  , lon :: Number
  }

derive newtype instance Eq GeoCoords
derive newtype instance Ord GeoCoords
derive newtype instance Show GeoCoords

batchValidate_ :: Effect Unit
batchValidate_ =
  log "not implemented"

-- | Pretty format Address
format_ :: Effect Unit
format_ =
  log "not implemented"

-- | Return Address components
parts_ :: Effect Unit
parts_ =
  log "not implemented"

-- | Validate incoming address against Geocodio API
validate_ :: Effect Unit
validate_ =
  log "not implemented"
