import { Button, Table, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useState } from "react";
function Clock(props) {
  const [isListCgange, setIsListCgange] = useState("flase");
  const userName = localStorage.getItem("name");
  const userId = localStorage.getItem("id");
  const [list, setList] = useState([]);
  const date = new Date().toLocaleDateString();
  const now = new Date().toLocaleTimeString();
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:3001/clock/`)
      .then((res) => res.json())
      .then((data) => {
        setList(data);
        console.log(data);
        console.log(date);
      });
  }, [isListCgange]);

  let myrecord = list.filter((x) => x.name == userName && x.date == date);
 
  const listItem = myrecord.map((v, i) => (
    <tr key={i}>
      <td>{myrecord[i].empId}</td>
      <td>{myrecord[i].name}</td>
      <td>{myrecord[i].In}</td>
      <td>{myrecord[i].Off}</td>
    </tr>
  ));
  function handleIn() {
    const hasIn = list.filter((x) => x.date == date && x.name == userName);
    console.log(hasIn);
    if (hasIn.length > 0 ) {
       alert("今日已有簽到紀錄");
    } else {fetch(`http://localhost:3001/clock`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          empId: `${userId}`,
          name: `${userName}`,
          date: `${date}`,
          In: `${now}`,
        }),
      })
        .then(setIsListCgange(!isListCgange))
        .then(alert("打卡成功"))
        .catch("打卡失敗");
      console.log(now);
     
    }
  }
  function handleLeave() {
  const id = myrecord[0].id
    fetch(`http://localhost:3001/clock/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        Off: `${now}`,
      }),
    })
      .then(setIsListCgange(!isListCgange))
      .then(alert("簽退成功"))
      .catch("簽退失敗");
  }

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return localStorage.getItem("name") ? (
    <Container>
      <h1>{date}</h1>
      <h2>hi, {userName}</h2>
      <div className="d-flex justify-content-between my-2">
        <div>
          <Button onClick={handleIn}>打卡上班</Button>
          <Button onClick={handleLeave} variant="warning">
            打卡下班
          </Button>
        </div>
        <Button onClick={logout} variant="danger">
          登出
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>名字</th>
            <th>上班</th>
            <th>下班</th>
          </tr>
        </thead>
        <tbody>{listItem}</tbody>
      </Table>
    </Container>
  ) : (
    <>
      <h2>您尚未登入</h2>
    </>
  );
}

export default Clock;
