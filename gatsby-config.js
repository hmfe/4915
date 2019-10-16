module.exports = {
  siteMetadata: {
    title: `H&M Frontend test`,
    description: `This is a test assignment for H&M.<br><br>By Martin Erlandsson, Sigma IT`,
    author: `Martin Erlandsson`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-less`,
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `hm-frontend-test`,
        short_name: `hm-frontend-test`,
        start_url: `/`,
        background_color: `#faf9f8`,
        theme_color: `#faf9f8`,
        display: `minimal-ui`,
        icon: `src/images/hm-logo.png`,
      },
    },
  ],
}
