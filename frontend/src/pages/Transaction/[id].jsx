import {useParams} from 'react-router-dom';

import axios from "axios";
import React from "react";

const TransactionShow = () => {
    const { id } = useParams();
    const [transaction, setTransaction] = React.useState();
    const [imagePayment, setImagePayment] = React.useState();

    React.useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/transactions/${id}`).then((response) => {
            console.log(response.data);
            setTransaction(response.data);
        })
    });

    if (!transaction) return null;
    
    let onFileChange = async (e) => {
        e.preventDefault();
        
        let files = e.target.files;
        let fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);
 
        fileReader.onload = (event) => {
            setImagePayment(event.target.result);
        }
    }

    return (
        <>
        {/* {transaction.id} */}
        {/* <form action="" method="post">
            {imagePayment}
        <div className="form-group mb-3">
                    <label className="text-white">Select File</label>
                    <input type="file" className="form-control" name="image" onChange={(e) => onFileChange(e)} />
                </div>
                
                <div className="d-grid">
                   <button type="submit" className="btn btn-outline-primary">Store</button>
                </div>
        </form> */}
        </>
    )

}

export default TransactionShow;