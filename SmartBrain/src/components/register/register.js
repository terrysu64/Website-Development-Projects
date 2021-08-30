import React from 'react';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'SignInName': '',
      'SignInEmail': '',
      'SignInPassword': ''
    };
  };

  NameChange = (event) => {
    this.setState({'SignInName': event.target.value})
  };

  EmailChange = (event) => {
    this.setState({'SignInEmail': event.target.value})
  };

  PasswordChange = (event) => {
    this.setState({'SignInPassword': event.target.value})
  };

  RegisterSubmit = () => {
    fetch('http://localhost:3000/register', {
       'method': 'post',
       'headers': {'Content-Type': 'application/json'},
       'body': JSON.stringify({
         'name': this.state.SignInName,
         'email': this.state.SignInEmail,
         'password': this.state.SignInPassword
       })
     })
     .then(response => response.json())
     .then(user => {
       if (!(typeof user === "string")) {
         console.log(user);
         this.props.LoadUser(user);
         this.props.RouteChange('home')
       };
     })
  };

  render() {
    const {RouteChange} = this.props;
  	return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="text" 
                  name="name" 
                  id="name"
                  onChange={this.NameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="email" 
                  name="email-address"  
                  id="email-address"
                  onChange={this.EmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input 
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="password" 
                  name="password"  
                  id="password"
                  onChange={this.PasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input 
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit" 
                value="Sign Up"
                onClick={this.RegisterSubmit}
              />
            </div>
          </div>
        </main>
      </article>
  	);
  };
};

export default Register;