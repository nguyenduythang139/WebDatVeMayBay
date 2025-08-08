import React from "react";
import { memo, useState, useEffect } from "react";
import './style.css';
import { useNavigate } from "react-router-dom";

//import duong dan
import { ROUTERS } from "../../../../utils/router";

const HeaderAdmin = () => {

    const navigate = useNavigate();
    const handleClick = (e, path) => {
        e.preventDefault();
        navigate(path);
    }

    return (
        <div className="HeaderAdmin-container">
            <div className="HeaderAdmin-container-content">
                <div className="HeaderAdmin-container-content-left">
                    <a href={ROUTERS.USER.HomePage} onClick={(e) => handleClick(e, ROUTERS.USER.HomePage)}>
                        <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/9/97f3e7a54e9c6987283b78e016664776.svg" alt="Logo" />
                    </a>
                </div>
                <div className="HeaderAdmin-container-content-right">
                    <ul>
                        <li>
                            Bảng dữ liệu
                            <div className="Dropdown">
                                <ul>
                                    <li><a href={ROUTERS.ADMIN.VoucherTable} onClick={(e) => handleClick(e, ROUTERS.ADMIN.VoucherTable)}>Bảng Voucher</a></li>
                                    <li><a href={ROUTERS.ADMIN.HangHangKhongTable} onClick={(e) => handleClick(e, ROUTERS.ADMIN.HangHangKhongTable)}>Bảng HHK</a></li>
                                    <li><a href={ROUTERS.ADMIN.KhachHangTable} onClick={(e) => handleClick(e, ROUTERS.ADMIN.KhachHangTable)}>Bảng KhachHang</a></li>
                                    <li><a href={ROUTERS.ADMIN.HanhKhachTable} onClick={(e) => handleClick(e, ROUTERS.ADMIN.HanhKhachTable)}>Bảng HanhKhach</a></li>
                                    <li><a href={ROUTERS.ADMIN.TaiKhoanKHTable} onClick={(e) => handleClick(e, ROUTERS.ADMIN.TaiKhoanKHTable)}>Bảng TaiKhoanKH</a></li>
                                    <li><a href={ROUTERS.ADMIN.TaiKhoanNVTable} onClick={(e) => handleClick(e, ROUTERS.ADMIN.TaiKhoanNVTable)}>Bảng TaiKhoanNV</a></li>
                                    <li><a href={ROUTERS.ADMIN.NhanVienTable} onClick={(e) => handleClick(e, ROUTERS.ADMIN.NhanVienTable)}>Bảng NhanVien</a></li>
                                    <li><a href={ROUTERS.ADMIN.PhongBanTable} onClick={(e) => handleClick(e, ROUTERS.ADMIN.PhongBanTable)}>Bảng PhongBan</a></li>
                                    <li><a href={ROUTERS.ADMIN.DSDoiLichBayTable} onClick={(e) => handleClick(e, ROUTERS.ADMIN.DSDoiLichBayTable)}>Bảng DSDoiLichBay</a></li>
                                    <li><a href={ROUTERS.ADMIN.DSHoanVeTable} onClick={(e) => handleClick(e, ROUTERS.ADMIN.DSHoanVeTable)}>Bảng DSHoanVe</a></li>
                                    <li><a href={ROUTERS.ADMIN.VeTable} onClick={(e) => handleClick(e, ROUTERS.ADMIN.VeTable)}>Bảng Ve</a></li>
                                    <li><a href={ROUTERS.ADMIN.ChiTietChuyenBayTable} onClick={(e) => handleClick(e, ROUTERS.ADMIN.ChiTietChuyenBayTable)}>Bảng ChiTietChuyenBay</a></li>
                                    <li><a href={ROUTERS.ADMIN.ChuyenBayTable} onClick={(e) => handleClick(e, ROUTERS.ADMIN.ChuyenBayTable)}>Bảng ChuyenBay</a></li>
                                    <li><a href={ROUTERS.ADMIN.MayBayTable} onClick={(e) => handleClick(e, ROUTERS.ADMIN.MayBayTable)}>Bảng MayBay</a></li>
                                    <li><a href={ROUTERS.ADMIN.ThanhToanTable} onClick={(e) => handleClick(e, ROUTERS.ADMIN.ThanhToanTable)}>Bảng ThanhToan</a></li>
                                    <li><a href={ROUTERS.ADMIN.VeDienTuTable} onClick={(e) => handleClick(e, ROUTERS.ADMIN.VeDienTuTable)}>Bảng VeDienTu</a></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default memo(HeaderAdmin);