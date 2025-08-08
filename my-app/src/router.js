import { Route, Routes } from "react-router-dom";
import { ROUTERS } from "./utils/router";
import HomePage from "./pages/users/HomePage";
import SearchTicketPage from "./pages/users/SearchTicketPage";
import MasterLayout from "./pages/users/theme/masterLayout";
import MasterLayout1 from "./pages/users/theme/masterLayout1";
import MasterLayoutAdmin from "./pages/admin/theme/masterLayoutAdmin"
import DeclareInformationPage from "./pages/users/DeclareInformationPage";
import VoucherPage from "./pages/users/VoucherPage";
import PaymentMethodPage from "./pages/users/PaymentMethodPage";
import ContactPage from "./pages/users/ContactPage";
import AirlineInformationPage from "./pages/users/AirlineInformationPage";
import ProfilePage from "./pages/users/ProfilePage";
import LogInPage from "./pages/users/LogInPage";
import RegisterPage from "./pages/users/RegisterPage";
import NotifyPage from "./pages/users/NotifyPage";
import HistoryPage from "./pages/users/HistoryPage";
import VoucherTable from "./pages/admin/VoucherTable";
import HangHangKhongTable from "./pages/admin/HangHangKhongTable";
import KhachHangTable from "./pages/admin/KhachHangTable";
import TaiKhoanKHTable from "./pages/admin/TaiKhoanKHTable";
import TaiKhoanNVTable from "./pages/admin/TaiKhoanNVTable";
import HanhKhachTable from "./pages/admin/HanhKhachTable";
import NhanVienTable from "./pages/admin/NhanVienTable";
import PhongBanTable from "./pages/admin/PhongBanTable";
import DSDoiLichBayTable from "./pages/admin/DSDoiLichBayTable";
import DSHoanVeTable from "./pages/admin/DSHoanVeTable";
import VeTable from "./pages/admin/VeTable";
import ChiTietChuyenBayTable from "./pages/admin/ChiTietChuyenBayTable";
import ChuyenBayTable from "./pages/admin/ChuyenBayTable";
import MayBayTable from "./pages/admin/MayBayTable";
import ThanhToanTable from "./pages/admin/ThanhToanTable";
import VeDienTuTable from "./pages/admin/VeDienTuTable";

const renderUserRouter = () => {
    const userRouters = [
        {
            path: ROUTERS.USER.HomePage,
            component: HomePage,
            layout: MasterLayout,
        },
        {
            path: ROUTERS.USER.SearchTicketPage,
            component: SearchTicketPage,
            layout: MasterLayout,
        },
        {
            path: ROUTERS.USER.DeclareInformationPage,
            component: DeclareInformationPage,
            layout: MasterLayout,
        },
        {
            path: ROUTERS.USER.VoucherPage,
            component: VoucherPage,
            layout: MasterLayout,
        },
        {
            path: ROUTERS.USER.PaymentMethodPage,
            component: PaymentMethodPage,
            layout: MasterLayout,
        },
        {
            path: ROUTERS.USER.ContactPage,
            component: ContactPage,
            layout: MasterLayout,
        },
        {
            path: ROUTERS.USER.AirlineInformationPage,
            component: AirlineInformationPage,
            layout: MasterLayout,
        },
        {
            path: ROUTERS.USER.ProfilePage,
            component: ProfilePage,
            layout: MasterLayout,
        },
        {
            path: ROUTERS.USER.LogInPage,
            component: LogInPage,
            layout: MasterLayout1,
        },
        {
            path: ROUTERS.USER.RegisterPage,
            component: RegisterPage,
            layout: MasterLayout1,
        },
        {
            path: ROUTERS.USER.NotifyPage,
            component: NotifyPage,
            layout: MasterLayout,
        },
        {
            path: ROUTERS.USER.HistoryPage,
            component: HistoryPage,
            layout: MasterLayout,
        },
        {
            path: ROUTERS.ADMIN.VoucherTable,
            component: VoucherTable,
            layout: MasterLayoutAdmin,
        },
        {
            path: ROUTERS.ADMIN.HangHangKhongTable,
            component: HangHangKhongTable,
            layout: MasterLayoutAdmin,
        },
        {
            path: ROUTERS.ADMIN.KhachHangTable,
            component: KhachHangTable,
            layout: MasterLayoutAdmin,
        },
        {
            path: ROUTERS.ADMIN.HanhKhachTable,
            component: HanhKhachTable,
            layout: MasterLayoutAdmin,
        },
        {
            path: ROUTERS.ADMIN.TaiKhoanKHTable,
            component: TaiKhoanKHTable,
            layout: MasterLayoutAdmin,
        },
        {
            path: ROUTERS.ADMIN.TaiKhoanNVTable,
            component: TaiKhoanNVTable,
            layout: MasterLayoutAdmin,
        },
        {
            path: ROUTERS.ADMIN.NhanVienTable,
            component: NhanVienTable,
            layout: MasterLayoutAdmin,
        },
        {
            path: ROUTERS.ADMIN.PhongBanTable,
            component: PhongBanTable,
            layout: MasterLayoutAdmin,
        },
        {
            path: ROUTERS.ADMIN.DSDoiLichBayTable,
            component: DSDoiLichBayTable,
            layout: MasterLayoutAdmin,
        },
        {
            path: ROUTERS.ADMIN.DSHoanVeTable,
            component: DSHoanVeTable,
            layout: MasterLayoutAdmin,
        },
        {
            path: ROUTERS.ADMIN.VeTable,
            component: VeTable,
            layout: MasterLayoutAdmin,
        },
        {
            path: ROUTERS.ADMIN.ChiTietChuyenBayTable,
            component: ChiTietChuyenBayTable,
            layout: MasterLayoutAdmin,
        },
        {
            path: ROUTERS.ADMIN.ChuyenBayTable,
            component: ChuyenBayTable,
            layout: MasterLayoutAdmin,
        },
        {
            path: ROUTERS.ADMIN.MayBayTable,
            component: MayBayTable,
            layout: MasterLayoutAdmin,
        },
        {
            path: ROUTERS.ADMIN.ThanhToanTable,
            component: ThanhToanTable,
            layout: MasterLayoutAdmin,
        },
        {
            path: ROUTERS.ADMIN.VeDienTuTable,
            component: VeDienTuTable,
            layout: MasterLayoutAdmin,
        },
    ];

    return (
        <Routes>
            {userRouters.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    element={<route.layout><route.component /></route.layout>}
                />
            ))}
        </Routes>
    );
};

const RouterCustom = () => {
    return renderUserRouter();
};

export default RouterCustom;