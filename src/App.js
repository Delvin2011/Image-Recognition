import React from 'react';
//import Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value:40,
      density: {
        enable: true,
        color: "#3CA9D1",
        blur: 2,
        value_area:800
      }
    }
  }
}; 


//initialising the API key copied to server
/*const app = new Clarifai.App({
apiKey:'35c44e09a5874ee08cdd4ce1b71cfc8d'
});*/

const initialstate = {
      input:'',
      imageUrl:'',
      route: 'signin',
      isSignedIn: false,
      user: {
        id:'',
        name: '',
        email: '',
        password:'',
        entries: 0,
        Joined: ''
      }
}
//route keeps tracks of where we are in the page
class App extends React.Component {
  constructor(){
    super();
    this.state = initialstate;
  }

  loadUser = (data) =>{
    this.setState({user: {
        id:data.id,
        name: data.name,
        email: data.email,
        password:data.password,
        entries: data.entries,
        Joined: data.Joined

      }
    })
  }
 /* componentDidMount() {
    fetch('http://localhost:3000/')
    .then(response => response.json())
    .then(console.log)
    //then(data => this.setState({ data }));
  }*/

//Property of the App
onInputChange = (event) => {
  console.log(event.target.value);
  this.setState({input: event.target.value})
}

onButtonSubmit = () => {
  
  this.setState({imageUrl: this.state.input});
  fetch('http://localhost:3000/imageurl', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
    input: this.state.input
    })
})
  .then(response => response.json())
    //using our API key and submiting image URL Clarifai.CELEBRITY_MODEL a403429f2ddf4b49b307e318f00e528b https://samples.clarifai.com/face-det.jpg
    .then(response => {
        if(response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
            })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count}))
        });
      }
       
        //console.log(this.user.entries);
      },
      function(err) {
        // there was an error
      }
    );
}

onRouteChange = (route) => {
  console.log(route);
  if (route === 'signout' ) {
    this.setState(initialstate)
  }
  else if (route === 'home') {
    this.setState({isSignedIn: false})
  }
  this.setState({route: route})
}

  render() {
    return (
      <div className="App">
        <Particles className = 'particles'
            params={particlesOptions} />
        <Navigation onRouteChange = {this.onRouteChange}/> 
        { this.state.route === 'home'
          ? <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
            <FaceRecognition imageUrl = {this.state.imageUrl}/>
            </div>

          :  (this.state.route === 'signin'
              ?  <Signin loadUser= {this.loadUser} onRouteChange = {this.onRouteChange}/>
              :  <Signup loadUser= {this.loadUser} onRouteChange = {this.onRouteChange}/>
          ) 
        }
      </div>
    );
  }
}
export default App;

//Can de-structure using  const {isSignedIn, imageRrl, route, box} = this.state
