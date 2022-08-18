import React, { Component, useEffect } from "react";
import { useState } from "react";
import {NavLink } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

class LoginClass extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.state = {
      employee: [],
      account: "",
      password: "",
      logintext: "",
    };
  }

  login = (e) => {
    e.preventDefault();
    let feedback;
    if (this.state.account !== "" && this.state.password !== "") {
      let user = this.state.employee.filter(
        (x) =>
          x.name === this.state.account && x.password === this.state.password
      );

      if (user[0] !== undefined) {
        localStorage.setItem("name", user[0].name);
        localStorage.setItem("id", user[0].id);
        //沒找到轉址方法
        window.location.href = '/clock'
      } else {
        feedback = "帳號或密碼輸入錯誤";
      }
    } else {
      feedback = "請輸入帳號或密碼";
    }
    this.setState({ logintext: feedback });
  };

  componentDidMount() {
    fetch(`http://localhost:3001/employee`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ employee: data });
        console.log(this.state.employee);
      });
  }
  render() {
    
    return localStorage.getItem("name") ? <><h2>您已登入</h2>
    <NavLink to={'/clock'}>去打卡</NavLink>
    </>:(
  
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
