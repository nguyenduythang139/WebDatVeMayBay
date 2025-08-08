import React, { useState, useEffect } from "react";
import "./style.css"
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from "react-router-dom";


//import icon
import { BiSolidDiscount } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { RiArrowRightSLine } from "react-icons/ri";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { BsLuggageFill } from "react-icons/bs";
import { CiCircleInfo } from "react-icons/ci";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { IoShareSocialOutline } from "react-icons/io5";
import { BsSuitcaseLgFill } from "react-icons/bs";
import { FaSuitcaseRolling } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";

//import hinh anh
import voucher_logo from "../../../images/voucher_logo.png";
import DHV from "../../../images/DHV.png";
import DL from "../../../images/DLCS.png";
import SeatClass from "../../../images/SeatClass.png";
import KTTHT from "../../../images/KTTHT.png";
import economy_1 from "../../../images/economy_1.png";
import economy_2 from "../../../images/economy_2.png";
import economy_3 from "../../../images/economy_3.png";
import economy_4 from "../../../images/economy_4.png";
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

const SearchTicketPage = () => {

    //Đóng mở bộ lọc
    const [openStpFilterRow2, setOpenStpFilterRow2] = useState(true);
    const [openStpFilterRow3, setOpenStpFilterRow3] = useState(true);
    const [openStpFilterRow4, setOpenStpFilterRow4] = useState(true);
    const [openStpFilterRow5, setOpenStpFilterRow5] = useState(true);

    //Đóng mở xem voucher
    const [openStpDiscountVoucherDisplay, setOpenStpDiscountVoucherDisplay] = useState(false);

    const navigate = useNavigate();

    const [hangGhe, setHangGhe] = useState('');
    const [tongTien, setTongTien] = useState('');

    const handleRadioChange = (hangGhe, tongTien) => {
        setHangGhe(hangGhe);
        setTongTien(tongTien);
        localStorage.setItem('HangGhe', hangGhe);
        localStorage.setItem('TongTien', tongTien);
    };

    const handleClick = (e, path, MaVe) => {
        e.preventDefault();
        localStorage.setItem('MaVe', MaVe);
        navigate(path);
    }

    //Đóng mở các thông tin của vé
    const [ticketStates, setTicketStates] = useState({});

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

    // duyet bang ve
    const [ve, setVe] = useState([]);

    useEffect(() => {
        const fetchVe = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/ve');
                setVe(response.data);
            } catch (error) {
                console.error('Error fetching ve data:', error);
            }
        };

        fetchVe();

    }, []);

    axios.get('/api/ve')
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Lỗi khi lấy dữ liệu ve:', error);
        });

    const toggleDetail = (id, section) => {
        setTicketStates((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                openTicketDetail: section === 'detail' ? !prev[id]?.openTicketDetail : false,
                openTicketPriceDetail: section === 'price' ? !prev[id]?.openTicketPriceDetail : false,
                openHVPolicy: section === 'hvPolicy' ? !prev[id]?.openHVPolicy : false,
                openDLPolicy: section === 'dlPolicy' ? !prev[id]?.openDLPolicy : false,
                openChooseSeatClass: section === 'chooseSeatClass' ? !prev[id]?.openChooseSeatClass : false,
            }
        }));
    };

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

    //loc ve theo tieu chi so diem dung
    const [filter, setFilter] = useState({
        bayThang: false,
        motDiemDung: false,
        haiDiemDung: false,
        BambooAirways: false,
        VietnamAirlines: false,
        VietravelAirlines: false,
        VietjetAir: false,
        PacificAirlines: false,
        NokAir: false,
        ScootAirlines: false,
        SingaporeAirlines: false,
        MalaysiaAirlines: false,
        CathayPacific: false,
        CebuPacific: false,
        EmiratesAirlines: false,
        ThaiAirways: false,
        ThaiSmileAirlines: false,
        ChinaAirlines: false,
        EtihadAirways: false,
        HongKongAirlines: false,
        ChinaSouthernAirlines: false,
        LionAirlines: false,
        QatarAirways: false,
        KoreanAir: false,
        JapanAirlines: false,
        AllNipponAirways: false,
        AsianaAirlines: false,
        StarluxAirlines: false,
        gia1TrieuDen2Trieu: false,
        gia2TrieuDen4Trieu: false,
        tren4Trieu: false,
        gioKH: [],
        gioDen: []
    })

    const handleFilterChange = (e) => {
        const { id, checked } = e.target;
        setFilter({
            ...filter,
            [id]: checked,
        })
    }

    const handleTimeSelection = (type, hours) => {
        setFilter(prevFilter => {
            const newHours = prevFilter[type].slice();

            if (hours.every(hour => newHours.includes(hour))) {
                newHours.length = 0;
            } else {
                newHours.push(...hours);
            }

            return { ...prevFilter, [type]: newHours };
        });
    };

    const filteredVe = ve.filter((ticket) => {
        if (filter.bayThang && ticket.SoDiemDung !== 0) return false;
        if (filter.motDiemDung && ticket.SoDiemDung !== 1) return false;
        if (filter.haiDiemDung && ticket.SoDiemDung <= 1) return false;
        if (filter.gia1TrieuDen2Trieu && (ticket.GiaVe < 1000000 || ticket.GiaVe > 2000000)) return false;
        if (filter.gia2TrieuDen4Trieu && (ticket.GiaVe < 2000000 || ticket.GiaVe > 4000000)) return false;
        if (filter.tren4Trieu && ticket.GiaVe <= 4000000) return false;

        const gioKH = moment.utc(ticket.GioKH).hour();
        const gioDen = moment.utc(ticket.GioDen).hour();

        if (filter.gioKH.length > 0 && !filter.gioKH.includes(gioKH)) return false;
        if (filter.gioDen.length > 0 && !filter.gioDen.includes(gioDen)) return false;

        const airlineFilters = [
            { name: 'Bamboo Airways', value: filter.BambooAirways },
            { name: 'Vietnam Airlines', value: filter.VietnamAirlines },
            { name: 'Vietravel Airlines', value: filter.VietravelAirlines },
            { name: 'VietJet Air', value: filter.VietjetAir },
            { name: 'Pacific Airlines', value: filter.PacificAirlines },
            { name: 'Nok Air', value: filter.NokAir },
            { name: 'Scoot Airlines', value: filter.ScootAirlines },
            { name: 'Singapore Airlines', value: filter.SingaporeAirlines },
            { name: 'Malaysia Airlines', value: filter.MalaysiaAirlines },
            { name: 'Cathay Pacific', value: filter.CathayPacific },
            { name: 'Cebu Pacific', value: filter.CebuPacific },
            { name: 'Emirates Airlines', value: filter.EmiratesAirlines },
            { name: 'Thai Airways', value: filter.ThaiAirways },
            { name: 'Thai Smile Airlines', value: filter.ThaiSmileAirlines },
            { name: 'China Airlines', value: filter.ChinaAirlines },
            { name: 'Etihad Airways', value: filter.EtihadAirways },
            { name: 'Hong Kong Airlines', value: filter.HongKongAirlines },
            { name: 'China Southern Airlines', value: filter.ChinaSouthernAirlines },
            { name: 'Lion Airlines', value: filter.LionAirlines },
            { name: 'Qatar Airways', value: filter.QatarAirways },
            { name: 'Korean Air', value: filter.KoreanAir },
            { name: 'Japan Airlines', value: filter.JapanAirlines },
            { name: 'All Nippon Airways', value: filter.AllNipponAirways },
            { name: 'Asiana Airlines', value: filter.AsianaAirlines },
            { name: 'Starlux Airlines', value: filter.StarluxAirlines },
        ];

        const airlineFilterActive = airlineFilters.some(airline => airline.value);

        if (airlineFilterActive) {
            return airlineFilters.some(airline => airline.value && ticket.TenHHK === airline.name);
        }
        return true;
    })

    return (
        <div className="STP-container">
            <div className="STP-container-content">
                <div className="STP-container-content-left">
                    <div className="STP-discount">
                        <div className="STP-discount-top">
                            <i><BiSolidDiscount /></i>
                            <p>Khuyến mãi</p>
                            <p className="voucher-quantity">5</p>
                        </div>
                        <div className="STP-discount-bottom">
                            {vouchers.map((voucher) =>
                                <div className="STP-voucher">
                                    <div className="STP-voucher-row-1">
                                        <div className="STP-voucher-row-1-left">
                                            <img src={voucher_logo} />
                                        </div>
                                        <div className="STP-voucher-row-1-right">
                                            <div className="STP-voucher-row-1-right-top">
                                                <p className="TittleVoucher">{voucher.TieuDe}</p>
                                                <p>Giới hạn</p>
                                            </div>
                                            <div className="STP-voucher-row-1-right-bottom">
                                                <p className="ConditionVoucher">{voucher.DieuKienSuDung}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="STP-voucher-row-2">
                                        <p className="NameVoucher">{voucher.TenVoucher}</p>
                                        <p>Sao chép</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="STP-discount-button-open" onClick={() => setOpenStpDiscountVoucherDisplay(true)}>
                            <i><RiArrowRightSLine /></i>
                        </div>
                        <div className={`STP-discount-display ${openStpDiscountVoucherDisplay ? 'open' : ''}`}>
                            <div className="STP-discount-display-content">
                                <div className="STP-discount-display-content-top">
                                    <div className="left">
                                        <i><BiSolidDiscount /></i>
                                        <p>Khuyến mãi</p>
                                        <p className="voucher-quantity">5</p>
                                    </div>
                                    <div className="right">
                                        <i onClick={() => setOpenStpDiscountVoucherDisplay(false)}><IoClose /></i>
                                    </div>
                                </div>
                                <div className="STP-discount-display-content-bottom">
                                    {vouchers.map(voucher => (
                                        <div className="STP-discount-display-voucher">
                                            <div className="row-1">
                                                <div className="left">
                                                    <img src={voucher_logo} />
                                                </div>
                                                <div className="right">
                                                    <div className="top">
                                                        <p className="TittleVoucher">{voucher.TieuDe}</p>
                                                        <p>Giới hạn</p>
                                                    </div>
                                                    <div className="bottom">
                                                        <p className="ConditionVoucher">{voucher.DieuKienSuDung}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row-2">
                                                <p className="NameVoucher">{voucher.TenVoucher}</p>
                                                <p>Sao chép</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="STP-filter">
                        <div className="STP-filter-row-1">
                            <p>Bộ lọc:</p>
                            <p onClick={() => setFilter({
                                bayThang: false, motDiemDung: false, haiDiemDung: false, BambooAirways: false, VietnamAirlines: false, VietjetAir: false, VietravelAirlines: false, PacificAirlines: false, NokAir: false, ScootAirlines: false,
                                SingaporeAirlines: false, MalaysiaAirlines: false, CathayPacific: false, CebuPacific: false, EmiratesAirlines: false, ThaiAirways: false, ThaiSmileAirlines: false, ChinaAirlines: false, EtihadAirways: false,
                                HongKongAirlines: false, ChinaSouthernAirlines: false, LionAirlines: false, QatarAirways: false, KoreanAir: false, JapanAirlines: false, AllNipponAirways: false, AsianaAirlines: false, StarluxAirlines: false,
                                gia1TrieuDen2Trieu: false, gia2TrieuDen4Trieu: false, tren4Trieu: false
                            })}>Đặt lại</p>
                        </div>
                        <div className="STP-filter-row-2">
                            <div className="STP-filter-row-2-top" onClick={() => setOpenStpFilterRow2(!openStpFilterRow2)}>
                                <p className="filter-criteria">Số điểm dừng</p>
                                <i><IoIosArrowDown /></i>
                            </div>
                            <div className={`STP-filter-row-2-bottom STP-filter-row-bottom ${openStpFilterRow2 ? 'open' : ''}`} >
                                <ul>
                                    <li>
                                        <input type="checkbox" name="filter-name" id="bayThang" checked={filter.bayThang} onChange={handleFilterChange} />
                                        <label for="bayThang">Bay thẳng</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="filter-name" id="motDiemDung" checked={filter.motDiemDung} onChange={handleFilterChange} />
                                        <label for="motDiemDung">1 điểm dừng</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="filter-name" id="haiDiemDung" checked={filter.haiDiemDung} onChange={handleFilterChange} />
                                        <label for="haiDiemDung">2+ transits</label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="STP-filter-row-3">
                            <div className="STP-filter-row-3-top" onClick={() => setOpenStpFilterRow3(!openStpFilterRow3)}>
                                <p className="filter-criteria">Hãng hàng không</p>
                                <i><IoIosArrowDown /></i>
                            </div>
                            <div className={`STP-filter-row-3-bottom STP-filter-row-bottom ${openStpFilterRow3 ? 'open' : ''}`}>
                                <ul>
                                    <li>
                                        <input type="checkbox" name="filter-name" id="BambooAirways" checked={filter.BambooAirways} onChange={handleFilterChange} />
                                        <img src={AIP_bambooair} />
                                        <label for="BambooAirways">Bamboo Airways</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="filter-name" id="VietnamAirlines" checked={filter.VietnamAirlines} onChange={handleFilterChange} />
                                        <img src={AIP_vietnamair} />
                                        <label for="VietnamAirlines">Vietnam Airlines</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="filter-name" id="VietravelAirlines" checked={filter.VietravelAirlines} onChange={handleFilterChange} />
                                        <img src={AIP_viettravelair} />
                                        <label for="VietravelAirlines">Vietravel Airlines</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="filter-name" id="VietjetAir" checked={filter.VietjetAir} onChange={handleFilterChange} />
                                        <img src={AIP_vietjetair} />
                                        <label for="VietjetAir">Vietjet Air</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="filter-name" id="PacificAirlines" checked={filter.PacificAirlines} onChange={handleFilterChange} />
                                        <img src={AIP_pacificair} />
                                        <label for="PacificAirlines">Pacific Airlines</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="filter-name" id="NokAir" checked={filter.NokAir} onChange={handleFilterChange} />
                                        <img src={AIP_nokair} />
                                        <label for="NokAir">Nok Air</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="filter-name" id="ScootAirlines" checked={filter.ScootAirlines} onChange={handleFilterChange} />
                                        <img src={AIP_scootair} />
                                        <label for="ScootAirlines">Scoot Airlines</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="filter-name" id="SingaporeAirlines" checked={filter.SingaporeAirlines} onChange={handleFilterChange} />
                                        <img src={AIP_singaporeair} />
                                        <label for="SingaporeAirlines">Singapore Airlines</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="filter-name" id="MalaysiaAirlines" checked={filter.MalaysiaAirlines} onChange={handleFilterChange} />
                                        <img src={AIP_malaysiaair} />
                                        <label for="MalaysiaAirlines">Malaysia Airlines</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="filter-name" id="CathayPacific" checked={filter.CathayPacific} onChange={handleFilterChange} />
                                        <img src={AIP_cathayair} />
                                        <label for="CathayPacific">Cathay Pacific</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="filter-name" id="CebuPacific" checked={filter.CebuPacific} onChange={handleFilterChange} />
                                        <img src={AIP_cepuair} />
                                        <label for="CebuPacific">Cebu Pacific</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="filter-name" id="EmiratesAirlines" checked={filter.EmiratesAirlines} onChange={handleFilterChange} />
                                        <img src={AIP_emirateair} />
                                        <label for="EmiratesAirlines">Emirates Airlines</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="filter-name" id="ThaiAirways" checked={filter.ThaiAirways} onChange={handleFilterChange} />
                                        <img src={AIP_thaiair} />
                                        <label for="ThaiAirways">Thai Airways</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="filter-name" id="ThaiSmileAirlines" checked={filter.ThaiSmileAirlines} onChange={handleFilterChange} />
                                        <img src={AIP_smileair} />
                                        <label for="ThaiSmileAirlines">Thai Smile Airlines</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="filter-name" id="ChinaAirlines" checked={filter.ChinaAirlines} onChange={handleFilterChange} />
                                        <img src={AIP_chinaair} />
                                        <label for="ChinaAirlines">China Airlines</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="filter-name" id="EtihadAirways" checked={filter.EtihadAirways} onChange={handleFilterChange} />
                                        <img src={AIP_etihadair} />
                                        <label for="EtihadAirways">Etihad Airways</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="filter-name" id="HongKongAirlines" checked={filter.HongKongAirlines} onChange={handleFilterChange} />
                                        <img src={AIP_hongkongair} />
                                        <label for="HongKongAirlines">Hong Kong Airlines</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="filter-name" id="ChinaSouthernAirlines" checked={filter.ChinaSouthernAirlines} onChange={handleFilterChange} />
                                        <img src={AIP_chinasouthernair} />
                                        <label for="ChinaSouthernAirlines">China Southern Airlines</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="filter-name" id="LionAirlines" checked={filter.LionAirlines} onChange={handleFilterChange} />
                                        <img src={AIP_lionair} />
                                        <label for="LionAirlines">Lion Airlines</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="filter-name" id="QatarAirways" checked={filter.QatarAirways} onChange={handleFilterChange} />
                                        <img src={AIP_quatarair} />
                                        <label for="QatarAirways">Qatar Airways</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="filter-name" id="KoreanAir" checked={filter.KoreanAir} onChange={handleFilterChange} />
                                        <img src={AIP_koreanair} />
                                        <label for="KoreanAir">Korean Air</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="filter-name" id="JapanAirlines" checked={filter.JapanAirlines} onChange={handleFilterChange} />
                                        <img src={AIP_japanair} />
                                        <label for="JapanAirlines">Japan Airlines</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="filter-name" id="AllNipponAirways" checked={filter.AllNipponAirways} onChange={handleFilterChange} />
                                        <img src={AIP_anaair} />
                                        <label for="AllNipponAirways">All Nippon Airways</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="filter-name" id="AsianaAirlines" checked={filter.AsianaAirlines} onChange={handleFilterChange} />
                                        <img src={AIP_asianaair} />
                                        <label for="AsianaAirlines">Asiana Airlines</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="filter-name" id="StarluxAirlines" checked={filter.StarluxAirlines} onChange={handleFilterChange} />
                                        <img src={AIP_starluxair} />
                                        <label for="StarluxAirlines">Starlux Airlines</label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="STP-filter-row-4">
                            <div className="STP-filter-row-4-top" onClick={() => setOpenStpFilterRow4(!openStpFilterRow4)}>
                                <p className="filter-criteria">Thời gian bay</p>
                                <i><IoIosArrowDown /></i>
                            </div>
                            <div className={`STP-filter-row-4-bottom STP-filter-row-bottom ${openStpFilterRow4 ? 'open' : ''}`}>
                                <div className="takeoff-time">
                                    <p>Giờ cất cánh</p>
                                    <div className="time-selection">
                                        <div className="time-0h-6h" onClick={() => handleTimeSelection('gioKH', [0, 1, 2, 3, 4, 5])}>
                                            <p className="time-selection-title">Đêm đến sáng</p>
                                            <p className="time-selection-content">00:00 - 06:00</p>
                                        </div>
                                        <div className="time-6h-12h" onClick={() => handleTimeSelection('gioKH', [6, 7, 8, 9, 10, 11])}>
                                            <p className="time-selection-title">Sáng đến trưa</p>
                                            <p className="time-selection-content">06:00 - 12:00</p>
                                        </div>
                                        <div className="time-12h-18h" onClick={() => handleTimeSelection('gioKH', [12, 13, 14, 15, 16, 17])}>
                                            <p className="time-selection-title">Trưa đến tối</p>
                                            <p className="time-selection-content">12:00 - 18:00</p>
                                        </div>
                                        <div className="time-18h-24h" onClick={() => handleTimeSelection('gioKH', [18, 19, 20, 21, 22, 23])}>
                                            <p className="time-selection-title">Tối đến đêm</p>
                                            <p className="time-selection-content">18:00 - 24:00</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="landing-time">
                                    <p>Giờ hạ cánh</p>
                                    <div className="time-selection">
                                        <div className="time-0h-6h" onClick={() => handleTimeSelection('gioDen', [0, 1, 2, 3, 4, 5])}>
                                            <p className="time-selection-title">Đêm đến sáng</p>
                                            <p className="time-selection-content">00:00 - 06:00</p>
                                        </div>
                                        <div className="time-6h-12h" onClick={() => handleTimeSelection('gioDen', [6, 7, 8, 9, 10, 11])}>
                                            <p className="time-selection-title">Sáng đến trưa</p>
                                            <p className="time-selection-content">06:00 - 12:00</p>
                                        </div>
                                        <div className="time-12h-18h" onClick={() => handleTimeSelection('gioDen', [12, 13, 14, 15, 16, 17])}>
                                            <p className="time-selection-title">Trưa đến tối</p>
                                            <p className="time-selection-content">12:00 - 18:00</p>
                                        </div>
                                        <div className="time-18h-24h" onClick={() => handleTimeSelection('gioDen', [18, 19, 20, 21, 22, 23])}>
                                            <p className="time-selection-title">Tối đến đêm</p>
                                            <p className="time-selection-content">18:00 - 24:00</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="STP-filter-row-5">
                            <div className="STP-filter-row-5-top" onClick={() => setOpenStpFilterRow5(!openStpFilterRow5)}>
                                <p className="filter-criteria">Giá/hành khách</p>
                                <i><IoIosArrowDown /></i>
                            </div>
                            <div className={`STP-filter-row-5-bottom STP-filter-row-bottom ${openStpFilterRow5 ? 'open' : ''}`}>
                                <ul>
                                    <li>
                                        <input type="checkbox" name="filter-name" id="gia1TrieuDen2Trieu" checked={filter.gia1TrieuDen2Trieu} onChange={handleFilterChange} />
                                        <label for="gia1TrieuDen2Trieu">Từ 1 triệu - 2 triệu</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="filter-name" id="gia2TrieuDen4Trieu" checked={filter.gia2TrieuDen4Trieu} onChange={handleFilterChange} />
                                        <label for="gia2TrieuDen4Trieu">Từ 2 triệu - 4 triệu</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="filter-name" id="tren4Trieu" checked={filter.tren4Trieu} onChange={handleFilterChange} />
                                        <label for="tren4Trieu">Trên 4 triệu</label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="STP-container-content-right">
                    <div className="STP-search-ticket">
                        <div className="STP-search">
                            <div className="STP-search-left">
                                <div className="STP-search-left-top">
                                    <p className="StartingPlace">TP HCM (SGN)</p>
                                    <i><MdOutlineArrowRightAlt /></i>
                                    <p className="EndingPlace">Hà Nội (HAN)</p>
                                </div>
                                <div className="STP-search-left-bottom">
                                    <p className="StartingDate">CN, 16 thg 6 2024 |</p>
                                    <p className="CustomerQuantity">1 hành khách |</p>
                                    <p className="SeatClass">Phổ thông</p>
                                </div>
                            </div>
                            <div className="STP-search-right">
                                <p className="Change-Search-Ticket">Đổi tìm kiếm</p>
                                <i><IoIosSearch /></i>
                            </div>
                        </div>
                        <div className="STP-relevant-information">
                            <ul>
                                <li><i><BiSolidDiscount /></i></li>
                                <li><p>Vé bay giá tốt</p></li>
                                <li><p>Tự chuyển tiếp</p></li>
                                <li><p>Có nhiều voucher giảm giá</p></li>
                            </ul>
                        </div>
                    </div>
                    <div className="STP-flight-tickets">
                        {filteredVe.map((ve, index) => (
                            <div className="STP-flight-ticket" key={index}>
                                <div className="STP-flight-ticket-row-1" onClick={() => toggleDetail(index, 'detail')}>
                                    <div className="STP-flight-ticket-row-1-top">
                                        <div className="col-1">
                                            <div className="col-1-top">
                                                <img className="AirlineLogo" src={imageMap[ve.Logo]} />
                                                <p className="AirlineName">{ve.TenHHK}</p>
                                            </div>
                                            <div className="col-1-bottom">
                                                <div className="Button-buy-extra-luggage">
                                                    <i><BsLuggageFill /></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <div className="col-2-left">
                                                <p className="StartingTime">{moment.utc(ve.GioKH).format('HH:mm')}</p>
                                                <p className="StartingPlaceID">{ve.MaDiemKH}</p>
                                            </div>
                                            <div className="col-2-middle">
                                                <p className="FlightHours">{ve.SoGioBay}</p>
                                                <div className="icon-col-2-middle">
                                                    <div className="circle-1"></div>
                                                    <div className="straight"></div>
                                                    <div className="circle-2"></div>
                                                </div>
                                                <p className="StopPointQuantity">{ve.SoDiemDung} điểm dừng</p>
                                            </div>
                                            <div className="col-2-right">
                                                <p className="EndingTime">{moment.utc(ve.GioDen).format('HH:mm')}</p>
                                                <p className="EndingPlaceID">{ve.MaDiemDen}</p>
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            <div className="col-3-top">
                                                <p className="OldPrice"></p>
                                            </div>
                                            <div className="col-3-bottom">
                                                <p className="NewPrice">{formatCurrency(ve.GiaVe)} VND<span>/khách</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="STP-flight-ticket-row-1-bottom">
                                        <p>Giá vé tốt nhất thị trường</p>
                                    </div>
                                </div>
                                <div className="STP-flight-ticket-row-2">
                                    <div className="STP-flight-ticket-row-2-left">
                                        <ul>
                                            <li onClick={() => toggleDetail(index, 'detail')}>Chi tiết</li>
                                            <li onClick={() => toggleDetail(index, 'price')}>Giá vé & Quyền lợi</li>
                                            <li onClick={() => toggleDetail(index, 'hvPolicy')}>Hoàn vé</li>
                                            <li onClick={() => toggleDetail(index, 'dlPolicy')}>Đổi lịch</li>
                                        </ul>
                                    </div>
                                    <div className="STP-flight-ticket-row-2-right">
                                        <div className="Button-choose-ticket" onClick={() => toggleDetail(index, 'chooseSeatClass')}>
                                            <p>Chọn</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`STP-flight-ticket-row-3 ${ticketStates[index]?.openTicketDetail ? 'open' : ''}`}>
                                    <div className="STP-flight-ticket-row-3-top">
                                        <div className="col-1">
                                            <p className="StartingTime">{moment.utc(ve.GioKH).format('HH:mm')}</p>
                                            <p className="StartingDate">{moment.utc(ve.NgayKH).format('DD/MM/YYYY')}</p>
                                        </div>
                                        <div className="col-2">
                                            <div className="circle-1"></div>
                                            <div className="straight-1"></div>
                                        </div>
                                        <div className="col-3">
                                            <p className="StartingPlace">{ve.DiemKH}</p>
                                            <p className="StartingAirport">{ve.SanBayKH}</p>
                                        </div>
                                    </div>
                                    <div className="STP-flight-ticket-row-3-middle">
                                        <div className="col-1">
                                            <p className="FlightHours">{ve.SoGioBay}</p>
                                        </div>
                                        <div className="col-2">
                                            <div className="straight-2"></div>
                                            <div className="circle-2"></div>
                                        </div>
                                        <div className="col-3">
                                            <div className="row-1">
                                                <p className="AirlineName">{ve.TenHHK}</p>
                                                <img className="AirlineLogo" src={imageMap[ve.Logo]} />
                                            </div>
                                            <div className="row-2">
                                                <p className="AirlineID">{ve.TenMB}</p>
                                            </div>
                                            <div className="row-3">
                                                <p>Nâng hạng chuyến bay có sẵn</p>
                                            </div>
                                            <div className="row-4">
                                                <div className="row-4-left">
                                                    <i><BsLuggageFill /></i>
                                                </div>
                                                <div className="row-4-middle">
                                                    <div className="top">
                                                        <p>Hành lý ký gửi (Mua khi đặt chỗ): </p> <p className="HLKG">{ve.HanhLyKG}kg</p>
                                                    </div>
                                                    <div className="bottom">
                                                        <p>Hành lý xách tay: </p> <p className="HLXT">{ve.HanhLyXT}kg</p>
                                                    </div>
                                                </div>
                                                <div className="row-4-right">
                                                    <i><CiCircleInfo /></i>
                                                    <p className="AirplaneName">{ve.TenMB}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="STP-flight-ticket-row-3-bottom">
                                        <div className="col-1">
                                            <p className="EndingTime">{moment.utc(ve.GioDen).format('HH:mm')}</p>
                                            <p className="EndingDate">{moment.utc(ve.NgayDen).format('DD/MM/YYYY')}</p>
                                        </div>
                                        <div className="col-2">
                                            <p className="EndingPlace">{ve.DiemDen}</p>
                                            <p className="EndingAirport">{ve.SanBayDen}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`STP-flight-ticket-row-4 ${ticketStates[index]?.openTicketPriceDetail ? 'open' : ''}`}>
                                    <div className="STP-flight-ticket-row-4-left">
                                        <div className="STP-flight-ticket-row-4-left-top">
                                            <p>Điều kiện</p>
                                        </div>
                                        <div className="STP-flight-ticket-row-4-left-bottom">
                                            <div className="row-1">
                                                <img className="AirlineLogo" src={imageMap[ve.Logo]} />
                                                <p className="AirlineName">{ve.TenMB}</p>
                                            </div>
                                            <div className="row-2">
                                                <p className="StartingPlace">{ve.DiemKH}</p>
                                                <i><MdOutlineArrowRightAlt /></i>
                                                <p className="EndingPlace">{ve.DiemDen}</p>
                                            </div>
                                            <div className="row-3">
                                                <img src={DHV} />
                                                <p className="TTHV">{ve.ThongTinHV}</p>
                                            </div>
                                            <div className="row-4">
                                                <img src={DL} />
                                                <p className="TTDL">{ve.ThongTinDL}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="STP-flight-ticket-row-4-right">
                                        <div className="STP-flight-ticket-row-4-right-top">
                                            <p>Chi tiết giá</p>
                                        </div>
                                        <div className="STP-flight-ticket-row-4-right-bottom">
                                            <div className="row-1">
                                                <p>Vé cơ bản(x)</p>
                                                <p>{formatCurrency(ve.GiaVe)} VND</p>
                                            </div>
                                            <div className="row-2">
                                                <p>Thuế</p>
                                                <p>Đã bao gồm</p>
                                            </div>
                                            <div className="row-3">
                                                <p>Tổng giá thông thường</p>
                                                <p>{formatCurrency(ve.GiaVe)} VND</p>
                                            </div>
                                            <div className="row-4">
                                                <p>Tiết kiệm</p>
                                                <p> VND</p>
                                            </div>
                                            <div className="row-5">
                                                <p>Bạn phải trả</p>
                                                <p> VND</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`STP-flight-ticket-row-5 ${ticketStates[index]?.openHVPolicy ? 'open' : ''}`}>
                                    <div className="row-1">
                                        <div className="top">
                                            <p className="AirlineName">{ve.TenHHK}</p>
                                            <img className="AirlineLogo" src={imageMap[ve.Logo]} />
                                        </div>
                                        <div className="bottom">
                                            <p className="StartingPlace">{ve.DiemKH}</p>
                                            <i><MdOutlineArrowRightAlt /></i>
                                            <p className="EndingPlace">{ve.DiemKH}</p>
                                        </div>
                                    </div>
                                    <div className="row-2">
                                        <i><FaCircleCheck /></i>
                                        <p className="TTHV">{ve.ThongTinHV}</p>
                                    </div>
                                    <div className="row-3">
                                        <h3>Chính sách hoàn vé của bạn</h3>
                                        <p>Các lý do được áp dụng hoàn vé</p>
                                        <ul>
                                            <li>Tự hủy (thay đổi kế hoạch)</li>
                                            <li>Đau ốm</li>
                                            <li>Hãng hàng không hủy chuyến bay</li>
                                            <li>Chuyến bay bị hãng hàng không đổi lịch đáng kể (theo quyết định của hãng hàng không)</li>
                                            <li>Đặt trùng chuyến bay</li>
                                            <li>Mang thai</li>
                                            <li>Hành khách tử vong</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className={`STP-flight-ticket-row-6 ${ticketStates[index]?.openDLPolicy ? 'open' : ''}`}>
                                    <div className="row-1">
                                        <div className="top">
                                            <p className="AirlineName">{ve.TenHHK}</p>
                                            <img className="AirlineLogo" src={imageMap[ve.Logo]} />
                                        </div>
                                        <div className="bottom">
                                            <p className="StartingPlace">{ve.DiemKH}</p>
                                            <i><MdOutlineArrowRightAlt /></i>
                                            <p className="EndingPlace">{ve.DiemDen}</p>
                                        </div>
                                    </div>
                                    <div className="row-2">
                                        <i><FaCircleCheck /></i>
                                        <p className="TTHV">{ve.ThongTinHV}</p>
                                    </div>
                                    <div className="row-3">
                                        <div className="top">
                                            <h3>Chính sách chung về đổi lịch thường xuyên</h3>
                                            <p>If you reschedule your flight, you will be able to change your:</p>
                                            <ul>
                                                <li><i><IoIosCheckmarkCircleOutline /></i> Giờ khởi hành</li>
                                                <li><i><IoCloseCircleOutline /></i> Lộ trình di chuyển, Hãng hàng không</li>
                                            </ul>
                                            <p>Easy Reschedule chỉ áp dụng để đổi ngày bay.</p>
                                            <p>Traveloka sẽ thông báo tổng giá tiền chuyến bay mới của bạn qua email, thông báo đẩy, hoặc Hộp thư của tôi trên ứng dụng Traveloka.</p>
                                            <p>Tiến trình đổi lịch bay có thể lên đến 1 giờ.</p>
                                            <p>Đổi lịch bay phải được áp dụng với tất cả hành khách trong cùng một Mã đặt chỗ.</p>
                                        </div>
                                        <div className="middle">
                                            <h3>Thời hạn đổi lịch bay</h3>
                                            <p>Yêu cầu đổi lịch bay có thể được gửi muộn nhất là trước giờ khởi hành</p>
                                        </div>
                                        <div className="bottom">
                                            <h3>Phí đổi lịch bay</h3>
                                            <p>Thay đổi lịch trình chuyến bay với hạng vé cao hơn:</p>
                                            <ul>
                                                <li>Hơn 3 giờ trước khi khởi hành, yêu cầu đổi lịch bay sẽ chịu phí phạt VND 500000 Phí đổi lịch bay  từ hãng, tính trên một hành khách.</li>
                                                <li>Dưới 3 giờ trước khi khởi hành, yêu cầu đổi lịch bay sẽ chịu phí phạt VND 1000000 Phí đổi lịch bay  từ hãng, tính trên một hành khách.</li>
                                                <li>Yêu cầu đổi lịch bay này sẽ chịu phí đổi lịch bay của Traveloka VND 45000 tính trên một hành khách/chặng.</li>
                                                <li>Lưu ý rằng các phụ thu khác có thể được áp dụng.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className={`STP-flight-ticket-row-7 ${ticketStates[index]?.openChooseSeatClass ? 'open' : ''}`}>
                                    <div className="STP-choose-seatclass">
                                        <div className="STP-choose-seatclass-top">
                                            <div className="left">
                                                <i onClick={() => {
                                                    localStorage.removeItem('HangGhe');
                                                    localStorage.removeItem('TongTien');
                                                    toggleDetail(index, 'chooseSeatClassClose')
                                                }}><IoClose /></i>
                                                <h3>Chuyến đi của bạn</h3>
                                            </div>
                                            <div className="right">
                                                <i><IoShareSocialOutline /></i>
                                            </div>
                                        </div>
                                        <div className="STP-choose-seatclass-middle">
                                            <div className="STP-choose-seatclass-middle-top">
                                                <div className="STP-choose-seatclass-middle-top-content">
                                                    <div className="row-1">
                                                        <div className="col-1">
                                                            <p className="StartingPlace">{ve.DiemKH}</p>
                                                            <i ><MdOutlineArrowRightAlt /></i>
                                                            <p className="EndingPlace">{ve.DiemDen}</p>
                                                        </div>
                                                        <div className="col-2">
                                                            <p className="StartingDate">{moment.utc(ve.NgayKH).format('DD/MM/YYYY')}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row-2">
                                                        <div className="left">
                                                            <div className="col-1">
                                                                <img className="AirlineLogo" src={imageMap[ve.Logo]} />
                                                            </div>
                                                            <div className="col-2">
                                                                <p className="AirlineName">{ve.TenHHK}</p>
                                                                <p className="SeatClass">Phổ thông</p>
                                                            </div>
                                                        </div>
                                                        <div className="right">
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
                                                </div>
                                            </div>
                                            <div className="STP-choose-seatclass-middle-bottom">
                                                <div className="row-1">
                                                    <h3>Chọn loại vé của bạn</h3>
                                                </div>
                                                <div className="row-2">
                                                    <div className="choose-seatclass">
                                                        <div className="row-1">
                                                            <div className="col-1">
                                                                <img src={SeatClass} />
                                                            </div>
                                                            <div className="col-2">
                                                                <p className="SeatClass">Phổ thông</p>
                                                                <p className="newPrice">{formatCurrency(ve.GiaVe)} VND<span>/khách</span></p>
                                                            </div>
                                                            <div className="col-3">
                                                                <input type='radio' name="SeatClass" className="PhoThong" onChange={() => handleRadioChange('Phổ Thông', ve.GiaVe)} />
                                                            </div>
                                                        </div>
                                                        <div className="row-2">
                                                            <i><BsSuitcaseLgFill /></i>
                                                            <p>Hành lý xách tay 1 x {ve.HanhLyXT}kg</p>
                                                        </div>
                                                        <div className="row-3">
                                                            <i><FaSuitcaseRolling /></i>
                                                            <p>Hành lý ký gửi 1 x {ve.HanhLyKG}kg</p>
                                                        </div>
                                                        <div className="row-4">
                                                            <img src={KTTHT} />
                                                            <p>Không có thông tin hoàn tiền</p>
                                                        </div>
                                                        <div className="row-5">
                                                            <img src={economy_1} />
                                                            <img src={economy_2} />
                                                            <img src={economy_3} />
                                                            <img src={economy_4} />
                                                        </div>
                                                    </div>
                                                    <div className="choose-seatclass">
                                                        <div className="row-1">
                                                            <div className="col-1">
                                                                <img src={SeatClass} />
                                                            </div>
                                                            <div className="col-2">
                                                                <p className="SeatClass">Thuơng gia</p>
                                                                <p className="newPrice">{formatCurrency(ve.GiaVe + ve.GiaVe * 0.3)} VND<span>/khách</span></p>
                                                            </div>
                                                            <div className="col-3">
                                                                <input type='radio' name="SeatClass" className="ThuongGia" onChange={() => handleRadioChange('Thương Gia', ve.GiaVe + ve.GiaVe * 0.3)} />
                                                            </div>
                                                        </div>
                                                        <div className="row-2">
                                                            <i><BsSuitcaseLgFill /></i>
                                                            <p>Hành lý xách tay 1 x {ve.HanhLyXT}kg</p>
                                                        </div>
                                                        <div className="row-3">
                                                            <i><FaSuitcaseRolling /></i>
                                                            <p>Hành lý ký gửi 1 x {ve.HanhLyKG}kg</p>
                                                        </div>
                                                        <div className="row-4">
                                                            <img src={KTTHT} />
                                                            <p>Không có thông tin hoàn tiền</p>
                                                        </div>
                                                        <div className="row-5">
                                                            <img src={economy_1} />
                                                            <img src={economy_2} />
                                                            <img src={economy_3} />
                                                            <img src={economy_4} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="STP-choose-seatclass-bottom">
                                            <div className="col-1">
                                                <i><IoIosArrowUp /></i>
                                            </div>
                                            <div className="col-2">
                                                <p>Tổng cộng cho 1 khách</p>
                                                <p>{formatCurrency(parseFloat(localStorage.getItem('TongTien')))} VND</p>
                                            </div>
                                            <div className="col-3">
                                                <a href={ROUTERS.USER.DeclareInformationPage} onClick={(e) => handleClick(e, ROUTERS.USER.DeclareInformationPage, ve.MaVe)}>Tiếp tục đặt chỗ</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchTicketPage;