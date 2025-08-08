import React from "react";
import { memo, useState, useEffect } from "react";
import './style.css';
import axios from 'axios';
import moment from "moment"

const VeDienTuTable = () => {
    const [veDienTu, setVeDienTu] = useState([]);
    useEffect(() => {
        const fetchVeDienTu = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/vedientu');
                setVeDienTu(response.data);
            } catch (error) {
                console.error('Error fetching vedientu data:', error);
            }
        };

        fetchVeDienTu();
    }, []);


    return (
        <div className="VT-container">
            <div className="VT-container-content">
                <h1>Bảng vé điện tử</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Mã đặt chỗ</th>
                            <th>Tình trạng chỗ</th>
                            <th>Cổng khởi hành</th>
                            <th>Cổng đến</th>
                            <th>Ngày đặt vé</th>
                            <th>Mã vé</th>
                            <th>Mã hoàn vé</th>
                            <th>Mã đổi lịch bay</th>
                        </tr>
                    </thead>
                    <tbody>
                        {veDienTu.map((VeDienTu) => (
                            <tr key={VeDienTu.MaDatCho}>
                                <td>{VeDienTu.MaDatCho}</td>
                                <td>{VeDienTu.TinhTrangCho}</td>
                                <td>{VeDienTu.CongKH}</td>
                                <td>{VeDienTu.CongDen}</td>
                                <td>{moment.utc(VeDienTu.NgayDatVe).format('DD/MM/YYYY')}</td>
                                <td>{VeDienTu.MaVe}</td>
                                <td>{VeDienTu.MaHV}</td>
                                <td>{VeDienTu.MaDLB}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default memo(VeDienTuTable);