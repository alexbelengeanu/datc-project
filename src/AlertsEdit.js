import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const UserEdit = () => {
    const { alertId } = useParams();

    //const [alertData, alertDatachange] = useState({});

    useEffect(() => {
        fetch("https://localhost:7019/Alerts/" + alertId).then((res) => {
            return res.json();
        }).then((resp) => {
            alertChange(resp.alert);
            statusChange(resp.status);
            descriptionChange(resp.description);
            addressChange(resp.address);
          
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    const[alert,alertChange]=useState("");
    const[status,statusChange]=useState("");
    const[description,descriptionChange]=useState("");
    const[address,addressChange]=useState("");
    const[validation,valChange]=useState(false);


    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const alertData={alert,status,description,address};
      

      fetch("https://localhost:7019/Alerts/"+alertId,{
        method:"PUT",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(alertData)
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
                            <h2>Alerts Edit</h2>
                        </div>
                        <div className="card-body">

                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Alert</label>
                                        <input value={alert} onMouseDown={e=>valChange(true)} onChange={e=>alertChange(e.target.value)}  className="form-control"></input>
                                        {alert.length===0 && validation && <span className="text-danger">Enter the alert</span>}
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Status</label>
                                        <input required value={status} onMouseDown={e=>valChange(true)} onChange={e=>statusChange(e.target.value)} className="form-control"></input>
                                    {status.length===0 && validation && <span className="text-danger">Enter the status</span>}
                                    </div>
                                </div> 
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Description</label>
                                        <input required value={description} onMouseDown={e=>valChange(true)} onChange={e=>descriptionChange(e.target.value)} className="form-control"></input>
                                    {description.length===0 && validation && <span className="text-danger">Enter the description</span>}
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Address</label>
                                        <input required value={address} onMouseDown={e=>valChange(true)} onChange={e=>addressChange(e.target.value)} className="form-control"></input>
                                    {address.length===0 && validation && <span className="text-danger">Enter the address</span>}
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