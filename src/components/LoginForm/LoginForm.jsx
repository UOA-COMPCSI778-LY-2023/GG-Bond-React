import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Form, Input, Alert } from 'antd';
import "./LoginForm.css"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';


const LoginForm=()=>{
    const hardcodedUsername = 'admin';
    const hardcodedPassword = '123';
    const [ifCorrect, setIfCorrect] = useState(true);
    const navigate  = useNavigate();
    const [cookies, setCookie] = useCookies(['loggedIn']);


    const handleSubmit = (values) => {
        if (values.username === hardcodedUsername && values.password === hardcodedPassword) {
            setIfCorrect(true);
            navigate ('/')   // jump to the map page if successful
            setCookie('loggedIn', 'true', { path: '/',maxAge: 900});
        } else {
            setIfCorrect(false);
        }
    };

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        handleSubmit(values);
      };
    
    return(
        <div style={{display:'flex', justifyContent:'center', alignItems: 'center', height: '100vh'}} >  
            <Card className="login-card" title="Login" extra={<a href="#">Register</a>} style={{ width: 300, opacity:0.95}}>
            {!ifCorrect&& <Alert message="Login incorrect" type="error" showIcon />}
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                >
                <Form.Item
                    className='item-name'
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input  prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    className='item-password'
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    />
                </Form.Item>
                <Form.Item className='item-remember'>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <a className="login-form-forgot" href="">
                    Forgot password
                    </a>
                </Form.Item>

                <Form.Item className='item-submit'>
                    <Button  type="primary" htmlType="submit" className="login-form-button" id="login-button">
                    Log in
                    </Button>
                    {/* Or <a href="">register now!</a> */}
                </Form.Item>
            </Form>
            </Card>
        </ div>
    );
}

export default LoginForm;
        