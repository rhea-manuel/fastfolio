import logo from './logo.svg';
import './Normalize.css'
import './App.css';
import React from 'react'
import AuthContext from './Context.js'
import { AIRTABLE } from './config.js'
import Axios from 'axios'
import IconLink from './IconLink';
import GalleryImage from './GalleryImage'


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false
    }
  }

  componentDidMount() {
    Axios.get(`https://api.airtable.com/v0/${AIRTABLE.BASE}/About%20Me?api_key=${AIRTABLE.KEY}`)
      .then((res) => {
        const about = res.data.records[0].fields;
        this.setState({
          name: about["Full Name"],
          description: about.Content,
          email: about.Email
        })
      })
      .then(() => {
        Axios.get(`https://api.airtable.com/v0/${AIRTABLE.BASE}/Gallery?api_key=${AIRTABLE.KEY}`)
          .then((res) => {
            this.setState({
              gallery: res.data.records,
            })
          })
      })
      .then(() => {
        Axios.get(`https://api.airtable.com/v0/${AIRTABLE.BASE}/Theme?api_key=${AIRTABLE.KEY}`)
          .then((res) => {

            const theme = res.data.records[0].fields;
            console.log(res.data.records)
            const root = document.documentElement;

            root.style.setProperty('--body-font', theme["Body Font"]);
            root.style.setProperty('--heading-font', theme["Heading Font"]);
            root.style.setProperty('--text', theme["Text"]);
            root.style.setProperty('--accent', theme["Accent"]);
            root.style.setProperty('--body', theme["Background"]);


          })
      })
      .then(() => {
        Axios.get(`https://api.airtable.com/v0/${AIRTABLE.BASE}/Social%20Media?api_key=${AIRTABLE.KEY}`)
          .then((res) => {

            const records = res.data.records
            const links = []


            records.forEach(element => {
              links.push({
                url: element.fields.URL,
                icon: element.fields["Social Media Site"],
                urlName: element.fields.Handle
              })
            });

            this.setState({
              isLoaded: true,
              links: links
            })
          })
      })

  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <div class="loading"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>
      )
    }

    return (
      <div class="wrapper animate__animated animate__fadeIn">
        <div className="container ">

          <div className="sidebar">
            <h1>{this.state.name}</h1>
            <p>{this.state.description}</p>
            <IconLink url={`mailto:${this.state.email}`} icon="las la-envelope" urlName={this.state.email}></IconLink>
            {/* <a href=""><i className=""></i>  </a> */}

            <h3>Links</h3>
            <div className="socialmedia-links">

              {
                this.state.links.map((item) => {
                  return (<IconLink url={item.url} icon={`lab la-${item.icon}`} urlName={item.urlName}></IconLink>)
                })
              }
            </div>
            <footer class="footer desktop">
              Copyright © {this.state.name}
            </footer>
          </div>

          <GalleryImage gallery={this.state.gallery}></GalleryImage>

          <footer className="footer mobile">
            <small>Copyright © {this.state.name}</small>
          </footer>

        </div>



      </div>
    );
  }

}

export default App;
