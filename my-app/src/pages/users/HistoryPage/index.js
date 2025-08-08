import React from "react";
import { memo, useState, useEffect } from "react";
import './style.css';
import axios from "axios";
import moment from 'moment';
import { useNavigate } from "react-router-dom";

//import icon
import { CgProfile } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { BsAirplaneEnginesFill } from "react-icons/bs";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { TbPointFilled } from "react-icons/tb";

//import hinh anh
import LSDC_icon from "../../../images/LSDC_icon.png";
import TKCN_icon from "../../../images/TKCN_icon.png";
import DX_icon from "../../../images/DX_icon.png";
import { ROUTERS } from "../../../utils/router";
import AIP_vietnamair from "../../../images/AIP-vietnamair.png";
import DHV from "../../../images/DHV.png";
import DL from "../../../images/DLCS.png";

const HistoryPage = () => {

    const navigate = useNavigate();

    const handleClick = (e, path) => {
        e.preventDefault();
        navigate(path);
    }

    //lay thong lich su dat ve
    const [LSDV, setLSDV] = useState([]);

    useEffect(() => {
        const fetchLSDV = async () => {
            try {
                const token = localStorage.getItem('token');
                const MaTK = localStorage.getItem('MaTK');
                const response = await axios.get(`http://localhost:5000/api/lichsudatve/${MaTK}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const lsdvData = response.data;
                setLSDV(Array.isArray(lsdvData) ? lsdvData : []);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchLSDV();
    }, []);

    return (
        <div className="HSP-container">
            <div className="HSP-container-content">
                <div className="HSP-container-content-left">
                    <div className="row-1">
                        <div className="left">
                            <div className="Profile-Icon">
                                <CgProfile className="ProfileIcon" />
                            </div>
                        </div>
                        <div className="right">
                            <p>Tài khoản cá nhân:</p>
                            <p className="BookerFullName">{localStorage.getItem('TenKH')}</p>
                        </div>
                    </div>
                    <div className="row-2">
                        <div className="LSDC">
                            <img src={LSDC_icon} alt="LSDC Icon" />
                            <p>Lịch sử đặt chỗ</p>
                        </div>
                    </div>
                    <div className="row-3">
                        <div className="TKCN">
                            <img src={TKCN_icon} alt="TKCN Icon" />
                            <a href={ROUTERS.USER.ProfilePage} onClick={(e) => handleClick(e, ROUTERS.USER.ProfilePage)}>Tài khoản</a>
                        </div>
                    </div>
                </div>
                <div className="HSP-container-content-right">
                    <div className="row-1">
                        <i id="icon_plane"><BsAirplaneEnginesFill /></i>
                        <h2>Vé máy bay</h2>
                    </div>
                    <div className="row-2">
                        {Array.isArray(LSDV) && LSDV.map((LSDV) => (
                            <div className="History-Ticket">
                                <div className="row-1">
                                    <p className="StartingPlace">{LSDV.DiemKH}</p>
                                    <i id="icon_arrow_right"><MdOutlineArrowRightAlt /></i>
                                    <p className="EndingPlace">{LSDV.DiemDen}</p>
                                </div>
                                <div className="row-2">
                                    <p className="StartingDate">Ngày khời hành: {moment.utc(LSDV.NgayKH).format('DD/MM/YYYY')}</p>
                                    <p className="EndingDate">Ngày đến: {moment.utc(LSDV.NgayDen).format('DD/MM/YYYY')}</p>
                                </div>
                                <div className="row-3">
                                    <div className="left">
                                        <img src={AIP_vietnamair} />
                                        <p className="AirlineName">{LSDV.TenHHK}</p>
                                        <i><TbPointFilled /></i>
                                        <p className="SeatClass">{LSDV.HangGhe}</p>
                                    </div>
                                    <div className="right">
                                        <p>Mã đặt chỗ: {LSDV.MaDatCho}</p>
                                        <p>Ngày đặt chỗ: {moment.utc(LSDV.NgayDatVe).format('DD/MM/YYYY')}</p>
                                    </div>
                                </div>
                                <div className="row-4">
                                    <div className="col-1">
                                        <p className="StartingTime">{moment.utc(LSDV.GioKH).format('HH:mm')}</p>
                                        <p className="StartingPlaceID">{LSDV.MaDiemKH}</p>
                                    </div>
                                    <div className="col-2">
                                        <p className="FlightHours">{LSDV.SoGioBay}</p>
                                        <div className="icon">
                                            <div className="circle-1"></div>
                                            <div className="straight"></div>
                                            <div className="circle-2"></div>
                                        </div>
                                        <p className="StopPointQuantity">{LSDV.SoDiemDung} điểm dừng</p>
                                    </div>
                                    <div className="col-3">
                                        <p className="EndingTime">{moment.utc(LSDV.GioDen).format('HH:mm')}</p>
                                        <p className="EndingPlaceID">{LSDV.MaDiemDen}</p>
                                    </div>
                                </div>
                                <div className="row-5">
                                    <img src={DHV} />
                                    <p className="TTHV">{LSDV.ThongTinHV}</p>
                                </div>
                                <div className="row-6">
                                    <img src={DL} />
                                    <p className="TTDL">{LSDV.ThongTinDL}</p>
                                </div>
                                <div className="row-7">
                                    <a href="">Đổi lịch</a>
                                    <a href="">Hoàn vé</a>
                                    <a href="">Xuất vé điện tử</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(HistoryPage);