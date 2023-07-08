import {useParams} from 'react-router-dom';
import parse from 'html-react-parser';
import { useNavigate  } from "react-router-dom";

import axios from "axios";
import React from "react";

const DetailGame = () => {
    const navigateTo = useNavigate();
    const { id } = useParams();
    const [token, setToken] = React.useState(localStorage.getItem("accessToken"));
    const [profile, setProfile] = React.useState();
    const [game, setGame] = React.useState();
    const [vouchers, setVouchers] = React.useState();

    const [voucherPrice, setVoucherPrice] = React.useState(0);
    const [discountPrice, setDiscountPrice] = React.useState(0);

    const [voucherId, setVoucherId] = React.useState();
    const [discountId, setDiscountId] = React.useState();

    const [message, setMessage] = React.useState();
    
    React.useEffect(() => {
        // Get detail profile
        axios.get(`${import.meta.env.VITE_BASE_URL}/profile`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setProfile(res.data.data);
            });

        // Get detail game
        axios.get(`${import.meta.env.VITE_BASE_URL}/games/${id}`).then((response) => {
            setGame(response.data);
        });

        // Get related voucher by game
        axios.get(`${import.meta.env.VITE_BASE_URL}/vouchers/by-game-id/${id}`).then((res) => {
            setVouchers(res.data);
        })
    }, []);
  
    if (!game) return null;
    if (!vouchers) return null;

    let changeVoucherId = async (voucher) => {
        const {price, discountPrice} = calculatePrice(voucher);

        setVoucherId(voucher.id);

        if (voucher.discounts != null && voucher.discounts.length > 0) {
            const discount = voucher.discounts[0];
            
            setDiscountId(discount.id);
        }
        
        setVoucherPrice("RP " + price);
        setDiscountPrice("RP " + discountPrice);
    }

    let handleSubmit = async (e) => {
        e.preventDefault();

        const orderData = {
            voucherId: voucherId,
            discountId: discountId
        };

        const token = localStorage.getItem('accessToken');
        
        const transaction = await axios.post(`${import.meta.env.VITE_BASE_URL}/transactions`, orderData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        const transactionId = transaction.data.data.id;
        axios.post(`${import.meta.env.VITE_BASE_URL}/transactions/send-invoice/${transactionId}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            setMessage('Something error while create a new transaction');
        })

        navigateTo('/transactions', {replace: true});
    }

    function calculatePrice(voucher) {
        let price = 0;
        let discountPrice = 0;

        if (voucher.discounts != null && voucher.discounts.length > 0) {
            const discount = voucher.discounts[0];

            if (discount.type == 'Price') {
                discountPrice = discount.value;
            } else {
                discountPrice = (voucher.price * discount.value) / 100;
            }

            price = voucher.price - discountPrice;
        } else {
            price = voucher.price;
        }

        return {price, discountPrice};
    }

    function convertPrice(voucher) {
        let html = "";
        const {price, discountPrice} = calculatePrice(voucher);

        if (voucher.discounts != null && voucher.discounts.length > 0) {
            html = `<span className="line-through">${voucher.price}</span> ${price} <sup> -${discountPrice}</sup>`;
        } else {
            html = `<span>${price}</span>`;
        }
        
        return html;
    }
    
    return (
        <div className="card-best-seller mt-3 md:mt-6 max-w-screen-xl mx-auto">
            <div className="grid grid-rows-2 grid-cols-2 gap-4">
                <div>
                    <div className="flex flex-col gap-4">
                        <img src={game.data.image} alt="" className='w-72 object-cover' />
                        <p className='text-white text-justify'>{game.data.description}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className='card-games p-3 text-white transition-all duration-100 ease-linear border-[1px] border-secondary rounded-xl'>
                        <div className="flex flex-col gap-4 p-4">
                            <div className="title flex items-center mb-4">
                                <p className="p-2 w-full text-normal text-white font-bold border-2 border-white shadow-xl shadow-secondary">
                                    Account Detail
                                </p>
                                <div className="line h-[1px] w-full border-[1px] border-white"></div>
                            </div>

                            <div>
                                <div className="mb-4">
                                    <label className="block text-grey-darker text-sm font-bold mb-2" for="email">
                                        Nama
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-secondary" id="email" type="text" placeholder="email"
                                        value={profile != null ? profile.name : '-'} readOnly />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-grey-darker text-sm font-bold mb-2" for="email">
                                        Email
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-secondary" id="email" type="email" placeholder="email"
                                        value={profile != null ? profile.email : '-'} readonly />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-grey-darker text-sm font-bold mb-2" for="email">
                                        Gender
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-secondary" id="email" type="text" placeholder="email"
                                        value={profile != null ? profile.gender : '-'} readonly />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-grey-darker text-sm font-bold mb-2" for="email">
                                        Phone Number
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-secondary" id="email" type="text" placeholder="email"
                                        value={profile != null ? profile.phoneNumber : '-'} readonly />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card-games p-3 text-white transition-all duration-100 ease-linear border-[1px] border-secondary rounded-xl">
                        <div className="flex flex-col gap-4 p-4">
                            <div className="title flex items-center mb-4">
                                <p className="p-2 w-full text-normal text-white font-bold border-2 border-white shadow-xl shadow-secondary">
                                    Select Item
                                </p>
                                <div className="line h-[1px] w-full border-[1px] border-white"></div>
                            </div>
                            
                                <div className="w-full mx-auto shadow-md rounded mb-4 flex flex-col">
                                    <div className="grid grid-cols-3 gap-4 mb-4">
                                        {vouchers.data.map((voucher, index) => {
                                            return <>
                                                <span className={"border-2 border-secondary p-4 rounded-xl cursor-pointer text-base transition-colors " + (voucherId == voucher.id ? 'bg-secondary' : '')} 
                                                    onClick={(e) => changeVoucherId(voucher)}>
                                                        ({voucher.name} {voucher.voucherType.name}) Rp { parse(convertPrice(voucher)) }
                                                        {/* { voucher.discounts != null && voucher.discounts.length > 0 ? (<><span className="line-through">{voucher.price}</span> <sup> {voucher.discounts[0].value}</sup></>) : (<span>{ voucher.price }</span>)} */}
                                             
                                                </span>
                                            </>
                                        })}
                                    </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className='card-games p-3 text-white transition-all duration-100 ease-linear border-[1px] border-secondary rounded-xl'>
                        <div className="flex flex-col gap-4 p-4">
                            <div className="title flex items-center mb-4">
                                <p className="p-2 w-full text-normal text-white font-bold border-2 border-white shadow-xl shadow-secondary">
                                    Payment Detail
                                </p>
                                <div className="line h-[1px] w-full border-[1px] border-white"></div>
                            </div>

                            <div>
                                <form onSubmit={handleSubmit}>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-col flex-wrap gap-2">
                                            <label htmlFor="total-price">Total Price</label>
                                            <input type="text" id='total-price' name='total_price' 
                                                className='w-full bg-transparent border-2 border-secondary p-4 rounded-xl text-base transition-colors'
                                                value={voucherPrice} />
                                        </div>

                                        <div className="flex flex-col flex-wrap gap-2">
                                            <label htmlFor="discount">Discount</label>
                                                <input type="text" id='discount' name='discount' 
                                                    className='w-full bg-transparent border-2 border-secondary p-4 rounded-xl text-base transition-colors'
                                                    value={discountPrice} />
                                        </div>

                                        <div className="my-4 flex justify-end">
                                            <button type="submit" className="btn-hero">
                                                Buy Now!
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailGame;