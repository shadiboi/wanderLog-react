import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Col, Form, FormGroup, Label, Input} from 'reactstrap';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';


class EditEntryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        entryToEdit: {
            title: props.entries.title,
            description: props.entries.description,
            date: props.entries.date,
            photo: props.entries.photo,
            id: props.entries._id,
        },
        currentUser: ''
    };

    this.toggle = this.toggle.bind(this);
}

toggle() {
    this.setState(prevState => ({
        modal: !prevState.modal
    }));
}
  
handleChange = (e) => {
    this.setState({
        entryToEdit: {...this.state.entryToEdit, [e.target.name]: e.target.value},
    })
    this.props.getEntryToEdit(this.state.entryToEdit);
}
handleSubmit = (e) => {
    e.preventDefault();

    this.props.editEntry(this.state.entryToEdit);
}

render() {

return (
        <div>
        <Link onClick={this.toggle}>{this.props.buttonLabel}Edit Entry</Link>

     <Modal style={{maxWidth: '50vh'}}  isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>Edit Entry</ModalHeader><br></br>
        <ModalBody  >
         <Form onSubmit={this.handleSubmit}>
        <FormGroup row>
          <Label for="title" sm={2}>Title</Label>
          <Col sm={10}>
            <Input value = {this.state.entryToEdit.title} onChange={this.handleChange} type="text" name="title" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="date" sm={2}>Date</Label>
          <Col sm={10}>
            <Input value = {this.state.entryToEdit.date} onChange={this.handleChange} type="date" name="date"  />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label  sm={3}>Description</Label>
          <Col sm={10}>
            <textarea style={{
                width: '100%',
                border: '1px solid'
                }} value = {this.state.entryToEdit.description} onChange={this.handleChange} type="text" name="description" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleText" sm={2}>Photo URL (optional)</Label>
          <Col sm={10}>
            <Input value = {this.state.entryToEdit.photo} onChange={this.handleChange} type="text" name="photo" />
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button type = 'submit'color="primary" onClick={this.toggle}>Edit Entry</Button>{''} 
            <Button color="danger" onClick={() => {this.props.deleteEntry(this.state.entryToEdit); this.toggle();}}>Delete Entry</Button>{' '}           </Col>
        </FormGroup>
      </Form>     
        </ModalBody>
    </Modal>
        </div>
    );
}
}

export default EditEntryModal;


