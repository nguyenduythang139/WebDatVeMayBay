import React from "react";
import { memo, useState, useEffect } from "react";
import './style.css';
import axios from 'axios';
import moment from "moment";

const NhanVienTable = () => {
    const [nhanVien, setNhanVien] = useState([]);
    useEffect(() => {
        const fetchNhanVien = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/nhanvien');
                setNhanVien(response.data);
            } catch (error) {
                console.error('Error fetching nhanvien data:', error);
            }
        };

        fetchNhanVien();
    }, []);


    return (
        <div className="VT-container">
            <div className="VT-container-content">
                <h1>Bảng nhân viên</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Mã nhân viên</th>
                            <th>Tên nhân viên</th>
                            <th>Ngày sinh</th>
                            <th>Giới tính</th>
                            <th>Chức vụ</th>
                            <th>Địa chỉ</th>
                            <th>Mã phòng ban</th>
                            <th>Mã tài khoản</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nhanVien.map((NhanVien) => (
                            <tr key={NhanVien.MaNV}>
                                <td>{NhanVien.MaNV}</td>
                                <td>{NhanVien.TenNV}</td>
                                <td>{moment.utc(NhanVien.NgaySinh).format('DD/MM/YYYY')}</td>
                                <td>{NhanVien.GioiTinh}</td>
                                <td>{NhanVien.ChucVu}</td>
                                <td>{NhanVien.DiaChi}</td>
                                <td>{NhanVien.MaPB}</td>
                                <td>{NhanVien.MaTK}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default memo(NhanVienTable);