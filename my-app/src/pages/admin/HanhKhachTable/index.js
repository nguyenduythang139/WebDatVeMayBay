import React from "react";
import { memo, useState, useEffect } from "react";
import './style.css';
import axios from 'axios';
import moment from "moment";

const HanhKhachTable = () => {
    const [hanhKhach, setHanhKhach] = useState([]);
    useEffect(() => {
        const fetchHanhKhach = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/hanhkhach');
                setHanhKhach(response.data);
            } catch (error) {
                console.error('Error fetching hanhkhach data:', error);
            }
        };

        fetchHanhKhach();
    }, []);


    return (
        <div className="VT-container">
            <div className="VT-container-content">
                <h1>Bảng hành khách</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Mã hành khách</th>
                            <th>Tên hành khách</th>
                            <th>Số CCCD</th>
                            <th>Ngày sinh</th>
                            <th>Giới tính</th>
                            <th>Quốc tịch</th>
                            <th>Danh xưng</th>
                            <th>Mã khách hàng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hanhKhach.map((HanhKhach) => (
                            <tr key={HanhKhach.MaHK}>
                                <td>{HanhKhach.MaHK}</td>
                                <td>{HanhKhach.TenHK}</td>
                                <td>{HanhKhach.CCCD}</td>
                                <td>{moment.utc(HanhKhach.NgaySinh).format('DD/MM/YYYY')}</td>
                                <td>{HanhKhach.GioiTinh}</td>
                                <td>{HanhKhach.QuocTich}</td>
                                <td>{HanhKhach.DanhXung}</td>
                                <td>{HanhKhach.MaKH}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default memo(HanhKhachTable);