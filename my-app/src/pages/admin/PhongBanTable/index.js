import React from "react";
import { memo, useState, useEffect } from "react";
import './style.css';
import axios from 'axios';
import moment from "moment";

const PhongBanTable = () => {
    const [phongBan, setPhongBan] = useState([]);
    useEffect(() => {
        const fetchPhongBan = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/phongban');
                setPhongBan(response.data);
            } catch (error) {
                console.error('Error fetching phongban data:', error);
            }
        };

        fetchPhongBan();
    }, []);


    return (
        <div className="VT-container">
            <div className="VT-container-content">
                <h1>Bảng phòng ban</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Mã phòng ban</th>
                            <th>Tên phòng ban</th>
                        </tr>
                    </thead>
                    <tbody>
                        {phongBan.map((PhongBan) => (
                            <tr key={PhongBan.MaPB}>
                                <td>{PhongBan.MaPB}</td>
                                <td>{PhongBan.TenPB}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default memo(PhongBanTable);