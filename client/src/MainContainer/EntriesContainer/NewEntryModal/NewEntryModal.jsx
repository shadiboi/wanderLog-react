import React from 'react';
import { Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import { Col, Form, FormGroup, Label, Input } from 'reactstrap';

import {Link} from 'react-router-dom';



class NewEntryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.toggle = this.toggle.bind(this);
}
componentDidMount = () => {
    this.getLocation();
}
toggle() {
    this.setState(prevState => ({
        modal: !prevState.modal
    }));
}
  
handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value,
    })
}
handleSubmit = (e) => {
    e.preventDefault();
    this.props.newEntry(this.state);
}

getLocation = async () => {
    await navigator.geolocation.getCurrentPosition((locationInfo) => {
        this.setState({
            latitude: locationInfo.coords.latitude ,
            longitude: locationInfo.coords.longitude
        })
    })
}

render() {
return (
    <div>
    <Link id="new-entry"style={{marginBottom: '-5%',textDecoration: 'none', fontSize: "25px", letterSpacing: '1px',  color: 'white'}} onClick={this.toggle}>{this.props.buttonLabel}Create New Journal Entry</Link>
    <Modal style={{maxWidth: '50vh'}}  isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>New Entry</ModalHeader><br></br>
        <ModalBody  >
         <Form onSubmit={this.handleSubmit}>
        <FormGroup row>
          <Label for="title" sm={2}>Title:</Label>
          <Col sm={10}>
            <Input onChange={this.handleChange} type="text" name="title" placeholder=" Title" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="date" sm={2}>Date:</Label>
          <Col sm={10}>
            <Input onChange={this.handleChange} type="date" name="date"  />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label  sm={4}>Description:</Label>
          <Col for="exampleText" sm={10}>
            <textarea style={{ 
              width: '100%',
              border: '1px solid'
            }} onChange={this.handleChange} type="text" name="description" placeholder="What did you do today?" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleText" sm={2}>Photo URL (optional):</Label>
          <Col sm={10}>
            <Input onChange={this.handleChange} type="text" name="photo" />
          </Col>
        </FormGroup>
         <FormGroup check>
          <Label check>
            <Input onChange={this.handleChange} type="checkbox" name="public"/>{' '}
            Public
          </Label>
        </FormGroup>
        <br></br>
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
           <Button type = 'submit'color="primary" onClick={this.toggle}>Create Entry</Button>
          </Col>
        </FormGroup>
      </Form>     
        </ModalBody>
    </Modal>
    </div>
);
}
}

export default NewEntryModal;


