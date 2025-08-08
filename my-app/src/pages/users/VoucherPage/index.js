import { memo, useState, useEffect } from "react";
import React from "react";
import "./style.css"
import axios from 'axios';
import { format } from 'date-fns';

//import icon


//import hinh anh
import Logo_Voucher_1 from "../../../images/Logo_Voucher_1.png";
import Logo_Voucher_2 from "../../../images/VP-voucher-img.png";
import Logo_Voucher_3 from "../../../images/Logo_Voucher_3.png";
import Logo_Voucher_4 from "../../../images/Logo_Voucher_4.png";
import Logo_Voucher_5 from "../../../images/Logo_Voucher_5.png";

const imageMap = {
    'Logo_Voucher_1': Logo_Voucher_1,
    'Logo_Voucher_2': Logo_Voucher_2,
    'Logo_Voucher_3': Logo_Voucher_3,
    'Logo_Voucher_4': Logo_Voucher_4,
    'Logo_Voucher_5': Logo_Voucher_5,
}

const VoucherPage = () => {

    //duyet bang voucher
    const [vouchers, setVouchers] = useState([]);

    useEffect(() => {
        const fetchVouchers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/voucher');
                setVouchers(response.data);
            } catch (error) {
                console.error('Error fetching voucher data:', error);
            }
        };

        fetchVouchers();
    }, []);


    axios.get('/api/voucher')
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Lỗi khi lấy dữ liệu voucher:', error);
        });


    return (
        <div className="VP-container">
            <div className="VP-container-content">
                <div className="VP-vouchers">
                    {vouchers.map((vouchers) => (
                        <div className="VP-voucher">
                            <div className="row-1">
                                <img src={imageMap[vouchers.LogoVoucher]} />
                            </div>
                            <div className="row-2">
                                <div className="top">
                                    <p>Thời gian khuyến mãi</p>
                                </div>
                                <div className="bottom">
                                    <p className="StartingVoucherDate">{format(new Date(vouchers.NgayBatDau), 'dd/MM/yy')} </p>
                                    <p>-</p>
                                    <p className="EnddingVoucherDate"> {format(new Date(vouchers.NgayKetThuc), 'dd/MM/yy')}</p>
                                </div>
                            </div>
                            <div className="row-3">
                                <p className="TittleVoucher">{vouchers.TieuDe}</p>
                                <p>Giới hạn</p>
                            </div>
                            <div className="row-4">
                                <p className="ConditionVoucher">{vouchers.DieuKienSuDung}</p>
                            </div>
                            <div className="row-5">
                                <p className="NameVoucher">{vouchers.TenVoucher}</p>
                                <p>Sao chép</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default memo(VoucherPage);