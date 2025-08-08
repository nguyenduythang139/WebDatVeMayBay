import React from "react";
import { memo, useState, useEffect } from "react";
import './style.css';
import axios from 'axios';

const TaiKhoanNVTable = () => {
    const [taiKhoanNV, setTaiKhoanNV] = useState([]);
    useEffect(() => {
        const fetchTaiKhoanNV = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/taikhoannv');
                setTaiKhoanNV(response.data);
            } catch (error) {
                console.error('Error fetching taikhoannv data:', error);
            }
        };

        fetchTaiKhoanNV();
    }, []);


    return (
        <div className="VT-container">
            <div className="VT-container-content">
                <h1>Bảng tài khoản nhân viên</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Mã tài khoản</th>
                            <th>Tên tài khoản</th>
                            <th>Mật khẩu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taiKhoanNV.map((TaiKhoanNV) => (
                            <tr key={TaiKhoanNV.MaTK}>
                                <td>{TaiKhoanNV.MaTK}</td>
                                <td>{TaiKhoanNV.TenTK}</td>
                                <td>{TaiKhoanNV.MatKhau}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default memo(TaiKhoanNVTable);