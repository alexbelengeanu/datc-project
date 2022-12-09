import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AxiosServices from "./services/AxiosServices" ;

import axios from "axios"
const UserDetail = () => {
    const { userId } = useParams();

    const [userData, userDataChange] = useState({});

    useEffect(() => {
        alert(userId + "ID ul este acesta")
        axios.get(`https://localhost:7019/Login/${userId}`).then((res) => {
            return res.json();
        }).then((resp) => {
            userDataChange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);
    return (
        <div>
            {/* <div className="row">
                <div className="offset-lg-3 col-lg-6"> */}

               <div className="container">
                
            <div className="card row" style={{ "textAlign": "left" }}>
                <div className="card-title">
                    <h2>User Details</h2>
                </div>
                <div className="card-body"></div>

                {userData &&
                    <div>
                        <h2>Username : <b>{userData.username}</b> </h2>
                        <h5>Age  : {userData.varsta}</h5>
                        
                        <Link className="btn btn-danger" to="/">Back to Listing</Link>
                    </div>
                }
            </div>
            </div>
            {/* </div>
            </div> */}
        </div >
    );
}

export default UserDetail;