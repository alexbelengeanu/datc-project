import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserCreate = () => {

    const[alert,alertChange]=useState("");
    const[status,statusChange]=useState("");
    const[description,descriptionChange]=useState("");
    const[addresss,addresssChange]=useState("");
    const[validation,valChange]=useState(false);


    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const userData={alert,status,description,addresss};
      

      fetch("https://localhost:7019/Alerts/",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(userData)
      }).then((res)=>{
        alert('Saved successfully.')
        navigate('/');
      }).catch((err)=>{
        console.log(err.message)
      })

    }

    return (
        <div>

            <div classdescription="row">
                <div classdescription="offset-lg-3 col-lg-6">
                    <form classdescription="container" onSubmit={handlesubmit}>

                        <div classdescription="card" style={{"textAlign":"left"}}>
                            <div classdescription="card-title">
                                <h2>User Create</h2>
                            </div>
                            <div classdescription="card-body">

                                <div classdescription="row">

                                    <div classdescription="col-lg-12">
                                        <div classdescription="form-group">
                                            <label>alert</label>
                                            <input value={alert} onChange={e=>alertChange(e.target.value)} classdescription="form-control"></input>
                                        </div>
                                    </div>
                                    <div classdescription="col-lg-12">
                                        <div classdescription="form-group">
                                            <label>status</label>
                                            <input value={status} onChange={e=>statusChange(e.target.value)} classdescription="form-control"></input>
                                        </div>
                                    </div>

                                    <div classdescription="col-lg-12">
                                        <div classdescription="form-group">
                                            <label>description</label>
                                            <input required value={description} onMouseDown={e=>valChange(true)} onChange={e=>descriptionChange(e.target.value)} classdescription="form-control"></input>
                                        {description.length=0 && validation && <span classdescription="text-danger">Enter the description</span>}
                                        </div>
                                    </div>

                                    <div classdescription="col-lg-12">
                                        <div classdescription="form-group">
                                            <label>addresss</label>
                                            <input value={addresss} onChange={e=>addresssChange(e.target.value)} classdescription="form-control"></input>
                                            {addresss.length=0 && validation && <span classdescription="text-danger">Enter the addresss</span>}
                                        </div>
                                    </div>

                                    <div classdescription="col-lg-12">
                                        <div classdescription="form-group">
                                           <button classdescription="btn btn-success" type="submit">Save</button>
                                           <Link to="/" classdescription="btn btn-danger">Back</Link>
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