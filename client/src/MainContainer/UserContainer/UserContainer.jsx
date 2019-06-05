import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

//CLASS NOT IN USE YET
class User extends Component {
    constructor (props){
        super();
        this.state = {
            allUsers: [],
            currentUser: props.currentUser,
            entries: [],
        }
    }
    
    componentDidMount(){
        this.getAllUsers();
        this.getUserEntries();
    }

  
    getAllUsers = async () => {
        const allUsers = await fetch('http://localhost:9000/users/all', {
            credentials: 'include'
          })
          const parsedResponse = await allUsers.json();
          if(parsedResponse.status === 200){
            this.setState({
              allUsers: parsedResponse.data
            })
        }  
    }

    getUserEntries = async () => {
        const userEntries = await fetch('http://localhost:9000/entries/' + this.props.currentUser._id, {
            method: 'GET',
            credientials: 'include'
        })
        const parsedResponse = await userEntries.json();
        if(parsedResponse.status === 200){
            this.setState({
              entries: parsedResponse.data
            })
           }  

    }
 
    render(){

        //FOR TESTING
        const allUsers = this.state.allUsers.map((users)=> {
            return (
            <div key = {users._id}>
            <li>  Username: {users.username} </li> 
            </div>
            )
        })
        return(
            <div>
              
            </div>
        )
    }
}

export default User

