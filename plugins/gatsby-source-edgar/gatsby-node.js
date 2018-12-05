// Var Edgar = require('Edgar-api');
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
  // Helper function that processes a Edgar series to match Gatsby's node structure
  const processEdgar = Edgarseries1 => {
    const nodeId = createNodeId(`Edgar-series-${Edgarseries1.series}-${Edgarseries1.date}`);
    const nodeContent = JSON.stringify(Edgarseries1);
    const nodeData = Object.assign({}, Edgarseries1, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: 'EdgarData',
        content: nodeContent,
        contentDigest: createContentDigest(Edgarseries1)
      }
    });
    // console.log('returning nodeData here', nodeData);
    return nodeData;
  };

  //async function fetchSeriesAndCreate(array) {
    const allSeriesConfig = configOptions.primarysymbols;
    console.log(allSeriesConfig);
    for (const ticker of allSeriesConfig) {

      const currentConfigOptions = configOptions;
      currentConfigOptions.primarysymbols = ticker;
      console.log(currentConfigOptions);
      const apiOptions = queryString.stringify(configOptions);

      const apiUrl = `https://datafied.api.edgar-online.com/v2/corefinancials/qtr?${apiOptions}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data);
        data.fiscalPeriod = currentConfigOptions.fiscalPeriod;
        data.primarysymbol = ticker;
       // row.company = ticker;
        const nodeData = processEdgar(data);
        // Use Gatsby's createNode helper to create a node from the node data
        createNode(nodeData);
        console.log('you created a node');
    //  });

    }
  };
