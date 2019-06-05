import React, {Component} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link} from 'react-router-dom';

class EditUserModal extends Component {
    constructor(){
        super();
        this.state = {
            allUsers: [],
            currentUser: ''
        }
   
        this.toggle = this.toggle.bind(this);
    }
    componentDidMount(){
        this.getUser();
    }
    toggle() {
      this.setState(prevState => ({
        modal: !prevState.modal
      }));
    }
    handleChange = (e) => {
      this.setState({
        currentUser: {...this.state.currentUser, [e.target.name]: e.target.value},
      })
    }
    handleSubmit = (e) => {
          e.preventDefault();
          this.props.editUser(this.state);
    }

    getUser = async () => {
        const currentUser = await fetch("http://localhost:9000/users/current", {
            credentials: 'include'
          })
          const parsedResponse = await currentUser.json();
          if(parsedResponse.status === 200){
            this.setState({
              currentUser: parsedResponse.data,
            })
          }
    }
  
    render() {
      return (
        <div>
          <Link style={{textDecoration: 'none', letterSpacing: '2px', color:'white', fontSize: '17px'}}  onClick={this.toggle}>{this.props.buttonLabel}Edit Account</Link>
          <Modal  style={{maxWidth: '50vh'}} isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Edit Account</ModalHeader>
                <ModalBody  >
                  <form onSubmit={this.handleSubmit}>
                  Username: <input value ={this.props.currentUser.username} type="text" name="username"/>
                  <br></br>
                  Password: <input value ={this.props.currentUser.password}onChange={this.handleChange} type="password" name="password"/>
                  <br></br>
                  Email: <input value ={this.props.currentUser.email}onChange={this.handleChange} type="email" name="email"/>
                  <br></br>
                  <Button type = 'submit'color="primary" onClick={this.toggle}>Edit User</Button>{' '}        
                  </form>         
                  </ModalBody>
              <ModalFooter>
            <Button color='danger' onClick = {this.props.deleteUser.bind(null,this.state )}> Delete User</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    }
  }
  
  export default EditUserModal;
  