import React from "react";
import { memo, useState, useEffect } from "react";
import './style.css';
import axios from 'axios';

const TaiKhoanKHTable = () => {

    const [taiKhoanKH, setTaiKhoanKH] = useState([]);
    useEffect(() => {
        const fetchTaiKhoanKH = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/taikhoankh');
                setTaiKhoanKH(response.data);
            } catch (error) {
                console.error('Error fetching taikhoankh data:', error);
            }
        };

        fetchTaiKhoanKH();
    }, []);


    return (
        <div className="VT-container">
            <div className="VT-container-content">
                <h1>Bảng tài khoản khách hàng</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Mã tài khoản</th>
                            <th>Tên tài khoản</th>
                            <th>Mật khẩu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taiKhoanKH.map((TaiKhoanKH) => (
                            <tr key={TaiKhoanKH.MaTK}>
                                <td>{TaiKhoanKH.MaTK}</td>
                                <td>{TaiKhoanKH.TenTK}</td>
                                <td>{TaiKhoanKH.MatKhau}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default memo(TaiKhoanKHTable);