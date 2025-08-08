import { memo, useState } from "react";
import React from "react";
import './style.css';

//import icon
import { IoIosInformationCircle } from "react-icons/io";
import { BsTelephone } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { CiMail } from "react-icons/ci";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";


//import hinh anh
import contact_logo from "../../../images/contact-logo.png";
import logo_vn from "../../../images/logo-vn.png";
import logo_global from "../../../images/global-logo.png";

const ContactPage = () => {

    //hien thi thong tin dien thoai
    const [openPhoneContact, setOpenPhoneContact] = useState(true);

    //hien thi thong tin email
    const [openEmailContact, setOpenEmailContact] = useState(true);

    return (
        <div className="CP-container">
            <div className="CP-container-header">
                <div className="CP-container-header-content">
                    <h1>Liên hệ chúng tôi</h1>
                    <p>Chúng tôi luôn sẵn sàng hỗ trợ, dù bạn ở bất cứ nơi đâu</p>
                </div>
            </div>
            <div className="CP-container-content">
                <div className="row-1">
                    <p>Hỗ trợ khách hàng</p>
                </div>
                <div className="row-2">
                    <p>Xin chào bạn yêu dấu,</p>
                    <h1>Chúng tôi có thể giúp gì cho bạn?</h1>
                </div>
                <div className="row-3">
                    <div className="CP-container-content-left">
                        <div className="row-1">
                            <div className="left">
                                <img src={contact_logo} />
                            </div>
                            <div className="right">
                                <h3>Hãy liên hệ với bộ phận Dịch Vụ Khách Hàng của chúng tôi.</h3>
                            </div>
                        </div>
                        <div className="row-2">
                            <div className="top">
                                <i><IoIosInformationCircle /></i>
                                <p>Giờ hoạt động của Trung tâm chăm sóc khách hàng</p>
                            </div>
                            <div className="bottom">
                                <p>Gọi điện: thứ hai-chủ nhật (từ 8 giờ sáng - 10 giờ tối)</p>
                                <p>Tin nhắn và email: Hoạt động 24/7</p>
                            </div>
                        </div>
                        <div className="row-3">
                            <div className="top" onClick={() => setOpenPhoneContact(!openPhoneContact)}>
                                <div className="left">
                                    <i><BsTelephone /></i>
                                </div>
                                <div className="middle">
                                    <p>Gọi cho bộ phận Chăm sóc khách hàng của chúng tôi</p>
                                    <p>Áp dụng mức cước thông thường</p>
                                </div>
                                <div className="right">
                                    <i><IoIosArrowDown /></i>
                                </div>
                            </div>
                            <div className={`middle ${openPhoneContact ? '' : 'open'}`}>
                                <div className="row-1">
                                    <p>Hãy cung cấp mã đặt chỗ của bạn khi liên hệ với chung tôi để dễ dàng hơn trong việc xử lý.</p>
                                </div>
                                <div className="row-2">
                                    <div className="InformationContact">
                                        <div className="left">
                                            <img src={logo_vn} />
                                        </div>
                                        <div className="right">
                                            <p>1900-6978</p>
                                            <p>Việt Nam Call Center (8 giờ sáng - 10 giờ tối hàng ngày)</p>
                                        </div>
                                    </div>
                                    <div className="InformationContact">
                                        <div className="left">
                                            <img src={logo_global} />
                                        </div>
                                        <div className="right">
                                            <p>+44-2031-399-021</p>
                                            <p>Call Center toàn cầu</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row-4" onClick={() => setOpenEmailContact(!openEmailContact)}>
                            <div className="top">
                                <div className="left">
                                    <i><CiMail /></i>
                                </div>
                                <div className="middle">
                                    <p>Gửi thư điện tử cho bộ phận Chăm sóc khách hàng của chúng tôi</p>
                                </div>
                                <div className="right">
                                    <i><IoIosArrowDown /></i>
                                </div>
                            </div>
                            <div className={`bottom ${openEmailContact ? '' : 'open'}`}>
                                <p>Vui lòng gửi thư điện tử đến bộ phận Chăm sóc khách hàng của chúng tôi tại cs@traveloka.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="CP-container-content-right">
                        <p>Chủ đề phổ biến</p>
                        <div className="CP-questions">
                            <div className="CP-question">
                                <p>Cách đổi lịch vé máy bay</p>
                                <i><MdOutlineKeyboardArrowRight /></i>
                            </div>
                            <div className="CP-question">
                                <p>Cách hủy vé máy bay</p>
                                <i><MdOutlineKeyboardArrowRight /></i>
                            </div>
                            <div className="CP-question">
                                <p>Cách làm thủ tục trực tuyến</p>
                                <i><MdOutlineKeyboardArrowRight /></i>
                            </div>
                            <div className="CP-question">
                                <p>Cách sửa hoặc đổi tên hành khách bay</p>
                                <i><MdOutlineKeyboardArrowRight /></i>
                            </div>
                            <div className="CP-question">
                                <p>Có nên đặt chỗ trực tiếp để đảm bảo an toàn</p>
                                <i><MdOutlineKeyboardArrowRight /></i>
                            </div>
                            <div className="CP-question">
                                <p>Hiển thị thêm</p>
                                <i><MdOutlineKeyboardArrowRight /></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(ContactPage);