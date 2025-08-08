import React from "react";
import { memo, useState, useEffect } from "react";
import './style.css';
import axios from 'axios';
import moment from "moment"

const DSDoiLichBayTable = () => {
    const [dsDoiLichBay, setDSDoiLichBay] = useState([]);
    useEffect(() => {
        const fetchDSDoiLichBay = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/dsdoilichbay');
                setDSDoiLichBay(response.data);
            } catch (error) {
                console.error('Error fetching dsdoilichbay data:', error);
            }
        };

        fetchDSDoiLichBay();
    }, []);


    return (
        <div className="VT-container">
            <div className="VT-container-content">
                <h1>Bảng danh sách đổi lịch bay</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Mã đổi lịch bay</th>
                            <th>Lý do đổi lịch</th>
                            <th>Ngày khởi hành mới</th>
                            <th>Ngày đến mới</th>
                            <th>Giờ khởi hành mới</th>
                            <th>Giờ đến mới</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dsDoiLichBay.map((DSDoiLichBay) => (
                            <tr key={DSDoiLichBay.MaDLB}>
                                <td>{DSDoiLichBay.MaDLB}</td>
                                <td>{DSDoiLichBay.LyDoDLB}</td>
                                <td>{moment.utc(DSDoiLichBay.NgayKHM).format('DD/MM/YYYY')}</td>
                                <td>{moment.utc(DSDoiLichBay.NgayDenM).format('DD/MM/YYYY')}</td>
                                <td>{moment.utc(DSDoiLichBay.GioKHM).format('HH:mm')}</td>
                                <td>{moment.utc(DSDoiLichBay.GioDenM).format('HH:mm')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default memo(DSDoiLichBayTable);