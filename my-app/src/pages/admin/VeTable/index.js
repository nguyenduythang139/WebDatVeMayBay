import React from "react";
import { memo, useState, useEffect } from "react";
import './style.css';
import axios from 'axios';

const VeTable = () => {
    const [ve, setVe] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentVe, setCurrentVe] = useState(null);
    const [formData, setFormData] = useState({
        MaVe: '',
        Giave: '',
        HanhLyKG: '',
        HanhLyXT: '',
        ThongTinDL: '',
        ThongTinHV: '',
        HangGhe: '',
        MaCB: '',
        MaTT: ''
    });

    useEffect(() => {
        const fetchVe = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/ve');
                setVe(response.data);
            } catch (error) {
                console.error('Error fetching ve data:', error);
            }
        };

        fetchVe();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddVe = () => {
        setIsFormVisible(true);
        setIsEditing(false);
        setCurrentVe(null);
        setFormData({
            MaVe: '',
            Giave: '',
            HanhLyKG: '',
            HanhLyXT: '',
            ThongTinDL: '',
            ThongTinHV: '',
            HangGhe: '',
            MaCB: '',
            MaTT: ''
        });
    };

    const handleEditVe = (ve) => {
        setIsFormVisible(true);
        setIsEditing(true);
        setCurrentVe(ve.MaVe);
        setFormData({
            ...ve,
            MaVe: ve.MaVe
        });
    };

    const handleSaveVe = async () => {
        try {
            if (isEditing) {
                await axios.put(`http://localhost:5000/api/ve/${currentVe}`, formData);
                setVe(ve.map(v => (v.MaVe === currentVe ? formData : v)));
            } else {
                const { MaVe, ...veData } = formData;
                const response = await axios.post('http://localhost:5000/api/ve', veData);
                setVe([...ve, response.data]);
            }
            setIsFormVisible(false);
            setCurrentVe(null);
            setFormData({
                MaVe: '',
                Giave: '',
                HanhLyKG: '',
                HanhLyXT: '',
                ThongTinDL: '',
                ThongTinHV: '',
                HangGhe: '',
                MaCB: '',
                MaTT: ''
            });
        } catch (error) {
            console.error('Error saving ve:', error);
        }
    };

    const handleDeleteVe = async (veId) => {
        try {
            await axios.delete(`http://localhost:5000/api/ve/${veId}`);
            setVe(ve.filter(v => v.MaVe !== veId));
        } catch (error) {
            console.error('Error deleting ve:', error);
        }
    };

    //dinh dang gia tien
    const formatCurrency = (value) => {
        if (typeof value !== 'number') return '0';
        return value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    return (
        <div className="VT-container">
            <div className="VT-container-content">
                <h1>Bảng vé</h1>
                <div className="Add-New">
                    <span><p>Danh sách vé:</p></span>
                    <button className="button-add" onClick={handleAddVe}>Thêm vé</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Mã vé</th>
                            <th>Giá vé</th>
                            <th>Hành lý kí gửi</th>
                            <th>Hành lý xách tay</th>
                            <th>Thông tin DL</th>
                            <th>Thông tin HV</th>
                            <th>Hạng ghế</th>
                            <th>Mã chuyến bay</th>
                            <th>Mã thanh toán</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ve.map((ve) => (
                            <tr key={ve.MaVe}>
                                <td>{ve.MaVe}</td>
                                <td>{formatCurrency(ve.GiaVe)}</td>
                                <td>{ve.HanhLyKG}</td>
                                <td>{ve.HanhLyXT}</td>
                                <td>{ve.ThongTinDL}</td>
                                <td>{ve.ThongTinHV}</td>
                                <td>{ve.HangGhe}</td>
                                <td>{ve.MaCB}</td>
                                <td>{ve.MaTT}</td>
                                <td>
                                    <button className="button-edit" onClick={() => handleEditVe(ve)}>Sửa</button>
                                    <button className="button-delete" onClick={() => handleDeleteVe(ve.MaVe)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isFormVisible && (
                <div className="VT-container-content-2">
                    <div className="form-container">
                        <h3>{isEditing ? 'Sửa thông tin vé' : 'Thêm thông tin vé mới'}</h3>
                        <form>
                            <input type="text" name="GiaVe" value={formData.GiaVe} onChange={handleInputChange} placeholder="Giá vé" />
                            <input type="text" name="HanhLyKG" value={formData.HanhLyKG} onChange={handleInputChange} placeholder="Hành lý kí gửi" />
                            <input type="text" name="HanhLyXT" value={formData.HanhLyXT} onChange={handleInputChange} placeholder="Hành lý xách tay" />
                            <input type="text" name="ThongTinDL" value={formData.ThongTinDL} onChange={handleInputChange} placeholder="Thông tin đổi lịch" />
                            <input type="text" name="ThongTinHV" value={formData.ThongTinHV} onChange={handleInputChange} placeholder="Thông tin hoàn vé" />
                            <input type="text" name="HangGhe" value={formData.HangGhe} onChange={handleInputChange} placeholder="Hạng ghế" />
                            <input type="text" name="MaCB" value={formData.MaCB} onChange={handleInputChange} placeholder="Mã chuyến bay" />
                            <input type="text" name="MaTT" value={formData.MaTT} onChange={handleInputChange} placeholder="Mã thanh toán" />
                            <button type="button" className="save" onClick={handleSaveVe}>
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
export default memo(VeTable);