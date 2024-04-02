import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input, Alert } from "antd";
import "./LoginForm.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const LoginForm = () => {
    const hardcodedUsername = "admin";
    const hardcodedPassword = "Admin123";
    const [ifCorrect, setIfCorrect] = useState(true);
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(["loggedIn"]);
    const handleSubmit = (values) => {
        if (
            values.username === hardcodedUsername &&
            values.password === hardcodedPassword
        ) {
            setIfCorrect(true);
            navigate("/"); // jump to the map page if successful
            if (values.remember === false) {
                setCookie("loggedIn", "true", { path: "/" });
            } else {
                setCookie("loggedIn", "true", { path: "/", maxAge: 2592000 });
            }
        } else {
            setIfCorrect(false);
        }
    };

    const onFinish = (values) => {
        handleSubmit(values);
    };
    const tabList = [
        {
            key: "tab1",
            tab: "Login",
        },
        {
            key: "tab2",
            tab: "Register",
        },
    ];
    const contentList = {
        tab1: (
            <p>
                {!ifCorrect && (
                    <Alert message="Login incorrect" type="error" showIcon />
                )}
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        className="item-name"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Username!",
                            },
                        ]}
                    >
                        <Input
                            prefix={
                                <UserOutlined className="site-form-item-icon" />
                            }
                            placeholder="Username"
                        />
                    </Form.Item>
                    <Form.Item
                        className="item-password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Password!",
                            },
                        ]}
                    >
                        <Input
                            prefix={
                                <LockOutlined className="site-form-item-icon" />
                            }
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item className="item-remember">
                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            noStyle
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item className="item-submit">
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            id="login-button"
                        >
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </p>
        ),
        tab2: (
            <p>
                <p>
                    <img src="comingsoon.jpg" width="250" />
                </p>
                <p>Coming Soon!</p>
            </p>
        ),
    };
    const [activeTabKey1, setActiveTabKey1] = useState("tab1");
    const onTab1Change = (key) => {
        setActiveTabKey1(key);
    };
    useEffect(() => {
        if (cookies.loggedIn) {
            navigate("/"); // Redirect to login page
        }
    }, []);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <Card
                className="login-card"
                title="Ecological Maritime Tracker"
                style={{ width: 300, opacity: 0.95 }}
                tabList={tabList}
                activeTabKey={activeTabKey1}
                onTabChange={onTab1Change}
            >
                {contentList[activeTabKey1]}
            </Card>
        </div>
    );
};

export default LoginForm;
