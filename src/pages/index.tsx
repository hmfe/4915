import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import SearchBox from "../components/SearchBox"

function HomePage() {
  return (
    <Layout>
      <SEO title="Home" />
      <h1 className="h1">The OMDb Searcher</h1>
      <p>
        Welcome to The OMDb Searcher!
        <br />
        Here you can search for movie titles and this application will fetch
        results from the Open Movie Database.
      </p>
      <p>The following techiques has been used in creating this application:</p>
      <ul>
        <li>ReactJS</li>
        <li>GatsbyJS</li>
        <li>HTML</li>
        <li>JavaScript</li>
        <li>CSS</li>
        <li>LESS</li>
      </ul>
      <SearchBox />
    </Layout>
  )
}

export default HomePage
