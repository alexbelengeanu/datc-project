import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios"
const UserEdit = () => {
    const { userId } = useParams();

    //const [userData, userDatachange] = useState({});

    useEffect(() => {
        axios.get(`https://localhost:7019/Login /${userId}`).then((res) => {
            return res.json();
        }).then((resp) => {
            usernameChange(resp.username);
            nameChange(resp.nume);
            emailChange(resp.email);
            varstaChange(resp.varsta);
            rolChange(resp.rol);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    const[username,usernameChange]=useState("");
    const[name,nameChange]=useState("");
    const[email,emailChange]=useState("");
    const[varsta,varstaChange]=useState("");
    const[rol,rolChange]=useState(true);
    const[validation,valChange]=useState(false);


    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const userData={username,name,email,varsta,rol};
      

      axios.put(`https://localhost:7019/Login/${userId}`, userData).then(navigate("/"))
      .then((res)=>{
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
                            <h2>Users Edit</h2>
                        </div>
                        <div className="card-body">

                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input value={usernameChange} onMouseDown={e=>valChange(true)} onChange={e=>usernameChange(e.target.value)} className="form-control"></input>
                                        {username.length===0 && validation && <span className="text-danger"></span>}
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input required value={name} onMouseDown={e=>valChange(true)} onChange={e=>nameChange(e.target.value)} className="form-control"></input>
                                    {name.length===0 && validation && <span className="text-danger">Enter the name</span>}
                                    </div>
                                </div> 
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input required value={email} onMouseDown={e=>valChange(true)} onChange={e=>emailChange(e.target.value)} className="form-control"></input>
                                    {name.length===0 && validation && <span className="text-danger">Enter the email</span>}
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Age</label>
                                        <input value={varsta} onChange={e=>varstaChange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                  
                                <div className="col-lg-12">
                                    <div className="form-check">
                                    <input checked={rol} onChange={e=>rolChange(e.target.checked)} type="checkbox" className="form-check-input"></input>
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
 
export default UserEdit;