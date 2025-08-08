import React from "react";
import { memo, useState, useEffect } from "react";
import './style.css';
import axios from 'axios';
import moment from "moment";

const ChuyenBayTable = () => {
    const [ChuyenBay, setChuyenBay] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentChuyenBay, setCurrentChuyenBay] = useState(null);
    const [formData, setFormData] = useState({
        MaCB: '',
        GioKH: '',
        SoGioBay: '',
        SoDiemDung: '',
        SoLuongGT: '',
        GioDen: '',
        QuangDuong: '',
        SanBayKH: '',
        SanBayDen: '',
        MaHHK: '',
        MaMB: '',
        KhuVuc: '',
    });

    useEffect(() => {
        const fetchChuyenBay = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/chuyenbay');
                setChuyenBay(response.data);
            } catch (error) {
                console.error('Error fetching chuyenbay data:', error);
            }
        };

        fetchChuyenBay();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddChuyenBay = () => {
        setIsFormVisible(true);
        setIsEditing(false);
        setCurrentChuyenBay(null);
        setFormData({
            MaCB: '',
            GioKH: '',
            SoGioBay: '',
            SoDiemDung: '',
            SoLuongGT: '',
            GioDen: '',
            QuangDuong: '',
            SanBayKH: '',
            SanBayDen: '',
            MaHHK: '',
            MaMB: '',
            KhuVuc: '',
        });
    };

    const handleEditChuyenBay = (chuyenbay) => {
        setIsFormVisible(true);
        setIsEditing(true);
        setCurrentChuyenBay(chuyenbay.MaCB);
        setFormData({
            ...chuyenbay,
            MaCB: chuyenbay.MaCB
        });
    };

    const handleSaveChuyenBay = async () => {
        try {
            if (isEditing) {
                await axios.put(`http://localhost:5000/api/chuyenbay/${currentChuyenBay}`, formData);
                setChuyenBay(ChuyenBay.map(v => (v.MaCB === currentChuyenBay ? formData : v)));
            } else {
                const { MaCB, ...chuyenbayData } = formData;
                const response = await axios.post('http://localhost:5000/api/chuyenbay', chuyenbayData);
                setChuyenBay([...ChuyenBay, response.data]);
            }
            setIsFormVisible(false);
            setCurrentChuyenBay(null);
            setFormData({
                MaCB: '',
                GioKH: '',
                SoGioBay: '',
                SoDiemDung: '',
                SoLuongGT: '',
                GioDen: '',
                QuangDuong: '',
                SanBayKH: '',
                SanBayDen: '',
                MaHHK: '',
                MaMB: '',
                KhuVuc: '',
            });
        } catch (error) {
            console.error('Error saving chuyenbay:', error);
        }
    };

    const handleDeleteChuyenBay = async (chuyenbayId) => {
        try {
            await axios.delete(`http://localhost:5000/api/chuyenbay/${chuyenbayId}`);
            setChuyenBay(ChuyenBay.filter(v => v.MaCB !== chuyenbayId));
        } catch (error) {
            console.error('Error deleting chuyenbay:', error);
        }
    };

    return (
        <div className="VT-container">
            <div className="VT-container-content">
                <h1>Bảng chuyến bay</h1>
                <div className="Add-New">
                    <span><p>Danh sách chuyến bay:</p></span>
                    <button className="button-add" onClick={handleAddChuyenBay}>Thêm chuyến bay</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Mã chuyến bay</th>
                            <th>Giờ khởi hành</th>
                            <th>Số giờ bay</th>
                            <th>Số điểm dừng</th>
                            <th>Số lượng ghế trống</th>
                            <th>Giờ đến</th>
                            <th>Quãng đường</th>
                            <th>Sân bay KH</th>
                            <th>Sân bay đến</th>
                            <th>Mã HHK</th>
                            <th>Mã MB</th>
                            <th>Khu vực</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ChuyenBay.map((ChuyenBay) => (
                            <tr key={ChuyenBay.MaCB}>
                                <td>{ChuyenBay.MaCB}</td>
                                <td>{moment.utc(ChuyenBay.GioKH).format('HH:mm')}</td>
                                <td>{ChuyenBay.SoGioBay}</td>
                                <td>{ChuyenBay.SoDiemDung}</td>
                                <td>{ChuyenBay.SoLuongGT}</td>
                                <td>{moment.utc(ChuyenBay.GioDen).format('HH:mm')}</td>
                                <td>{ChuyenBay.QuangDuong}</td>
                                <td>{ChuyenBay.SanBayKH}</td>
                                <td>{ChuyenBay.SanBayDen}</td>
                                <td>{ChuyenBay.MaHHK}</td>
                                <td>{ChuyenBay.MaMB}</td>
                                <td>{ChuyenBay.KhuVuc}</td>
                                <td>
                                    <button className="button-edit" onClick={() => handleEditChuyenBay(ChuyenBay)}>Sửa</button>
                                    <button className="button-delete" onClick={() => handleDeleteChuyenBay(ChuyenBay.MaCB)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isFormVisible && (
                <div className="VT-container-content-2">
                    <div className="form-container">
                        <h3>{isEditing ? 'Sửa thông tin chuyến bay' : 'Thêm thông tin chuyến bay mới'}</h3>
                        <form>
                            <input type="text" name="GioKH" value={formData.GioKH} onChange={handleInputChange} placeholder="Giờ khởi hành" />
                            <input type="text" name="SoGioBay" value={formData.SoGioBay} onChange={handleInputChange} placeholder="Số giờ bay" />
                            <input type="text" name="SoDiemDung" value={formData.SoDiemDung} onChange={handleInputChange} placeholder="Số điểm dừng" />
                            <input type="text" name="SoLuongGT" value={formData.SoLuongGT} onChange={handleInputChange} placeholder="Số lượng ghế trống" />
                            <input type="text" name="GioDen" value={formData.GioDen} onChange={handleInputChange} placeholder="Giờ đến" />
                            <input type="text" name="QuangDuong" value={formData.QuangDuong} onChange={handleInputChange} placeholder="Quãng đường" />
                            <input type="text" name="SanBayKH" value={formData.SanBayKH} onChange={handleInputChange} placeholder="Sân bay khởi hành" />
                            <input type="text" name="SanBayDen" value={formData.SanBayDen} onChange={handleInputChange} placeholder="Sân bay đến" />
                            <input type="text" name="MaHHK" value={formData.MaHHK} onChange={handleInputChange} placeholder="Mã hãng hàng không" />
                            <input type="text" name="MaMB" value={formData.MaMB} onChange={handleInputChange} placeholder="Mã máy bay" />
                            <input type="text" name="KhuVuc" value={formData.KhuVuc} onChange={handleInputChange} placeholder="Khu vực (nội địa hay quốc tế)" />
                            <button type="button" className="save" onClick={handleSaveChuyenBay}>
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
export default memo(ChuyenBayTable);