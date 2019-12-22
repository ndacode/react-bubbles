import React from "react";
import axios from "axios";
import BubblePage from "./BubblePage";

// make a post request to retrieve a token from the api
// when you have handled the token, navigate to the BubblePage route

class Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: ""
    },
    isLoggedIn: false
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  login = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", this.state.credentials)
      .then(response => {
        console.log("response", response);
        const { data } = response;

        localStorage.setItem("token", data.payload);
        this.setState({ ...this.state, isLoggedIn: true });
      });
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ ...this.state, isLoggedIn: true });
    } else {
      this.setState({ ...this.state, isLoggedIn: false });
    }
  }

  render() {
    return (
      <div>
        <h1>Welcome to the Bubble App!</h1>
        {this.state.isLoggedIn ? (
          "logged in"
        ) : (
          <>
            <h1>"Please login"</h1>
            <form onSubmit={this.login}>
              <input
                type="text"
                name="username"
                value={this.state.credentials.username}
                onChange={this.handleChange}
              />
              <input
                type="password"
                name="password"
                value={this.state.credentials.password}
                onChange={this.handleChange}
              />
              <button>Log in</button>
            </form>
          </>
        )}
      </div>
    );
  }
}

export default Login;
