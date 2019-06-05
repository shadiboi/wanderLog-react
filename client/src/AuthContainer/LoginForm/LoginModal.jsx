import React from 'react';
import { Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import { Link} from 'react-router-dom';

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      username: '',
      password: ''
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
        [e.target.name]: e.target.value,
    })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleLogin(this.state);
    }

  render() {
    return (
      <div class= 'loginBtn'>
        <Link style={{textDecoration: 'none', letterSpacing: '2px', color:'white', fontSize: '17px'}}  onClick={this.toggle}>{this.props.buttonLabel}LOGIN</Link>
        <Modal style={{maxWidth: '50vh'}} isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
                <form onSubmit={this.handleSubmit}>
                  Username: <input style={{ border: '1px solid #ccc'}} onChange={this.handleChange} value={this.state.username} type="text" name="username"/>
                  <br></br>  <br></br>
                  Password: <input style={{border: '1px solid #ccc'}} onChange={this.handleChange} value={this.state.password} type="password" name="password"/><br></br>  <br></br>
                  <Button type = 'submit'color="primary" onClick={this.toggle}>Login</Button>{' '}
                    </form>          
            </ModalBody>
       
        </Modal>
      </div>
    );
  }
}

export default LoginModal;
