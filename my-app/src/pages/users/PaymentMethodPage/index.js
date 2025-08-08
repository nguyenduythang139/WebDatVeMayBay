import { memo, useState, useEffect } from "react";
import React from "react";
import './style.css';
import axios from "axios";
import moment from "moment";

//import icon
import { BiSolidDiscount } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";
import { BsAirplaneEnginesFill } from "react-icons/bs";
import { FaCircleCheck } from "react-icons/fa6";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { BsPersonStanding } from "react-icons/bs";

//import hinh anh
import logo_vietjet_air from "../../../images/airline-4.png";
import Security from "../../../images/100Security.png";
import vcb from "../../../images/vcb.png";
import circlek from "../../../images/circlek.png";
import familymart from "../../../images/family_mart.png";
import vinmart from "../../../images/vin_mart.png";
import fpt from "../../../images/fpt.png";
import PMP_bg from "../../../images/PMPbg.png";
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
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "../../../utils/router";

const PaymentMethodPage = () => {
    const [openInputVoucherID, setOpenInputVoucherID] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [error, setError] = useState('');

    const handleRadioChange = (phuongthuctt) => {
        localStorage.setItem('PhuongThucTT', phuongthuctt);
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

    const navigate = useNavigate();
    const handleClick = async (e, path) => {
        e.preventDefault();
        if (!selectedPaymentMethod) {
            setError('Vui lòng chọn phương thức thanh toán.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const MaVe = localStorage.getItem('MaVe');
            const HangGhe = localStorage.getItem('HangGhe');
            const CCCD = localStorage.getItem('CCCD');
            const TenHK = localStorage.getItem('TenHK');
            const GioiTinh = localStorage.getItem('GioiTinh');
            const NgaySinh = localStorage.getItem('NgaySinh');
            const QuocTich = localStorage.getItem('QuocTich');
            const DanhXung = localStorage.getItem('DanhXung');
            const MaKH = localStorage.getItem('MaKH');
            const PhuongThucTT = localStorage.getItem('PhuongThucTT');
            const TongTien = localStorage.getItem('TongTien');

            if (MaVe && HangGhe && token) {
                await axios.put(`http://localhost:5000/api/updateSeatClass/${MaVe}`, { HangGhe }, {
                    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
                });

                if (CCCD && TenHK && GioiTinh && NgaySinh && QuocTich && DanhXung && MaKH) {
                    await axios.post('http://localhost:5000/api/addHanhKhach', {
                        CCCD, TenHK, GioiTinh, NgaySinh, QuocTich, DanhXung, MaKH
                    }, {
                        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
                    });
                } else {
                    console.error('Thông tin hành khách không đầy đủ.');
                }

                if (PhuongThucTT && TongTien) {
                    const response = await axios.post('http://localhost:5000/api/addThanhToan', {
                        PhuongThucTT, TongTienTT: Number(TongTien), TrangThaiTT: 'Chưa thanh toán'
                    }, {
                        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
                    });

                    const MaTT = response.data.MaTT;

                    if (MaVe && MaTT) {
                        await axios.put(`http://localhost:5000/api/updateMaTTVe/${MaVe}`, { MaTT }, {
                            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
                        });
                    } else {
                        console.error('MaVe hoặc MaTT không tìm thấy.');
                    }

                    if (MaKH && MaTT) {
                        await axios.put(`http://localhost:5000/api/updateMaTTKhachHang/${MaKH}`, { MaTT }, {
                            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
                        });
                    } else {
                        console.error('MaKH hoặc MaTT không tìm thấy.');
                    }

                    // Thêm dữ liệu vào bảng VeDienTu
                    await axios.post('http://localhost:5000/api/addVeDienTu', { MaVe }, {
                        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
                    });

                    navigate(path);
                } else {
                    console.error('Thông tin thanh toán không đầy đủ.');
                }
            } else {
                console.error('MaVe, HangGhe, hoặc token không tìm thấy trong localStorage');
            }
        } catch (error) {
            console.error('Lỗi khi thực hiện hành động:', error);
        }
    };

    //su dung voucher
    const [voucherID, setVoucherID] = useState('');
    const handleVoucherChange = async (e) => {
        const enteredVoucher = e.target.value;
        setVoucherID(enteredVoucher);

        if (enteredVoucher) {
            try {
                const response = await axios.get(`/api/voucher/${enteredVoucher}`);
                const voucher = response.data;

                if (voucher) {
                    const tongTien = parseFloat(localStorage.getItem('TongTien'));
                    const maVe = localStorage.getItem('MaVe')
                    if (tongTien >= voucher.GiaTriDKSD) {
                        const updatedTongTien = tongTien - voucher.GiaTriVoucher;
                        localStorage.setItem('TongTien', updatedTongTien);
                        await axios.post('/api/updateVeVoucher', {
                            maVe: maVe,
                            maVoucher: voucher.MaVoucher
                        });
                    }
                }
            } catch (error) {
                console.error('Error fetching voucher:', error);
            }
        }
    };

    return (
        <div className="PMP-container">
            <div className="PMP-container-content">
                <div className="PMP-container-content-left">
                    <div className="row-1">
                        <h2>Bạn muốn thanh toán thế nào?</h2>
                        <img src={Security} />
                    </div>
                    <div className="row-2">
                        <ul>
                            <li>
                                <div className="left">
                                    <input
                                        type="radio"
                                        name="payment-method"
                                        id="chuyen-khoan-ngan-hang"
                                        onChange={() => handleRadioChange('Chuyển khoản ngân hàng')}
                                        onClick={() => setSelectedPaymentMethod(true)}
                                    />
                                    <label htmlFor="chuyen-khoan-ngan-hang">Chuyển khoản ngân hàng</label>
                                </div>
                                <div className="right">
                                    <img src={vcb} />
                                </div>
                            </li>
                            <li>
                                <div className="top">
                                    <div className="left">
                                        <input
                                            type="radio"
                                            name="payment-method"
                                            id="tai-cua-hang"
                                            onChange={() => handleRadioChange('Tại cửa hàng')}
                                            onClick={() => setSelectedPaymentMethod(true)}
                                        />
                                        <label htmlFor="tai-cua-hang">Tại cửa hàng</label>
                                    </div>
                                    <div className="right">
                                        <img src={fpt} />
                                        <img src={circlek} />
                                        <img src={familymart} />
                                        <img src={vinmart} />
                                    </div>
                                </div>
                                <div className="bottom">
                                    <ul>
                                        <li>Thanh toán <span>chỉ có sẵn tại các quầy được liệt kê bên dưới trong giờ làm việc của họ.</span></li>
                                        <li>Để có trải nghiệm thanh toán liền mạch, <span>vui lòng thanh toán số tiền chính xác</span> trước khi hết thời gian thanh toán</li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="row-3">
                        <div className="left">
                            <i><BiSolidDiscount /></i>
                        </div>
                        <div className="right">
                            <div className="top">
                                <p>Thêm mã giảm</p>
                                <p onClick={() => setOpenInputVoucherID(true)}>Thêm mã</p>
                            </div>
                            <div className="bottom">
                                <p>Nhập mã code ngay tại đây!</p>
                            </div>
                        </div>
                    </div>
                    <div className={`row-4 ${openInputVoucherID ? 'open' : ''}`}>
                        <div className="input-voucher-id">
                            <div className="top">
                                <div className="row-1">
                                    <h3>Thêm mã giảm</h3>
                                    <i onClick={() => setOpenInputVoucherID(false)}><IoCloseOutline /></i>
                                </div>
                                <div className="row-2">
                                    <p>Nhập mã giảm</p>
                                    <div className="voucher-id">
                                        <input type="text" className="VoucherID" placeholder="Nhập mã voucher tại đây" value={voucherID} onChange={handleVoucherChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="bottom">
                                <div className="left">
                                    <p>Price</p>
                                    <p className="SumPrice">{formatCurrency(parseFloat(localStorage.getItem('TongTien')))} VND</p>
                                </div>
                                <div className="right">
                                    <p className="Button-close-input-voucher-id" onClick={() => setOpenInputVoucherID(false)}>Ok</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row-5">
                        <div className="top">
                            <div className="left">
                                <p>Tổng giá tiền</p>
                            </div>
                            <div className="right">
                                <p className="SumPrice">{formatCurrency(parseFloat(localStorage.getItem('TongTien')))} VND</p>
                            </div>
                        </div>
                        <div className="middle">
                            <div className="left">
                                <p className="AirlineName">{ve.TenHHK}</p>
                                <p className="TicketQuantity">x1</p>
                            </div>
                            <div className="right">
                                <p className="SumPrice">{formatCurrency(parseFloat(localStorage.getItem('TongTien')))} VND</p>
                            </div>
                        </div>
                        <div className="bottom">
                            <a href={ROUTERS.USER.NotifyPage} onClick={(e) => handleClick(e, ROUTERS.USER.NotifyPage)} >
                                Xác nhận phương thức
                            </a>
                            {error && <p className="error-feedback">{error}</p>}
                            <p>Bằng cách tiếp tục thanh toán, bạn đồng ý <span>Điều khoản & Điều kiện</span> và <span>Chính sách quyền riêng tư</span></p>
                        </div>
                    </div>
                </div>
                <div className="PMP-container-content-right">
                    <div className="row-1" style={{ backgroundImage: `url(${PMP_bg})` }}>
                        <div className="left">
                            <BsAirplaneEnginesFill id="icon_airline" />
                        </div>
                        <div className="right">
                            <h3>Tóm tắt vé máy bay</h3>
                            <p className="BookSeatID">Mã đặt chỗ: </p>
                        </div>
                    </div>
                    <div className="row-2">
                        <div className="top">
                            <p className="StartingPlace">{ve.DiemKH}</p>
                            <i><MdOutlineArrowRightAlt /></i>
                            <p className="EnddingPlace">{ve.DiemDen}</p>
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
                                <p className="StartingDate">{moment.utc(ve.NgayKH).format('DD/MM/YYYY')}</p>
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
                                <p className="EnddingTime">{moment.utc(ve.GioDen).format('HH:mm')}</p>
                                <p className="EnddingPlaceID">{moment.utc(ve.NgayDen).format('DD/MM/YYYY')}</p>
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
                    <div className="row-4">
                        <div className="top">
                            <p>Chi tiết về các hành khách</p>
                        </div>
                        <div className="bottom">
                            <i><BsPersonStanding /></i>
                            <p className="CustomerName">{localStorage.getItem('DanhXung')} {localStorage.getItem('TenHK')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(PaymentMethodPage);