import React from "react";
import { memo, useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

// import icon
import { IoIosArrowDown } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { MdAirplaneTicket } from "react-icons/md";
import { FaPlaneDeparture } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { PiSignOutFill } from "react-icons/pi";

// import hinh anh
import vietnam_flag from "../../../../images/vietnam_flag.png";
import discount from "../../../../images/discount.png";

// import duong dan
import { ROUTERS } from "../../../../utils/router";

const Header = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);

    const handleClick = (e, path) => {
        e.preventDefault();
        navigate(path);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");

        if (token) {
            setIsLoggedIn(true);
            setUsername(username || "");
        }
        setLoading(false);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        setUsername("");
        navigate(ROUTERS.USER.HomePage);
    };

    if (loading) {
        return null;
    }


    return (
        <div className="header-container">
            <div className="header-container-content">
                <div className="header-top">
                    <div className="header-top-left">
                        <a href={ROUTERS.USER.HomePage} onClick={(e) => handleClick(e, ROUTERS.USER.HomePage)}>
                            <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/9/97f3e7a54e9c6987283b78e016664776.svg" alt="Logo" />
                        </a>
                    </div>
                    <div className="header-top-right">
                        <ul>
                            <li><img src={vietnam_flag} alt="Vietnam Flag" />VI | VND <i><IoIosArrowDown /></i></li>
                            <li><a href={ROUTERS.USER.VoucherPage} onClick={(e) => handleClick(e, ROUTERS.USER.VoucherPage)}> <img src={discount} alt="Discount" />Khuyến mãi</a></li>
                            <li><a href={ROUTERS.USER.ContactPage} onClick={(e) => handleClick(e, ROUTERS.USER.ContactPage)}>Hỗ trợ</a></li>
                            <li><a href={ROUTERS.ADMIN.VoucherTable} onClick={(e) => handleClick(e, ROUTERS.ADMIN.VoucherTable)} >Khu vực admin</a></li>
                            {!isLoggedIn ? (
                                <>
                                    <li><a href={ROUTERS.USER.LogInPage} onClick={(e) => handleClick(e, ROUTERS.USER.LogInPage)}><button>Đăng nhập</button></a><i><IoPerson /></i></li>
                                    <li><a href={ROUTERS.USER.RegisterPage} onClick={(e) => handleClick(e, ROUTERS.USER.RegisterPage)}><button>Đăng ký</button></a></li>
                                </>
                            ) : (
                                <li className="li-6">
                                    <div className="User-Area">
                                        <a href={ROUTERS.USER.ProfilePage} onClick={(e) => handleClick(e, ROUTERS.USER.ProfilePage)} className="UserAreaIcon"><FaUserCircle className="User-Area-Icon" /></a>
                                        <a href={ROUTERS.USER.ProfilePage} onClick={(e) => handleClick(e, ROUTERS.USER.ProfilePage)} className="UserName">{username}</a>
                                    </div>
                                    <div className="User-Area-Sign-Out">
                                        <p onClick={handleLogout}>Đăng xuất</p>
                                        <PiSignOutFill className="Sign-Out-Icon" />
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="header-bottom">
                    <ul>
                        <li><i><MdAirplaneTicket /></i><a href={ROUTERS.USER.HomePage} onClick={(e) => handleClick(e, ROUTERS.USER.HomePage)}>Vé máy bay</a></li>
                        <li><i><FaPlaneDeparture /></i><a href={ROUTERS.USER.AirlineInformationPage} onClick={(e) => handleClick(e, ROUTERS.USER.AirlineInformationPage)}>Hãng hàng không</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default memo(Header);