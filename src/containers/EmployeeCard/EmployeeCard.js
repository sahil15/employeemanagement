import React, { useState, useEffect, useRef } from 'react';
import './styles.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { SolarSystemLoading } from 'react-loadingg';
import axios from 'axios';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import AddEmployee from './../../components/AddEmployee';
const ROOT_URL = 'http://dummy.restapiexample.com/api/v1';
let employeeBeforeFilter = [];


export default function EmployeeCard() {


  const [employees, setEmployees] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const searchValue = useRef("");

  useEffect(() => {
    const response = axios.get(`${ROOT_URL}/employees`);
    response.then((res) => {
      setEmployees(res.data.data);
      employeeBeforeFilter = res.data.data;
    }).catch((err) => {
      throw Error("Error: " + err);
    })
  }, []);


  const filterSearchResults = () => {
    let valueSearched = searchValue.current.value;
    (valueSearched.length <= 0) ? setEmployees(employeeBeforeFilter) : console.log("search for results");
    const filteredEmployee = employeeBeforeFilter.filter(employeeBeforeFilter => employeeBeforeFilter.employee_name.indexOf(valueSearched) >= 0);
    setEmployees(filteredEmployee);
  }


  const deleteEmployee = (employeeId) => {
    const response = axios.delete(`${ROOT_URL}/delete/${employeeId}`);
    response.then((res) => {
      filterResults(res.data.data);
    }).catch((err) => {
      throw Error("Error: " + err);
    })

  }

  const filterResults = (id) => {
    const filteredEmployee = employees.filter(employee => employee.id != id);
    setEmployees(filteredEmployee);
  }

  const renderData = (employees) => {
    // console.log("Render Data Props Info: ", JSON.stringify(this.state.employees));
    const employeeItem = employees.map(employee => {
      return (
        <Col key={employee.id} md={4}>
          <Card style={{ marginBottom: '2rem' }}>
            <Card.Img variant="top" src={(employee.profile_image.length == 0) ? "https://picsum.photos/300/200" : employee.profile_image} />
            <Card.Body>
              <Card.Title>Id</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{employee.id}</Card.Subtitle>
              <Card.Title>Name</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{employee.employee_name}</Card.Subtitle>
              <Card.Title>Age</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{employee.employee_age}</Card.Subtitle>
              <Card.Title>Salary</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{employee.employee_salary}</Card.Subtitle>
            </Card.Body>
            <Card.Footer>
              <Button variant="primary" onClick={() => deleteEmployee(employee.id)}>Delete</Button>
            </Card.Footer>
          </Card>
        </Col>
      );
    });
    return employeeItem;
  }

  const onSubmitModal = (payload) => {

      const response = axios.post(`${ROOT_URL}/create`, payload);
      response.then((res) => {
        console.log(res.data.data);
        //We will add it to the existing list of emplyees employeeBeforeFilter and then do setstate
      }).catch((err) => {
        throw Error("Error: " + err);
      })

  }
  


  return (
    <>
      <Container>
        <Row>
          <div className="col-md-2">
            <Button variant="outline-primary" onClick={() => setModalShow(true)}>Add Employee</Button>
          </div>
          <div className="col-md-10">
            <InputGroup onChange={() => filterSearchResults()} className="mb-3">
              <FormControl
                placeholder="Search for Employee By Name"
                aria-label="Search for Employee By Name"
                aria-describedby="basic-addon2"
                ref={searchValue}
              />

            </InputGroup>
          </div>
        </Row>

        <div className="employee-list">
          <Row>
            {employees.length > 0 ? renderData(employees) : <SolarSystemLoading style={{ marginLeft: 'auto', marginTop: '100px', marginRight: 'auto' }} />}
          </Row>
        </div>

      </Container>
      <AddEmployee
        show={modalShow}
        onHide={() => setModalShow(false)}
        onSubmitModal={onSubmitModal}
      />
    </>
  );
}
