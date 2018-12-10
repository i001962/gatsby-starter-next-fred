module.exports = {
  siteMetadata: {
    title: `My website`,
    googleVerification: `abcdefz`,
    disqus: `gatsby-typescript`
  },
  mapping: {
    'MarkdownRemark.frontmatter.author': `AuthorJson`,
    'FredData.series': `FredseriesJson.id`
    //  'FredData.series': `FredseriesJson.id`
  },
  plugins: [
    // Expose `/data` to graphQL layer
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/data`
      }
    },
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/data/pages`
      }
    },
    {
      resolve: 'gatsby-source-edgar', // 10ks are quarterly
      options: {
        fields: 'IncomeStatementConsolidated',
        primarysymbols: ['MSFT', 'AAPL'], // 'CPIAUCNS', 'CPIMEDSL' ['PAYEMS', 'IC4WSA']
        fiscalPeriod: '2017q1', // Will return all 10ks from this date to current
        //  numPeriods: '3',
        activecompanies: false, //  Values: 'd', 'w', 'bw', 'm', 'q', 'sa', 'a', 'wef', 'weth', 'wew', 'wetu', 'wem', 'wesu', 'wesa', 'bwew', 'bwem'
        appkey: process.env.API_EDGAR,
        deleted: 'false',
        sortby: 'primarysymbol asc',
        debug: false
      }
    },

    {
      resolve: 'gatsby-source-fred',
      options: {
        api_key: process.env.API_FRED,
        series_id: ['CPIAUCNS', 'CPIMEDSL'], // MCOILWTICO POILWTIUSDQ 'CPIAUCNS', 'CPIMEDSL' ['PAYEMS', 'IC4WSA']
        file_type: 'json',
        frequency: 'm', //  Values: 'd', 'w', 'bw', 'm', 'q', 'sa', 'a', 'wef', 'weth', 'wew', 'wetu', 'wem', 'wesu', 'wesa', 'bwew', 'bwem'
        //    limit: "24",
        observation_start: '2010-01-01', // 1776-07-04 (earliest available)
        observation_end: '2018-07-30', // Default: 9999-12-31 (latest available)
        units: 'log' // One of the following: 'lin', 'chg', 'ch1', 'pch', 'pc1', 'pca', 'cch', 'cca', 'log'
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'YOUR_GOOGLE_ANALYTICS_TRACKING_ID',
        // Puts tracking script in the head instead of the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true
      }
    },

    // Parse all markdown files (each plugin add/parse some data into graphQL layer)
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [{
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 690,
              backgroundColor: `#f7f0eb`
            }
          },
          {
                resolve: 'gatsby-remark-embed-video',
                options: {
                  width: 800,
                  ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
                  height: 400, // Optional: Overrides optional.ratio
                  related: false, // Optional: Will remove related videos from the end of an embedded YouTube video.
                  noIframeBorder: true // Optional: Disable insertion of <style> border: 0
                }
              },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-autolink-headers`
        ]
      }
    },

    // Parse all images files
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,

    // Parse JSON files
    `gatsby-transformer-json`,

    // Add typescript stack into webpack
    `gatsby-plugin-typescript`,

    // This plugin takes your configuration and generates a
    // web manifest file so your website can be added to your
    // homescreen on Android.
    /* eslint-disable camelcase */
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby website`,
        short_name: `Gatsby website`,
        start_url: `/`,
        background_color: `#f7f7f7`,
        theme_color: `#191919`,
        display: `minimal-ui`
      }
    },
    /* eslint-enable camelcase */

    // This plugin generates a service worker and AppShell
    // html file so the site works offline and is otherwise
    // resistant to bad networks. Works with almost any
    // site!
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify` // Make sure to put last in the array
  ]
};
