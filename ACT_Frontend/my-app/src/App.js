// import React, { useState, useEffect } from 'react';
// import {Form, FormGroup, Label, Input, Table, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
// import classnames from 'classnames';
// import { Chart } from 'react-charts';
// import axios from "axios";

// const TabelData = (props) => {
//   return (
//     <Table dark>
//       <thead>
//         <tr>
//           <th>#</th>
//           <th>First Name</th>
//           <th>Last Name</th>
//           <th>Username</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <th scope="row">1</th>
//           <td>Mark</td>
//           <td>Otto</td>
//           <td>@mdo</td>
//         </tr>
//         <tr>
//           <th scope="row">2</th>
//           <td>Jacob</td>
//           <td>Thornton</td>
//           <td>@fat</td>
//         </tr>
//         <tr>
//           <th scope="row">3</th>
//           <td>Larry</td>
//           <td>the Bird</td>
//           <td>@twitter</td>
//         </tr>
//       </tbody>
//     </Table>
//   );
// }

// function MyChart() {
//   const data = React.useMemo(
//     () => [
//       {
//         label: 'Series 1',
//         data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
//       }
//     ],
//     []
//   )
 
//   const axes = React.useMemo(
//     () => [
//       { primary: true, type: 'linear', position: 'bottom' },
//       { type: 'linear', position: 'left' }
//     ],
//     []
//   )
 
//   return (
//     // A react-chart hyper-responsively and continuusly fills the available
//     // space of its parent element automatically
//     <div
//       style={{
//         width: '400px',
//         height: '300px'
//       }}
//     >
//       <Chart data={data} axes={axes} />
//     </div>
//   )
// }


// class App extends React.Component() {
//   constructor(props) {
//     super(props);
//     this.toggle = this.toggle.bind(this);
//     this.state = {
//       activeTab: 1
//     }
//   }


//   toggle = tab => {
//     this.setState({activeTab:tab})
//     // if(activeTab !== tab) setActiveTab(tab);
//   }
//   // const [todos, setTodos] = useState();

//   // useEffect(() => {
//   //   axios
//   //     .get(
//   //       "http://127.0.0.1:8000/sensortype/"
//   //     )
//   //     .then(({ data }) => {
//   //       console.log(data)
//   //       setTodos(data);
//   //       console.log(setTodos.data)
//   //     });
//   // }, []);
//   render() {
//   return (
// <div>
//   <header>
//     <h2>ACT Power</h2>
//   </header>
//       <Nav tabs>
//         <NavItem>
//           <NavLink
//             className={classnames({ active: activeTab === '1' })}
//             onClick={this.toggle(1)}
//           >
//             Charts
//           </NavLink>
//         </NavItem>
//         <NavItem>
//           <NavLink
//             className={classnames({ active: activeTab === '2' })}
//             onClick={this.toggle(1)}
//           >
//             Moar Tabs
//           </NavLink>
//         </NavItem>
//       </Nav>
//       <Form inline>
//       <FormGroup>
//         <Label for="exampleDate">From data</Label>
//         <Input
//           type="date"
//           name="date"
//           id="from_date"
//           placeholder="date placeholder"
//         />
//       </FormGroup>
//       <FormGroup>
//         <Label for="exampleDate">To data</Label>
//         <Input
//           type="date"
//           name="date"
//           id="to_date"
//           placeholder="date placeholder"
//         />
//       </FormGroup>
//       <FormGroup>
//         <Label for="exampleSelect">Select</Label>
//         <Input type="select" name="select" id="exampleSelect">
//           {/* <option>1</option>
//           <option>2</option>
//           <option>3</option>
//           <option>4</option>
//           <option>5</option> */}
//         </Input>
//       </FormGroup>
//       <Button>Submit</Button>
//       </Form>
//       {/* <TabContent activeTab={activeTab}> */}
//         <TabPane tabId="1">
//           <Row>
//             <Col sm="12">
//               {/* <TabelData/> */}
//             </Col>
//           </Row>
//         </TabPane>
//         <TabPane tabId="2">
//           <Row>
//           <Col sm="12">
//               {/* <MyChart/> */}
//             </Col>
//           </Row>
//         </TabPane>
//       </TabContent>
//     </div>
//   );
//         }
// }

// // function Options(data) { 
// //   console.log(data)
// //   return (
// //     <div></div>
// //   )
// // }

// export default App;


  
import React, {Component} from 'react';
import {Badge, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from 'reactstrap';
import {  Card, CardBody, Table } from 'reactstrap';
import { Line} from 'react-chartjs-2';
import { CardColumns, CardHeader } from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';


class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sensorType: [],
      from_date: null,
      to_date: null,
      dataset: [],
      sensorselect:null,
      line: {
      }
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    fetch('http://127.0.0.1:8000/sensortype/')
      .then(response => response.json())
      .then(data => this.setState({ sensorType: data }));
  }
  
  handleChange(event) {
    console.log(event.target.value)
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit() {
    console.log(this.state)
    fetch('http://127.0.0.1:8000/sensor/?from_date='+this.state.from_date+'&to_date='+this.state.to_date+'&sensorType='+this.state.sensorselect)
    .then(response => response.json())
    .then(data => {
      this.setState({ dataset: data.data_set })
      console.log(data.data_set)
      var lables = []
      var reading = []
      for (var i = 0; i < data.data_set.length; i++) {
        lables.push(data.data_set[i].timestamp)
        reading.push(data.data_set[i].reading)
      }
     var line = {
        labels: lables,
        datasets: [
          {
            label: 'My First dataset',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: reading,
          },
        ],
      }
      this.setState({line})
      }
      );
  }

  render() {
    return (
      <div className="animated fadeIn">
                          <Form inline>
      <FormGroup>
        <Label for="exampleDate">From data</Label>
        <Input
          type="date"
          name="date"
          id="from_date"
          placeholder="date placeholder"
          onChange={this.handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleDate">To data</Label>
        <Input
          type="date"
          name="date"
          id="to_date"
          placeholder="date placeholder"
          onChange={this.handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleSelect">Sensor type</Label>
        <Input type="select" name="select" id="sensorselect" onChange={this.handleChange}>
        <option></option>
          {this.state.sensorType.map(( listValue, index ) => {
          return (
            <option key={index}>{listValue}</option>
          );
        })}
        </Input>
      </FormGroup>
      <Button onClick = {this.handleSubmit}>Submit</Button>
      </Form>
      <Row>
        <Col xs="12" lg="8">
          <Card>
            <CardHeader>
              Line Chart
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Line data={this.state.line}/>
              </div>
            </CardBody>
          </Card>
          </Col>
          </Row>
      </div>
    );
  }
}

class Tables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sensorType: [],
      from_date: null,
      to_date: null,
      dataset: [],
      sensorselect:null
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    fetch('http://127.0.0.1:8000/sensortype/')
      .then(response => response.json())
      .then(data => this.setState({ sensorType: data }));
  }

  handleChange(event) {
    console.log(event.target.value)
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit() {
    console.log(this.state)
    fetch('http://127.0.0.1:8000/sensor/?from_date='+this.state.from_date+'&to_date='+this.state.to_date+'&sensorType='+this.state.sensorselect)
    .then(response => response.json())
    .then(data => this.setState({ dataset: data.data_set }));
  }

  render() {
    console.log(this.state)
    return (
      <div className="animated fadeIn">
                  <Form inline>
      <FormGroup>
        <Label for="exampleDate">From data</Label>
        <Input
          type="date"
          name="date"
          id="from_date"
          placeholder="date placeholder"
          onChange={this.handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleDate">To data</Label>
        <Input
          type="date"
          name="date"
          id="to_date"
          placeholder="date placeholder"
          onChange={this.handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleSelect">Sensor Type</Label>
        <Input type="select" name="select" id="sensorselect" onChange={this.handleChange}>
        <option></option>
        {this.state.sensorType.map(( listValue, index ) => {
          return (
            <option key={index}>{listValue}</option>
          );
        })}
        </Input>
      </FormGroup>
      <Button onClick = {this.handleSubmit}>Submit</Button>
      </Form>
        <Row>
          <Col xs="12" lg="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Simple Table
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>Sensor Type</th>
                    <th>Reading</th>
                    <th>Date time</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.dataset.map(( listValue, index ) => {
                      return (
                        <tr key={index}>
                          <td>{listValue.sensorType}</td>
                          <td>{listValue.reading}</td>
                          <td>{listValue.timestamp}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

class App extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
    };
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice()
    newArray[tabPane] = tab
    this.setState({
      activeTab: newArray,
    });
  }

  tabPane() {
    return (
      <>
        <TabPane tabId="1">
          <Tables/>
        </TabPane>
        <TabPane tabId="2">
          <Charts/>
        </TabPane>
      </>
    );
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Nav tabs>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '1'}
                  onClick={() => { this.toggle(0, '1'); }}
                >
                  Table
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '2'}
                  onClick={() => { this.toggle(0, '2'); }}
                >
                  Chart
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab[0]}>
              {this.tabPane()}
            </TabContent>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;