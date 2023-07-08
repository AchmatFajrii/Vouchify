import { Link, useParams } from "react-router-dom";

import { useNavigate  } from "react-router-dom";

import axios from "axios";
import React from "react";

const TransactionIndex = () => {
    const navigateTo = useNavigate();
    const token = localStorage.getItem("accessToken");
    const [transactions, setTransactions] = React.useState(null);
    const [imagePayment, setImagePayment] = React.useState();
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/transactions/my-transactions?skip=0&take=10`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                setTransactions(res.data);
            });
    }, [transactions]);
    
    if (!transactions) return null;

    let onFileChange = async (e, transactionId) => {
        e.preventDefault();

        setIsLoading(true);
        setImagePayment("");
        
        let files = e.target.files;
        let fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);
 
        fileReader.onload = (event) => {
            let base64Image = "";
            base64Image = event.target.result.split(";");
            base64Image = base64Image[1].split(",");
            console.log(event.target.result);
            
             setImagePayment(base64Image[1]);
             
             axios.put(`${import.meta.env.VITE_BASE_URL}/transactions/confirmation/`+transactionId, {
                 image: base64Image,
              }, { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
                 console.log(res)
              }).then((res) => {
                 console.log(res);
              });
        }
        console.log(imagePayment);

         setIsLoading(false);
        //  navigateTo(0)
    }

    return (
        <div className="card-best-seller mt-3 md:mt-6 max-w-screen-xl mx-auto border-x border-t">
            <table className="table-auto w-full text-white">
                <thead class="border-b">
                    <tr class="bg-transparent">
                        <th className="px-4 text-left">Transaction Number</th>
                        <th className="px-4 text-left">Price</th>
                        <th className="px-4 text-left">Transaction Date</th>
                        <th className="px-4 text-left">Status</th>
                        <th className="px-4 text-left">Confirmation</th>
                    </tr>
                </thead>

                <tbody>
                    {transactions.data.map((transaction, index) => {
                        return (
                            <>
                                <tr className="border-b border-white">
                                    <td className="border-r border-white text-left px-4">{transaction.transactionNumber}</td>
                                    <td className="border-r border-white text-left px-4">{transaction.price - (transaction.discount ?? 0)}</td>
                                    <td className="border-r border-white text-left px-4">{transaction.createdAt}</td>
                                    <td className="border-r border-white text-left px-4">{transaction.status}</td>
                                    <td className="border-r border-white text-left px-4">
                                        {transaction.status == 'Waiting'
                                            ? <input type="file" className="form-control" name="image" onChange={(e) => onFileChange(e, transaction.id)} />
                                            : <div>-</div>
                                        }
                                    </td>
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TransactionIndex;