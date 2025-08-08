import { memo } from "react";
import React from "react";
import './style.css';

//import icon
import { FaRegHandshake } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";


//import hinh anh
import logo_white from "../../../../images/logo_white.png";
import IATA from "../../../../images/IATA.png";
import BSI from "../../../../images/BSI.png";
import BoCongThuong from "../../../../images/BoCongThuong.png";
import tt1 from "../../../../images/tt1.png";
import tt2 from "../../../../images/tt2.png";
import tt3 from "../../../../images/tt3.png";
import tt4 from "../../../../images/tt4.png";
import tt5 from "../../../../images/tt5.png";
import tt6 from "../../../../images/tt6.png";
import tt7 from "../../../../images/tt7.png";
import tt8 from "../../../../images/tt8.png";
import tt9 from "../../../../images/tt9.png";
import tt10 from "../../../../images/tt10.png";
import tt11 from "../../../../images/tt11.png";
import tt12 from "../../../../images/tt12.png";
import tt13 from "../../../../images/tt13.png";
import tt14 from "../../../../images/tt14.png";
import tt15 from "../../../../images/tt15.png";
import tt16 from "../../../../images/tt16.png";
import tt17 from "../../../../images/tt17.png";
import tt18 from "../../../../images/tt18.png";
import tt19 from "../../../../images/tt19.png";
import tt20 from "../../../../images/tt20.png";
import tt21 from "../../../../images/tt21.png";
import tt22 from "../../../../images/tt22.png";
import tt23 from "../../../../images/tt23.png";
import tt24 from "../../../../images/tt24.png";
import GGPlay from "../../../../images/GGPlay.png";
import AppleStore from "../../../../images/AppleStore.png";

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-container-content">
                <div className="footer-container-content-top">
                    <div className="footer-left">
                        <img src={logo_white} />
                        <div className="footer-left-1">
                            <img src={IATA} />
                            <img src={BSI} />
                            <img src={BoCongThuong} />
                        </div>
                        <div className="footer-left-2">
                            <i><FaRegHandshake /></i><a href="">Hợp tác với Traveloka</a>
                        </div>
                        <p>Đối tác thanh toán</p>
                        <div className="footer-left-3">
                            <img src={tt1} />
                            <img src={tt2} />
                            <img src={tt3} />
                            <img src={tt4} />
                            <img src={tt5} />
                            <img src={tt6} />
                            <img src={tt7} />
                            <img src={tt8} />
                            <img src={tt9} />
                            <img src={tt10} />
                            <img src={tt11} />
                            <img src={tt12} />
                            <img src={tt13} />
                            <img src={tt14} />
                            <img src={tt15} />
                            <img src={tt16} />
                            <img src={tt17} />
                            <img src={tt18} />
                            <img src={tt19} />
                            <img src={tt20} />
                            <img src={tt21} />
                            <img src={tt22} />
                            <img src={tt23} />
                            <img src={tt24} />
                        </div>
                    </div>
                    <div className="footer-right">
                        <div className="footer-right-1">
                            <div className="footer-right-1-top">
                                <ul>
                                    <li><h3>Về Traveloka</h3></li>
                                    <li><a>Cách đặt chỗ</a></li>
                                    <li><a href="">Liên hệ chúng tôi</a></li>
                                    <li><a href="">Trợ giúp</a></li>
                                    <li><a href="">Về chúng tôi</a></li>
                                </ul>
                            </div>
                            <div className="footer-right-1-bottom">
                                <ul>
                                    <li><h3>Theo dõi chúng tôi trên</h3></li>
                                    <li><i><FaFacebook /></i><a href="https://www.facebook.com/TravelokaVN">Facebook</a></li>
                                    <li><i><FaInstagram /></i><a href="https://www.instagram.com/traveloka.vn/">Instagram</a></li>
                                    <li><i><FaTiktok /></i><a href="https://www.tiktok.com/@traveloka.vn">Tiktok</a></li>
                                    <li><i><FaYoutube /></i><a href="https://www.youtube.com/@travelokavn">Youtube</a></li>
                                    <li><i><FaTelegram /></i><a href="https://t.me/travelokavietnamofficial">Telegram</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="footer-right-2">
                            <ul>
                                <li><h3>Sản phẩm</h3></li>
                                <li><a>Vé máy bay</a></li>
                            </ul>
                        </div>
                        <div className="footer-right-3">
                            <ul>
                                <li><h3>Traveloka Affiliate</h3></li>
                                <li><a>Traveloka blog</a></li>
                                <li><a>Chính sách quyền riêng</a></li>
                                <li><a>Điều khoản & Điều kiện</a></li>
                                <li><a>Quy chế hoạt động</a></li>
                                <li><a>Đăng ký nơi nghỉ của bạn</a></li>
                                <li><a>Đăng ký doanh nghiệp hoạt động <br></br> du lịch của bạn</a></li>
                                <li><a>Khu vực báo chí</a></li>
                                <li><a>Vulnerability Disclosure Program</a></li>
                                <li><a>Traveloka blog</a></li>
                            </ul>
                            <h3>Tải ứng dụng traveloke</h3>
                            <img src={GGPlay} /><br></br>
                            <img src={AppleStore} />
                        </div>
                    </div>
                </div>
                <div className="footer-container-content-bottom">
                    <p>Công ty TNHH Traveloka Việt Nam. Mã số DN: 0313581779. Tòa nhà An Phú, 117-119 Lý Chính Thắng, P. 7, Q. 3, TPHCM</p><br></br>
                    <p>Copyright © 2024 Traveloka. All rights reserved</p>
                </div>
            </div>
        </div>
    );
}

export default memo(Footer);