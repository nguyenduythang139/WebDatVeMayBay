import React from "react";
import { memo, useState, useEffect } from "react";
import './style.css';
import axios from 'axios';
import moment from "moment"

const ThanhToanTable = () => {
    const [thanhToan, setThanhToan] = useState([]);
    useEffect(() => {
        const fetchThanhToan = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/thanhtoan');
                setThanhToan(response.data);
            } catch (error) {
                console.error('Error fetching thanhtoan data:', error);
            }
        };

        fetchThanhToan();
    }, []);


    return (
        <div className="VT-container">
            <div className="VT-container-content">
                <h1>Bảng thanh toán</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Mã thanh toán</th>
                            <th>Phương thức thanh toán</th>
                            <th>Tổng tiền thanh toán</th>
                            <th>Ngày hạn chót thanh toán</th>
                            <th>Trạng thái thanh toán</th>
                            <th>Ngày thanh toán</th>
                        </tr>
                    </thead>
                    <tbody>
                        {thanhToan.map((ThanhToan) => (
                            <tr key={ThanhToan.MaTT}>
                                <td>{ThanhToan.MaTT}</td>
                                <td>{ThanhToan.PhuongThucTT}</td>
                                <td>{ThanhToan.TongTienTT}</td>
                                <td>{moment.utc(ThanhToan.NgayHanChotTT).format('DD/MM/YYYY')}</td>
                                <td>{ThanhToan.TrangThaiTT}</td>
                                <td>{moment.utc(ThanhToan.NgayTT).format('DD/MM/YYYY')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default memo(ThanhToanTable);