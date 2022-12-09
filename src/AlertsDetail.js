import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const AlertsDetail = () => {
    const { alertId } = useParams();
    alert(alertId +"a ajuns aici!!!")
    const [alertData, alertDataChange] = useState({});

    useEffect(() => {
        axios.get(`https://localhost:7019/Alerts/${alertId}`).then((res) => {
          alertDataChange(res.data);
        });
      }, []);
    return (
        <div>
            {/* <div className="row">
                <div className="offset-lg-3 col-lg-6"> */}

               <div className="container">
                
            <div className="card row" style={{ "textAlign": "left" }}>
                <div className="card-title">
                    <h2>Alert Details</h2>
                </div>
                <div className="card-body"></div>

                {alertData && 
                    <div>
                        <h2>Description : <b>{alertData.descriere}</b> </h2>
                        <h2>Address  : <b>{alertData.partitionKey}</b></h2>
                        
                        <Link className="btn btn-danger" to="/">Back to Listing</Link>
                    </div>
                }
            </div>
            </div>
        </div >
    );
}

export default AlertsDetail;