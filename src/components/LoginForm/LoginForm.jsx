import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Flex, Form, Input } from 'antd';
import "./LoginForm.css"

const LoginForm=()=>{
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
      };
    return(
        <div style={{display:'flex', justifyContent:'center', alignItems: 'center', height: '100vh'}} >  
            <Card title="Login" extra={<a href="#">Register</a>} style={{ width: 300, height:320,opacity:0.95}}>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                    Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
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
        