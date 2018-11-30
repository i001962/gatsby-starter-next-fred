import * as React from "react";
import { Header, Container, Segment, Icon } from "semantic-ui-react";
import {withLayout} from "../components/Layout";
import { Chart } from "react-google-charts";
// import { graphql } from "gatsby";

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

const AboutPage = () => {

 // const AboutPage = ({ data }) => {
 //
 //    const data1 = [
 //      ["Monthly"],
 //    ];
 //  // Linechart Data Prep
 //    let timesthru = 0;
 //    // For each data series grouped in graphql
 //    data.allFredData.group.forEach(fseries => {
 //    // (function(fseries) {
 //      let i = 0;
 //      data1[0].push(fseries.edges[0].node.series.title);
 //      let chartdata = fseries.edges
 //        .map(({ node }) => {
 //          i++;
 //          if (timesthru === 0) {
 //            data1[i] = [node.date, parseFloat(node.value)];
 //            data2[i] = [parseFloat(node.value)];
 //        } else {
 //            data1[i].push(parseFloat(node.value));
 //            data2[i].push(parseFloat(node.value));
 //          }
 //        });
 //      timesthru++;
 //    });
 //
 //    options.title = JSON.stringify(data1[0]);

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
    
        </Segment>

    </Container>
  );
};

export default withLayout(AboutPage);

// export const query = graphql`
// query InterestRatePageQuery {
//    allFredData(sort: {order: ASC, fields: [date]}) {
//       group(field: series) {
//         fieldValue
//         totalCount
//         edges {
//           node {
//             id
//             date
//             value
//             series {
//               title
//             }
//           }
//         }
//       }
//     }
//   }
// `;
