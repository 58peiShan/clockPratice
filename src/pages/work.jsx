import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Form, Container, Button } from "react-bootstrap";

function Work(props) {
  const [list, setList] = useState([]);
  // forsearchList 不須使用useState，該變數不參與畫面render，使用useRef
  const [forsearchList, setForsearchList] = useState([]);
  const [date, setDate] = useState();

  useEffect(() => {
    fetch(`http://localhost:3001/clock`)
      .then((res) => res.json())
      .then((data) => {
        setList(data);
        setForsearchList(data);
      });
  }, []);

  const update = () => {
if(date){
  const searchDate = date.replace(/-0?/g, "/");
    // const a = date.replace(/-0/g, "/");
    // const b = a.replace(/-/g, "/");
    let recordByDate = forsearchList.filter((x) => x.date === searchDate);
    setList(recordByDate);
}else{
  alert('請先選擇日期')
}
  };
  const ListItem = list.map((v, i) => (
    // tbody在table中只能出現一個，目前出現多個
    <tbody key={i}>
      <tr>
        <td>{v.empId}</td>
        <td>{v.name}</td>
        <td>{v.date}</td>
        <td>{v.In}</td>
        <td>{v.Off}</td>
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

        <section className="content">
          <div className="card">
            <div className="card-body p-0">
              <table className="table table-striped projects">
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
              :<tbody className="text-center">
                <tr>
                  {/* 畫面只占一個欄位 */}
                  <td>暫無資料</td>
                </tr>
                </tbody>}
              </table>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}

export default Work;
