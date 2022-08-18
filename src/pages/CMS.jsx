import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Form, Container, Button } from "react-bootstrap";

function CMS(props) {
  const [id, setId] = useState();
  const [isListChange, setIsListChange] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3001/employee`)
      .then((res) => res.json())
      .then((data) => {
        setList(data);
        console.log(`default => ${isListChange}`);
      });
  }, [isListChange]);

  function add() {
    if (name !== "") {
      fetch(`http://localhost:3001/employee/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          id: "",
          name: `${name}`,
          age: `${age}`,
          password: `${password}`,
        }),
      })
        .then(
          setIsListChange(!isListChange),
          setName(""),
          setAge(""),
          setPassword("")
        )
        .then(console.log(`add => ${isListChange}`));
    } else {
      alert("請輸入內容");
    }
  }

  const toEdit = (e) => {
    let id = e.target.parentNode.parentNode.firstChild.innerText;
    let editObj = list.filter((x) => x.id === id * 1)[0];
    setIsEdit(true);
    setId(id);
    setName(editObj.name);
    setAge(editObj.age);
    setPassword(editObj.password);
    console.log(`編輯中嗎？${isEdit}`);
  };
  const edit = (e) => {
    fetch(`http://localhost:3001/employee/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id: `${id}`,
        name: `${name}`,
        age: `${age}`,
        password: `${password}`,
      }),
    })
      .then(
        setIsListChange(!isListChange),
        setName(""),
        setAge(""),
        setPassword("")
      )
      .then(alert("修改成功！"));
  };
  const cancelEdit = () => {
    setIsEdit(false);
    setName("");
    setAge("");
    setPassword("");
  };

  const listItem = list.map((v, i) => (
    <tbody key={i}>
      <tr>
        <td>{list[i].id}</td>
        <td>{list[i].name}</td>
        <td>{list[i].age}</td>
        {/* <td></td>
        <td></td> */}
        <td className="project-actions text-right">
          <Button className="btn btn-primary btn-sm " onClick={toEdit}>
            修改
          </Button>
          <Button
            className="btn btn-danger btn-sm"
            onClick={() =>
              fetch(`http://localhost:3001/employee/${list[i].id}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                body: JSON.stringify({ id: `${list[i].id}` }),
              }).then(setIsListChange(!isListChange))
            }
          >
            刪除
          </Button>
        </td>
      </tr>
    </tbody>
  ));

  return (
    <Container>
      <div className="content-wrapper mt-5 d-flex flex-column h-100">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <NavLink className="text-decoration-none" to="/">
                  回前台
                </NavLink>
                <h3>員工列表</h3>
                <NavLink to="/work">出勤紀錄</NavLink>
              </div>
              
              <Form className="col-sm-6">
                <Form.Control
                  placeholder="員工姓名"
                  value={name}
                  aria-label="name"
                  aria-describedby="basic-addon1"
                  onChange={(e) => setName(e.target.value)}
                />
                <Form.Control
                  placeholder="年齡"
                  type="number"
                  aria-label="age"
                  value={age}
                  min="1" max="99"
                  aria-describedby="basic-addon1"
                  onChange={(e) => setAge(e.target.value)}
                />
                <Form.Control
                  placeholder="預設密碼"
                  type="text"
                  aria-label="password"
                  value={password}
                  aria-describedby="basic-addon1"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {isEdit !== false ? (
                  <>
                    <Button className={`btn btn-danger btn-bg`} onClick={edit}>
                      修改
                    </Button>
                    <Button
                      className={`btn btn-secondary btn-bg `}
                      onClick={cancelEdit}
                    >
                      取消修改
                    </Button>
                  </>
                ) : (
                  <Button className={`btn btn-warning btn-bg`} onClick={add}>
                    新增
                  </Button>
                )}
              </Form>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="card">
            <div className="card-body p-0">
              <table className="table table-striped projects">
                <thead>
                  <tr>
                    <th>員工編號</th>
                    <th>姓名</th>
                    <th>年齡</th>
                    <th>動作</th>
                  </tr>
                </thead>
                {listItem}
              </table>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}

export default CMS;
