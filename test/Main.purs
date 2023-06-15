module Test.Main where

import Prelude

import Effect (Effect)
import Effect.Class.Console (log)

main :: Effect Unit
main = do
  log "🍝"
  log "You should add some tests."

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
