import React, { Component} from "react";
import { NavLink, Navigate  } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
class LoginClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:null,
      employee: [],
      account: "",
      password: "",
      logintext: "",
    };
  }

  login = (e) => {
    e.preventDefault();
    let feedback;
   //先拿到值再到JSON server比對
    if (this.state.account !== "" && this.state.password !== "") {
      fetch(`http://localhost:3001/employee?name=${this.state.account}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ employee: data});
      });
      if (this.state.employee.length > 0) {
        console.log(this.state.employee);
        localStorage.setItem("name", this.state.employee[0].name);
        localStorage.setItem("id", this.state.employee[0].id);
        this.setState({ user:true });
      } else {
        feedback = "帳號或密碼輸入錯誤";
      }
    } else {
      feedback = "請輸入帳號或密碼";
    }
    this.setState({ logintext: feedback });
  };

  render() {
    let { user } = this.state;
    return  (
      <Form className="w-25 mt-5 m-auto">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>登入</Form.Label>
          <Form.Control
            type="text"
            placeholder="name"
            value={this.state.account}
            onChange={(e) => {
              this.setState({ account: e.target.value });
            }}
          />
        </Form.Group>
              {user && (
                <Navigate to="/clock" replace={true} />
              )}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={(e) => {
              this.setState({ password: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
        <div className="d-flex flex-column">
          <div style={{ height: "40px" }}>{this.state.logintext}</div>
          <Button variant="primary" onClick={this.login}>
            Login
          </Button>
          <NavLink to="/CMS">後台</NavLink>
        </div>
      </Form>
    );
  }
}

export default LoginClass;
