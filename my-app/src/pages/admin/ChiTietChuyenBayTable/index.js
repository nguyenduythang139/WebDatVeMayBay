import React from "react";
import { memo, useState, useEffect } from "react";
import './style.css';
import axios from 'axios';
import moment from "moment";

const ChiTietChuyenBayTable = () => {
    const [chiTietChuyenBay, setChiTietChuyenBay] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentChiTietChuyenBay, setCurrentChiTietChuyenBay] = useState(null);
    const [formData, setFormData] = useState({
        MaCTCB: '',
        DiemKH: '',
        DiemDen: '',
        NgayKH: '',
        NgayDen: '',
        MaCB: '',
        MaDiemKH: '',
        MaDiemDen: '',
    });

    useEffect(() => {
        const fetchChiTietChuyenBay = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/chitietchuyenbay');
                setChiTietChuyenBay(response.data);
            } catch (error) {
                console.error('Error fetching chitietchuyenbay data:', error);
            }
        };

        fetchChiTietChuyenBay();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddChiTietChuyenBay = () => {
        setIsFormVisible(true);
        setIsEditing(false);
        setCurrentChiTietChuyenBay(null);
        setFormData({
            MaCTCB: '',
            DiemKH: '',
            DiemDen: '',
            NgayKH: '',
            NgayDen: '',
            MaCB: '',
            MaDiemKH: '',
            MaDiemDen: '',
        });
    };

    const handleEditChiTietChuyenBay = (chitietchuyenbay) => {
        setIsFormVisible(true);
        setIsEditing(true);
        setCurrentChiTietChuyenBay(chitietchuyenbay.MaCTCB);
        setFormData({
            ...chitietchuyenbay,
            MaCTCB: chitietchuyenbay.MaCTCB
        });
    };

    const handleSaveChiTietChuyenBay = async () => {
        try {
            if (isEditing) {
                await axios.put(`http://localhost:5000/api/chitietchuyenbay/${currentChiTietChuyenBay}`, formData);
                setChiTietChuyenBay(chiTietChuyenBay.map(v => (v.MaCTCB === currentChiTietChuyenBay ? formData : v)));
            } else {
                const { MaCTCB, ...chitietchuyenbayData } = formData;
                const response = await axios.post('http://localhost:5000/api/chitietchuyenbay', chitietchuyenbayData);
                setChiTietChuyenBay([...chiTietChuyenBay, response.data]);
            }
            setIsFormVisible(false);
            setCurrentChiTietChuyenBay(null);
            setFormData({
                MaCTCB: '',
                DiemKH: '',
                DiemDen: '',
                NgayKH: '',
                NgayDen: '',
                MaCB: '',
                MaDiemKH: '',
                MaDiemDen: '',
            });
        } catch (error) {
            console.error('Error saving chitietchuyenbay:', error);
        }
    };

    const handleDeleteChiTietChuyenBay = async (chitietchuyenbayId) => {
        try {
            await axios.delete(`http://localhost:5000/api/chitietchuyenbay/${chitietchuyenbayId}`);
            setChiTietChuyenBay(chiTietChuyenBay.filter(v => v.MaCTCB !== chitietchuyenbayId));
        } catch (error) {
            console.error('Error deleting chitietchuyenbay:', error);
        }
    };

    return (
        <div className="VT-container">
            <div className="VT-container-content">
                <h1>Bảng chi tiết chuyến bay</h1>
                <div className="Add-New">
                    <span><p>Danh sách chi tiết chuyến bay:</p></span>
                    <button className="button-add" onClick={handleAddChiTietChuyenBay}>Thêm CTCB</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Mã CTCB</th>
                            <th>Điểm khởi hành</th>
                            <th>Điểm đến</th>
                            <th>Ngày khởi hành</th>
                            <th>Ngày đến</th>
                            <th>Mã chuyến bay</th>
                            <th>Mã điểm khởi hành</th>
                            <th>Mã điểm đến</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chiTietChuyenBay.map((ChiTietChuyenBay) => (
                            <tr key={ChiTietChuyenBay.MaCTCB}>
                                <td>{ChiTietChuyenBay.MaCTCB}</td>
                                <td>{ChiTietChuyenBay.DiemKH}</td>
                                <td>{ChiTietChuyenBay.DiemDen}</td>
                                <td>{moment.utc(ChiTietChuyenBay.NgayKH).format('DD/MM/YYYY')}</td>
                                <td>{moment.utc(ChiTietChuyenBay.NgayDen).format('DD/MM/YYYY')}</td>
                                <td>{ChiTietChuyenBay.MaCB}</td>
                                <td>{ChiTietChuyenBay.MaDiemKH}</td>
                                <td>{ChiTietChuyenBay.MaDiemDen}</td>
                                <td>
                                    <button className="button-edit" onClick={() => handleEditChiTietChuyenBay(ChiTietChuyenBay)}>Sửa</button>
                                    <button className="button-delete" onClick={() => handleDeleteChiTietChuyenBay(ChiTietChuyenBay.MaCTCB)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isFormVisible && (
                <div className="VT-container-content-2">
                    <div className="form-container">
                        <h3>{isEditing ? 'Sửa thông tin chi tiết cb' : 'Thêm thông tin chi tiết cb mới'}</h3>
                        <form>
                            <input type="text" name="DiemKH" value={formData.DiemKH} onChange={handleInputChange} placeholder="Điểm khởi hành" />
                            <input type="text" name="DiemDen" value={formData.DiemDen} onChange={handleInputChange} placeholder="Điểm đến" />
                            <input type="date" name="NgayKH" value={formData.NgayKH} onChange={handleInputChange} placeholder="Ngày khởi hành" />
                            <input type="date" name="NgayDen" value={formData.NgayDen} onChange={handleInputChange} placeholder="Ngày đến" />
                            <input type="text" name="MaCB" value={formData.MaCB} onChange={handleInputChange} placeholder="Mã chuyến bay" />
                            <input type="text" name="MaDiemKH" value={formData.MaDiemKH} onChange={handleInputChange} placeholder="Mã điểm khởi hành" />
                            <input type="text" name="MaDiemDen" value={formData.MaDiemDen} onChange={handleInputChange} placeholder="Mã điểm đến" />
                            <button type="button" className="save" onClick={handleSaveChiTietChuyenBay}>
                                {isEditing ? 'Cập nhật' : 'Thêm'}
                            </button>
                            <button type="button" className="cancel" onClick={() => setIsFormVisible(false)}>Hủy</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
export default memo(ChiTietChuyenBayTable);