import React from "react";
import { memo, useState, useEffect } from "react";
import './style.css';
import { useNavigate } from "react-router-dom";

//import icon
import { FaRegUser } from "react-icons/fa";
import { FaKey } from "react-icons/fa6";

//import hinh anh
import web_logo from "../../../images/web-logo.png";

//import duong dan
import { ROUTERS } from "../../../utils/router";

const initFormValue = {
    username: "",
    password: "",
}

const isEmptyValue = (value) => {
    return !value || value.trim().length < 1;
};

const LogInPage = () => {

    const navigate = useNavigate();
    const [formValues, setFormValues] = useState(initFormValue);
    const [formError, setFormError] = useState({});

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
        } else if (formValues.password.length < 8) {
            error["password"] = "Phải có tối thiểu 8 ký tự"
        }

        setFormError(error);

        return Object.keys(error).length === 0;
    }

    const handleChange = (event) => {
        const { value, name } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateForm()) {
            try {
                const response = await fetch('http://localhost:5000/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formValues),
                });

                if (!response.ok) {
                    throw new Error('Failed to log in');
                }

                const data = await response.json();
                console.log('Data from server:', data);
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', formValues.username);
                localStorage.setItem('MaTK', data.user.MaTK);
                localStorage.setItem('MaKH', data.user.MaKH);

                console.log('Login successful:', data.message);
                navigate(ROUTERS.USER.HomePage);
                console.log(data);
            } catch (error) {
                console.error('Error logging in:', error);
            }
        } else {
            console.log('Form invalid');
        }
    };

    return (
        <div className="LIP-container">
            <div className="LIP-container-content">
                <form action="" id="Form-LogIn" onSubmit={handleSubmit}>
                    <a href={ROUTERS.USER.HomePage} onClick={(e) => handleClick(e, ROUTERS.USER.HomePage)}><img src={web_logo} /></a>
                    <p>Sign In</p>
                    <div className="Form-Group">
                        <FaRegUser className="Icon-LogIn" />
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
                        <FaKey className="Icon-LogIn" />
                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            className="LogInPassword"
                            name="password"
                            value={formValues.password}
                            onChange={handleChange}
                            maxLength="70"
                        />
                    </div>
                    {formError.password && (
                        <div className="error-feedback">{formError.password}</div>
                    )}
                    <input type="submit" value="Đăng nhập" className="Form-Submit" />
                    <a href={ROUTERS.USER.RegisterPage} onClick={(e) => handleClick(e, ROUTERS.USER.RegisterPage)} className="Button-To-Register">Bạn chưa có tài khoản? <span>Đăng ký</span></a>
                </form>
            </div>
        </div>
    );
};

export default memo(LogInPage);