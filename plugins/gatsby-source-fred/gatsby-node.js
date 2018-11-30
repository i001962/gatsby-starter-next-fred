// Var Fred = require('fred-api');
const fetch = require('node-fetch');
const queryString = require('query-string');

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest
}, configOptions) => {
  const {
    createNode
  } = actions;

  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins;

  // Plugin code goes here...
  // Helper function that processes a Fred series to match Gatsby's node structure
  const processFred = fredseries1 => {
    const nodeId = createNodeId(`fred-series-${fredseries1.series}-${fredseries1.date}`);
    const nodeContent = JSON.stringify(fredseries1);
    const nodeData = Object.assign({}, fredseries1, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: 'FredData',
        content: nodeContent,
        contentDigest: createContentDigest(fredseries1)
      }
    });
    // console.log('returning nodeData here', nodeData);
    return nodeData;
  };

  //async function fetchSeriesAndCreate(array) {
    const allSeriesConfig = configOptions.series_id;
    for (const seriesid of allSeriesConfig) {

      const currentConfigOptions = configOptions;
      currentConfigOptions.series_id = seriesid;
      console.log(currentConfigOptions);
      const apiOptions = queryString.stringify(configOptions);

      const apiUrl = `https://api.stlouisfed.org/fred/series/observations?${apiOptions}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data);
      // For each query result (or 'hit')
      data.observations.forEach(observation => {
      //  console.log('The data is:', observation);
        observation.series = seriesid;
        const nodeData = processFred(observation);
        // Use Gatsby's createNode helper to create a node from the node data
        createNode(nodeData);
        console.log('you created a node');
      });

    }
  };

/* example of plugin options for gatsby-config.js
{
  resolve: 'gatsby-source-fred',
  options: {
    api_key: 'xyz env var',
    series_id: ['CPIAUCNS', 'CPIMEDSL'], // Gross National Product
    file_type: 'json',
    frequency: 'm', //  Values: 'd', 'w', 'bw', 'm', 'q', 'sa', 'a', 'wef', 'weth', 'wew', 'wetu', 'wem', 'wesu', 'wesa', 'bwew', 'bwem'
    //    limit: "24",
    observation_start: '2018-06-01' // 1776-07-04 (earliest available)
    //    observation_end: "9999-12-31" // Default: 9999-12-31 (latest available)
    //    units: "lin" // One of the following: 'lin', 'chg', 'ch1', 'pch', 'pc1', 'pca', 'cch', 'cca', 'log'
  }
},
*/
/* example of data returned by API
{ realtime_start: '2018-11-30',
  realtime_end: '2018-11-30',
  observation_start: '2018-06-01',
  observation_end: '9999-12-31',
  units: 'lin',
  output_type: 1,
  file_type: 'json',
  order_by: 'observation_date',
  sort_order: 'asc',
  count: 5,
  offset: 0,
  limit: 100000,
  observations:
   [ { realtime_start: '2018-11-30',
       realtime_end: '2018-11-30',
       date: '2018-06-01',
       value: '486.300' },
     { realtime_start: '2018-11-30',
       realtime_end: '2018-11-30',
       date: '2018-07-01',
       value: '485.406' },
     { realtime_start: '2018-11-30',
       realtime_end: '2018-11-30',
       date: '2018-08-01',
       value: '484.303' },
     { realtime_start: '2018-11-30',
       realtime_end: '2018-11-30',
       date: '2018-09-01',
       value: '485.081' },
     { realtime_start: '2018-11-30',
       realtime_end: '2018-11-30',
       date: '2018-10-01',
       value: '485.890' } ] }
       */
