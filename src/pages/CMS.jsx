import React, { useCallback, useEffect, useRef } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { useState } from "react";
import { Form, Container, Button } from "react-bootstrap";

function CMS(props) {
  const [id, setId] = useState(null);
  const [isListChange, setIsListChange] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
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
    console.log(age);
    if (name !== "" && age !== "") {
      fetch(`http://localhost:3001/employee/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          id: "",
          name,
          age,
          password,
        }),
      }).then(() => {
        setIsListChange(!isListChange);
        console.log(`add => ${isListChange}`);
        setName("");
        setAge("");
        setPassword("");
      });
    } else {
      alert("請輸入內容");
    }
  }

  const toEdit = (id, e) => {
    //let id = e.target.parentNode.parentNode.firstChild.innerText;
    let editObj = list.filter((x) => x.id === id * 1)[0];
    setIsEdit(true);
    setId(id);
    setName(editObj.name);
    setAge(editObj.age);
    setPassword(editObj.password);
    console.log(`編輯中嗎？${isEdit}`);
    return
  };
  const edit = () => {
    fetch(`http://localhost:3001/employee/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id,
        name,
        age,
        password,
      }),
    })
      .then(() => {
        setIsListChange(!isListChange);
        setName("");
        setAge("");
        setPassword("");
      })
      .then(() => {
        alert("修改成功！");
      }, setIsEdit(false));
  };
  const cancelEdit = () => {
    setIsEdit(false);
    setName("");
    setAge("");
    setPassword("");
  };
  //沒有用
  const handleKeyDown = (e) => {
    if (e.key === "+") {
      return false;
    }
  };

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
                  min="1"
                  aria-describedby="basic-addon1"
                  onKeyDown={handleKeyDown}
                  onChange={(e) => {
                    if (e.target.value.length === 3) {
                      return false;
                    }
                    setAge(e.target.value);
                    console.log(e.target.value);
                  }}
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
                <tbody>
                  {list.map((v, i) => (
                    <tr key={i}>
                      <td>{v.id}</td>
                      <td>{v.name}</td>
                      <td>{v.age}</td>
                      <td className="project-actions text-right">
                        <Button className="btn btn-primary btn-sm" onClick={(e)=>{toEdit(v.id,e)}}>
                          修改
                        </Button>
                        <Button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            fetch(`http://localhost:3001/employee/${v.id}`, {
                              method: "DELETE",
                              headers: {
                                "Content-Type": "application/json",
                                Accept: "application/json",
                              },
                              body: JSON.stringify({ id: v.id }),
                            }).then(() => {
                              setIsListChange(!isListChange);
                            })
                          }
                        >
                          刪除
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}

export default CMS;
