import React, { useEffect} from 'react'
import { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import {Form, Button} from 'react-bootstrap';

function Login(props) {
  const [employee,setEmployee] =useState([]) 
  const [account, setAccount]=useState('')
  const [password, setPassword]=useState('')
  const [logintext, setLoginText]=useState('')
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/employee`)
      .then((res) => res.json())
      .then((data) => {
        setEmployee(data);
        console.log(employee);
      });
  }, []);

      const login = (e) => {
        e.preventDefault()
        let feedback;
        if (account !== "" && password !== "") {
          let user = employee.filter(x => x.name === account && x.password === password)
          console.log(employee);
          console.log(user);
          if (user[0] !== undefined) {
            localStorage.setItem('name', user[0].name);
            localStorage.setItem('id', user[0].id);
            navigate('/clock')
          } else {
            feedback = '帳號或密碼輸入錯誤'
          }
        } else {
          feedback = "請輸入帳號或密碼"
        }
        setLoginText(feedback)
      }

  return localStorage.getItem("name") ? <>您已登入
  <NavLink to={'/clock'}>去打卡</NavLink>
  </>:(
    
    <Form className="w-25 mt-5 m-auto"> 
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>登入</Form.Label>
      <Form.Control type="text" placeholder="name" value={account} onChange={(e)=>{setAccount(e.target.value)

      }}/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicCheckbox">
    </Form.Group>
    <div className='d-flex flex-column'>
    <div style={{height:'40px'}}>{logintext}</div>
    <Button variant="primary" type="submit" onClick={login}>
      Login
    </Button>
    <NavLink to="/CMS">後台</NavLink>
    </div>
  </Form>

  )
}

export default Login