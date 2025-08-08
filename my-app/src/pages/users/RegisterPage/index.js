import React from 'react';
import { memo, useState, useEffect } from 'react';
import './style.css';
import { useNavigate } from "react-router-dom";

//import icon
import { FaRegUser } from "react-icons/fa";
import { FaKey } from "react-icons/fa6";
import { RiEyeCloseFill } from "react-icons/ri";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { FaHouse } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

//import hinh anh
import web_logo from "../../../images/web-logo.png";

//import duong dan
import { ROUTERS } from "../../../utils/router";

const initFormValue = {
    username: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    gender: "",
    birthDate: "",
    address: "",
    phoneNumber: "",
    email: "",
}

const isEmptyValue = (value) => {
    return !value || value.trim().length < 1;
};

const isValidFullName = (value) => {
    return /^[a-zA-Z\s]*$/.test(value);
};

const isValidEmail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

const RegisterPage = () => {
    const navigate = useNavigate();
    const [openBookerCharacter, setOpenBookerCharacter] = useState(false);
    const [formValues, setFormValues] = useState(initFormValue);
    const [formError, setFormError] = useState({});
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleClick = (e, path) => {
        e.preventDefault();
        navigate(path);
    };

    const validateForm = () => {
        const error = {};

        if (isEmptyValue(formValues.username)) {
            error["username"] = "Bắt buộc nhập";
        } else if (!/(?=.*[A-Z])(?=.*\d)/.test(formValues.username)) {
            error["username"] = "Phải có ít nhất 1 ký tự chữ hoa và chữ số";
        } else if (formValues.username.length <= 7) {
            error["username"] = "Phải có tối thiểu 8 ký tự"
        }

        if (isEmptyValue(formValues.password)) {
            error["password"] = "Bắt buộc nhập";
        } else if (formValues.password.length <= 7) {
            error["password"] = "Phải có tối thiểu 8 ký tự"
        }

        if (isEmptyValue(formValues.fullName)) {
            error["fullName"] = "Bắt buộc nhập";
        }

        if (isEmptyValue(formValues.gender)) {
            error["gender"] = "Bắt buộc nhập";
        }

        if (isEmptyValue(formValues.birthDate)) {
            error["birthDate"] = "Bắt buộc nhập";
        }

        if (isEmptyValue(formValues.address)) {
            error["address"] = "Bắt buộc nhập";
        }

        if (isEmptyValue(formValues.email)) {
            error["email"] = "Bắt buộc nhập";
        } else if (!isValidEmail(formValues.email)) {
            error["email"] = "Email không hợp lệ"
        }

        if (isEmptyValue(formValues.phoneNumber)) {
            error["phoneNumber"] = "Bắt buộc nhập";
        } else if (!/^(0[3|5|7|8|9])+([0-9]{8})$/.test(formValues.phoneNumber)) {
            error["phoneNumber"] = "SĐT không hợp lệ!";
        }

        if (isEmptyValue(formValues.confirmPassword)) {
            error["confirmPassword"] = "Bắt buộc nhập";
        } else if (formValues.confirmPassword !== formValues.password) {
            error["confirmPassword"] = "Không hợp lệ!"
        }

        setFormError(error);

        return Object.keys(error).length === 0;
    }

    const handleChange = (event) => {
        const { value, name } = event.target;
        if (name === 'fullName') {
            const cleanedValue = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            setFormValues({
                ...formValues,
                [name]: cleanedValue,
            });

            if (cleanedValue !== value) {
                setFormError({
                    ...formError,
                    fullName: "Không được nhập dấu"
                });
            } else {
                setFormError({
                    ...formError,
                    fullName: null
                });
            }
        } else {
            setFormValues({
                ...formValues,
                [name]: value,
            });
        }
    }

    const handleInput = (event) => {
        const { value } = event.target;
        const cleanedValue = value.replace(/\D/g, '');
        event.target.value = cleanedValue;

        setFormValues({
            ...formValues,
            phoneNumber: cleanedValue,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateForm()) {
            try {
                const { username, password, fullName, gender, birthDate, address, phoneNumber, email } = formValues;
                const response = await fetch('http://localhost:5000/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        TenTK: username,
                        MatKhau: password,
                        SDT: phoneNumber,
                        NgaySinh: birthDate,
                        TenKH: fullName,
                        GioiTinh: gender,
                        DiaChi: address,
                        Email: email,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to register');
                }
                setShowSuccessMessage(true);
                const data = await response.json();
                console.log('Registration successful:', data.message);
            } catch (error) {
                console.error('Error registering:', error);
            }
        } else {
            console.log('Form invalid');
        }
    };

    useEffect(() => {
        if (showSuccessMessage) {
            // Tạm thời chỉ cần log ra, bạn có thể thay đổi logic cho phù hợp
            console.log('Registration successful!');
        }
    }, [showSuccessMessage]);

    console.log(formError);

    return (
        <div className='RP-container'>
            <div className='RP-container-content'>
                <form id='Form-Register' onSubmit={handleSubmit}>
                    <a href={ROUTERS.USER.HomePage} onClick={(e) => handleClick(e, ROUTERS.USER.HomePage)}>
                        <img src={web_logo} alt="Logo" />
                    </a>
                    <p>Sign Up</p>
                    <div className="Form-Group">
                        <FaRegUser className="Icon-Register" />
                        <input
                            type="text"
                            placeholder="Tên đăng nhập"
                            className="LogInName"
                            name="username"
                            value={formValues.username}
                            onChange={handleChange}
                            maxLength="30"
                        />
                    </div>
                    {formError.username && (
                        <div className="error-feedback">{formError.username}</div>
                    )}
                    <div className="Form-Group">
                        <FaKey className="Icon-Register" />
                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            className="LogInPassword"
                            name="password"
                            value={formValues.password}
                            onChange={handleChange}
                            maxLength="60"
                        />
                    </div>
                    {formError.password && (
                        <div className="error-feedback">{formError.password}</div>
                    )}
                    <div className="Form-Group">
                        <RiEyeCloseFill className='Icon-Register' />
                        <input
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            className="LogInCheckPassword"
                            name="confirmPassword"
                            value={formValues.confirmPassword}
                            onChange={handleChange}
                            maxLength="60"
                        />
                    </div>
                    {formError.confirmPassword && (
                        <div className="error-feedback">{formError.confirmPassword}</div>
                    )}
                    <div className="Form-Group">
                        <MdDriveFileRenameOutline className='Icon-Register' />
                        <input
                            type="text"
                            placeholder="Nhập họ và tên"
                            className="BookerName"
                            name="fullName"
                            value={formValues.fullName}
                            onChange={handleChange}
                            maxLength="50"
                        />
                    </div>
                    {formError.fullName && (
                        <div className="error-feedback">{formError.fullName}</div>
                    )}
                    <div className="Form-Group Booker-Character">
                        <div className='left'>
                            <div className='top' onClick={() => setOpenBookerCharacter(!openBookerCharacter)}>
                                <p>Chọn giới tính</p>
                                <IoIosArrowDown className='Icon-Register Booker-Character' />
                            </div>
                            <div className={`bottom ${openBookerCharacter ? 'open' : ''}`}>
                                <div className='Booker-Character'>
                                    <input
                                        type='radio'
                                        id="Nam"
                                        name="gender"
                                        value="Nam"
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="Nam">Nam</label>
                                </div>
                                <div className='Booker-Character'>
                                    <input
                                        type='radio'
                                        id="Nữ"
                                        name="gender"
                                        value="Nữ"
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="Nữ">Nữ</label>
                                </div>
                            </div>
                            {formError.gender && (
                                <div className="error-feedback">{formError.gender}</div>
                            )}
                        </div>
                        <div className='right'>
                            <div className='Booker-Date'>
                                <input
                                    type='date'
                                    className='BookerDate'
                                    name="birthDate"
                                    value={formValues.birthDate}
                                    onChange={handleChange}
                                />
                            </div>
                            {formError.birthDate && (
                                <div className="error-feedback">{formError.birthDate}</div>
                            )}
                        </div>
                    </div>
                    <div className="Form-Group">
                        <FaHouse className='Icon-Register' />
                        <input
                            type="text"
                            placeholder="Nhập địa chỉ"
                            className="BookerAddress"
                            name="address"
                            value={formValues.address}
                            onChange={handleChange}
                            maxLength="100"
                        />
                    </div>
                    {formError.address && (
                        <div className="error-feedback">{formError.address}</div>
                    )}
                    <div className="Form-Group">
                        <MdEmail className='Icon-Register' />
                        <input
                            type="email"
                            placeholder="Nhập email"
                            className="BookerEmail"
                            name="email"
                            value={formValues.email}
                            onChange={handleChange}
                            maxLength="50"
                        />
                    </div>
                    {formError.email && (
                        <div className="error-feedback">{formError.email}</div>
                    )}
                    <div className="Form-Group">
                        <FaPhone className='Icon-Register' />
                        <input
                            type="text"
                            placeholder="Nhập số điện thoại"
                            className="BookerPhoneNumber"
                            name="phoneNumber"
                            value={formValues.phoneNumber}
                            onChange={handleChange}
                            onInput={handleInput}
                            maxLength="10"
                        />
                    </div>
                    {formError.phoneNumber && (
                        <div className="error-feedback">{formError.phoneNumber}</div>
                    )}
                    <input
                        type="submit"
                        value="Đăng ký"
                        className="Form-Submit"
                    />
                    {showSuccessMessage && (
                        <div className="success-message">
                            Chúc mừng bạn đăng ký tài khoản thành công! <span onClick={() => navigate(ROUTERS.USER.LogInPage)}>Đăng nhập ngay</span>.
                        </div>
                    )}
                    <a href={ROUTERS.USER.LogInPage} onClick={(e) => handleClick(e, ROUTERS.USER.LogInPage)} className="Button-To-LogIn">Bạn đã có tài khoản? <span>Đăng nhập</span></a>
                </form>
            </div>
        </div>
    );
};

export default memo(RegisterPage);