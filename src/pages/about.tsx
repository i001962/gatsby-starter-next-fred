import * as React from "react";
import { Header, Container, Segment, Icon } from "semantic-ui-react";
import {withLayout} from "../components/Layout";
// import * as React from "react";
// import { Header, Container, Segment, Icon } from "semantic-ui-react";
// import { withLayout } from "../components/Layout";
import { Chart } from "react-google-charts";
import { graphql } from "gatsby";

// console.log(gradient, yIntercept);

// console.log(result.r2,result.equation,result.string);

const data2 = [ ["Independant", "Dependant"] ];
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

    return (
    <Container>
      <Segment vertical>
        <Header as="h2">
          <Icon name="info circle" />
          <Header.Content>
            About
          </Header.Content>
        </Header>
      </Segment>
      <Segment vertical>
        <p>
          This starter was created by @fabien0102.
        </p>
        <p>
          For any question, I'm on <a href="https://discord.gg/2bz8EzW" target="blank">discord #reactiflux/gatsby</a>
        </p>
        <p>
          For any issues, any PR are welcoming
          <a href="https://github.com/fabien0102/gatsby-starter/issues" target="blank"> on this repository</a>
        </p>
                        < Chart
          chartType = "LineChart"
          width = "100%"
          height = "400px"
          data = {data1}
          options = {options }
            />

                          <Chart
               chartType="Histogram"
               width="60%"
               height="300px"
               data={data1}
               options={optionsHisto}
             />

             <Chart
          width={"600px"}
          height={"400px"}
          chartType="ScatterChart"
          loader={<div>Loading Chart</div>}
          data={data2}
          options={scatteroptions}
          rootProps={{ "data-testid": "1" }}
        />
      </Segment>

    </Container>
  );
};

// export default withLayout(AboutPage);

// import * as React from "react";
// import { Header, Container, Segment, Icon } from "semantic-ui-react";
// import { withLayout } from "../components/Layout";
// import { Chart } from "react-google-charts";
// import { graphql } from "gatsby";
// import regression from "regression";
//
// const result = regression.linear([[0, 1], [32, 67], [12, 79]]);
// const gradient = result.equation[0];
// const yIntercept = result.equation[1];
// // console.log(gradient, yIntercept);
//
// // console.log(result.r2,result.equation,result.string);
//
//
//
// const data2 = [['Independant', 'Dependant'],];
// const options = {
//   title: "Consumer Prices Healthcare vs All Goods",
//   curveType: "function",
//   legend: { position: "bottom" }
// };
// const optionsHisto = {
//   title: "Monthly Change Frequency Distribution",
//   curveType: "function",
//   legend: { position: "none" }
// };
// const scatteroptions = {
//   title: 'Independant vs. Dependant',
//   hAxis: { title: 'Independant' },
//   vAxis: { title: 'Dependant' },
//   legend: 'none',
// };
//
//
//
// const AboutPage = ({ data }) => {
//
//   const data1 = [
//     ["Monthly"],
//   ];
// // Linechart Data Prep
//   var timesthru = 0;
//   // For each data series grouped in graphql
//   data.allFredData.group.forEach(function(fseries) {
//     var i = 0;
//     data1[0].push(fseries.edges[0].node.series.title);
//     var chartdata = fseries.edges
//       .map(({ node }) => {
//         i++;
//         if (timesthru == 0) {
//           data1[i] = [node.date, parseFloat(node.value)];
//           data2[i] = [parseFloat(node.value)];
//       } else {
//           data1[i].push(parseFloat(node.value));
//           data2[i].push(parseFloat(node.value));
//         }
//       });
//     timesthru++;
//   });
//
//   options.title = JSON.stringify(data1[0]);
//
//   return (
//     <Container>
//     <Segment vertical >
//     <Header as= "h2" >
//     <Icon name="info circle" />
//       <Header.Content>
//       About
//       < /Header.Content>
//       < /Header>
//       < /Segment>
//       < Segment vertical >
//         <p>
//         This starter was created by @fabien0102.It's it dreamy?
//
//           < /p>
//           < p >
//           For any question, I'm on <a href="https://discord.gg/2bz8EzW" target="blank">discord #reactiflux/gatsby</a>
//             < /p>
//             < p >
//             For any issues, any PR are welcoming
//        < a href = "https://github.com/fabien0102/gatsby-starter/issues" target = "blank" > on this repository < /a>
//                 < /p>
//
//                 < Chart
//   chartType = "LineChart"
//   width = "100%"
//   height = "400px"
//   data = {data1}
//   options = {options }
//     />
//
//                   <Chart
//        chartType="Histogram"
//        width="60%"
//        height="300px"
//        data={data1}
//        options={optionsHisto}
//      />
//
//      <Chart
//   width={'600px'}
//   height={'400px'}
//   chartType="ScatterChart"
//   loader={<div>Loading Chart</div>}
//   data={data2}
//   options={scatteroptions}
//   rootProps={{ 'data-testid': '1' }}
// />
//
//     < /Segment>
//     < /Container>
//   );
// };
//
export default withLayout(AboutPage);
//
export const query = graphql`
query InterestRatePageQuery {
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
}
`;
