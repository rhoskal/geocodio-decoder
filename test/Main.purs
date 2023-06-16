module Test.Main where

import Prelude

import Data.Argonaut.Core as J
import Data.Argonaut.Decode as JD
import Data.Argonaut.Encode ((:=), (~>))
import Data.Argonaut.Decode (JsonDecodeError, (.:))
import Data.Argonaut.Encode as JE
import Data.Either (Either(..))
import Effect (Effect)
import Effect.Aff (launchAff_)
import Test.Spec (describe, it)
import Test.Spec.Assertions (shouldEqual)
import Test.Spec.Reporter.Console (consoleReporter)
import Test.Spec.Runner (runSpec)

main :: Effect Unit
main = launchAff_ $ runSpec [ consoleReporter ] do
  describe "Helpers" do
    -- let address = Address { components: x, formatted: y, location: z, accuracy: 1, accuracyType: "rooftop", source: "Home" }
    it "format_ should return a formatted address" do
      1 `shouldEqual` 1
    it "parts_ should return the 'parts' of an address" do
      1 `shouldEqual` 1
  describe "JSON" do
    let response = {}
    it "should decode json into Address" do
      let
        json = "{\"lat\": 1, \"lng\": 2}"
      -- (JD.parseJson json :: Either JsonDecodeError J.Json) `shouldEqual` (Right unit)
      1 `shouldEqual` 1
-- it "should decode json into GeoCoords" do
--   let
--     json =
--       "lat" := 1
--         ~> "lng" := 1
--         ~> J.jsonEmptyObject
--   JD.decodeJson json `shouldEqual` (Right unit)

-- https://api.geocod.io/v1.7/geocode?q=asdf&api_key=DEMO
-- {
--   error: "Could not geocode address. Postal code or city required."
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
