import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  let [formData, setFormData] = useState(
    {
      uname: '',
      uemail: '',
      uphone: '',
      umessage: '',
      index: ''
    }
  );

  // let [userData, setUserData] = useState([]);

  // Get data from localStorage if available, otherwise set an empty array
  let [userData, setUserData] = useState(() => {
    const savedUserDatas = localStorage.getItem('userData');
    return savedUserDatas ? JSON.parse(savedUserDatas) : [];
  });

  //if we use localStorage then useEffect must be needed
  useEffect(() => {
    // Save the userData to localStorage whenever it changes
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]); // Runs every time userData changes

  let getData = (event) => {
    let oldFormData = {...formData};
    let inputName = event.target.name;
    let inputValue = event.target.value;
    oldFormData[inputName] = inputValue;
    setFormData(oldFormData);
  }

  let handleSubmit = (event) => {
    event.preventDefault();
    if (formData.uname === "" && formData.uemail === "" && formData.uphone === "" && formData.umessage === ""){
      toast.error("Please enter a value first");
    }
    else{
      if (formData.index === ""){
        let checkUserFilter = userData.filter((v) => v.uemail === formData.uemail || v.uphone === formData.uphone);

        if (checkUserFilter.length > 0){
          toast.error("email or phone number already exists");
        }
        else{
          let oldFormData = {
            uname: formData.uname,
            uemail: formData.uemail,
            uphone: formData.uphone,
            umessage: formData.umessage,
          }

          setFormData({
            uname: '',
            uemail: '',
            uphone: '',
            umessage: '',
            index: ''
          });

          let oldUserData = [...userData, oldFormData];
          setUserData(oldUserData);
          toast.success("New Data Added Successfully");
        }
      }
      else{
        let editIndex = formData.index;
        let checkUserFilter = userData.filter((v, i) => (v.uemail === formData.uemail || v.uphone === formData.uphone) && (i !==editIndex));

        if (checkUserFilter.length > 0){
          toast.error("email or phone number already exists");
        }
        else{
          // let oldUserData = userData;
          // oldUserData[editIndex]['uname'] = formData.uname;
          // oldUserData[editIndex]['uemail'] = formData.uemail;
          // oldUserData[editIndex]['uphone'] = formData.uphone;
          // oldUserData[editIndex]['umessage'] = formData.umessage;
          // setUserData(oldUserData);

          let updatedUserData = userData.map((item, index) => {
            if (index === editIndex) {
              return {
                uname: formData.uname,
                uemail: formData.uemail,
                uphone: formData.uphone,
                umessage: formData.umessage
              };
            }
            return item;
          });
  
          setUserData(updatedUserData);

          setFormData({
            uname: '',
            uemail: '',
            uphone: '',
            umessage: '',
            index: ''
          });

          toast.success("Updated Successfully");
        }
      }
    }
  }

  let deleteUserData = (currentId) => {
    let newUserData = userData.filter((v, i) => i !== currentId);
    setUserData(newUserData);
    toast.success("Successfully Deleted");
  }

  let editUserData = (indexNumber) => {
    let currentUserData = userData.filter((v, i) => i === indexNumber);
    if (currentUserData.length > 0){
      setFormData(
        {
          uname: currentUserData[0].uname,
          uemail: currentUserData[0].uemail,
          uphone: currentUserData[0].uphone,
          umessage: currentUserData[0].umessage,
          index: indexNumber
        }
      );
    }
    
  }

  return (
    <>
      <ToastContainer />
      <div className="container mt-3">
        <div className="row g-5">
          <div className="col-12 text-center">
            <h1 className="text-light">Enquiry System</h1>
          </div>
          <div className="col-4">
            <div className="enquiry_form">
              <h2>Enquiry Form</h2>
              <form onSubmit={handleSubmit}>
                <label htmlFor="name" className="mt-1">Name</label>
                <input type="text" name="uname" id="name" onChange={getData} value={formData.uname} placeholder="Enter your name" className="form-control" />

                <label htmlFor="email" className="mt-1">Email</label>
                <input type="text" name="uemail" id="email" onChange={getData} value={formData.uemail} placeholder="Enter your email" className="form-control" />

                <label htmlFor="phone" className="mt-1">Phone</label>
                <input type="text" name="uphone" id="phone" onChange={getData} value={formData.uphone} placeholder="Enter your phone" className="form-control" />

                <label htmlFor="message" className="mt-1">Message</label>
                <textarea className="form-control" name="umessage" id="message" onChange={getData} value={formData.umessage} rows="3" placeholder="Enter your message" />

                <button type="submit" className="btn btn-primary mt-4">
                  {
                    formData.index !== '' ? 'Update' : 'Save'
                  }
                </button>
              </form>
            </div>
          </div>

          <div className="col-8">
            {
              userData.length > 0
              ?
              (
              <div className="table_part">
                <table className="table-hover">
                  <thead>
                    <tr class="table-header">
                      <th className="cell">S.no</th>
                      <th className="cell">Name</th>
                      <th className="cell">Email</th>
                      <th className="cell">Phone No.</th>
                      <th className="cell">Message</th>
                      <th width="140px" className="cell">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.map((v, i) => {
                      return(
                        <tr key={i}>
                          <td>{i+1}</td>
                          <td>{v.uname}</td>
                          <td>{v.uemail}</td>
                          <td>{v.uphone}</td>
                          <td>{v.umessage}</td>
                          <td width="140px">
                            <button onClick={()=>editUserData(i)} className="btn btn-primary">Edit</button>
                            <button onClick={()=>deleteUserData(i)} className="btn btn-danger ms-2">Delete</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              )
              :
              <div className="table_part text-center">
                <h2>No Data Available</h2>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
