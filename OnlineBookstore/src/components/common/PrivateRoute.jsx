import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

export default class PrivateRoute extends Component{
    render(){
        if(localStorage.getItem('role') === 'read'){
            return <Redirect to="/login" />;
        }

        return(
            <Route {...this.props}>
                {this.props.children}
            </Route>
        );
    }
} 

// //Private router function
// const PrivateRoute = ({ component: Component, ...rest }) => {
//     return (
//       <Route
//         {...rest}
//         render={props =>
//           fakeAuth.isAuthenticated === true ? (
//             <Component {...props} />
//           ) : (
//             <Redirect
//               to={{ pathname: "/login", state: { from: props.location } }}
//             />
//           )}
//       />
//     );
//   };

{/* <Switch>
  <Route exact path="/" component={Home} data={data}/>
  <Route path="/category" component={Category}/>
  <Route path="/login" component={Login}/>
  <PrivateRoute authed={fakeAuth.isAuthenticated} path='/products' component = {Products} />
</Switch> */}