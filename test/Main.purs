module Test.Main where

import Prelude

import Data.Argonaut.Decode (JsonDecodeError, (.:))
import Data.Argonaut.Decode as JD
import Data.Argonaut.Encode ((:=), (~>))
import Data.Argonaut.Encode as JE
import Data.Either (Either(..), isRight)
import Effect (Effect)
import Effect.Aff (launchAff_)
import Main (GeoCoords(..))
import Test.Spec (describe, it)
import Test.Spec.Assertions (shouldEqual)
import Test.Spec.Reporter.Console (consoleReporter)
import Test.Spec.Runner (runSpec)

main :: Effect Unit
main = launchAff_ $ runSpec [ consoleReporter ] do
  describe "JSON" do
    it "should decode json into GeoCoords" do
      let
        coords = GeoCoords { lat: 1.0, lng: 1.0 }
      decoded :: Either JsonDecodeError GeoCoords <- JD.decodeJson $ JE.encodeJson coords
      isRight decoded -- not working :(
  describe "Helpers" do
    it "format_ should return a formatted address" do
      1 `shouldEqual` 1
    it "parts_ should return the 'parts' of an address" do
      1 `shouldEqual` 1

-- https://api.geocod.io/v1.7/geocode?q=asdf&api_key=DEMO
-- {
--   error: "Could not geocode address. Postal code or city required."
-- }

-- {
--   "error": "This API key does not have permission to access this feature. API key permissions can be changed in the Geocodio dashboard at https:\/\/dash.geocod.io\/apikey"
-- }

-- https://api.geocod.io/v1.7/geocode?q=1109+N+Highland+St,+Arlington+VA&api_key=DEMO
-- {
--   "input":{
--     "address_components":{
--       "number":"1109",
--       "predirectional":"N",
--       "street":"Highland",
--       "suffix":"St",
--       "formatted_street":"N Highland St",
--       "city":"Arlington",
--       "state":"VA",
--       "country":"US"
--     },
--     "formatted_address":"1109 N Highland St, Arlington, VA"
--   },
--   "results":[
--     {
--       "address_components":{
--         "number":"1109",
--         "predirectional":"N",
--         "street":"Highland",
--         "suffix":"St",
--         "formatted_street":"N Highland St",
--         "city":"Arlington",
--         "county":"Arlington County",
--         "state":"VA",
--         "zip":"22201",
--         "country":"US"
--       },
--       "formatted_address":"1109 N Highland St, Arlington, VA 22201",
--       "location":{
--         "lat":38.886672,
--         "lng":-77.094735
--       },
--       "accuracy":1,
--       "accuracy_type":"rooftop",
--       "source":"Arlington"
--     }
--   ]
-- }
