import React, { memo, useState, useEffect } from "react";
import './style.css';
import axios from 'axios';

const HangHangKhongTable = () => {
    const [hangHangKhong, setHangHangKhong] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentHHK, setCurrentHHK] = useState(null);
    const [formData, setFormData] = useState({
        MaHHK: '',
        TenHHK: '',
        QuocGia: '',
        Logo: '',
        ThongTinHHK: '',
        LyDoHHK: '',
        TruSoHHK: '',
        TieuChuanHHK: '',
        WebsiteHHK: ''
    });

    useEffect(() => {
        const fetchHangHangKhong = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/hanghangkhong');
                setHangHangKhong(response.data);
            } catch (error) {
                console.error('Error fetching hanghangkhong data:', error);
            }
        };

        fetchHangHangKhong();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddHHK = () => {
        setIsFormVisible(true);
        setIsEditing(false);
        setCurrentHHK(null);
        setFormData({
            MaHHK: '',
            TenHHK: '',
            QuocGia: '',
            Logo: '',
            ThongTinHHK: '',
            LyDoHHK: '',
            TruSoHHK: '',
            TieuChuanHHK: '',
            WebsiteHHK: ''
        });
    };

    const handleEditHHK = (hanghangkhong) => {
        setIsFormVisible(true);
        setIsEditing(true);
        setCurrentHHK(hanghangkhong.MaHHK);
        setFormData({
            ...hanghangkhong,
            MaHHK: hanghangkhong.MaHHK
        });
    };

    const handleSaveHHK = async () => {
        try {
            if (isEditing) {
                console.log('Updating HHK:', formData);
                await axios.put(`http://localhost:5000/api/hanghangkhong/${currentHHK}`, formData);
                setHangHangKhong(hangHangKhong.map(v => (v.MaHHK === currentHHK ? formData : v)));
            } else {
                const { MaHHK, ...hanghangkhongData } = formData;
                const response = await axios.post('http://localhost:5000/api/hanghangkhong', hanghangkhongData);
                setHangHangKhong([...hangHangKhong, response.data]);
            }
            setIsFormVisible(false);
            setCurrentHHK(null);
            setFormData({
                MaHHK: '',
                TenHHK: '',
                QuocGia: '',
                Logo: '',
                ThongTinHHK: '',
                LyDoHHK: '',
                TruSoHHK: '',
                TieuChuanHHK: '',
                WebsiteHHK: ''
            });
        } catch (error) {
            console.error('Error saving hanghangkhong:', error);
        }
    };

    const handleDeleteHHK = async (HangHangKhongId) => {
        try {
            await axios.delete(`http://localhost:5000/api/hanghangkhong/${HangHangKhongId}`);
            setHangHangKhong(hangHangKhong.filter(v => v.MaHHK !== HangHangKhongId));
        } catch (error) {
            console.error('Error deleting hanghangkhong:', error);
        }
    };

    return (
        <div className="VT-container">
            <div className="VT-container-content">
                <h1>Bảng hãng hàng không</h1>
                <div className="Add-New">
                    <span><p>Danh sách hãng hàng không:</p></span>
                    <button className="button-add" onClick={handleAddHHK}>Thêm HHK</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Mã HHK</th>
                            <th>Tên HHK</th>
                            <th>Quốc gia</th>
                            <th>Logo HHK</th>
                            <th>Thông tin HHK</th>
                            <th>Lý do HHK</th>
                            <th>Trụ sở HHK</th>
                            <th>Tiêu chuẩn HHK</th>
                            <th>Website HHK</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hangHangKhong.map((hangHangKhong) => (
                            <tr key={hangHangKhong.MaHHK}>
                                <td>{hangHangKhong.MaHHK}</td>
                                <td>{hangHangKhong.TenHHK}</td>
                                <td>{hangHangKhong.QuocGia}</td>
                                <td>{hangHangKhong.Logo}</td>
                                <td>{hangHangKhong.ThongTinHHK}</td>
                                <td>{hangHangKhong.LyDoHHK}</td>
                                <td>{hangHangKhong.TruSoHHK}</td>
                                <td>{hangHangKhong.TieuChuanHHK}</td>
                                <td>{hangHangKhong.WebsiteHHK}</td>
                                <td>
                                    <button className="button-edit" onClick={() => handleEditHHK(hangHangKhong)}>Sửa</button>
                                    <button className="button-delete" onClick={() => handleDeleteHHK(hangHangKhong.MaHHK)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isFormVisible && (
                <div className="VT-container-content-2">
                    <div className="form-container">
                        <h3>{isEditing ? 'Sửa thông tin HHK' : 'Thêm thông tin HHK mới'}</h3>
                        <form>
                            <input type="text" name="TenHHK" value={formData.TenHHK} onChange={handleInputChange} placeholder="Tên HHK" />
                            <input type="text" name="QuocGia" value={formData.QuocGia} onChange={handleInputChange} placeholder="Quốc gia" />
                            <input type="text" name="Logo" value={formData.Logo} onChange={handleInputChange} placeholder="Logo HHK" />
                            <input type="text" name="ThongTinHHK" value={formData.ThongTinHHK} onChange={handleInputChange} placeholder="Thông tin HHK" />
                            <input type="text" name="LyDoHHK" value={formData.LyDoHHK} onChange={handleInputChange} placeholder="Lý do HHK" />
                            <input type="text" name="TruSoHHK" value={formData.TruSoHHK} onChange={handleInputChange} placeholder="Trụ sở HHK" />
                            <input type="text" name="TieuChuanHHK" value={formData.TieuChuanHHK} onChange={handleInputChange} placeholder="Tiêu chuẩn HHK" />
                            <input type="text" name="WebsiteHHK" value={formData.WebsiteHHK} onChange={handleInputChange} placeholder="Website HHK" />
                            <button type="button" className="save" onClick={handleSaveHHK}>
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

export default memo(HangHangKhongTable);