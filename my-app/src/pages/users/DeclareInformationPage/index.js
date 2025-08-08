import { memo, useState, useEffect } from "react";
import React from "react";
import './style.css';
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";

//import icon
import { IoIosArrowDown } from "react-icons/io";
import { BsAirplaneEnginesFill } from "react-icons/bs";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { TbPointFilled } from "react-icons/tb";

//import hinh anh
import AIP_vietjetair from "../../../images/AIP-vietjetair.png";
import AIP_vietnamair from "../../../images/AIP-vietnamair.png";
import AIP_viettravelair from "../../../images/AIP-viettravelair.png";
import AIP_bambooair from "../../../images/AIP-bambooair.png";
import AIP_anaair from "../../../images/AIP-anaair.png";
import AIP_asianaair from "../../../images/AIP-asianaair.png";
import AIP_cathayair from "../../../images/AIP-cathayair.png";
import AIP_cepuair from "../../../images/AIP-cepuair.png";
import AIP_cepupacificair from "../../../images/AIP-cepupacificair.png";
import AIP_chinaair from "../../../images/AIP-chinaair.png";
import AIP_chinasouthernair from "../../../images/AIP-chinasouthernair.png";
import AIP_emirateair from "../../../images/AIP-emirateair.png";
import AIP_etihadair from "../../../images/AIP-etihadair.png";
import AIP_hongkongair from "../../../images/AIP-hongkongair.png";
import AIP_japanair from "../../../images/AIP-japanair.png";
import AIP_koreanair from "../../../images/AIP-koreanair.png";
import AIP_lionair from "../../../images/AIP-lionair.png";
import AIP_malaysiaair from "../../../images/AIP-malaysiaair.png";
import AIP_nokair from "../../../images/AIP-nokair.png";
import AIP_pacificair from "../../../images/AIP-pacificair.png";
import AIP_quatarair from "../../../images/AIP-quatarair.png";
import AIP_scootair from "../../../images/AIP-scootair.png";
import AIP_singaporeair from "../../../images/AIP-singaporeair.png";
import AIP_smileair from "../../../images/AIP-smileair.png";
import AIP_starluxair from "../../../images/AIP-starluxair.png";
import AIP_thaiair from "../../../images/AIP-thaiair.png";

//import duong dan
import { ROUTERS } from "../../../utils/router";

const initFormValue = {
    fullName: "",
    cccd: "",
    birthday: "",
}

const isEmptyValue = (value) => {
    return !value || value.trim().length < 1;
};

const isValidFullName = (value) => {
    return /^[a-zA-Z\s]*$/.test(value);
};

const DeclareInformationPage = () => {
    //mở thanh nhập danh xưng
    const [openWayCall, setOpenWayCall] = useState(false);
    const [selectedWayCall, setSelectedWayCall] = useState("");

    //mở thanh nhập giới tính
    const [openCustomerCharacter, setOpenCustomerCharacter] = useState(false);
    const [selectedCustomerCharacter, setSelectedCustomerCharacter] = useState("");

    //mở thanh nhập quốc tịch
    const [openNationality, setOpenNationality] = useState(false);
    const [selectedNationality, setSelectedNationality] = useState("");

    //lay thong tin khach hang
    const [userProfile, setUserProfile] = useState({
        TenKH: "",
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
                setUserProfile(userData);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    const [formValues, setFormValues] = useState(initFormValue);
    const [formError, setFormError] = useState({});

    const validateForm = () => {
        const error = {};
        if (isEmptyValue(formValues.fullName)) {
            error["fullName"] = "Bắt buộc nhập";
        }

        if (isEmptyValue(formValues.cccd)) {
            error["cccd"] = "Bắt buộc nhập"
        } else if (formValues.cccd.length != 12) {
            error["cccd"] = "Phải đúng 12 ký tự chữ số"
        }

        setFormError(error);

        return Object.keys(error).length === 0;
    }

    const handleChange = (event) => {
        const { value, name } = event.target;
        if (name === 'fullName') {
            const cleanedValue = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            setFormValues({
                ...formValues,
                [name]: cleanedValue,
            });

            if (cleanedValue !== value) {
                setFormError({
                    ...formError,
                    fullName: "Không được nhập dấu"
                });
            } else {
                setFormError({
                    ...formError,
                    fullName: null
                });
            }
        }
        else {
            setFormValues({
                ...formValues,
                [name]: value,
            });
        }

        if (name === 'cccd') {
            const cleanedValue = value.replace(/\D/g, '');
            setFormValues({
                ...formValues,
                [name]: cleanedValue,
            });
            if (cleanedValue.length !== 12 && cleanedValue.length !== 0) {
                setFormError({
                    ...formError,
                    cccd: "Phải có đúng 12 ký tự"
                })
            } else {
                setFormError({
                    ...formError,
                    cccd: null
                });
            }
        }
        else {
            setFormValues({
                ...formValues,
                [name]: value,
            });
        }
    }

    const handleInput = (event) => {
        const { value } = event.target;
        const cleanedValue = value.replace(/\D/g, '');
        event.target.value = cleanedValue;

        setFormValues({
            ...formValues,
            cccd: cleanedValue,
        });
    };

    //duyet ban ve
    const [ve, setVe] = useState({});

    useEffect(() => {
        const fetchVe = async () => {
            try {
                const token = localStorage.getItem('token');
                const MaVe = localStorage.getItem('MaVe');
                if (MaVe && token) {
                    const response = await axios.get(`http://localhost:5000/api/ve/${MaVe}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setVe(response.data);
                } else {
                    console.error('MaVe or token not found in localStorage');
                }
            } catch (error) {
                console.error('Error fetching ve:', error);
            }
        };

        fetchVe();
    }, []);

    //dinh dang hinh anh
    const imageMap = {
        //logo-airline
        'AIP_vietjetair': AIP_vietjetair,
        'AIP_vietnamair': AIP_vietnamair,
        'AIP_bambooair': AIP_bambooair,
        'AIP_viettravelair': AIP_viettravelair,
        'AIP_pacificair': AIP_pacificair,
        'AIP_nokair': AIP_nokair,
        'AIP_scootair': AIP_scootair,
        'AIP_singaporeair': AIP_singaporeair,
        'AIP_malaysiaair': AIP_malaysiaair,
        'AIP_cathayair': AIP_cathayair,
        'AIP_cepupacificair': AIP_cepupacificair,
        'AIP_emirateair': AIP_emirateair,
        'AIP_thaiair': AIP_thaiair,
        'AIP_smileair': AIP_smileair,
        'AIP_chinaair': AIP_chinaair,
        'AIP_etihadair': AIP_etihadair,
        'AIP_hongkongair': AIP_hongkongair,
        'AIP_chinasouthernair': AIP_chinasouthernair,
        'AIP_lionair': AIP_lionair,
        'AIP_quatarair': AIP_quatarair,
        'AIP_koreanair': AIP_koreanair,
        'AIP_japanair': AIP_japanair,
        'AIP_anaair': AIP_anaair,
        'AIP_asianaair': AIP_asianaair,
        'AIP_starluxair': AIP_starluxair,

    }

    //dinh dang gia tien
    const formatCurrency = (value) => {
        if (typeof value !== 'number') return '0';
        return value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    //luu du lieu hanh khach vao local storage
    const navigate = useNavigate();
    const handleClick = (e, path) => {
        e.preventDefault();
        localStorage.setItem('DanhXung', selectedWayCall);
        localStorage.setItem('GioiTinh', selectedCustomerCharacter);
        localStorage.setItem('TenHK', formValues.fullName);
        localStorage.setItem('NgaySinh', formValues.birthday);
        localStorage.setItem('QuocTich', selectedNationality);
        localStorage.setItem('CCCD', formValues.cccd);
        navigate(path);
    }

    return (
        <div className="DIP-container">
            <div className="DIP-container-content">
                <div className="DIP-container-content-left">
                    <div className="row-1">
                        <h2>Đặt chỗ của tôi</h2>
                        <p>Điền thông tin và xem lại đặt chỗ</p>
                    </div>
                    <div className="row-2">
                        <div className="information-booker">
                            <h3>Thông tin liên hệ</h3>
                            <form className="BookerInformation">
                                <div className="row-1">
                                    <p>Thông tin liên hệ (nhận vé/phiếu thanh toán)</p>
                                </div>
                                <div className="row-2">
                                    <div className="top">
                                        <div className="left">
                                            <p>Họ và tên (vd: Nguyen Van A)<span>*</span></p>
                                        </div>
                                        <div className="right">
                                            <p>Điện thoại di động <span>*</span></p>
                                        </div>
                                    </div>
                                    <div className="middle">
                                        <div className="left">
                                            <div className="booker-full-name">
                                                <input type="text" className="BookerFullName" value={userProfile.TenKH} readOnly />
                                            </div>
                                        </div>
                                        <div className="right">
                                            <div className="booker-phone-number">
                                                <input type="text" className="BookerPhoneNumber" value={userProfile.SDT} readOnly />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bottom">
                                        <div className="left">
                                            <p>Như trên CMND (không dấu)</p>
                                        </div>
                                        <div className="right">
                                            <p>VD: 0336971705</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row-3">
                                    <div className="top">
                                        <p>Email<span>*</span></p>
                                    </div>
                                    <div className="middle">
                                        <div className="booker-email">
                                            <input type="email" className="BookerEmail" value={userProfile.Email} readOnly />
                                        </div>
                                    </div>
                                    <div className="bottom">
                                        <p>VD: email@example.com</p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="row-3">
                        <div className="information-customer">
                            <h3>Thông tin hành khách</h3>
                            <form className="CustomerInformation">
                                <div className="row-1">
                                    <p>Khách hàng 1</p>
                                </div>
                                <div className="row-2">
                                    <div className="top">
                                        <div className="left">
                                            <p>Danh xứng<span>*</span></p>
                                        </div>
                                        <div className="right">
                                            <p>Giới tính<span>*</span></p>
                                        </div>
                                    </div>
                                    <div className="middle">
                                        <div className="left">
                                            <div className="way-call" onClick={() => setOpenWayCall(!openWayCall)}>
                                                <div className="left">
                                                    <p>{selectedWayCall ? selectedWayCall : 'Chọn danh xưng'}</p>
                                                </div>
                                                <div className="right">
                                                    <i><IoIosArrowDown /></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="right" onClick={() => setOpenCustomerCharacter(!openCustomerCharacter)}>
                                            <div className="customer-character">
                                                <div className="left">
                                                    <p>{selectedCustomerCharacter ? selectedCustomerCharacter : 'Chọn giới tính'}</p>
                                                </div>
                                                <div className="right">
                                                    <i><IoIosArrowDown /></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bottom">
                                        <div className={`left ${openWayCall ? 'open' : ''}`}>
                                            <ul>
                                                <li onClick={() => { setSelectedWayCall('Ông'); setOpenWayCall(false) }}>Ông</li>
                                                <li onClick={() => { setSelectedWayCall('Bà'); setOpenWayCall(false) }}>Bà</li>
                                                <li onClick={() => { setSelectedWayCall('Cô'); setOpenWayCall(false) }}>Cô</li>
                                                <li onClick={() => { setSelectedWayCall('Chú'); setOpenWayCall(false) }}>Chú</li>
                                            </ul>
                                        </div>
                                        <div className={`right ${openCustomerCharacter ? 'open' : ''}`}>
                                            <ul>
                                                <li onClick={() => { setSelectedCustomerCharacter('Nam'); setOpenCustomerCharacter(false) }}>Nam</li>
                                                <li onClick={() => { setSelectedCustomerCharacter('Nữ'); setOpenCustomerCharacter(false) }}>Nữ</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="row-3">
                                    <div className="top">
                                        <div className="left">
                                            <p>Họ và tên (vd: Nguyen Van A)<span>*</span></p>
                                        </div>
                                        <div className="right">
                                            <p>Ngày sinh<span>*</span></p>
                                        </div>
                                    </div>
                                    <div className="middle">
                                        <div className="left">
                                            <div className="customer-full-name">
                                                <input
                                                    type="text"
                                                    className="CustomerFullName"
                                                    placeholder="Nhập họ và tên"
                                                    name="fullName"
                                                    value={formValues.fullName}
                                                    onChange={handleChange}
                                                    maxLength="50"
                                                />
                                            </div>
                                            {formError.fullName && (
                                                <div className="error-feedback">{formError.fullName}</div>
                                            )}
                                        </div>
                                        <div className="right">
                                            <div className="customer-birth-date">
                                                <input type="date" className="CustomerBirthDate" name="birthday" value={formValues.birthday} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bottom">
                                        <div className="left">
                                            <p>Như trên CMND (không dấu)</p>
                                        </div>
                                        <div className="right">
                                            <p>Như trên CMND, Giấy khai sinh</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row-4">
                                    <div className="top">
                                        <div className="left">
                                            <p>Quốc tịch<span>*</span></p>
                                        </div>
                                        <div className="right">
                                            <p>Căn cước công dân<span>*</span></p>
                                        </div>
                                    </div>
                                    <div className="middle">
                                        <div className="left">
                                            <div className="nationality" onClick={() => setOpenNationality(!openNationality)}>
                                                <div className="left">
                                                    <p>{selectedNationality ? selectedNationality : 'Chọn quốc tịch'}</p>
                                                </div>
                                                <div className="right">
                                                    <i><IoIosArrowDown /></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="right">
                                            <div className="customer-cccd">
                                                <input
                                                    type="text"
                                                    className="CustomerCCCD"
                                                    placeholder="Nhập số cccd"
                                                    name="cccd"
                                                    value={formValues.cccd}
                                                    onChange={handleChange}
                                                    onInput={handleInput}
                                                    maxLength="12"
                                                />
                                            </div>
                                            {formError.cccd && (
                                                <div className="error-feedback">{formError.cccd}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className={`bottom ${openNationality ? 'open' : ''}`}>
                                        <ul>
                                            <li onClick={() => { setSelectedNationality('Afghanistan'); setOpenNationality(false) }}>Afghanistan</li>
                                            <li onClick={() => { setSelectedNationality('Albania'); setOpenNationality(false) }}>Albania</li>
                                            <li onClick={() => { setSelectedNationality('Algeria'); setOpenNationality(false) }}>Algeria</li>
                                            <li onClick={() => { setSelectedNationality('Bahamas'); setOpenNationality(false) }}>Bahamas</li>
                                            <li onClick={() => { setSelectedNationality('Bahrain'); setOpenNationality(false) }}>Bahrain</li>
                                            <li onClick={() => { setSelectedNationality('Belgium'); setOpenNationality(false) }}>Belgium</li>
                                            <li onClick={() => { setSelectedNationality('Canada'); setOpenNationality(false) }}>Canada</li>
                                            <li onClick={() => { setSelectedNationality('Cambodia'); setOpenNationality(false) }}>Cambodia</li>
                                            <li onClick={() => { setSelectedNationality('China'); setOpenNationality(false) }}>China</li>
                                            <li onClick={() => { setSelectedNationality('Denmark'); setOpenNationality(false) }}>Denmark</li>
                                            <li onClick={() => { setSelectedNationality('Dominica'); setOpenNationality(false) }}>Dominica</li>
                                            <li onClick={() => { setSelectedNationality('Djibouti'); setOpenNationality(false) }}>Djibouti</li>
                                            <li onClick={() => { setSelectedNationality('Ecuodor'); setOpenNationality(false) }}>Ecuodor</li>
                                            <li onClick={() => { setSelectedNationality('Egypt'); setOpenNationality(false) }}>Egypt</li>
                                            <li onClick={() => { setSelectedNationality('Ethiopia'); setOpenNationality(false) }}>Ethiopia</li>
                                            <li onClick={() => { setSelectedNationality('Fiji'); setOpenNationality(false) }}>Fiji</li>
                                            <li onClick={() => { setSelectedNationality('France'); setOpenNationality(false) }}>France</li>
                                            <li onClick={() => { setSelectedNationality('Finland'); setOpenNationality(false) }}>Finland</li>
                                            <li onClick={() => { setSelectedNationality('Gabon'); setOpenNationality(false) }}>Gabon</li>
                                            <li onClick={() => { setSelectedNationality('Gambia'); setOpenNationality(false) }}>Gambia</li>
                                            <li onClick={() => { setSelectedNationality('Germany'); setOpenNationality(false) }}>Germany</li>
                                            <li onClick={() => { setSelectedNationality('Haiti'); setOpenNationality(false) }}>Haiti</li>
                                            <li onClick={() => { setSelectedNationality('Hong Kong'); setOpenNationality(false) }}>Hong Kong</li>
                                            <li onClick={() => { setSelectedNationality('Hungary'); setOpenNationality(false) }}>Hungary</li>
                                            <li onClick={() => { setSelectedNationality('India'); setOpenNationality(false) }}>India</li>
                                            <li onClick={() => { setSelectedNationality('Indonesia'); setOpenNationality(false) }}>Indonesia</li>
                                            <li onClick={() => { setSelectedNationality('Iran'); setOpenNationality(false) }}>Iran</li>
                                            <li onClick={() => { setSelectedNationality('Jamaica'); setOpenNationality(false) }}>Jamaica</li>
                                            <li onClick={() => { setSelectedNationality('Japan'); setOpenNationality(false) }}>Japan</li>
                                            <li onClick={() => { setSelectedNationality('Jordan'); setOpenNationality(false) }}>Jordan</li>
                                            <li onClick={() => { setSelectedNationality('Kenya'); setOpenNationality(false) }}>Kenya</li>
                                            <li onClick={() => { setSelectedNationality('Korea North'); setOpenNationality(false) }}>Korea North</li>
                                            <li onClick={() => { setSelectedNationality('Korea South'); setOpenNationality(false) }}>Korea South</li>
                                            <li onClick={() => { setSelectedNationality('Laos'); setOpenNationality(false) }}>Laos</li>
                                            <li onClick={() => { setSelectedNationality('Liberia'); setOpenNationality(false) }}>Liberia</li>
                                            <li onClick={() => { setSelectedNationality('Libya'); setOpenNationality(false) }}>Libya</li>
                                            <li onClick={() => { setSelectedNationality('Marocco'); setOpenNationality(false) }}>Marocco</li>
                                            <li onClick={() => { setSelectedNationality('Mexico'); setOpenNationality(false) }}>Mexico</li>
                                            <li onClick={() => { setSelectedNationality('Malaysia'); setOpenNationality(false) }}>Malaysia</li>
                                            <li onClick={() => { setSelectedNationality('Nepal'); setOpenNationality(false) }}>Nepal</li>
                                            <li onClick={() => { setSelectedNationality('Newzealand'); setOpenNationality(false) }}>Newzealand</li>
                                            <li onClick={() => { setSelectedNationality('Nigeria'); setOpenNationality(false) }}>Nigeria</li>
                                            <li onClick={() => { setSelectedNationality('Oman'); setOpenNationality(false) }}>Oman</li>
                                            <li onClick={() => { setSelectedNationality('Philippine'); setOpenNationality(false) }}>Philippine</li>
                                            <li onClick={() => { setSelectedNationality('Peru'); setOpenNationality(false) }}>Peru</li>
                                            <li onClick={() => { setSelectedNationality('Portugal'); setOpenNationality(false) }}>Portugal</li>
                                            <li onClick={() => { setSelectedNationality('Quatar'); setOpenNationality(false) }}>Quatar</li>
                                            <li onClick={() => { setSelectedNationality('Romania'); setOpenNationality(false) }}>Romania</li>
                                            <li onClick={() => { setSelectedNationality('Russia'); setOpenNationality(false) }}>Russia</li>
                                            <li onClick={() => { setSelectedNationality('Rwanda'); setOpenNationality(false) }}>Rwanda</li>
                                            <li onClick={() => { setSelectedNationality('Samoa'); setOpenNationality(false) }}>Samoa</li>
                                            <li onClick={() => { setSelectedNationality('Sweden'); setOpenNationality(false) }}>Sweden</li>
                                            <li onClick={() => { setSelectedNationality('Slovakia'); setOpenNationality(false) }}>Slovakia</li>
                                            <li onClick={() => { setSelectedNationality('Thailand'); setOpenNationality(false) }}>Thailand</li>
                                            <li onClick={() => { setSelectedNationality('Turkey'); setOpenNationality(false) }}>Turkey</li>
                                            <li onClick={() => { setSelectedNationality('Tunisia'); setOpenNationality(false) }}>Tunisia</li>
                                            <li onClick={() => { setSelectedNationality('United Kingdom'); setOpenNationality(false) }}>United Kingdom</li>
                                            <li onClick={() => { setSelectedNationality('United State'); setOpenNationality(false) }}>United State</li>
                                            <li onClick={() => { setSelectedNationality('Ukraine'); setOpenNationality(false) }}>Ukraine</li>
                                            <li onClick={() => { setSelectedNationality('Vanuatu'); setOpenNationality(false) }}>Vanuatu</li>
                                            <li onClick={() => { setSelectedNationality('Venezuela'); setOpenNationality(false) }}>Venezuela</li>
                                            <li onClick={() => { setSelectedNationality('Vietnam'); setOpenNationality(false) }}>Vietnam</li>
                                            <li onClick={() => { setSelectedNationality('Yemen'); setOpenNationality(false) }}>Yemen</li>
                                            <li onClick={() => { setSelectedNationality('Zambia'); setOpenNationality(false) }}>Zambia</li>
                                            <li onClick={() => { setSelectedNationality('Zimbabwe'); setOpenNationality(false) }}>Zimbabwe</li>
                                        </ul>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="row-4">
                        <h3>Tóm tắt</h3>
                        <div className="price-summary">
                            <div className="top">
                                <p>Giá bạn phải trả</p>
                                <p className="SumPrice">{formatCurrency(parseFloat(localStorage.getItem('TongTien')))} VND</p>
                            </div>
                            <div className="bottom">
                                <div className="left">
                                    <p className="AirlineName">{ve.TenHHK}</p>
                                    <p className="TicketQuantity">x1</p>
                                </div>
                                <div className="right">
                                    <p className="SumPrice">{formatCurrency(parseFloat(localStorage.getItem('TongTien')))} VND</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row-5">
                        <div className="Button-finish-declare-information">
                            <a href={ROUTERS.USER.PaymentMethodPage} onClick={(e) => handleClick(e, ROUTERS.USER.PaymentMethodPage)}>Tiếp tục</a>
                        </div>
                    </div>
                </div>
                <div className="DIP-container-content-right">
                    <div className="row-1">
                        <i id="icon_plane"><BsAirplaneEnginesFill /></i>
                        <p className="StartingPlace">{ve.DiemKH}</p>
                        <i id="icon_arrow_right"><MdOutlineArrowRightAlt /></i>
                        <p className="EndingPlace">{ve.DiemDen}</p>
                    </div>
                    <div className="row-2">
                        <div className="top">
                            <p>Chuyến bay đi</p>
                            <i><TbPointFilled /></i>
                            <p>{moment.utc(ve.NgayKH).format('DD/MM/YYYY')}</p>
                        </div>
                        <div className="middle">
                            <div className="left">
                                <img src={imageMap[ve.Logo]} />
                            </div>
                            <div className="right">
                                <p className="AirlineName">{ve.TenHHK}</p>
                                <p className="SeatClass">{localStorage.getItem('HangGhe')}</p>
                            </div>
                        </div>
                        <div className="bottom">
                            <div className="col-1">
                                <p className="StartingTime">{moment.utc(ve.GioKH).format('HH:mm')}</p>
                                <p className="StartingPlaceID">{ve.MaDiemKH}</p>
                            </div>
                            <div className="col-2">
                                <p className="FlightHours">{ve.SoGioBay}</p>
                                <div className="icon">
                                    <div className="circle-1"></div>
                                    <div className="straight"></div>
                                    <div className="circle-2"></div>
                                </div>
                                <p className="StopPointQuantity">{ve.SoDiemDung} điểm dừng</p>
                            </div>
                            <div className="col-3">
                                <p className="EndingTime">{moment.utc(ve.GioDen).format('HH:mm')}</p>
                                <p className="EndingPlaceID">{ve.MaDiemDen}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row-3">
                        <div className="top">
                            <i><FaCircleCheck /></i>
                            <p className="TTHV">{ve.ThongTinHV}</p>
                        </div>
                        <div className="bottom">
                            <i><FaCircleCheck /></i>
                            <p className="TTDL">{ve.ThongTinDL}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(DeclareInformationPage);