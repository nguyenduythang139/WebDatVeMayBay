const sql = require('mssql');
const config = require('./dbConfig');

const executeQuery = async (query) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query(query);
        console.log(result.recordset);
        return result.recordset;
    } catch (error) {
        console.log(error);
    }
};


//phan user
const registerAccount = async ({ TenTK, MatKhau }) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('TenTK', sql.VarChar, TenTK)
            .input('MatKhau', sql.VarChar, MatKhau)
            .query('INSERT INTO TaiKhoanKH (TenTK, MatKhau) OUTPUT INSERTED.MaTK VALUES (@TenTK, @MatKhau)');
        return result;
    } catch (error) {
        console.error('SQL error:', error);
        throw error;
    }
};

const registerCustomer = async ({ SDT, NgaySinh, TenKH, GioiTinh, DiaChi, Email, MaTK, MaTT }) => {
    try {
        let pool = await sql.connect(config);
        await pool.request()
            .input('SDT', sql.VarChar, SDT)
            .input('NgaySinh', sql.Date, NgaySinh)
            .input('TenKH', sql.VarChar, TenKH)
            .input('GioiTinh', sql.NVarChar, GioiTinh)
            .input('DiaChi', sql.NVarChar, DiaChi)
            .input('Email', sql.VarChar, Email)
            .input('MaTK', sql.Int, MaTK)
            .input('MaTT', sql.Int, MaTT)
            .query('INSERT INTO KhachHang (SDT, NgaySinh, TenKH, GioiTinh, DiaChi, Email, MaTK, MaTT) VALUES (@SDT, @NgaySinh, @TenKH, @GioiTinh, @DiaChi, @Email, @MaTK, @MaTT)');
    } catch (error) {
        console.error('SQL error:', error);
        throw error;
    }
};

const login = async (username, password) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('TenTK', sql.VarChar, username)
            .input('MatKhau', sql.VarChar, password)
            .query('SELECT a.*, b.MaKH FROM TaiKhoanKH a, KhachHang b WHERE a.TenTK = @TenTK AND a.MatKhau = @MatKhau and a.MaTK = b.MaTK');
        return result;
    } catch (error) {
        console.error('SQL error:', error);
        throw error;
    }
};

async function getVeByMaVe(MaVe) {
    try {
        let pool = await sql.connect(config);
        let Ve = await pool.request()
            .input('MaVe', sql.Int, MaVe)
            .query("SELECT * FROM Ve a, MayBay b, ChuyenBay c, ChiTietChuyenBay d, HangHangKhong e WHERE a.MaVe = @Mave and a.MaCB = c.MaCB and c.MaHHK = e.MaHHK and c.MaMB = b.MaMB and d.MaCB = c.MaCB");
        return Ve.recordset[0];
    } catch (error) {
        console.error('SQL error', error);
    }
}

async function getVeDienTuByMaVe(MaVe) {
    try {
        let pool = await sql.connect(config);
        let VeDienTu = await pool.request()
            .input('MaVe', sql.Int, MaVe)
            .query("SELECT * FROM VeDienTu where MaVe = @MaVe");
        return VeDienTu.recordset[0];
    } catch (error) {
        console.error('SQL error', error);
    }
}

async function getKhachHangByMaTK(MaTK) {
    try {
        let pool = await sql.connect(config);
        let khachHang = await pool.request()
            .input('MaTK', sql.Int, MaTK)
            .query('SELECT * FROM KhachHang WHERE MaTK = @MaTK');
        return khachHang.recordset[0];
    } catch (error) {
        console.error('SQL error', error);
    }
}

const updateKhachHang = async (MaTK, updatedInfo) => {
    try {
        const pool = await sql.connect(config);
        if (!pool) {
            throw new Error('Database pool is not initialized');
        }

        const request = pool.request();
        if (!request) {
            throw new Error('Request object is not initialized');
        }

        const query = `
            UPDATE KhachHang
            SET TenKH = @TenKH, GioiTinh = @GioiTinh, DiaChi = @DiaChi, Email = @Email
            WHERE MaTK = @MaTK;
        `;

        const result = await request
            .input('TenKH', updatedInfo.TenKH)
            .input('GioiTinh', updatedInfo.GioiTinh)
            .input('DiaChi', updatedInfo.DiaChi)
            .input('Email', updatedInfo.Email)
            .input('MaTK', MaTK)
            .query(query);

        if (result.rowsAffected && result.rowsAffected[0] > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error updating KhachHang:', error);
        throw error;
    }
};

const updateHangGhe = async (MaVe, HangGhe) => {
    const pool = await sql.connect(config);

    try {
        const result = await pool.request()
            .input('MaVe', sql.Int, MaVe)
            .input('HangGhe', sql.NVarChar, HangGhe)
            .query('UPDATE Ve SET HangGhe = @HangGhe WHERE MaVe = @MaVe');
        return result;
    } catch (error) {
        console.error('Lỗi khi cập nhật HangGhe:', error);
        throw error;
    }
};

async function addHanhKhach(CCCD, TenHK, GioiTinh, NgaySinh, QuocTich, DanhXung, MaKH) {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('CCCD', sql.VarChar, CCCD)
            .input('TenHK', sql.VarChar, TenHK)
            .input('GioiTinh', sql.NVarChar, GioiTinh)
            .input('NgaySinh', sql.Date, new Date(NgaySinh))
            .input('QuocTich', sql.VarChar, QuocTich)
            .input('DanhXung', sql.NVarChar, DanhXung)
            .input('MaKH', sql.Int, MaKH)
            .query(`
                INSERT INTO HanhKhach (CCCD, TenHK, GioiTinh, NgaySinh, QuocTich, DanhXung, MaKH)
                VALUES (@CCCD, @TenHK, @GioiTinh, @NgaySinh, @QuocTich, @DanhXung, @MaKH)
            `);
        return result;
    } catch (error) {
        throw new Error('Lỗi khi thêm thông tin hành khách: ' + error.message);
    }
}

async function addThanhToan(PhuongThucTT, TongTienTT, TrangThaiTT, NgayHanChotTT) {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('PhuongThucTT', sql.NVarChar, PhuongThucTT)
            .input('TongTienTT', sql.Decimal, TongTienTT)
            .input('TrangThaiTT', sql.NVarChar, TrangThaiTT)
            .input('NgayHanChotTT', sql.Date, new Date(NgayHanChotTT))
            .query(`
                INSERT INTO ThanhToan (PhuongThucTT, TongTienTT, TrangThaiTT, NgayHanChotTT)
                OUTPUT Inserted.MaTT
                VALUES (@PhuongThucTT, @TongTienTT, @TrangThaiTT, @NgayHanChotTT)
            `);
        return result;
    } catch (error) {
        throw new Error('Lỗi khi thêm thông tin thanh toán: ' + error.message);
    }
}

async function updateMaTTVe(MaVe, MaTT) {
    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input('MaVe', sql.Int, MaVe)
            .input('MaTT', sql.Int, MaTT)
            .query(`
                UPDATE Ve
                SET MaTT = @MaTT
                WHERE MaVe = @MaVe
            `);
    } catch (error) {
        throw new Error('Lỗi khi cập nhật bảng Ve: ' + error.message);
    }
}

async function updateMaTTKhachHang(MaKH, MaTT) {
    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input('MaKH', sql.Int, MaKH)
            .input('MaTT', sql.Int, MaTT)
            .query(`
                UPDATE KhachHang
                SET MaTT = @MaTT
                WHERE MaKH = @MaKH
            `);
    } catch (error) {
        throw new Error('Lỗi khi cập nhật bảng KhachHang: ' + error.message);
    }
}

async function addVeDienTu(MaVe, NgayDatVe) {
    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input('MaVe', sql.Int, MaVe)
            .input('TinhTrangCho', sql.NVarChar, 'Chưa xác nhận')
            .input('CongKH', sql.NVarChar, 'TERMINAL-1')
            .input('CongDen', sql.NVarChar, 'TERMINAL-1')
            .input('NgayDatVe', sql.DateTime, NgayDatVe)
            .query(`
                INSERT INTO VeDienTu (MaVe, TinhTrangCho, CongKH, CongDen, NgayDatVe)
                VALUES (@MaVe, @TinhTrangCho, @CongKH, @CongDen, @NgayDatVe)
            `);
    } catch (error) {
        throw new Error('Lỗi khi thêm dữ liệu vào VeDienTu: ' + error.message);
    }
}

async function getLichSuVeByMaTK(MaTK) {
    try {
        let pool = await sql.connect(config);
        let Ve = await pool.request()
            .input('MaTK', sql.Int, MaTK)
            .query('SELECT * FROM TaiKhoanKH a, KhachHang b, ThanhToan c, Ve d, ChiTietChuyenBay e, ChuyenBay f, HangHangKhong g, VeDienTu h WHERE a.MaTK = @MaTK and a.MaTK = b.MaTK and b.MaTT = c.MaTT and d.MaTT = c.MaTT and d.MaCB = f.MaCB and e.MaCB = f.MaCB and f.MaHHK = g.MaHHK and h.MaVe = d.MaVe');
        return Ve.recordset;
    } catch (error) {
        console.error('SQL error', error);
    }
}

//phan admin

//them xoa sua voucher
const addVoucher = async (voucherData) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('DieuKienSuDung', sql.NVarChar, voucherData.DieuKienSuDung)
            .input('GiaTriVoucher', sql.Float, voucherData.GiaTriVoucher)
            .input('LogoVoucher', sql.VarChar, voucherData.LogoVoucher)
            .input('TenVoucher', sql.VarChar, voucherData.TenVoucher)
            .input('NgayBatDau', sql.Date, voucherData.NgayBatDau)
            .input('NgayKetThuc', sql.Date, voucherData.NgayKetThuc)
            .input('TieuDe', sql.NVarChar, voucherData.TieuDe)
            .input('GiaTriDKSD', sql.Float, voucherData.GiaTriDKSD)
            .query('INSERT INTO Voucher (DieuKienSuDung, GiaTriVoucher, LogoVoucher, TenVoucher, NgayBatDau, NgayKetThuc, TieuDe, GiaTriDKSD) VALUES (@DieuKienSuDung, @GiaTriVoucher, @LogoVoucher, @TenVoucher, @NgayBatDau, @NgayKetThuc, @TieuDe, @GiaTriDKSD)');
        return result.rowsAffected[0];
    } catch (error) {
        throw new Error('Error adding voucher: ' + error.message);
    }
};

const updateVoucher = async (id, voucherData) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('MaVoucher', sql.Int, id)
            .input('DieuKienSuDung', sql.NVarChar, voucherData.DieuKienSuDung)
            .input('GiaTriVoucher', sql.Float, voucherData.GiaTriVoucher)
            .input('LogoVoucher', sql.VarChar, voucherData.LogoVoucher)
            .input('TenVoucher', sql.VarChar, voucherData.TenVoucher)
            .input('NgayBatDau', sql.Date, voucherData.NgayBatDau)
            .input('NgayKetThuc', sql.Date, voucherData.NgayKetThuc)
            .input('TieuDe', sql.NVarChar, voucherData.TieuDe)
            .input('GiaTriDKSD', sql.Float, voucherData.GiaTriDKSD)
            .query('UPDATE Voucher SET DieuKienSuDung = @DieuKienSuDung, GiaTriVoucher = @GiaTriVoucher, LogoVoucher = @LogoVoucher, TenVoucher = @TenVoucher, NgayBatDau = @NgayBatDau, NgayKetThuc = @NgayKetThuc, TieuDe = @TieuDe, GiaTriDKSD = @GiaTriDKSD WHERE MaVoucher = @MaVoucher');
        return result.rowsAffected[0];
    } catch (error) {
        throw new Error('Error updating voucher: ' + error.message);
    }
};

const deleteVoucher = async (id) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('MaVoucher', sql.Int, id)
            .query('DELETE FROM Voucher WHERE MaVoucher = @MaVoucher');
        return result.rowsAffected[0];
    } catch (error) {
        throw new Error('Error deleting voucher: ' + error.message);
    }
};

//them xoa sua hanghangkhong
const addHangHangKhong = async (hanghangkhongData) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('TenHHK', sql.VarChar, hanghangkhongData.TenHHK)
            .input('QuocGia', sql.VarChar, hanghangkhongData.QuocGia)
            .input('Logo', sql.VarChar, hanghangkhongData.Logo)
            .input('ThongTinHHK', sql.NVarChar, hanghangkhongData.ThongTinHHK)
            .input('LyDoHHK', sql.NVarChar, hanghangkhongData.LyDoHHK)
            .input('TruSoHHK', sql.NVarChar, hanghangkhongData.TruSoHHK)
            .input('TieuChuanHHK', sql.Int, hanghangkhongData.TieuChuanHHK)
            .input('WebsiteHHK', sql.VarChar, hanghangkhongData.WebsiteHHK)
            .query('INSERT INTO HangHangKhong (TenHHK, QuocGia, Logo, ThongTinHHK, LyDoHHK, TruSoHHK, TieuChuanHHK, WebsiteHHK) VALUES (@TenHHK, @QuocGia, @Logo, @ThongTinHHK, @LyDoHHK, @TruSoHHK, @TieuChuanHHK, @WebsiteHHK)');
        return result.rowsAffected[0];
    } catch (error) {
        throw new Error('Error adding hanghangkhong: ' + error.message);
    }
};

const updateHangHangKhong = async (id, hanghangkhongData) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('MaHHK', sql.Int, id)
            .input('TenHHK', sql.VarChar, hanghangkhongData.TenHHK)
            .input('QuocGia', sql.VarChar, hanghangkhongData.QuocGia)
            .input('Logo', sql.VarChar, hanghangkhongData.Logo)
            .input('ThongTinHHK', sql.NVarChar, hanghangkhongData.ThongTinHHK)
            .input('LyDoHHK', sql.NVarChar, hanghangkhongData.LyDoHHK)
            .input('TruSoHHK', sql.NVarChar, hanghangkhongData.TruSoHHK)
            .input('TieuChuanHHK', sql.Int, hanghangkhongData.TieuChuanHHK)
            .input('WebsiteHHK', sql.VarChar, hanghangkhongData.WebsiteHHK)
            .query('UPDATE HangHangKhong SET TenHHK = @TenHHK, QuocGia = @QuocGia, Logo = @Logo, ThongTinHHK = @ThongTinHHK, LyDoHHK = @LyDoHHK, TruSoHHK = @TruSoHHK, TieuChuanHHK = @TieuChuanHHK, WebsiteHHK = @WebsiteHHK WHERE MaHHK = @MaHHK');
        return result.rowsAffected[0];
    } catch (error) {
        throw new Error('Error updating hanghangkhong: ' + error.message);
    }
};

const deleteHangHangKhong = async (id) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('MaHHK', sql.Int, id)
            .query('DELETE FROM HangHangKhong WHERE MaHHK = @MaHHK');
        return result.rowsAffected[0];
    } catch (error) {
        throw new Error('Error deleting hanghangkhong: ' + error.message);
    }
};

//them xoa sua ve
const addVe = async (veData) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('MaVe', sql.Int, veData.MaVe)
            .input('GiaVe', sql.Float, veData.GiaVe)
            .input('HanhLyKG', sql.Int, veData.HanhLyKG)
            .input('HanhLyXT', sql.Int, veData.HanhLyXT)
            .input('ThongTinDL', sql.NVarChar, veData.ThongTinDL)
            .input('ThongTinHV', sql.NVarChar, veData.ThongTinHV)
            .input('HangGhe', sql.NVarChar, veData.HangGhe)
            .input('MaCB', sql.Int, veData.MaCB)
            .input('MaTT', sql.Int, veData.MaTT)
            .query('INSERT INTO Ve (MaVe, GiaVe, HanhLyKG, HanhLyXT, ThongTinDL, ThongTinHV, HangGhe, MaCB, MaTT) VALUES (@MaVe, @GiaVe, @HanhLyKG, @HanhLyXT, @ThongTinDL, @ThongTinHV, @HangGhe, @MaCB, @MaTT)');
        return result.rowsAffected[0];
    } catch (error) {
        throw new Error('Error adding ve: ' + error.message);
    }
};

const updateVe = async (id, veData) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('MaVe', sql.Int, veData.MaVe)
            .input('GiaVe', sql.Float, veData.GiaVe)
            .input('HanhLyKG', sql.Int, veData.HanhLyKG)
            .input('HanhLyXT', sql.Int, veData.HanhLyXT)
            .input('ThongTinDL', sql.NVarChar, veData.ThongTinDL)
            .input('ThongTinHV', sql.NVarChar, veData.ThongTinHV)
            .input('HangGhe', sql.NVarChar, veData.HangGhe)
            .input('MaCB', sql.Int, veData.MaCB)
            .input('MaTT', sql.Int, veData.MaTT)
            .query('UPDATE Ve SET GiaVe = @GiaVe, HanhLyKG = @HanhLyKG, HanhLyXT = @HanhLyXT, ThongTinDL = @ThongTinDL, ThongTinHV = @ThongTinHV, HangGhe = @HangGhe, MaCB = @MaCB, MaTT = @MaTT WHERE MaVe = @MaVe');
        return result.rowsAffected[0];
    } catch (error) {
        throw new Error('Error updating ve: ' + error.message);
    }
};

const deleteVe = async (id) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('MaVe', sql.Int, id)
            .query('DELETE FROM Ve WHERE MaVe = @MaVe');
        return result.rowsAffected[0];
    } catch (error) {
        throw new Error('Error deleting ve: ' + error.message);
    }
};

//them xoa sua chi tiet chuyen bay
const addChiTietChuyenBay = async (ChiTietChuyenBayData) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('MaCTCB', sql.Int, ChiTietChuyenBayData.MaCTCB)
            .input('DiemKH', sql.NVarChar, ChiTietChuyenBayData.DiemKH)
            .input('DiemDen', sql.NVarChar, ChiTietChuyenBayData.DiemDen)
            .input('NgayKH', sql.Date, ChiTietChuyenBayData.NgayKH)
            .input('NgayDen', sql.Date, ChiTietChuyenBayData.NgayDen)
            .input('MaCB', sql.Int, ChiTietChuyenBayData.MaCB)
            .input('MaDiemKH', sql.VarChar, ChiTietChuyenBayData.MaDiemKH)
            .input('MaDiemDen', sql.VarChar, ChiTietChuyenBayData.MaDiemDen)
            .query('INSERT INTO ChiTietChuyenBay (MaCTCB, DiemKH, DiemDen, NgayKH, NgayDen, MaCB, MaDiemKH, MaDiemDen) VALUES (@MaCTCB, @DiemKH, @DiemDen, @NgayKH, @NgayDen, @MaCB, @MaDiemKH, @MaDiemDen)');
        return result.rowsAffected[0];
    } catch (error) {
        throw new Error('Error adding chitietchuyenbay: ' + error.message);
    }
};

const updateChiTietChuyenBay = async (id, ChiTietChuyenBayData) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('MaCTCB', sql.Int, ChiTietChuyenBayData.MaCTCB)
            .input('DiemKH', sql.NVarChar, ChiTietChuyenBayData.DiemKH)
            .input('DiemDen', sql.NVarChar, ChiTietChuyenBayData.DiemDen)
            .input('NgayKH', sql.Date, ChiTietChuyenBayData.NgayKH)
            .input('NgayDen', sql.Date, ChiTietChuyenBayData.NgayDen)
            .input('MaCB', sql.Int, ChiTietChuyenBayData.MaCB)
            .input('MaDiemKH', sql.VarChar, ChiTietChuyenBayData.MaDiemKH)
            .input('MaDiemDen', sql.VarChar, ChiTietChuyenBayData.MaDiemDen)
            .query('UPDATE ChiTietChuyenBay SET DiemKH = @DiemKH, DiemDen = @DiemDen, NgayKH = @NgayKH, NgayDen = @NgayDen, MaCB = @MaCB, MaDiemKH = @MaDiemKH, MaDiemDen = @MaDiemDen WHERE MaCTCB = @MaCTCB');
        return result.rowsAffected[0];
    } catch (error) {
        throw new Error('Error updating chitietchuyenbay: ' + error.message);
    }
};

const deleteChiTietChuyenBay = async (id) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('MaCTCB', sql.Int, id)
            .query('DELETE FROM ChiTietChuyenBay WHERE MaCTCB = @MaCTCB');
        return result.rowsAffected[0];
    } catch (error) {
        throw new Error('Error deleting chitietchuyenbay: ' + error.message);
    }
};

//them xoa sua chuyen bay
const addChuyenBay = async (ChuyenBayData) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('MaCB', sql.Int, ChuyenBayData.MaCB)
            .input('GioKH', sql.Time, ChuyenBayData.GioKH)
            .input('SoGioBay', sql.VarChar, ChuyenBayData.SoGioBay)
            .input('SoDiemDung', sql.Int, ChuyenBayData.SoDiemDung)
            .input('SoLuongGT', sql.Int, ChuyenBayData.SoLuongGT)
            .input('GioDen', sql.Time, ChuyenBayData.GioDen)
            .input('QuangDuong', sql.Int, ChuyenBayData.QuangDuong)
            .input('SanBayKH', sql.NVarChar, ChuyenBayData.SanBayKH)
            .input('SanBayDen', sql.NVarChar, ChuyenBayData.SanBayDen)
            .input('MaHHK', sql.Int, ChuyenBayData.MaHHK)
            .input('MaMB', sql.Int, ChuyenBayData.MaMB)
            .input('KhuVuc', sql.NVarChar, ChuyenBayData.KhuVuc)
            .query('INSERT INTO ChiTietChuyenBay (MaCB, GioKH, SoGioBay, SoDiemDung, SoLuongGT, GioDen, QuangDuong, SanBayKH, SanBayDen, MaHHK, MaMB, KhuVuc) VALUES (@MaCB, @GioKH, @SoGioBay, @SoDiemDung, @SoLuongGT, @GioDen, @QuangDuong, @SanBayKH, @SanBayDen, @MaHHK, @MaMB, @KhuVuc)');
        return result.rowsAffected[0];
    } catch (error) {
        throw new Error('Error adding chuyenbay: ' + error.message);
    }
};

const updateChuyenBay = async (id, ChuyenBayData) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('MaCB', sql.Int, ChuyenBayData.MaCB)
            .input('GioKH', sql.Time, ChuyenBayData.GioKH)
            .input('SoGioBay', sql.VarChar, ChuyenBayData.SoGioBay)
            .input('SoDiemDung', sql.Int, ChuyenBayData.SoDiemDung)
            .input('SoLuongGT', sql.Int, ChuyenBayData.SoLuongGT)
            .input('GioDen', sql.Time, ChuyenBayData.GioDen)
            .input('QuangDuong', sql.Int, ChuyenBayData.QuangDuong)
            .input('SanBayKH', sql.NVarChar, ChuyenBayData.SanBayKH)
            .input('SanBayDen', sql.NVarChar, ChuyenBayData.SanBayDen)
            .input('MaHHK', sql.Int, ChuyenBayData.MaHHK)
            .input('MaMB', sql.Int, ChuyenBayData.MaMB)
            .input('KhuVuc', sql.NVarChar, ChuyenBayData.KhuVuc)
            .query('UPDATE ChuyenBay SET GioKH = @GioKH, SoGioBay = @SoGioBay, SoDiemDung = @SoDiemDung, SoLuongGT = @SoLuongGT, GioDen = @GioDen, QuangDuong = @QuangDuong, SanBayKH = @SanBayKH, SanBayDen = @SanBayDen, MaHHK = @MaHHK, MaMB = @MaMB, KhuVuc = @KhuVuc WHERE MaCB = @MaCB');
        return result.rowsAffected[0];
    } catch (error) {
        throw new Error('Error updating chuyenbay: ' + error.message);
    }
};

const deleteChuyenBay = async (id) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('MaCB', sql.Int, id)
            .query('DELETE FROM ChuyenBay WHERE MaCB = @MaCB');
        return result.rowsAffected[0];
    } catch (error) {
        throw new Error('Error deleting chuyenbay: ' + error.message);
    }
};

//them xoa sua may bay
const addMayBay = async (MayBayData) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('MaMB', sql.Int, MayBayData.MaMB)
            .input('TenMB', sql.Time, MayBayData.TenMB)
            .query('INSERT INTO MayBay (MaMB, TenMB) VALUES (@MaMB, @TenMB)');
        return result.rowsAffected[0];
    } catch (error) {
        throw new Error('Error adding maybay: ' + error.message);
    }
};

const updateMayBay = async (id, MayBayData) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('MaMB', sql.Int, MayBayData.MaMB)
            .input('TenMB', sql.Time, MayBayData.TenMB)
            .query('UPDATE MayBay SET TenMB = @TenMB WHERE MaMB = @MaMB');
        return result.rowsAffected[0];
    } catch (error) {
        throw new Error('Error updating maybay: ' + error.message);
    }
};

const deleteMayBay = async (id) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('MaMB', sql.Int, id)
            .query('DELETE FROM MayBay WHERE MaMB = @MaMB');
        return result.rowsAffected[0];
    } catch (error) {
        throw new Error('Error deleting maybay: ' + error.message);
    }
};

const getVoucherByTenVoucher = async (tenVoucher) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('TenVoucher', sql.NVarChar, tenVoucher)
            .query('SELECT * FROM Voucher WHERE TenVoucher = @TenVoucher');

        return result.recordset[0];
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
};

const updateVeVoucher = async (maVe, maVoucher) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('MaVe', sql.Int, maVe)
            .input('MaVoucher', sql.Int, maVoucher)
            .query('INSERT INTO Ve_Voucher (MaVe, MaVoucher) VALUES (@MaVe, @MaVoucher)');

        return result.rowsAffected[0] > 0;
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
};

const getChiTietChuyenBay = () => executeQuery("SELECT * FROM ChiTietChuyenBay");
const getChuyenBay = () => executeQuery("SELECT * FROM ChuyenBay");
const getDSDoiLichBay = () => executeQuery("SELECT * FROM DSDoiLichBay");
const getDSHoanVe = () => executeQuery("SELECT * FROM DSHoanVe");
const getHangHangKhong = () => executeQuery("SELECT * FROM HangHangKhong");
const getHanhKhach = () => executeQuery("SELECT * FROM HanhKhach");
const getKhachHang = () => executeQuery("SELECT * FROM KhachHang");
const getMayBay = () => executeQuery("SELECT * FROM MayBay");
const getNhanVien = () => executeQuery("SELECT * FROM NhanVien");
const getPhongBan = () => executeQuery("SELECT * FROM PhongBan");
const getTaiKhoanKH = () => executeQuery("SELECT * FROM TaiKhoanKH");
const getTaiKhoanNV = () => executeQuery("SELECT * FROM TaiKhoanNV");
const getThanhToan = () => executeQuery("SELECT * FROM ThanhToan");
const getVe = () => executeQuery("SELECT * FROM Ve a, MayBay b, ChuyenBay c, ChiTietChuyenBay d, HangHangKhong e WHERE a.MaCB = c.MaCB and c.MaHHK = e.MaHHK and c.MaMB = b.MaMB and d.MaCB = c.MaCB");
const getVe_Voucher = () => executeQuery("SELECT * FROM Ve_Voucher");
const getVoucher = () => executeQuery("SELECT * FROM Voucher");
const getVeDienTu = () => executeQuery("SELECT * FROM VeDienTu");

module.exports = {
    getChiTietChuyenBay,
    getChuyenBay,
    getDSDoiLichBay,
    getDSHoanVe,
    getHangHangKhong,
    getHanhKhach,
    getKhachHangByMaTK,
    getKhachHang,
    getMayBay,
    getNhanVien,
    getPhongBan,
    getTaiKhoanKH,
    getTaiKhoanNV,
    getThanhToan,
    getVe,
    getVeByMaVe,
    getVeDienTu,
    getVeDienTuByMaVe,
    getVe_Voucher,
    getVoucher,
    getLichSuVeByMaTK,
    registerAccount,
    registerCustomer,
    login,
    updateKhachHang,
    updateMaTTKhachHang,
    updateHangGhe,
    updateMaTTVe,
    addHanhKhach,
    addThanhToan,
    addVeDienTu,
    addVoucher,
    updateVoucher,
    deleteVoucher,
    addHangHangKhong,
    updateHangHangKhong,
    deleteHangHangKhong,
    addVe,
    updateVe,
    deleteVe,
    addChiTietChuyenBay,
    updateChiTietChuyenBay,
    deleteChiTietChuyenBay,
    addChuyenBay,
    updateChuyenBay,
    deleteChuyenBay,
    addMayBay,
    updateMayBay,
    deleteMayBay,
    getVoucherByTenVoucher,
    updateVeVoucher
};