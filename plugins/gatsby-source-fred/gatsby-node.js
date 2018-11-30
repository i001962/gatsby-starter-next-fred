// Var Fred = require('fred-api');
const fetch = require('node-fetch');
const queryString = require('query-string');

exports.sourceNodes = ({
    actions,
    createNodeId,
    createContentDigest
  },
  configOptions
) => {
  const {
    createNode
  } = actions;

  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins;

  // Plugin code goes here...
  console.log('Testing my plugin', configOptions);
  // Console.log(configOptions[Object.keys(configOptions)[1]]);
  // Helper function that processes a Fred series to match Gatsby's node structure
  const processFred = fredseries1 => {
    // Console.log('Testing my plugin', fredseries1.series);
    // Console.log(fredseries1.date);
    const nodeId = createNodeId(`fred-series-${fredseries1.series}-${fredseries1.date}`);
    const nodeContent = JSON.stringify(fredseries1);
    // Renaming ID field name to SeriesName as ID is reserved (I guess.)
    // Delete Object.assign(fredseries1, {['SeriesName']: fredseries1['id'] })['id'];
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
    console.log('returning nodeData here', nodeData);
    return nodeData;
  };

  // Convert the options object into a query string
  // const apiOptions = queryString.stringify(configOptions)
  // console.log(apiOptions.series_id);

  // Gatsby expects sourceNodes to return a promise
  return (
    configOptions.series_id.forEach(element => {
      // Console.log(element);
      configOptions.series_id = element;
      // Console.log(configOptions);
      const apiOptions = queryString.stringify(configOptions);

      // Join apiOptions with the Fred API URL
      const apiUrl = `https://api.stlouisfed.org/fred/series/observations?${apiOptions}`;
      // console.log(apiUrl);
      // Fetch a response from the apiUrl
      fetch(apiUrl)
        // Parse the response as JSON
        .then(response => response.json())
        // Process the JSON data into a node
        .then(data => {
          console.log(data);
          // For each query result (or 'hit')
          data.observations.forEach(observation => {
            console.log('The data is:', observation);
            observation.series = element;
            const nodeData = processFred(observation);
            // Use Gatsby's createNode helper to create a node from the node data
            createNode(nodeData);
            console.log('you created a node');
          });
        });
    })
  );
};
