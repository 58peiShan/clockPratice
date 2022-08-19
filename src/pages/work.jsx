import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Form, Container, Button } from "react-bootstrap";

function Work(props) {
  const [list, setList] = useState([]);
  const [forsearchList, setForsearchList] = useState([]);
  const [date, setDate] = useState();
  // 使用1次，不太需事先定義
  const getRecord = () => {
    fetch(`http://localhost:8001/clock`)
      .then((res) => res.json())
      .then((data) => {
        setList(data);
        setForsearchList(data);
      });
  };
  useEffect(() => {
    getRecord();
  }, []);
  // 直接按查詢就掛了
  const update = () => {
    // /-0?/
    const a = date.replace(/-0/g, "/");
    const b = a.replace(/-/g, "/");
    let recordByDate = forsearchList.filter((x) => x.date === b);
    setList(recordByDate);
  };
  const ListItem = list.map((v, i) => (
    <tbody key={i}>
      <tr>
        {/* v.empId */}
        <td>{list[i].empId}</td>
        <td>{list[i].name}</td>
        <td>{list[i].date}</td>
        <td>{list[i].In}</td>
        <td>{list[i].Off}</td>
      </tr>
    </tbody>
  ));

  return (
    <Container>
      <div className="content-wrapper mt-5 d-flex flex-column h-100">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-6">
                <h3>出勤紀錄</h3>
                <NavLink to="/CMS"> 員工列表</NavLink>
              </div>
              <div className="d-flex justify-content-end">
                <Form.Control
                  className="w-25"
                  type="date"
                  name="date_of_work"
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
                <Button onClick={update}>查詢</Button>
              </div>
            </div>
          </div>
        </section>

        <section class="content">
          <div class="card">
            <div class="card-body p-0">
              <table class="table table-striped projects">
                <thead>
                  <tr>
                    <th>員工編號</th>
                    <th>姓名</th>
                    <th>日期</th>
                    <th>上班</th>
                    <th>下班</th>
                  </tr>
                </thead>
                {(list.length > 0)?
                <>{ ListItem }</>
              :<h3 className="text-center">暫無資料</h3>}
              </table>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}

export default Work;
