import * as React from "react";
import { Header, Container, Segment, Icon } from "semantic-ui-react";
import { withLayout } from "../components/Layout";
// import * as React from "react";
// import { Header, Container, Segment, Icon } from "semantic-ui-react";
// import { withLayout } from "../components/Layout";
import { Chart } from "react-google-charts";
import { graphql } from "gatsby";

// console.log(gradient, yIntercept);

// console.log(result.r2,result.equation,result.string);

const data2 = [["Independant", "Dependant"]];
const options = {
  curveType: "function",
  legend: { position: "bottom" },
  title: "Consumer Prices Healthcare vs All Goods",
};
const optionsHisto = {
  curveType: "function",
  legend: { position: "none" },
  title: "Monthly Change Frequency Distribution",
};
const scatteroptions = {
  hAxis: { title: "Independant" },
  legend: "none",
  title: "Independant vs. Dependant",
  vAxis: { title: "Dependant" },
};

const AboutPage = ({ data }) => {
  const data1 = [
    ["Monthly"],
  ];
  const data3 = [
    [
      { type: 'string', label: 'Date' },
      //  { type: 'string', label: 'Symbol' },
      { type: 'string', label: 'Line Item' },
      { type: 'number', label: 'Amount' },
    ],
    //    ['Mike', { v: 10000 }],
  ]
  // Linechart Data Prep
  let timesthru = 0;
  // For each data series grouped in graphql
  data.allFredData.group.forEach(fseries => {
    // (function(fseries) {
    let i = 0;
    data1[0].push(fseries.edges[0].node.series);
    let chartdata = fseries.edges
      .map(({ node }) => {
        i++;
        if (timesthru === 0) {
          data1[i] = [node.date, parseFloat(node.value)];
          data2[i] = [parseFloat(node.value)];
        } else {
          data1[i].push(parseFloat(node.value));
          data2[i].push(parseFloat(node.value));
        }
      });
    timesthru++;
  });

  options.title = JSON.stringify(data1[0]);

  // Edgar Data Prep
  let timesthru2 = 0;
  // For each data primarysymbol get the quarterly data
  // console.log(data.allEdgarData.edges[0].node.result.rows);
  let j = 0;

  data.allEdgarData.edges[0].node.result.rows.forEach(periodstatement => {
    // (function(fseries) {
    let oldestdate = data.allEdgarData.edges[0].node.fiscalPeriod;
    console.log(oldestdate);
    //  console.log(oldestdate.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"));
    // console.log(oldestdate);
    console.log(periodstatement);
    Array.prototype.forEach.call(periodstatement.values, lineitem => {
      j++;
      data3[[j]] = [oldestdate.replace(/(\d{4})/, "$1-"), lineitem.field, { v: lineitem.value }];
      //  console.log(data3);
    });
  });


  return (
    <Container>
    <Segment vertical >
    <Header as= "h2" >
    <Icon name="info circle" />
      <Header.Content>
      About
      < /Header.Content>
      < /Header>
      < /Segment>
      < Segment vertical >
        <p>
        This starter was created by @fabien0102.
        </p>
    < p >
    For any question, I'm on <a href="https://discord.gg/2bz8EzW" target="blank">discord #reactiflux/gatsby</a>
      < /p>
      < p >
      For any issues, any PR are welcoming
        < a href = "https://github.com/fabien0102/gatsby-starter/issues" target = "blank" > on this repository < /a>
          < /p>

          < Chart
  width = { '500px'}
  height = { '300px'}
  chartType = "Table"
  loader = {< div > Loading Chart < /div>}
  data = { data3 }
  options = {{
    showRowNumber: true,
          }
}
rootProps = {{ 'data-testid': '1' }}
/>


  < Chart
chartType = "LineChart"
width = "100%"
height = "400px"
data = { data1 }
options = { options }
  />

  <Chart
               chartType="Histogram"
width = "60%"
height = "300px"
data = { data2 }
options = { optionsHisto }
  />

  <Chart
          width={ "600px" }
height = { "400px"}
chartType = "ScatterChart"
loader = {< div > Loading Chart < /div>}
data = { data2 }
options = { scatteroptions }
rootProps = {{ "data-testid": "1" }}
/>
  < /Segment>

  < /Container>
  );
};


export default withLayout(AboutPage);
//
export const query = graphql`
query FredPageQuery {
  allFredData(sort: {order: ASC, fields: [date]}) {
    totalCount
    group(field: series) {
      totalCount
      fieldValue
      edges {
        node {
          series{  title
            frequency }
          value
          date
        }
      }
    }
  }

allEdgarData {
  edges {
    node {
      id primarysymbol fiscalPeriod result {
        totalrows rows {
          rownum values {
            field
            value
          }
        }
      }
    }
  }
}

}
`;
