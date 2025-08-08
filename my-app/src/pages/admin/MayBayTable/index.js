import React from "react";
import { memo, useState, useEffect } from "react";
import './style.css';
import axios from 'axios';

const MayBayTable = () => {
    const [mayBay, setMayBay] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentMayBay, setCurrentMayBay] = useState(null);
    const [formData, setFormData] = useState({
        MaMB: '',
        TenMB: '',
    });

    useEffect(() => {
        const fetchMayBay = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/maybay');
                setMayBay(response.data);
            } catch (error) {
                console.error('Error fetching maybay data:', error);
            }
        };

        fetchMayBay();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddMayBay = () => {
        setIsFormVisible(true);
        setIsEditing(false);
        setCurrentMayBay(null);
        setFormData({
            MaMB: '',
            TenMB: '',
        });
    };

    const handleEditMayBay = (maybay) => {
        setIsFormVisible(true);
        setIsEditing(true);
        setCurrentMayBay(maybay.MaMB);
        setFormData({
            ...maybay,
            MaMB: maybay.MaMB
        });
    };

    const handleSaveMayBay = async () => {
        try {
            if (isEditing) {
                await axios.put(`http://localhost:5000/api/maybay/${currentMayBay}`, formData);
                setMayBay(mayBay.map(v => (v.MaMB === currentMayBay ? formData : v)));
            } else {
                const { MaMB, ...maybayData } = formData;
                const response = await axios.post('http://localhost:5000/api/maybay', maybayData);
                setMayBay([...mayBay, response.data]);
            }
            setIsFormVisible(false);
            setCurrentMayBay(null);
            setFormData({
                MaMB: '',
                TenMB: '',
            });
        } catch (error) {
            console.error('Error saving maybay:', error);
        }
    };

    const handleDeleteMayBay = async (maybayId) => {
        try {
            await axios.delete(`http://localhost:5000/api/maybay/${maybayId}`);
            setMayBay(mayBay.filter(v => v.MaMB !== maybayId));
        } catch (error) {
            console.error('Error deleting maybay:', error);
        }
    };

    return (
        <div className="VT-container">
            <div className="VT-container-content">
                <h1>Bảng máy bay</h1>
                <div className="Add-New">
                    <span><p>Danh sách máy bay:</p></span>
                    <button className="button-add" onClick={handleAddMayBay}>Thêm máy bay</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Mã máy bay</th>
                            <th>Tên máy bay</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mayBay.map((MayBay) => (
                            <tr key={MayBay.MaMB}>
                                <td>{MayBay.MaMB}</td>
                                <td>{MayBay.TenMB}</td>
                                <td>
                                    <button className="button-edit" onClick={() => handleEditMayBay(MayBay)}>Sửa</button>
                                    <button className="button-delete" onClick={() => handleDeleteMayBay(MayBay.MaCB)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isFormVisible && (
                <div className="VT-container-content-2">
                    <div className="form-container">
                        <h3>{isEditing ? 'Sửa thông tin máy bay' : 'Thêm thông tin máy bay mới'}</h3>
                        <form>
                            <input type="text" name="TenMB" value={formData.TenMB} onChange={handleInputChange} placeholder="Tên máy bay" />
                            <button type="button" className="save" onClick={handleSaveMayBay}>
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
export default memo(MayBayTable);