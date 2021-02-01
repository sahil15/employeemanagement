import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';


export default function AddEmployee(props) {

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [salary, setSalary] = useState("");
  const [errorsRef, setErrors] = useState({});

  const onSubmitBtnClick = () => {
    var payload = {
      name,
      age,
      salary
    }
    // validations
    let errorValidaitonObj = {};
    if (payload.name.length === 0) {
      errorValidaitonObj.name = "Name cannot be empty";
    }

    if(payload.age.length === 0){
      errorValidaitonObj.age = "Age cannot be empty";
    }else if(!parseInt(payload.age)){
      errorValidaitonObj.age = "Age should be number";
    }

    if(payload.salary.length === 0){
      errorValidaitonObj.salary = "Salary cannot be empty";
    }else if(!parseInt(payload.salary)){
      errorValidaitonObj.salary = "Salary should be number";
    }
    if (Object.keys(errorValidaitonObj).length === 0) {
      props.onSubmitModal(payload);
    }
    setErrors(errorValidaitonObj);

  }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Employee
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <InputGroup className="mb-3">
          <FormControl
            placeholder="Name"
            aria-label="Name"
            value={name}
            onChange={(e) => { setName(e.target.value) }}
            aria-describedby="basic-addon1"
            isInvalid={errorsRef.name !== undefined}
          />
          <FormControl.Feedback type="invalid" >{errorsRef.name}</FormControl.Feedback>

        </InputGroup>

        <InputGroup className="mb-3">
          <FormControl
            placeholder="Age"
            aria-label="Age"
            type="number"
            value={age}
            onChange={(e) => { setAge(e.target.value) }}
            aria-describedby="basic-addon1"
            isInvalid={errorsRef.age !== undefined}
          />
          <FormControl.Feedback type="invalid" >{errorsRef.age}</FormControl.Feedback>
        </InputGroup>

        <InputGroup className="mb-3">
          <FormControl
            placeholder="Salary"
            aria-label="Salary"
            type="number"
            value={salary}
            isInvalid={errorsRef.salary !== undefined}
            onChange={(e) => { setSalary(e.target.value) }}
            aria-describedby="basic-addon1"
          />
          <FormControl.Feedback type="invalid" >{errorsRef.salary}</FormControl.Feedback>
        </InputGroup>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onSubmitBtnClick}>Save</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}