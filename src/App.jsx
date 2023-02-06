import { useState } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.css";

function App() {
  const [myData, setMyData] = useState([]);

  const [isError, setIsError] = useState([]);
  const [btnname, setBtnName] = useState("Save");
  const [documentmode, setDocumentMode] = useState("add");
  const API = 'http://localhost:4335/api/Contacts';

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    email: ''
  })


  const changeHandler = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }




  const addPost = async (e) => {
    e.preventDefault();
    if (documentmode == "add") {
      e.preventDefault();
      const newId = myData.length + 1;
      const newContact = {
        id: newId,
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        email: formData.email

      };
      const newContacts = [...myData, newContact];
      setMyData(newContacts)
      console.warn(newContacts)



    }
    else if (documentmode == "edit") {


      e.preventDefault();

      console.warn("update=", formData);
      console.warn("------=", myData);
      console.log(formData.id);

      myData.map((item, i) => {
        if (item.id == formData.id) {
          // 
          item.fullName = formData.fullName,
            item.phone = formData.phone,
            item.address = formData.address,
            item.email = formData.email
          setMyData([...myData])
        }
        // 
      })
    }
    setBtnName("Save");
    setDocumentMode("add");

  }


  function updatePost(id) {
    setBtnName("Update");
    setDocumentMode("edit");


    const item = myData.filter(i => i.id == id)[0]
    console.log(id);
    setFormData(
      {
        id: item.id,
        fullName: item.fullName,
        phone: item.phone,
        address: item.address,
        email: item.email
      })

  }


  const Delete = (i, e) => {
    console.warn(i);
    e.preventDefault();
    myData.splice(i, 1);
    setMyData([...myData]);

  }

  return (
    <div className="App">


      {isError != '' && <h2>{isError}</h2>}
      {/* <Button variant="primary" onClick={addPost}>View</Button> */}
      <form onSubmit={(e) => { addPost(e) }}>
        <label>fullName</label><br />
        <input type="text" name='fullName' value={formData.fullName || ""} onChange={changeHandler} /> <br /><br />
        <label>phone</label><br />
        <input type="text" name='phone' value={formData.phone || ""} onChange={changeHandler} /> <br /><br />
        <label>address</label><br />
        <input type="text" name='address' value={formData.address || ""} onChange={changeHandler} /> <br /><br />
        <label>email</label><br />
        <input type="text" name='email' value={formData.email || ""} onChange={changeHandler} /> <br /><br />
        <button type='submit'>{btnname}</button>

      </form>
      {/* try */}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>

            <th>fullName</th>
            <th>phone</th>
            <th>address</th>
            <th>email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody >
          {
            myData.map((item, i) => {
              return (<tr key={i}>
                <td>{item.fullName}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td>{item.email}</td>
                <td>

                  <Button variant="success" onClick={() => updatePost(item.id)}>Edit</Button>&nbsp; &nbsp;
                  <Button variant="danger" onClick={(e) => Delete(i, e)} >Remove</Button>
                </td>


              </tr>)

            })
          }

        </tbody>
      </Table>


    </div>
  )
}

export default App;
