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

//import hinh anh
import LSDC_icon from "../../../images/LSDC_icon.png";
import TKCN_icon from "../../../images/TKCN_icon.png";
import DX_icon from "../../../images/DX_icon.png";

// import duong dan
import { ROUTERS } from "../../../utils/router";

const ProfilePage = () => {
    // State để mở đóng input giới tính
    const [openBookerCharacter, setOpenBookerCharacter] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    const handleClick = (e, path) => {
        e.preventDefault();
        navigate(path);
    }

    //lay thong tin khach hang
    const [userProfile, setUserProfile] = useState({
        MaKH: "",
        TenKH: "",
        GioiTinh: "",
        NgaySinh: "",
        DiaChi: "",
        SoDienThoai: "",
        Email: ""
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
                const formattedNgaySinh = moment(userData.NgaySinh).format('YYYY-MM-DD');
                setUserProfile({ ...userData, NgaySinh: formattedNgaySinh });
                localStorage.setItem('MaKH', userData.MaKH)
                localStorage.setItem('TenKH', userData.TenKH)
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    //luu thong tin chinh sua
    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            const MaTK = localStorage.getItem('MaTK');
            const updatedProfile = {
                ...userProfile,
                NgaySinh: moment(userProfile.NgaySinh).format('YYYY-MM-DD')
            };

            await axios.put(`http://localhost:5000/api/khachhang/${MaTK}`, updatedProfile, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating user profile:', error);
        }
    };

    return (
        <div className="PP-container">
            <div className="PP-container-content">
                <div className="pp-container-content-left">
                    <div className="row-1">
                        <div className="left">
                            <div className="Profile-Icon">
                                <CgProfile className="ProfileIcon" />
                            </div>
                        </div>
                        <div className="right">
                            <p>Tài khoản cá nhân:</p>
                            <p className="BookerFullName">{userProfile.TenKH}</p>
                        </div>
                    </div>
                    <div className="row-2">
                        <div className="LSDC">
                            <img src={LSDC_icon} alt="LSDC Icon" />
                            <a href={ROUTERS.USER.HistoryPage} onClick={(e) => handleClick(e, ROUTERS.USER.HistoryPage)}>Lịch sử đặt chỗ</a>
                        </div>
                    </div>
                    <div className="row-3">
                        <div className="TKCN">
                            <img src={TKCN_icon} alt="TKCN Icon" />
                            <p>Tài khoản</p>
                        </div>
                    </div>
                </div>
                <div className="pp-container-content-right">
                    <div className="row-1">
                        <p>Dữ liệu cá nhân</p>
                        <CiEdit className="Edit-Icon" onClick={() => setIsEditing(!isEditing)} />
                    </div>
                    <div className="row-2">
                        <div className="row-1">
                            <p>Tên đầy đủ</p>
                            <div className="Booker-Full-Name">
                                <input
                                    type='text'
                                    className="BookerFullName"
                                    name="TenKH"
                                    placeholder="Họ và tên"
                                    value={userProfile.TenKH}
                                    onChange={(e) => setUserProfile({ ...userProfile, TenKH: e.target.value })}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                        <div className="row-2">
                            <div className="left">
                                <p>Giới tính</p>
                                <div className="Booker-Character">
                                    <div className="top" onClick={() => setOpenBookerCharacter(!openBookerCharacter)}>
                                        <p>{userProfile.GioiTinh}</p>
                                        <i><IoIosArrowDown /></i>
                                    </div>
                                    {openBookerCharacter && (
                                        <div className="bottom open">
                                            <div className="BookerCharacter">
                                                <input
                                                    type='radio'
                                                    id="Nam"
                                                    name="GioiTinh"
                                                    value="Nam"
                                                    checked={userProfile.GioiTinh === "Nam"}
                                                    onChange={(e) => setUserProfile({ ...userProfile, GioiTinh: e.target.value })}
                                                    disabled={!isEditing}
                                                />
                                                <label htmlFor="Nam">Nam</label>
                                            </div>
                                            <div className="BookerCharacter">
                                                <input
                                                    type='radio'
                                                    id="Nữ"
                                                    name="GioiTinh"
                                                    value="Nữ"
                                                    checked={userProfile.GioiTinh === "Nữ"}
                                                    onChange={(e) => setUserProfile({ ...userProfile, GioiTinh: e.target.value })}
                                                    disabled={!isEditing}
                                                />
                                                <label htmlFor="Nữ">Nữ</label>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="right">
                                <p>Ngày sinh</p>
                                <div className="Booker-Date">
                                    <input
                                        type="date"
                                        className="BookerDate"
                                        name="NgaySinh"
                                        value={userProfile.NgaySinh}
                                        onChange={(e) => setUserProfile({ ...userProfile, NgaySinh: e.target.value })}
                                        disabled={!isEditing}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row-3">
                            <p>Địa chỉ nơi ở</p>
                            <div className="Booker-Address">
                                <input
                                    type="text"
                                    className="BookerAddress"
                                    name="DiaChi"
                                    placeholder="Địa chỉ nơi ở"
                                    value={userProfile.DiaChi}
                                    onChange={(e) => setUserProfile({ ...userProfile, DiaChi: e.target.value })}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                        <div className="row-4">
                            <p>Số điện thoại</p>
                            <div className="Booker-Phone-Number">
                                <input
                                    type="text"
                                    className="BookerPhoneNumber"
                                    name="SoDienThoai"
                                    placeholder="Số điện thoại"
                                    value={userProfile.SDT}
                                    onChange={(e) => setUserProfile({ ...userProfile, SoDienThoai: e.target.value })}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                        <div className="row-5">
                            <p>Email</p>
                            <div className="Booker-Email">
                                <input
                                    type="email"
                                    className="BookerEmail"
                                    name="Email"
                                    placeholder="Email"
                                    value={userProfile.Email}
                                    onChange={(e) => setUserProfile({ ...userProfile, Email: e.target.value })}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                        {isEditing && (
                            <div className="row-6">
                                <p className="Button-save-edit-profile" onClick={handleSave}>Lưu</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(ProfilePage);