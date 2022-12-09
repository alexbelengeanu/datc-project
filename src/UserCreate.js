import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserCreate = () => {

    const[username,usernameChange]=useState("");
    const[password,passwordChange]=useState("");
    const[name,nameChange]=useState("");
    const[email,emailChange]=useState("");
    const[age,ageChange]=useState("");
    const[role,roleChange]=useState(true);
   const[validation,valchange]=useState(false);


    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const empdata={username,password,name,email,age,role};
      

      fetch("https://localhost:7019/Login/all",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(empdata)
      }).then((res)=>{
        alert('Saved successfully.')
        navigate('/');
      }).catch((err)=>{
        console.log(err.message)
      })

    }

    return (
        <div>

            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>

                        <div className="card" style={{"textAlign":"left"}}>
                            <div className="card-title">
                                <h2>User Create</h2>
                            </div>
                            <div className="card-body">

                                <div className="row">

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Username</label>
                                            <input value={username} onChange={e=>usernameChange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input value={password} onChange={e=>passwordChange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input required value={name} onMouseDown={e=>valchange(true)} onChange={e=>nameChange(e.target.value)} className="form-control"></input>
                                        {name.length=0 && validation && <span className="text-danger">Enter the name</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input value={email} onChange={e=>emailChange(e.target.value)} className="form-control"></input>
                                            {email.length=0 && validation && <span className="text-danger">Enter the email</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Age</label>
                                            <input value={age} onChange={e=>ageChange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-check">
                                        <input checked={role} onChange={e=>roleChange(e.target.checked)} type="checkbox" className="form-check-input"></input>
                                            <label  className="form-check-label">Admin</label>
                                            
                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                           <button className="btn btn-success" type="submit">Save</button>
                                           <Link to="/" className="btn btn-danger">Back</Link>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default UserCreate;