import React, {Component} from 'react';
import './App.css';
import AuthContainer from './AuthContainer/AuthContainer'
import 'bootstrap/dist/css/bootstrap.min.css';
import MainContainer from './MainContainer/MainContainer';



class App extends Component {
  constructor (){
    super()
    this.state = {
      loggedIn: false,
      currentUser: null,
      entries: []
    }
  }
  

  getEntries = (entries) => {
    this.setState({
      entries: entries
    })
  }


  handleRegister = async (formData) => {
      const newUserResponse = await fetch("http://localhost:9000/users", {
        method: "POST",
        body: JSON.stringify(formData),
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        }
    })
    const parsedResponse = await newUserResponse.json();
    if(parsedResponse.status === 200){
        this.setState({
            loggedIn: true,
            currentUser: parsedResponse.data
        })
    }
  }

deleteUser = async (user, e) => {    
        try {
            const deleteUser = await fetch('http://localhost:9000/users/' + user.currentUser._id, {
                method: 'DELETE',
                credentials: 'include'
              });
        console.log(deleteUser, '<<<<<<<<<<<<<<DELETED USER>>>>>>>>>>>>>')
              } catch (err){
        console.log(err)
        }
        this.setState({
            loggedIn: false,
            currentUser: null
        })
}

handleLogin = async (formData) => {
    try {
      const loginResponse = await fetch("http://localhost:9000/login", {
        method: "POST",
        body: JSON.stringify(formData),
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        }
      })
      const parsedLoginResponse = await loginResponse.json();

      if(parsedLoginResponse.status === 200){
        this.setState({
          loggedIn: true,
          currentUser: parsedLoginResponse.data
        })
      } else {
        alert("Username or Password does not exist")
      }

    } catch(err){
      console.log(err)
    }
  }


logout = async ()=> {
    this.setState({
      loggedIn: false,
      currentUser: ''
    })
}


editUser = async () => {
    try {
      const editedUser = await fetch('http://localhost:9000/users/' + this.state.currentUser._id, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(editedUser),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const parsedResponse = await editedUser.json();
       editedUser = this.state.currentUser
      this.setState({
        currentUser: editedUser
      });
    }catch(err){
      console.log(err);
    }
}

  render () {
      return (
      <div className="App">
         
        {!this.state.loggedIn ?
         
            <AuthContainer handleLogin = {this.handleLogin} handleRegister = {this.handleRegister}/>
         
        :
          
             <MainContainer  deleteUser={this.deleteUser} getEntries = {this.getEntries} currentUser = {this.state.currentUser}/>
          
        }

     </div>  
     
  );
}
}


export default App;


 