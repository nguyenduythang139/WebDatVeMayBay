import React, { useState, useEffect } from "react";
import './style.css';
import axios from 'axios';
import moment from "moment";

const VoucherTable = () => {
    const [vouchers, setVouchers] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentVoucher, setCurrentVoucher] = useState(null);
    const [formData, setFormData] = useState({
        MaVoucher: '',
        DieuKienSuDung: '',
        GiaTriVoucher: '',
        LogoVoucher: '',
        TenVoucher: '',
        NgayBatDau: '',
        NgayKetThuc: '',
        TieuDe: '',
        GiaTriDKSD: ''
    });

    useEffect(() => {
        const fetchVouchers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/voucher');
                setVouchers(response.data);
            } catch (error) {
                console.error('Error fetching voucher data:', error);
            }
        };

        fetchVouchers();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddVoucher = () => {
        setIsFormVisible(true);
        setIsEditing(false);
        setCurrentVoucher(null);
        setFormData({
            MaVoucher: '',
            DieuKienSuDung: '',
            GiaTriVoucher: '',
            LogoVoucher: '',
            TenVoucher: '',
            NgayBatDau: '',
            NgayKetThuc: '',
            TieuDe: '',
            GiaTriDKSD: ''
        });
    };

    const handleEditVoucher = (voucher) => {
        setIsFormVisible(true);
        setIsEditing(true);
        setCurrentVoucher(voucher.MaVoucher);
        setFormData({
            ...voucher,
            MaVoucher: voucher.MaVoucher
        });
    };

    const handleSaveVoucher = async () => {
        try {
            if (isEditing) {
                await axios.put(`http://localhost:5000/api/voucher/${currentVoucher}`, formData);
                setVouchers(vouchers.map(v => (v.MaVoucher === currentVoucher ? formData : v)));
            } else {
                const { MaVoucher, ...voucherData } = formData;
                const response = await axios.post('http://localhost:5000/api/voucher', voucherData);
                setVouchers([...vouchers, response.data]);
            }
            setIsFormVisible(false);
            setCurrentVoucher(null);
            setFormData({
                MaVoucher: '',
                DieuKienSuDung: '',
                GiaTriVoucher: '',
                LogoVoucher: '',
                TenVoucher: '',
                NgayBatDau: '',
                NgayKetThuc: '',
                TieuDe: '',
                GiaTriDKSD: ''
            });
        } catch (error) {
            console.error('Error saving voucher:', error);
        }
    };

    const handleDeleteVoucher = async (voucherId) => {
        try {
            await axios.delete(`http://localhost:5000/api/voucher/${voucherId}`);
            setVouchers(vouchers.filter(v => v.MaVoucher !== voucherId));
        } catch (error) {
            console.error('Error deleting voucher:', error);
        }
    };

    return (
        <div className="VT-container">
            <div className="VT-container-content">
                <h1>Bảng voucher</h1>
                <div className="Add-New">
                    <span><p>Danh sách voucher:</p></span>
                    <button className="button-add" onClick={handleAddVoucher}>Thêm voucher</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Mã voucher</th>
                            <th>Điều kiện sử dụng</th>
                            <th>Giá trị voucher</th>
                            <th>Logo voucher</th>
                            <th>Tên voucher</th>
                            <th>Ngày bắt đầu</th>
                            <th>Ngày kết thúc</th>
                            <th>Tiêu đề</th>
                            <th>Giá trị DKSD</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vouchers.map((voucher) => (
                            <tr key={voucher.MaVoucher}>
                                <td>{voucher.MaVoucher}</td>
                                <td>{voucher.DieuKienSuDung}</td>
                                <td>{voucher.GiaTriVoucher}</td>
                                <td>{voucher.LogoVoucher}</td>
                                <td>{voucher.TenVoucher}</td>
                                <td>{moment.utc(voucher.NgayBatDau).format('DD/MM/YYYY')}</td>
                                <td>{moment.utc(voucher.NgayKetThuc).format('DD/MM/YYYY')}</td>
                                <td>{voucher.TieuDe}</td>
                                <td>{voucher.GiaTriDKSD}</td>
                                <td>
                                    <button className="button-edit" onClick={() => handleEditVoucher(voucher)}>Sửa</button>
                                    <button className="button-delete" onClick={() => handleDeleteVoucher(voucher.MaVoucher)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isFormVisible && (
                <div className="VT-container-content-2">
                    <div className="form-container">
                        <h3>{isEditing ? 'Sửa thông tin voucher' : 'Thêm thông tin voucher mới'}</h3>
                        <form>
                            <input type="text" name="DieuKienSuDung" value={formData.DieuKienSuDung} onChange={handleInputChange} placeholder="Điều kiện sử dụng" />
                            <input type="text" name="GiaTriVoucher" value={formData.GiaTriVoucher} onChange={handleInputChange} placeholder="Giá trị voucher" />
                            <input type="text" name="LogoVoucher" value={formData.LogoVoucher} onChange={handleInputChange} placeholder="Logo voucher" />
                            <input type="text" name="TenVoucher" value={formData.TenVoucher} onChange={handleInputChange} placeholder="Tên voucher" />
                            <input type="date" name="NgayBatDau" value={formData.NgayBatDau} onChange={handleInputChange} placeholder="Ngày bắt đầu" />
                            <input type="date" name="NgayKetThuc" value={formData.NgayKetThuc} onChange={handleInputChange} placeholder="Ngày kết thúc" />
                            <input type="text" name="TieuDe" value={formData.TieuDe} onChange={handleInputChange} placeholder="Tiêu đề" />
                            <input type="text" name="GiaTriDKSD" value={formData.GiaTriDKSD} onChange={handleInputChange} placeholder="Giá trị DKSD" />
                            <button type="button" className="save" onClick={handleSaveVoucher}>
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

export default VoucherTable;