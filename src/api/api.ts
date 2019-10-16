import React from "react"

import { OmdbData } from "../api/apiProps"
import { omdbDefaultData } from "../api/omdbDefaultData"

export function getApiData(search: string): OmdbData {
  const [result, setResult] = React.useState(omdbDefaultData)

  React.useEffect(() => {
    async function getOmdbData() {
      try {
        const omdbResponse = await fetch(
          "http://www.omdbapi.com/?s=" + search + "&apikey=2894d9fd"
        )

        let omdbJson = []

        if (omdbResponse.ok) {
          omdbJson = await omdbResponse.json()
        }

        setResult(omdbJson)
      } catch (error) {
        console.error(error)
      }
    }
    getOmdbData()
  }, [search])

  return result
}
