import React from "react";
import { memo, useState, useEffect } from "react";
import './style.css';
import axios from 'axios';

const DSHoanVeTable = () => {
    const [dsHoanVe, setDSHoanVe] = useState([]);
    useEffect(() => {
        const fetchDSHoanVe = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/dshoanve');
                setDSHoanVe(response.data);
            } catch (error) {
                console.error('Error fetching dshoanve data:', error);
            }
        };

        fetchDSHoanVe();
    }, []);


    return (
        <div className="VT-container">
            <div className="VT-container-content">
                <h1>Bảng danh sách hoàn vé</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Mã hoàn vé</th>
                            <th>Lý do hoàn vé</th>
                            <th>Số tiền hoàn vé</th>
                            <th>Phương thức hoàn tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dsHoanVe.map((DSHoanVe) => (
                            <tr key={DSHoanVe.MaHV}>
                                <td>{DSHoanVe.MaHV}</td>
                                <td>{DSHoanVe.LyDoHV}</td>
                                <td>{DSHoanVe.SoTienHV}</td>
                                <td>{DSHoanVe.PTHoanTien}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default memo(DSHoanVeTable);