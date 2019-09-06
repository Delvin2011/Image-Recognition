import React from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import ConceptTable from './Components/ConceptTable/ConceptTable';
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

const initialstate = {
      input:'',
      imageUrl:'',
      route: 'signin',
      isSignedIn: false,
      box: {},
      user: {
        id:'',
        name: '',
        email: '',
        password:'',
        entries: 0,
        Joined: ''
      },
      ModelOption: null,
      Models:[]
}
const Models = [
  { label: "Celebrity", value: "e466caa0619f444ab97497640cefc4dc" },
  { label: "Demographics", value: "c0c0ac362b03416da06ab3fa36fb58e3" },
  { label: "Fashion", value: "e0be3b9d6a454f0493ac3a30784001ff" },
  { label: "Color", value: "eeed0b6733a644cea07cf4c60f87ebb7" },
  { label: "Face Detection", value: "a403429f2ddf4b49b307e318f00e528b" },
  { label: "General", value: "aaa03c23b3724a16a56b629203edc62c" },
  { label: "Food", value: "bd367be194cf45149e75f01d59f77ba7" },
  { label: "Moderation", value: "d16f390eb32cad478c7ae150069bd2c6" },
  { label: "Travel", value: "eee28c313d69466f836ab83287a54ed9" },
  { label: "NSFW", value: "e9576d86d2004ed1a38ba0cf39ecb4b1" },
];

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

  calculateFaceLocation = (data) => { //calculateFaceLocation
      if((this.state.ModelOption.label === "Face Detection" || this.state.ModelOption.label === "Celebrity" || this.state.ModelOption.label === "Demographics") && typeof(data) != 'undefined') {
        let clarifaiFace  = [];
        const box = [];
          for (let i=0; i < data.outputs[0].data.regions.length; i++)  {
            clarifaiFace = data.outputs[0];  
            const image = document.getElementById('inputimage');
            const width = Number(image.width);
            const height = Number(image.height);
          
            box.push({
            leftCol: clarifaiFace.data.regions[i].region_info.bounding_box.left_col * width,
            topRow: clarifaiFace.data.regions[i].region_info.bounding_box.top_row * height,
            rightCol: width - (clarifaiFace.data.regions[i].region_info.bounding_box.right_col * width),
            bottomRow: height - (clarifaiFace.data.regions[i].region_info.bounding_box.bottom_row * height) 
            });
          }
          return box;
        }
      }

  predictedConcept = (response) => {
    console.log(this.state.ModelOption.label);
      if(this.state.ModelOption.label === "Celebrity"  && typeof(response) != 'undefined'){
        let clarifaiConcept = [];
        const products = [];
        let a = 0;
        for (let i=0; i < response.outputs[0].data.regions.length; i++)  {
          clarifaiConcept = response.outputs[0];
          let fullname = clarifaiConcept.data.regions[i].data.concepts[0].name.split(" ");
          a = i + 1;
          var name = fullname[0].charAt(0).toUpperCase() + fullname[0].slice(1)  + " " + fullname[1].charAt(0).toUpperCase() + fullname[1].slice(1);
          products.push({
            category: "Concept: " + a,
            name: name,
            value: clarifaiConcept.data.regions[i].data.concepts[0].value.toFixed(3),
          });
        }
      console.log(products);
      return products;
      }
      console.log(response);
      if((this.state.ModelOption.label === "NSFW" || this.state.ModelOption.label === "Fashion" || this.state.ModelOption.label === "General" || this.state.ModelOption.label === "Food" || this.state.ModelOption.label === "Moderation" || this.state.ModelOption.label === "Travel") && typeof(data) != 'undefined'){
        let clarifaiConcept = [];
        const products = [];
        let a = 0;
        for (let i=0; i < response.outputs[0].data.concepts.length; i++)  {
          clarifaiConcept = response.outputs[0];
          let fullname = clarifaiConcept.data.concepts[i].name;
          a = i + 1;
          var name2 = fullname;
          products.push({
            category: "Concept: " +  a,
            name: name2,
            value: clarifaiConcept.data.concepts[i].value.toFixed(3),
          });
          if (a === 5) { 
            break;
          } 
        }
      return products;
      }
    }

  displayFaceBox = (box) => {
      this.setState({box: box});
    }
  
  displayPrediction = (products) => {
      this.setState({products: products});
    }
  
  componentDidMount() {
      this.setState({Models: Models });
    }
  
  handleChange = ModelOption => {
      this.setState({ ModelOption: ModelOption });
    };


onInputChange = (event) => {
  this.setState({input: event.target.value})
}

onButtonSubmit = () => {
  const { ModelOption } = this.state;
  this.setState({imageUrl: this.state.input});
  fetch('https://safe-scrubland-47832.herokuapp.com/imageUrl', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
    input: this.state.input,
    Model: ModelOption.value
    })
})
  .then(response => response.json())
    //using our API key and submiting image URL Clarifai.CELEBRITY_MODEL a403429f2ddf4b49b307e318f00e528b https://samples.clarifai.com/face-det.jpg
    .then(response => {
        if(response) {
          fetch('https://safe-scrubland-47832.herokuapp.com/image', {
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
      this.displayFaceBox(this.calculateFaceLocation(response));
      this.displayPrediction(this.predictedConcept(response));
      console.log(response);
      console.log(ModelOption.value);
      },
      function(err) {
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
    const { products } = this.state;

    return (
      <div className="App">
        <Particles className = 'particles'
            params={particlesOptions} />
        <Navigation onRouteChange = {this.onRouteChange}/> 
        { this.state.route === 'home'
          ? <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit} ModelOption = {this.handleChange} ModelField = {this.ModelOption}/>
            <FaceRecognition imageUrl = {this.state.imageUrl} box = {this.state.box} ModelField = {this.state.ModelOption}/>
            { typeof(this.state.products) === 'undefined' || (typeof(this.state.box) === 'undefined' && this.state.ModelOption.label === "Face Detection")
                ? <div></div>

				        : 
                  (<div>
                    <ConceptTable products = {products} ModelField = {this.state.ModelOption}/>
                   
                  </div>)
              }	
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

