import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AlertsListing = () => {
    const [alertData, alertDataChange] = useState(null);
    const navigate = useNavigate();

    const LoadDetail = (id) => {
        alert(id + "este acesta")
        navigate("/alert/detail/" + id);
    } 
    const LoadEdit = (id) => {
        navigate("/alert/edit/" + id);
    }
    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch("https://localhost:7019/Alerts/" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully.')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }




    useEffect(() => {
        fetch("https://localhost:7019/Alerts/all").then((res) => {
            return res.json();
        }).then((resp) => {
            alertDataChange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])
    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Alerts Listing</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="alert/create" className="btn btn-success">Add New (+)</Link>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>Alert</td>
                                <td>Status</td>
                                <td>Action</td>
                               
                            </tr>
                        </thead>
                        <tbody>

                            {alertData &&
                                alertData.map(item => (
                                    <tr key={item.partitionKey+"-"+item.rowKey}>
                                        <td>{item.rowKey}</td>
                                        <td>{item.status}</td>
                                        
                                            
                                        <td><a   onClick={() => { LoadEdit(item.partitionKey+"-"+item.rowKey) }} className="btn btn-success">Edit</a>
                                            <a  onClick={() => { Removefunction(item.partitionKey+"-"+item.rowKey) }} className="btn btn-danger">Remove</a>
                                            <a  href={"/alert/detail/"} onClick={() => {  LoadDetail(item.partitionKey+"-"+item.rowKey)}} className="btn btn-primary">Details</a>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}

export default AlertsListing;