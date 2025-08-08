const express = require('express');
const dbOperation = require('./dbFiles/dbOperation');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());


//phan user
app.get('/api/chitietchuyenbay', async (req, res) => {
    try {
        const data = await dbOperation.getChiTietChuyenBay();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error retrieving data');
    }
});

app.get('/api/chuyenbay', async (req, res) => {
    try {
        const data = await dbOperation.getChuyenBay();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error retrieving data');
    }
});

app.get('/api/dsdoilichbay', async (req, res) => {
    try {
        const data = await dbOperation.getDSDoiLichBay();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error retrieving data');
    }
});

app.get('/api/dshoanve', async (req, res) => {
    try {
        const data = await dbOperation.getDSHoanVe();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error retrieving data');
    }
});

app.get('/api/hanghangkhong', async (req, res) => {
    try {
        const data = await dbOperation.getHangHangKhong();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error retrieving data');
    }
});

app.get('/api/hanhkhach', async (req, res) => {
    try {
        const data = await dbOperation.getHanhKhach();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error retrieving data');
    }
});

app.get('/api/khachhang', async (req, res) => {
    try {
        const data = await dbOperation.getKhachHang();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error retrieving data');
    }
});

app.get('/api/khachhang/:MaTK', async (req, res) => {
    try {
        const MaTK = req.params.MaTK;
        const data = await dbOperation.getKhachHangByMaTK(MaTK);
        if (data) {
            res.json(data);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send('Error retrieving data');
    }
});

app.put('/api/khachhang/:MaTK', async (req, res) => {
    const MaTK = req.params.MaTK;
    const updatedInfo = req.body;

    try {
        console.log('Updating KhachHang with MaTK:', MaTK);
        console.log('Updated info:', updatedInfo);

        const result = await dbOperation.updateKhachHang(MaTK, updatedInfo);

        if (result) {
            res.status(200).json({ message: 'Update successful' });
        } else {
            res.status(404).send('KhachHang not found');
        }
    } catch (error) {
        console.error('Error updating KhachHang:', error);
        res.status(500).json({ message: 'Error updating KhachHang' });
    }
});

app.get('/api/maybay', async (req, res) => {
    try {
        const data = await dbOperation.getMayBay();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error retrieving data');
    }
});

app.get('/api/nhanvien', async (req, res) => {
    try {
        const data = await dbOperation.getNhanVien();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error retrieving data');
    }
});

app.get('/api/phongban', async (req, res) => {
    try {
        const data = await dbOperation.getPhongBan();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error retrieving data');
    }
});

app.get('/api/taikhoankh', async (req, res) => {
    try {
        const data = await dbOperation.getTaiKhoanKH();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error retrieving data');
    }
});

app.get('/api/taikhoannv', async (req, res) => {
    try {
        const data = await dbOperation.getTaiKhoanNV();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error retrieving data');
    }
});

app.get('/api/thanhtoan', async (req, res) => {
    try {
        const data = await dbOperation.getThanhToan();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error retrieving data');
    }
});

app.get('/api/ve', async (req, res) => {
    try {
        const data = await dbOperation.getVe();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error retrieving data');
    }
});

app.get('/api/ve/:MaVe', async (req, res) => {
    try {
        const MaVe = req.params.MaVe;
        const data = await dbOperation.getVeByMaVe(MaVe);
        if (data) {
            res.json(data);
        } else {
            res.status(404).send('Ve not found');
        }
    } catch (error) {
        res.status(500).send('Error retrieving data');
    }
});

app.get('/api/ve_voucher', async (req, res) => {
    try {
        const data = await dbOperation.getVe_Voucher();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error retrieving data');
    }
});

app.get('/api/voucher', async (req, res) => {
    try {
        const data = await dbOperation.getVoucher();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error retrieving data');
    }
});

app.get('/api/vedientu', async (req, res) => {
    try {
        const data = await dbOperation.getVeDienTu();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error retrieving data');
    }
});

app.get('/api/vedientu/:MaVe', async (req, res) => {
    try {
        const MaVe = req.params.MaVe;
        const data = await dbOperation.getVeDienTuByMaVe(MaVe);
        if (data) {
            res.json(data);
        } else {
            res.status(404).send('Ve not found');
        }
    } catch (error) {
        res.status(500).send('Error retrieving data');
    }
});

app.get('/api/lichsudatve/:MaTK', async (req, res) => {
    try {
        const MaTK = req.params.MaTK;
        const data = await dbOperation.getLichSuVeByMaTK(MaTK);
        if (data && data.length > 0) {
            res.json(data);
        } else {
            res.status(404).send('Ve not found');
        }
    } catch (error) {
        res.status(500).send('Error retrieving data');
    }
});

app.post('/api/register', async (req, res) => {
    const { TenTK, MatKhau, SDT, NgaySinh, TenKH, GioiTinh, DiaChi, Email } = req.body;

    try {
        const accountResult = await dbOperation.registerAccount({ TenTK, MatKhau });

        if (accountResult && accountResult.recordset && accountResult.recordset[0]) {
            const MaTK = accountResult.recordset[0].MaTK;

            await dbOperation.registerCustomer({
                SDT,
                NgaySinh,
                TenKH,
                GioiTinh,
                DiaChi,
                Email,
                MaTK,
                MaTT: null
            });

            res.status(201).json({ message: 'Registration successful' });
        } else {
            throw new Error('Account registration failed');
        }
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await dbOperation.login(username, password);

        if (result && result.recordset && result.recordset.length > 0) {
            // Found matching user, login successful
            const user = result.recordset[0];
            res.status(200).json({ message: 'Login successful', user });
        } else {
            // No matching user found, login failed
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error during login' });
    }
});

app.put('/api/updateSeatClass/:MaVe', async (req, res) => {
    const { MaVe } = req.params;
    const { HangGhe } = req.body;

    try {
        const result = await dbOperation.updateHangGhe(MaVe, HangGhe);
        res.status(200).json({ message: 'Cập nhật thành công', result });
    } catch (error) {
        console.error('Lỗi khi cập nhật HangGhe:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

app.put('/api/updateMaTTVe/:MaVe', async (req, res) => {
    const { MaVe } = req.params;
    const { MaTT } = req.body;

    try {
        const result = await dbOperation.updateMaTTVe(MaVe, MaTT);
        res.status(200).json({ message: 'Cập nhật thành công', result });
    } catch (error) {
        console.error('Lỗi khi cập nhật HangGhe:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

app.put('/api/updateMaTTKhachHang/:MaKH', async (req, res) => {
    const { MaKH } = req.params;
    const { MaTT } = req.body;

    try {
        const result = await dbOperation.updateMaTTKhachHang(MaKH, MaTT);
        res.status(200).json({ message: 'Cập nhật thành công', result });
    } catch (error) {
        console.error('Lỗi khi cập nhật HangGhe:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

app.post('/api/addHanhKhach', async (req, res) => {
    const { CCCD, TenHK, GioiTinh, NgaySinh, QuocTich, DanhXung, MaKH } = req.body;

    try {
        await dbOperation.addHanhKhach(CCCD, TenHK, GioiTinh, NgaySinh, QuocTich, DanhXung, MaKH);
        res.status(200).json({ message: 'Thêm thông tin hành khách thành công.' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi thêm thông tin hành khách.', error });
    }
});

app.post('/api/addThanhToan', async (req, res) => {
    const { PhuongThucTT, TongTienTT } = req.body;

    const today = new Date();
    const dueDate = new Date(today.setDate(today.getDate() + 5)).toISOString().split('T')[0]; // Chỉ lấy phần ngày

    try {
        const result = await dbOperation.addThanhToan(PhuongThucTT, TongTienTT, 'Chưa thanh toán', dueDate);
        const MaTT = result.recordset[0].MaTT;
        res.status(200).json({ message: 'Thêm thông tin thanh toán thành công.', MaTT });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi thêm thông tin thanh toán.', error });
    }
});

app.post('/api/addVeDienTu', async (req, res) => {
    const { MaVe } = req.body;
    const NgayDatVe = new Date().toISOString(); // Ngày hôm nay theo định dạng ISO

    try {
        const result = await dbOperation.addVeDienTu(MaVe, NgayDatVe);
        res.status(200).json(result);
    } catch (error) {
        console.error('Lỗi khi thêm dữ liệu vào VeDienTu:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

//phan admin

//them sua xoa Voucher
app.post('/api/voucher', async (req, res) => {
    try {
        const result = await dbOperation.addVoucher(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/voucher/:id', async (req, res) => {
    try {
        const result = await dbOperation.updateVoucher(parseInt(req.params.id), req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/voucher/:id', async (req, res) => {
    try {
        const result = await dbOperation.deleteVoucher(parseInt(req.params.id));
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//them sua xoa HHK
app.post('/api/hanghangkhong', async (req, res) => {
    try {
        const result = await dbOperation.addHangHangKhong(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/hanghangkhong/:id', async (req, res) => {
    try {
        const result = await dbOperation.updateHangHangKhong(parseInt(req.params.id), req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/hanghangkhong/:id', async (req, res) => {
    try {
        const result = await dbOperation.deleteHangHangKhong(parseInt(req.params.id));
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//them sua xoa Ve
app.post('/api/ve', async (req, res) => {
    try {
        const result = await dbOperation.addVe(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/ve/:id', async (req, res) => {
    try {
        const result = await dbOperation.updateVe(parseInt(req.params.id), req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/ve/:id', async (req, res) => {
    try {
        const result = await dbOperation.deleteVe(parseInt(req.params.id));
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//them sua xoa ChiTietChuyenBay
app.post('/api/chitietchuyenbay', async (req, res) => {
    try {
        const result = await dbOperation.addChiTietChuyenBay(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/chitietchuyenbay/:id', async (req, res) => {
    try {
        const result = await dbOperation.updateChiTietChuyenBay(parseInt(req.params.id), req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/chitietchuyenbay/:id', async (req, res) => {
    try {
        const result = await dbOperation.deleteChiTietChuyenBay(parseInt(req.params.id));
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//them sua xoa ChuyenBay
app.post('/api/chuyenbay', async (req, res) => {
    try {
        const result = await dbOperation.addChuyenBay(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/chuyenbay/:id', async (req, res) => {
    try {
        const result = await dbOperation.updateChuyenBay(parseInt(req.params.id), req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/chuyenbay/:id', async (req, res) => {
    try {
        const result = await dbOperation.deleteChuyenBay(parseInt(req.params.id));
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//them sua xoa MayBay
app.post('/api/maybay', async (req, res) => {
    try {
        const result = await dbOperation.addMayBay(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/maybay/:id', async (req, res) => {
    try {
        const result = await dbOperation.updateMayBay(parseInt(req.params.id), req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/maybay/:id', async (req, res) => {
    try {
        const result = await dbOperation.deleteMayBay(parseInt(req.params.id));
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/voucher/:voucherID', async (req, res) => {
    const voucherID = req.params.voucherID;
    try {
        const voucher = await dbOperation.getVoucherByTenVoucher(voucherID);
        if (voucher) {
            res.json(voucher);
        } else {
            res.status(404).send('Voucher not found');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.post('/api/updateVeVoucher', async (req, res) => {
    const { maVe, maVoucher } = req.body;
    try {
        const result = await dbOperation.updateVeVoucher(maVe, maVoucher);
        if (result) {
            res.status(200).send('Update successful');
        } else {
            res.status(400).send('Update failed');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log('Server is running on http://localhost:5000');
});