import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default class Home extends Component {
    render(){
      // const event = "https://drive.google.com/thumbnail?id=1glbfvQD9okHl9-mFmGk2kQ3O1QDRcHc1";
        return(
            <div className="container">
                <div className="slider">
                  <img src={require('./slider-books.jpg')} alt="cover_img"/>
                  <div class="centered title">Inspire Daily Reading</div>
                  <p class="centered subtitle">Visit Our Page and Discover Your Next Book</p>
                  {/* <HotelList page={this.props.match.params.page}/> */}
                </div>
            <main role="main">
              <div class="container marketing">
                <div class="row">
                  <div class="col-lg-4 text-center">
                    <img class="rounded-circle" src={require('./store.jpg')} width="140" height="140" alt="prod1"/>
                    <h2>Books</h2>
                    <p className="text-justify">Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>
                    <p><Link to="/catalog" class="btn btn-secondary">View books »</Link></p>
                  </div>
                  <div class="col-lg-4 text-center">
                    <img class="rounded-circle" src={require('./event.jpg')} width="140" height="140" alt="prod2"/>
                    <h2>Events</h2>
                    <p className="text-justify">Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.</p>
                    <p><Link to="/events" class="btn btn-secondary">View events »</Link></p>
                  </div>
                  <div class="col-lg-4 text-center">
                    <img class="rounded-circle" src={require('./g-map.jpg')} width="140" height="140" alt="prod3"/>
                    <h2>Contact Us</h2>
                    <p className="text-justify">Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.</p>
                    <p><Link to="/about" class="btn btn-secondary">View details »</Link></p>
                  </div>
                </div>
                <hr class="featurette-divider" />
                <div class="row featurette">
                  <div class="col-md-7">
                    <h2 class="featurette-heading">Lorem ipsum dolor sit amet. <span class="text-muted">Consectetur adipiscing elit.</span></h2>
                    <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                  </div>
                  <div class="col-md-5">
                    <img class="featurette-image img-fluid mx-auto" data-src="holder.js/500x500/auto" alt="500x500" src={require('./store.jpg')} data-holder-rendered="true" />
                  </div>
                </div>
                <hr class="featurette-divider" />
                <div class="row featurette">
                  <div class="col-md-7 order-md-2">
                    <h2 class="featurette-heading">Osed do eiusmod tempor.<span class="text-muted">Sincididunt ut labore.</span></h2>
                    <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo. Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                  </div>
                  <div class="col-md-5 order-md-1">
                    <img class="featurette-image img-fluid mx-auto" data-src="holder.js/500x500/auto" alt="500x500" src={require('./event.jpg')} data-holder-rendered="true" />
                  </div>
                </div>
                <hr class="featurette-divider" />
                <div class="row featurette">
                  <div class="col-md-7">
                    <h2 class="featurette-heading">Consectetur adipiscing.<span class="text-muted">Cet dolore magna aliqua.</span></h2>   
                    <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo. Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                  </div>
                  <div class="col-md-5">
                    <img class="featurette-image img-fluid mx-auto" data-src="holder.js/500x500/auto" alt="500x500" src={require('./g-map.jpg')} data-holder-rendered="true" />
                  </div>
                </div>
                <hr class="featurette-divider" />
              </div>
            </main>
          </div>
        );
    }
} 