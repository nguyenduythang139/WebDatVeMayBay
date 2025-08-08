import { memo, useState, useEffect } from "react";
import React from "react";
import './style.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

//import icon
import { FaCircleCheck } from "react-icons/fa6";

//import hinh anh


//import duong dan
import { ROUTERS } from "../../../utils/router"

const NotifyPage = () => {

    const navigate = useNavigate();
    const handleClick = (e, path) => {
        e.preventDefault();
        navigate(path);
    }

    //lay thong tin khach hang
    const [userProfile, setUserProfile] = useState({
        TenKH: "",
        SoDienThoai: "",
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const MaTK = localStorage.getItem('MaTK');
                const response = await axios.get(`http://localhost:5000/api/khachhang/${MaTK}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const userData = response.data;
                setUserProfile(userData);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    //lay thong tin VeDienTu
    const [veDienTu, setVeDienTu] = useState({});

    useEffect(() => {
        const fetchVeDienTu = async () => {
            try {
                const token = localStorage.getItem('token');
                const MaTK = localStorage.getItem('MaTK');
                const response = await axios.get(`http://localhost:5000/api/vedientu/${MaTK}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const VeDienTuData = response.data;
                setVeDienTu({ ...VeDienTuData });
            } catch (error) {
                console.error('Error fetching ve dien tu:', error);
            }
        };

        fetchVeDienTu();
    }, []);

    //dinh dang gia tien
    const formatCurrency = (value) => {
        if (typeof value !== 'number') return '0';
        return value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    return (
        <div className="NP-container">
            <div className="NP-container-content">
                <div className="NP-notify">
                    <FaCircleCheck className="Notify-Icon" />
                    <p className="p-1">Chúc mừng đặt vé thành công tại Traveloka.com</p>
                    <p className="p-2">Để xuất vé, quý khách vui long hoàn tất thanh toán trước ngày 10/10/2024</p>
                    <p className="p-3">Xin cảm ơn quý khách đã cho chúng tôi cơ hội được phục vụ!</p>
                    <div className="NP-Order-Information">
                        <div className="top">
                            <p>Thông tin đặt vé</p>
                        </div>
                        <div className="bottom">
                            <div className="row-1">
                                <p>Mã đặt chỗ:</p>
                                <p>{veDienTu.MaDatCho}</p>
                            </div>
                            <div className="row-2">
                                <p>Ngày đặt vé:</p>
                                <p>{moment.utc(veDienTu.NgayDatVe).format('DD/MM/YYYY')}</p>
                            </div>
                            <div className="row-3">
                                <p>Phương thức thanh toán:</p>
                                <p>{localStorage.getItem('PhuongThucTT')}</p>
                            </div>
                            <div className="row-4">
                                <p>Số tiền thanh toán:</p>
                                <p>{formatCurrency(parseFloat(localStorage.getItem('TongTien')))} VND</p>
                            </div>
                            <div className="row-5">
                                <p>Họ tên người đặt:</p>
                                <p>{userProfile.TenKH}</p>
                            </div>
                            <div className="row-6">
                                <p>Số điện thoại:</p>
                                <p>{userProfile.SDT}</p>
                            </div>
                        </div>
                    </div>
                    <div className="Button-buy-ticket">
                        <a href={ROUTERS.USER.HomePage} onClick={(e) => handleClick(e, ROUTERS.USER.HomePage)}>Đặt vé mới</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(NotifyPage);