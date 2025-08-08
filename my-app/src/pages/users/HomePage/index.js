import { memo, useState, useEffect, useRef } from "react";
import React from "react";
import './style.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment, { version } from 'moment';


//import icon
import { MdAirplaneTicket } from "react-icons/md";
import { FaPlaneDeparture } from "react-icons/fa6";
import { FaPlaneArrival } from "react-icons/fa6";
import { FaUserGroup } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { TbArmchair } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import { BsPersonStanding } from "react-icons/bs";
import { FaChild } from "react-icons/fa";
import { FaBaby } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { RiSwap2Line } from "react-icons/ri";
import { IoAirplane } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { AiOutlineGlobal } from "react-icons/ai";
import { GrSchedule } from "react-icons/gr";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IoIosSwap } from "react-icons/io";
import { TbPointFilled } from "react-icons/tb"

//import hinh anh
import home_bg from "../../../images/home_bg.png";
import airline_1 from "../../../images/airline-1.png";
import airline_2 from "../../../images/airline-2.png";
import airline_3 from "../../../images/airline-3.png";
import airline_4 from "../../../images/airline-4.png";
import airline_5 from "../../../images/airline-5.png";
import airline_6 from "../../../images/airline-6.png";
import airline_7 from "../../../images/airline-7.png";
import airline_8 from "../../../images/airline-8.png";
import airline_9 from "../../../images/airline-9.png";
import airline_10 from "../../../images/airline-10.png";
import airline_11 from "../../../images/airline-11.png";
import airline_12 from "../../../images/airline-12.png";
import airline_13 from "../../../images/airline-13.png";
import airline_14 from "../../../images/airline-14.png";
import airline_15 from "../../../images/airline-15.png";
import airline_16 from "../../../images/airline-16.png";
import airline_17 from "../../../images/airline-17.png";
import airline_18 from "../../../images/airline-18.png";
import travel_ticket from "../../../images/travel_ticket.png";
import plane from "../../../images/plane.png";
import give_money from "../../../images/give-money.png";
import HP_Slider_1 from "../../../images/HP_Slider_1.png";
import HP_Slider_2 from "../../../images/HP_Slider_2.png";
import HP_Slider_3 from "../../../images/HP_Slider_3.png";
import HP_Slider_4 from "../../../images/HP_Slider_4.png";
import HP_Slider_5 from "../../../images/HP_Slider_5.png";
import VietJetAir from "../../../images/VietJetAir.png";
import row_9_1 from "../../../images/row-9-1.png";
import row_9_2 from "../../../images/row-9-2.png";
import row_9_3 from "../../../images/row-9-3.png";
import row_9_4 from "../../../images/row-9-4.png";
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

const HomePage = () => {

    const navigate = useNavigate();

    const handleClick = (e, path, MaVe) => {
        e.preventDefault();
        localStorage.setItem('MaVeCHT', MaVe);
        navigate(path);
    };

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

    //dinh dang hinh anh
    const imageMap = {
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

    //Cú pháp điều chỉnh trạng thái useState: const [state, setState] = useState(initialValue);

    //Nut chinh so luong hanh khach (adult, child, baby)
    const [isCustomerMenuVisible, setIsCustomerMenuVisible] = useState(false);

    const toggleCustomerMenu = () => {
        setIsCustomerMenuVisible(!isCustomerMenuVisible);
    };

    const closeCustomerMenu = () => {
        setIsCustomerMenuVisible(false);
    };

    //Nut chon hang ghe (Pho thong, Thuong gia, Hang nhat)
    const [isSeatClassMenuVisible, setIsSeatClassMenuVisible] = useState(false)

    const toggleSeatClassMenu = () => {
        setIsSeatClassMenuVisible(!isSeatClassMenuVisible);
    }

    //Nut chon diem khoi hanh
    const [DiemKHMenuVisible, setDiemKHMenuVisible] = useState(false)

    const toggleDiemKHMenu = () => {
        setDiemKHMenuVisible(!DiemKHMenuVisible);
    }

    //HP-row 5 hien thi hinh anh thay doi
    const AirlineBrands = () => {
        const [currentIndex, setCurrentIndex] = useState(0);
        useEffect(() => {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
            }, 3000);

            return () => clearInterval(interval);
        }, []);
        return (
            <div className="HP-row-5">
                <p>Trusted by</p>
                <div className={`Airline-Brand-1 ${currentIndex === 0 ? 'show' : 'hide'}`}>
                    <div className="Airline-Brand-Logo">
                        <img src={airline_1} />
                    </div>
                    <div className="Airline-Brand-Logo">
                        <img src={airline_2} />
                    </div>
                    <div className="Airline-Brand-Logo">
                        <img src={airline_3} />
                    </div>
                </div>
                <div className={`Airline-Brand-2 ${currentIndex === 1 ? 'show' : 'hide'}`}>
                    <div className="Airline-Brand-Logo">
                        <img src={airline_4} />
                    </div>
                    <div className="Airline-Brand-Logo">
                        <img src={airline_5} />
                    </div>
                    <div className="Airline-Brand-Logo">
                        <img src={airline_6} />
                    </div>
                    <div className="Airline-Brand-Logo">
                        <img src={airline_7} />
                    </div>
                    <div className="Airline-Brand-Logo">
                        <img src={airline_8} />
                    </div>
                </div>
                <div className={`Airline-Brand-3 ${currentIndex === 2 ? 'show' : 'hide'}`}>
                    <div className="Airline-Brand-Logo">
                        <img src={airline_9} />
                    </div>
                    <div className="Airline-Brand-Logo">
                        <img src={airline_10} />
                    </div>
                    <div className="Airline-Brand-Logo">
                        <img src={airline_11} />
                    </div>
                    <div className="Airline-Brand-Logo">
                        <img src={airline_12} />
                    </div>
                    <div className="Airline-Brand-Logo">
                        <img src={airline_13} />
                    </div>
                </div>
                <div className={`Airline-Brand-4 ${currentIndex === 3 ? 'show' : 'hide'}`}>
                    <div className="Airline-Brand-Logo">
                        <img src={airline_14} />
                    </div>
                    <div className="Airline-Brand-Logo">
                        <img src={airline_15} />
                    </div>
                    <div className="Airline-Brand-Logo">
                        <img src={airline_16} />
                    </div>
                    <div className="Airline-Brand-Logo">
                        <img src={airline_17} />
                    </div>
                    <div className="Airline-Brand-Logo">
                        <img src={airline_18} />
                    </div>
                </div>
            </div>
        );
    };

    //HP-slider
    const HP_Slider = () => {
        const [active, setActive] = useState(0);
        const listRef = useRef(null);
        const intervalRef = useRef(null);

        const images = [
            HP_Slider_1,
            HP_Slider_2,
            HP_Slider_3,
            HP_Slider_4,
            HP_Slider_5
        ];

        const lengthItems = images.length - 1;

        const nextSlide = () => {
            setActive(prev => (prev + 1 > lengthItems ? 0 : prev + 1));
        };

        const prevSlide = () => {
            setActive(prev => (prev - 1 < 0 ? lengthItems : prev - 1));
        };

        useEffect(() => {
            intervalRef.current = setInterval(nextSlide, 4000);
            return () => clearInterval(intervalRef.current);
        }, []);

        useEffect(() => {
            const list = listRef.current;
            const currentItem = list?.children[active];
            const checkLeft = currentItem?.offsetLeft || 0;
            if (list) {
                list.style.left = -checkLeft + 'px';
            }
        }, [active]);

        return (
            <div className="HP-row-8">
                <p>Khuyến mãi và ưu đãi</p>
                <p>Tận hưởng ưu đãi - Trải nghiệm thoải mái</p>
                <div className="HP-row-8-slider">
                    <div className="HP-row-8-slider-list" ref={listRef}>
                        {images.map((src, index) => (
                            <div key={index} className="HP-row-8-slider-item">
                                <img src={src} alt={`Slide ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                    <div className="HP-row-8-slider-button">
                        <button id="btn-prev" onClick={prevSlide}><i><MdOutlineKeyboardArrowLeft /></i></button>
                        <button id="btn-next" onClick={nextSlide}><i><MdOutlineKeyboardArrowRight /></i></button>
                    </div>
                    <ul className="HP-row-8-slider-dots">
                        {images.map((_, index) => (
                            <li
                                key={index}
                                className={index === active ? 'active' : ''}
                                onClick={() => setActive(index)}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        );
    };

    //HP-questions
    const HP_Question = ({ question, answer }) => {
        const [isOpen, setIsOpen] = useState(false);
        const answerRef = useRef(null);

        const toggleAnswer = () => {
            setIsOpen(!isOpen);
        }

        useEffect(() => {
            if (answerRef.current) {
                if (isOpen) {
                    answerRef.current.style.maxHeight = `${answerRef.current.scrollHeight}px`;
                } else {
                    answerRef.current.style.maxHeight = '0';
                }
            }
        }, [isOpen]);

        return (
            <div className={`HP_Question ${isOpen ? 'active' : ''}`}>
                <div className="HP-question-content" onClick={toggleAnswer}>
                    <p>{question}</p>
                    <i><IoIosArrowDown /></i>
                </div>
                <div className="HP-answer" ref={answerRef} dangerouslySetInnerHTML={{ __html: answer }}>

                </div>
            </div>
        );
    };

    const HPRow10 = () => {
        const questions = [
            {
                question: "1. Muốn đổi giờ bay, ngày bay, hành trình bay có được không?",
                answer: `<p>- Có thể đổi ngày bay, giờ bay hoặc hành trình nhưng phải tùy theo điều kiện vé đã mua. Khi đổi ngày bay, giờ bay hoặc hành trình, Quý khách thường sẽ phải trả thêm phí dịch vụ cùng chênh lệch giá vé. Cách nhanh nhất là liên hệ với nơi mua vé để được hỗ trợ đổi thông tin mới, cũng như đóng thêm phí theo quy định của hãng nếu có</p>`
            },
            {
                question: "2. Cần lưu ý gì khi mang hành lý xách tay, ký gửi đi máy bay?",
                answer: `
                    <p class="HP-answer-p-bold">- Tiêu chuẩn hành lý xách tay:</p>
                    <ul class="HP-answer-ul">
                        <li class="HP-answer-li">Vietnam Airlines: 1 kiện tối đa 10kg và 1 phụ kiện tối đa 2kg</li>
                        <li class="HP-answer-li">Bamboo Airways, Vietjet Air, Pacific Airlines, Vietravel Airlines: Tối đa 7kg</li>
                    </ul>
                    <p class="HP-answer-p-bold">- Tiêu chuẩn hành lý ký gửi:</p>
                    <ul class="HP-answer-ul">
                        <li class="HP-answer-li">Vietnam Airlines: 1 kiện, tối đa 23kg</li>
                        <li class="HP-answer-li">Bamboo Airways: 20kg (trừ hạng Economy Saver Max)</li>
                        <li class="HP-answer-li">Vietjet Air, Pacific Airlines, Vietravel Airlines: Phải mua thêm</li>
                    </ul>
                    <p class="HP-answer-p-bold">* Tiêu chuẩn hành lý trên áp dụng cho hạng vé Phổ thông (Economy).</p>
                `
            },
            {
                question: "3. Đi máy bay cần giấy tờ gì?",
                answer: `
                    <p class="HP-answer-p-bold">- Bay nội địa:</p>
                    <ul class="HP-answer-ul">
                        <li class="HP-answer-li">Hành khách từ đủ 14 tuổi trở lên: Căn cước công dân, Chứng minh thư nhân dân, Hộ chiếu, Bằng lái xe...</li>
                        <li class="HP-answer-li">Hành khách dưới 14 tuổi: Giấy khai sinh bản gốc hoặc bản sao trích lục</li>
                        <li class="HP-answer-li">Em bé dưới 1 tháng tuổi: Giấy chứng sinh có dấu xác nhận còn hiệu lực</li>
                    </ul>
                    <p class="HP-answer-p-bold">- Bay quốc tế:</p>
                    <ul class="HP-answer-ul">
                        <li class="HP-answer-li">Hộ chiếu</li>
                        <li class="HP-answer-li">Visa (tùy yêu cầu của quốc gia nơi đến)</li>
                    </ul>
                `
            },
            {
                question: "4. Trẻ em, em bé đi máy bay cần lưu ý gì?",
                answer: `
                    <p class="HP-answer-p-bold">- Giấy tờ cho trẻ em đi máy bay:</p>
                    <ul class="HP-answer-ul">
                        <li class="HP-answer-li">Dưới 1 tháng tuổi: Giấy chứng sinh</li>
                        <li class="HP-answer-li">Dưới 14 tuổi: Giấy khai sinh bản gốc hoặc bản sao trích lục</li>
                    </ul>
                    <p class="HP-answer-p-bold">- Quy định độ tuổi trẻ em đi máy bay một mình:</p>
                    <ul class="HP-answer-ul">
                        <li class="HP-answer-li">Vietnam Airlines, Vietjet Air, Pacific Airlines: Từ 12 đến dưới 14 tuổi</li>
                        <li class="HP-answer-li">Bamboo Airways:
                            <ul>
                                <li class="HP-answer-li">Từ 4 đến dưới 6 tuổi: Được phép, bắt buộc có tiếp viên đi kèm</li>
                                <li class="HP-answer-li">Từ 6 tuổi đến dưới 18 tuổi: Được phép, không bắt buộc có tiếp viên đi kèm</li>
                            </ul>
                        </li>
                        <li class="HP-answer-li">Vietravel Airlines:
                            <ul>
                                <li class="HP-answer-li">Từ 4 đến dưới 6 tuổi: Được phép, bắt buộc có tiếp viên đi kèm</li>
                                <li class="HP-answer-li">Từ 6 tuổi đến dưới 14 tuổi: Được phép, không bắt buộc có tiếp viên đi kèm</li>
                            </ul>
                        </li>
                    </ul>
                `
            },
            {
                question: "5. Có được hủy vé máy bay đã đặt không?",
                answer: `
                    <p class="HP-answer-p">- Thông thường, vé máy bay khuyến mại, giá rẻ sẽ không được phép hoàn hủy. Còn đối với các hạng vé khác, điều kiện hoàn hủy vé máy bay sẽ áp dụng theo quy định cụ thể của các hãng hàng không.</p>
                `
            },
            {
                question: "6. Nên ra sân bay trước bao lâu để làm thủ tục bay?",
                answer: `
                    <p class="HP-answer-p">- Để làm thủ tục đi máy bay, hành khách cần sắp xếp đến sân bay sớm, cụ thể:</p>
                    <ul>
                        <li class="HP-answer-p">Bay Nội địa: Có mặt tại sân bay trước ít nhất 90 phút - 120 phút so với giờ khởi hành</li>
                        <li class="HP-answer-p">Bay Quốc tế: Có mặt tại sân bay trước ít nhất 150 phút đến 180 phút so với giờ khởi hành</li>
                    </ul>
                `
            },
            {
                question: "7. Hành lý đi máy bay bị thừa cân phải làm sao?",
                answer: `
                    <p class="HP-answer-p">- Nếu thừa 1 - 2 cân, Quý khách có thể dùng mẹo sử dụng túi nhỏ để san bớt và nhờ người thân cầm hộ. Tuy nhiên, nếu hành lý bị thừa số cân lớn hơn, hãy mua thêm hành lý ký gửi tại quầy của các hãng hàng không.</p>
                `
            },

        ];

        return (
            <div className="HP-row-10">
                <p>Thông tin hữu ích khi đi máy bay</p>
                <p>Có một hành trình hơn cả mong đợi</p>
                <div className="HP-questions">
                    {questions.map((q, index) => (
                        <HP_Question key={index} question={q.question} answer={q.answer} />
                    ))}
                </div>
            </div>
        );
    };

    const clickToSearch = () => {

    }

    return (
        <div className="HP-container">
            <div className="HP-container-contents">
                <div className="HP-container-content-1" style={{ backgroundImage: `url(${home_bg})` }}>
                    <div className="HP-container-content-header">
                        <h1>Từ Đông Nam Á Đến Thế Giới, Trong Tầm Tay Bạn</h1>
                        <div className="HP-row-1">
                            <ul>
                                <li><i><MdAirplaneTicket /></i><a href="">Vé máy bay</a></li>
                                <li><i><FaPlaneDeparture /></i><a href={ROUTERS.USER.AirlineInformationPage} onClick={(e) => handleClick(e, ROUTERS.USER.AirlineInformationPage)}>Hãng hàng không</a></li>
                            </ul>
                        </div>
                        <div className="HP-row-2">
                            <div className="HP-row-2-left">
                                <a>Một chiều / Khứ hồi</a>
                            </div>
                            <div className="HP-row-2-right">
                                <ul>
                                    <li>
                                        <div className={`QuantityCustomer ${isCustomerMenuVisible ? 'active' : ''}`} onClick={toggleCustomerMenu}>
                                            <i className="group_ic"><FaUserGroup /></i><p>1 người lớn, 0 trẻ em, 0 em bé</p><i className="ar_down_ic1"><IoIosArrowDown /></i>
                                        </div>
                                        {isCustomerMenuVisible && (
                                            <div className="QuantityCustomer-Menu">
                                                <div className="QuantityCustomer-Menu-row1">
                                                    <h3>Số hành khách</h3>
                                                    <i onClick={closeCustomerMenu}><IoMdClose /></i>
                                                </div>
                                                <div className="QuantityCustomer-Menu-row2">
                                                    <i><BsPersonStanding /></i>
                                                    <p><span>Người lớn</span><br></br>(từ 12 tuổi)</p>
                                                    <button className="MinusCustomer"><i><FaMinus /></i></button>
                                                    <button className="AdultQuantity">0</button>
                                                    <button className="PlusCustomer"><i><FaPlus /></i></button>
                                                </div>
                                                <div className="QuantityCustomer-Menu-row3">
                                                    <i><FaChild /></i>
                                                    <p><span>Trẻ em</span><br></br>(từ 2 - 11 tuổi)</p>
                                                    <button className="MinusCustomer"><i><FaMinus /></i></button>
                                                    <button className="ChildQuantity">0</button>
                                                    <button className="PlusCustomer"><i><FaPlus /></i></button>
                                                </div>
                                                <div className="QuantityCustomer-Menu-row4">
                                                    <i><FaBaby /></i>
                                                    <p><span>Em bé</span><br></br>(dưới 2 tuổi)</p>
                                                    <button className="MinusCustomer"><i><FaMinus /></i></button>
                                                    <button className="BabyQuantity">0</button>
                                                    <button className="PlusCustomer"><i><FaPlus /></i></button>
                                                </div>
                                                <button className="Button-HP-Choose-Quantity-Close" onClick={closeCustomerMenu}>Xong</button>
                                            </div>
                                        )}
                                    </li>
                                    <li>
                                        <div className="SeatClass" onClick={toggleSeatClassMenu}>
                                            <i className="aimchair_ic"><TbArmchair /></i><p>Phổ thông</p><i className="ar_down_ic2"><IoIosArrowDown /></i>
                                        </div>
                                        {isSeatClassMenuVisible && (
                                            <div className="SeatClass-Menu">
                                                <label>
                                                    <input type="radio" name="Option-SeatClass" value="Phổ thông" checked />Phổ thông
                                                </label><br></br>
                                                <label>
                                                    <input type="radio" name="Option-SeatClass" value="Thương gia" />Thương gia
                                                </label><br></br>
                                            </div>
                                        )}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="HP-row-3">
                            <div className="HP-row-3-left">
                                <div className="HP-row-3-left-top">
                                    <div className="HP-row-3-left-top-left">
                                        <p>Từ</p>
                                    </div>
                                    <div className="HP-row-3-left-top-right">
                                        <p>Đến</p>
                                    </div>
                                </div>
                                <div className="HP-row-3-left-bottom">
                                    <div className="HP-row-3-left-bottom-left" onClick={toggleDiemKHMenu}>
                                        <i><FaPlaneDeparture /></i><input type="text" name="DiemKH" placeholder="Origin" />
                                        {DiemKHMenuVisible && (
                                            <div className="DiemKH-Menu">
                                                <p>Thành phố hoặc sân bay phổ biến</p>
                                                <div className="Options-DiemKH">
                                                    <div className="Option-DiemKH">
                                                        <i><IoAirplane /></i>
                                                        <div className="Airport-Info">
                                                            <div className="Airport-Name">
                                                                <p>Sân bay Tân Sơn Nhất <span>SGN</span></p>
                                                            </div>
                                                            <div className="Airport-Country">
                                                                <p>TP HCM, Việt Nam</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Option-DiemKH">
                                                        <i><IoAirplane /></i>
                                                        <div className="Airport-Info">
                                                            <div className="Airport-Name">
                                                                <p>Sân bay Tân Sơn Nhất <span>SGN</span></p>
                                                            </div>
                                                            <div className="Airport-Country">
                                                                <p>TP HCM, Việt Nam</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="HP-row-3-left-bottom-right" onClick={toggleDiemKHMenu}>
                                        <i><FaPlaneArrival /></i><input type="text" name="DiemDen" placeholder="Destination" />
                                        <div className="HP-row-3-left-bottom-middle">
                                            <i><RiSwap2Line /></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="HP-row-3-right">
                                <div className="HP-row-3-right-top">
                                    <div className="HP-row-3-right-top-left">
                                        <p>Ngày đi</p>
                                    </div>
                                    <div className="HP-row-3-right-top-right">
                                        <input type="checkbox" /> Khứ hồi
                                    </div>
                                </div>
                                <div className="HP-row-3-right-bottom">
                                    <div className="HP-row-3-right-bottom-left">
                                        <i><GrSchedule /></i>
                                        <input type="date" name="NgayKH" />
                                        <div className="NgayKH-Hidden-ic"></div>
                                    </div>
                                    <div className="HP-row-3-right-bottom-right">
                                        <i><GrSchedule /></i>
                                        <input type="date" name="NgayDen" />
                                        <div className="NgayDen-Hidden-ic"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="HP-row-3-button-search">
                                <div className="HP-button-search">
                                    <a href={ROUTERS.USER.SearchTicketPage} onClick={(e) => handleClick(e, ROUTERS.USER.SearchTicketPage)}><i><CiSearch /></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="HP-row-4">
                            <p>Tìm kiếm</p>
                            <div className="HP-button-explore-flight">
                                <i><AiOutlineGlobal /></i><a>Khám phá ý tưởng chuyến bay</a>
                            </div>
                        </div>
                        <AirlineBrands />
                    </div>
                </div>
                <div className="HP-container-content-2">
                    <div className="HP-container-content-body">
                        <div className="HP-row-6">
                            <div className="HP-row-6-content">
                                <div className="HP-row-6-content-left">
                                    <img src={travel_ticket} />
                                </div>
                                <div className="HP-row-6-content-right">
                                    <p className="HP-row-6-content-title">Đặt vé nhanh chóng dễ dàng</p>
                                    <p className="HP-row-6-content-description">Mua vé máy bay dễ dàng, xuất vé tức thời</p>
                                </div>
                            </div>
                            <div className="HP-row-6-content">
                                <div className="HP-row-6-content-left">
                                    <img src={give_money} />
                                </div>
                                <div className="HP-row-6-content-right">
                                    <p className="HP-row-6-content-title">Thanh toán an toàn</p>
                                    <p className="HP-row-6-content-description">Nhiều hình thức thanh toán linh hoạt</p>
                                </div>
                            </div>
                            <div className="HP-row-6-content">
                                <div className="HP-row-6-content-left">
                                    <img src={plane} />
                                </div>
                                <div className="HP-row-6-content-right">
                                    <p className="HP-row-6-content-title">Dịch vụ tận tâm</p>
                                    <p className="HP-row-6-content-description">Hỗ trợ nhanh chóng, chuyên nghiệp, đáng tin cậy</p>
                                </div>
                            </div>
                        </div>
                        <div className="HP-row-7">
                            <p>Giá vé nội địa tốt nhất</p>
                            <p>Giá tốt nhất từ VietnamAirline, Bamboo, Vietjet, ...</p>
                            <div className="HP-tickets">
                                {ve.map((ve, index) =>
                                    ve.KhuVuc === 'nội địa' && (
                                        <div className="HP-ticket">
                                            <div className="HP-ticket-top">
                                                <div className="HP-ticket-top-left">
                                                    <div className="HP-ticket-top-left-top">
                                                        <p className="starting-point">{ve.DiemKH}</p>
                                                        <i><IoIosSwap /></i>
                                                        <p className="ending-point">{ve.DiemDen}</p>
                                                    </div>
                                                    <div className="HP-ticket-top-left-bottom">
                                                        <p className="starting-date">{moment.utc(ve.NgayKH).format('DD/MM/YYYY')}</p>
                                                        <p className="ending-date">{moment.utc(ve.NgayDen).format('DD/MM/YYYY')}</p>
                                                    </div>
                                                </div>
                                                <div className="HP-ticket-top-right">
                                                    <img src={imageMap[ve.Logo]} className="airline-logo" />
                                                </div>
                                            </div>
                                            <div className="HP-ticket-bottom">
                                                <div className="HP-ticket-bottom-left">
                                                    <p className="ticket-price">{formatCurrency(ve.GiaVe)} <span>VND</span></p>
                                                </div>
                                                <div className="HP-ticket-bottom-right">
                                                    <a href={ROUTERS.USER.SearchTicketPage} onClick={(e) => (handleClick(e, ROUTERS.USER.SearchTicketPage, ve.MaVe))}>Xem</a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                        <HP_Slider />
                        <div className="HP-row-7">
                            <p>Giá vé quốc tế tốt nhất</p>
                            <p>Đảm bảo giá tốt từ tất cả hãng bay quốc tế</p>
                            <div className="HP-tickets">
                                {ve.map((ve, index) =>
                                    ve.KhuVuc === "quốc tế" && (
                                        <div className="HP-ticket">
                                            <div className="HP-ticket-top">
                                                <div className="HP-ticket-top-left">
                                                    <div className="HP-ticket-top-left-top">
                                                        <p className="starting-point">{ve.DiemKH}</p>
                                                        <i><IoIosSwap /></i>
                                                        <p className="ending-point">{ve.DiemDen}</p>
                                                    </div>
                                                    <div className="HP-ticket-top-left-bottom">
                                                        <p className="starting-date">{moment.utc(ve.NgayKH).format('DD/MM/YYYY')}</p>
                                                        <p className="ending-date">{moment.utc(ve.NgayDen).format('DD/MM/YYYY')}</p>
                                                    </div>
                                                </div>
                                                <div className="HP-ticket-top-right">
                                                    <img src={imageMap[ve.Logo]} className="airline-logo" />
                                                </div>
                                            </div>
                                            <div className="HP-ticket-bottom">
                                                <div className="HP-ticket-bottom-left">
                                                    <p className="ticket-price">{formatCurrency(ve.GiaVe)} <span>VND</span></p>
                                                </div>
                                                <div className="HP-ticket-bottom-right">
                                                    <a href={ROUTERS.USER.SearchTicketPage} onClick={(e) => (handleClick(e, ROUTERS.USER.SearchTicketPage, ve.MaVe))}>Xem</a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                        <div className="HP-row-9">
                            <p>Kế hoạch riêng, giá đặc biệt</p>
                            <p>Tiết kiệm chi phí - Theo đuổi ước mơ</p>
                            <div className="HP-row-9-items">
                                <div className="HP-row-9-item" style={{ backgroundImage: `url(${row_9_1})` }}>
                                    <h3>Du học</h3>
                                    <p>Luôn có vé máy bay du học giá đặc,<br></br>không bỏ lỡ ưu đãi riêng cho du học sinh.</p>
                                </div>
                                <div className="HP-row-9-item" style={{ backgroundImage: `url(${row_9_2})` }}>
                                    <h3>Định cư</h3>
                                    <p>Hãy săn vé giá rẻ cho người đi định cư.<br></br>Liên hệ với chúng tôi ngay hôm nay !</p>
                                </div>
                                <div className="HP-row-9-item" style={{ backgroundImage: `url(${row_9_3})` }}>
                                    <h3>Làm việc</h3>
                                    <p>Giá vé đặc biệt cho cô dâu định cư và<br></br>người đi xuất khẩu lao động.</p>
                                </div>
                                <div className="HP-row-9-item" style={{ backgroundImage: `url(${row_9_4})` }}>
                                    <h3>Săn vé</h3>
                                    <p>Vé máy bay giá rẻ du lịch và thăm người thân<br></br>ở mỹ, canada. Chat để tư vấn miến phí.</p>
                                </div>
                            </div>
                        </div>
                        <HPRow10 />
                        <div className="HP-row-11">
                            <p>Bạn muốn khám phá điều gì?</p>
                            <div className="HP-row-11-option">
                                <p>Các chặng bay hàng đầu</p>
                                <p></p>
                            </div>
                            <div className="HP-top-flight">
                                <div className="HP-top-flight-col">
                                    <a href="">Vé máy bay đi Đà Nẵng</a>
                                    <a href="">Vé máy bay đi Phú Quốc</a>
                                    <a href="">Vé máy bay đi Nha Trang</a>
                                    <a href="">Vé máy bay đi Hà Nội</a>
                                    <a href="">Vé máy bay đi Đà Lạt</a>
                                    <a href="">Vé máy bay đi Hải Phòng</a>
                                </div>
                                <div className="HP-top-flight-col">
                                    <a href="">Vé máy bay đi Hồ Chí Minh - Hà Nội</a>
                                    <a href="">Vé máy bay đi Hồ Chí Minh - Đà Nẵng</a>
                                    <a href="">Vé máy bay đi Hồ Chí Minh - Phú Quốc</a>
                                    <a href="">Vé máy bay đi Hồ Chí Minh - Nha Trang</a>
                                    <a href="">Vé máy bay đi Hồ Chí Minh - Đà Lạt</a>
                                    <a href="">Vé máy bay đi Singapore</a>
                                </div>
                                <div className="HP-top-flight-col">
                                    <a href="">Vé máy bay đi Hà Nội - Hồ Chí Minh</a>
                                    <a href="">Vé máy bay đi Hà Nội - Phú Quốc</a>
                                    <a href="">Vé máy bay đi Hà Nội - Đà Nẵng</a>
                                    <a href="">Vé máy bay đi Hà Nội - Nha Trang</a>
                                    <a href="">Vé máy bay đi Hà Nội - Đà Lạt</a>
                                    <a href="">Vé máy bay đi Hồ Chí Minh</a>
                                </div>
                                <div className="HP-top-flight-col">
                                    <a href="">Vé máy bay đi Đà Nẵng - Hà Nội</a>
                                    <a href="">Vé máy bay đi Đà Nẵng - Sài Gòn</a>
                                    <a href="">Vé máy bay đi Hồ Chí Minh - Bangkok</a>
                                    <a href="">Vé máy bay đi Hồ Chí Minh - Singapore</a>
                                    <a href="">Vé máy bay đi Hà Nội - Bangkok</a>
                                    <a href="">Vé máy bay đi Bangkok</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(HomePage);