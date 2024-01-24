import React, { useState } from 'react';

const Login = () => {
    const [ruleForm, setRuleForm] = useState({
        username: '',
        password: ''
    });

    const submitForm = () => {
        if (ruleForm.username === 'admin' && ruleForm.password === 'Admin123') {
            sessionStorage.setItem('UserId', 1000);
            // console.log(localStorage.getItem('UserId'))
            // _this.$router.push("/")
            // 在React中使用路由可以通过react-router-dom等库来实现
            // 另外，React中的跳转通常不直接使用$router.push("/")，而是使用路由库提供的Redirect等组件
        }
    };

    return (
        <div className="loginbody">
            <div className="video-container">
                <video
                    style={{ /* fixStyle */ }} // 这里的fixStyle需要提前定义
                    autoPlay
                    loop
                    muted
                    className="fillWidth"
                    // canplay={canplay} // React中处理视频加载事件通常使用onCanPlay等
                >
                    <source
                        src="https://smartmedia.digital4danone.com//is/content/danone/danone-corporate-video-2023-en"
                        type="video/mp4"
                    />
                    <source
                        src="https://smartmedia.digital4danone.com//is/content/danone/danone-corporate-video-2023-en"
                        type="video/webm"
                    />
                </video>
            </div>
            <div className="mylogin" align="center">
                <h2 style={{ color: 'white' }}>Danone Nutricia</h2>
                <h4 style={{ color: 'white' }}>User Login</h4>
                <br />
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        submitForm();
                    }}
                    className="loginForm"
                >
                    <div className="el-form-item" style={{ marginTop: '10px' }}>
                        <div className="el-row">
                            <div className="el-col" style={{ span: '2' }}>
                                <span className="el-icon-s-custom" style={{ color: 'white' }}></span>
                            </div>
                            <div className="el-col" style={{ span: '22' }}>
                                <input
                                    className="inps"
                                    placeholder="Account"
                                    value={ruleForm.username}
                                    onChange={(e) => setRuleForm({ ...ruleForm, username: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="el-form-item" style={{ color: 'white' }}>
                        <div className="el-row">
                            <div className="el-col" style={{ span: '2' }}>
                                <span className="el-icon-lock"></span>
                            </div>
                            <div className="el-col" style={{ span: '22' }}>
                                <input
                                    className="inps"
                                    type="password"
                                    placeholder="Password"
                                    value={ruleForm.password}
                                    onChange={(e) => setRuleForm({ ...ruleForm, password: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="el-form-item" style={{ marginTop: '55px' }}>
                        <button type="submit" className="submitBtn">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
