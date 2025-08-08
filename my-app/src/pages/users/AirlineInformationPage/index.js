import React from "react";
import { memo, useState, useEffect } from "react";
import './style.css';
import axios from 'axios';

//import icon
import { IoStar } from "react-icons/io5";

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

//sua duong dan hinh anh
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
};

const AirlineInformationPage = () => {
    const [airlines, setAirlines] = useState([]);

    useEffect(() => {
        const fetchAirlines = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/hanghangkhong');
                setAirlines(response.data);
            } catch (error) {
                console.error('Error fetching airline data:', error);
            }
        };

        fetchAirlines();

    }, []);

    axios.get('/api/airlines')
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Lỗi khi lấy dữ liệu hãng hàng không:', error);
        });

    return (
        <div className="AIP-container">
            <div className="AIP-container-content">
                <div className="row-1">
                    <div className="left">
                        <p>Đối tác hàng không</p>
                        <p>Đối tác hàng không nội địa và quốc tế</p>
                        <p>Những đối tác hàng không toàn cầu sẽ chắp cánh đưa bạn đến mọi địa điểm trên thế giới.</p>
                    </div>
                    <div className="right">
                        <img src={AIP_vietjetair} title="ve may bay vietjet air" />
                        <img src={AIP_vietnamair} title="ve may bay vietnam airlines" />
                        <img src={AIP_bambooair} title="ve may bay bamboo airways" />
                        <img src={AIP_viettravelair} title="ve may bay vietravel airlines" />
                        <img src={AIP_pacificair} title="ve may bay pacific airlines" />
                        <img src={AIP_nokair} title="ve may bay bay nok air" />
                        <img src={AIP_scootair} title="ve may bay scoot" />
                        <img src={AIP_singaporeair} title="ve may bay singapore airlines" />
                        <img src={AIP_malaysiaair} title="ve may bay malaysia airlines" />
                        <img src={AIP_cathayair} title="ve may bay cathay pacific" />
                        <img src={AIP_cepuair} title="ve may bay cepu pacific" />
                        <img src={AIP_emirateair} title="ve may bay emirates" />
                        <img src={AIP_thaiair} title="ve may bay thai airways" />
                        <img src={AIP_smileair} title="ve may bay thai smile" />
                        <img src={AIP_chinaair} title="ve may bay china airlines" />
                        <img src={AIP_etihadair} title="ve may bay etihad" />
                        <img src={AIP_hongkongair} title="ve may bay hongkong airlines" />
                        <img src={AIP_chinasouthernair} title="ve may bay china southern air" />
                        <img src={AIP_lionair} title="ve may bay lion air" />
                        <img src={AIP_quatarair} title="ve may bay qatar airways" />
                        <img src={AIP_koreanair} title="ve may bay korean air" />
                        <img src={AIP_japanair} title="ve may bay japan airlines" />
                        <img src={AIP_anaair} title="ve may bay ana airlines" />
                        <img src={AIP_asianaair} title="ve may bay asiana airlines" />
                        <img src={AIP_starluxair} title="ve may bay starlux airlines" />
                    </div>
                </div>
                <div className="row-2">
                    {airlines.map((airlines) => (
                        <div className="airlines" key={airlines.MaHHK}>
                            <div className="left">
                                <img className="AirlineLogo" src={imageMap[airlines.Logo] || `http://localhost:5000/images/${airlines.Logo}.png`} alt={airlines.TenHHK} />
                            </div>
                            <div className="right">
                                <p className="AirlineName">{airlines.TenHHK}</p>
                                <p className="AirlineInformation"><span>Giới thiệu: </span>{airlines.ThongTinHHK}</p>
                                <p className="AirlineReason"><span>Lý do nên chọn: </span>{airlines.LyDoHHK}</p>
                                <p className="AirlineHeadquarter"><span>Trụ sở: </span>{airlines.TruSoHHK}</p>
                                <p className="AirlineStandard"><span>Tiêu chuẩn: </span>{airlines.TieuChuanHHK} <i><IoStar /></i></p>
                                <a href={airlines.WebsiteHHK} className="website"><span>Website: </span>{airlines.WebsiteHHK}</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default memo(AirlineInformationPage);