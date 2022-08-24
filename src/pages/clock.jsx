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
  const navigate = useNavigate();
  useEffect(() => {
    //改成取單筆
    fetch(`http://localhost:3001/clock/?date=${date}`)
      .then((res) => res.json())
      .then((data) => {
        setList(data[0]);
      });
  }, [isListCgange]);

  // const listItem = list.map((v, i) => (
  //   <tr>
  //     <td>{list.empId}</td>
  //     <td>{list.name}</td>
  //     <td>{list.In}</td>
  //     <td>{list.Off}</td>
  //   </tr>
  // ));
  function handleIn() {
    const now = new Date().toLocaleTimeString();
    if (list) {
      alert("今日已有簽到紀錄");
    } else {
      fetch(`http://localhost:3001/clock`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          empId: `${userId}`,
          name: `${userName}`,
          date,
          In: `${now}`,
        }),
      })
      // 待說明
        .then(()=>{setIsListCgange(!isListCgange)})
        .then(()=>{alert("打卡成功")})
        .catch("打卡失敗");
      console.log(now);
    }
  }
  function handleLeave() {
    const now = new Date().toLocaleTimeString();
    const id = list.id;
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
      .then(()=>{setIsListCgange(!isListCgange)})
      .then(()=>{alert("簽退成功")})
      .catch("簽退失敗");
  }

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return userName ? (
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
        <tbody>
          {list ? (
            <tr>
              <td>{list.empId}</td>
              <td>{list.name}</td>
              <td>{list.In}</td>
              <td>{list.Off}</td>
            </tr>
          ) : (
            <tr>
              <td>今日尚未打卡</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  ) : (
    <>
      <h2>您尚未登入</h2>
    </>
  );
}

export default Clock;
