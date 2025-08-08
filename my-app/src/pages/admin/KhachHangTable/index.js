import React from "react";
import { memo, useState, useEffect } from "react";
import './style.css';
import axios from 'axios';
import moment from "moment";

const KhachHangTable = () => {
    const [khachHang, setKhachHang] = useState([]);
    useEffect(() => {
        const fetchKhachHang = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/khachhang');
                setKhachHang(response.data);
            } catch (error) {
                console.error('Error fetching khachhang data:', error);
            }
        };

        fetchKhachHang();
    }, []);


    return (
        <div className="VT-container">
            <div className="VT-container-content">
                <h1>Bảng khách hàng</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Mã khách hàng</th>
                            <th>Tên khách hàng</th>
                            <th>Ngày sinh</th>
                            <th>Giới tính</th>
                            <th>Địa chỉ</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th>Mã tài khoản</th>
                            <th>Mã thanh toán</th>
                        </tr>
                    </thead>
                    <tbody>
                        {khachHang.map((KhachHang) => (
                            <tr key={KhachHang.MaKH}>
                                <td>{KhachHang.MaKH}</td>
                                <td>{KhachHang.TenKH}</td>
                                <td>{moment.utc(KhachHang.NgaySinh).format('DD/MM/YYYY')}</td>
                                <td>{KhachHang.GioiTinh}</td>
                                <td>{KhachHang.DiaChi}</td>
                                <td>{KhachHang.SDT}</td>
                                <td>{KhachHang.Email}</td>
                                <td>{KhachHang.MaTK}</td>
                                <td>{KhachHang.MaTT}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default memo(KhachHangTable);