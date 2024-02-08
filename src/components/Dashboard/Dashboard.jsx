import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { FloatButton } from "antd";
import {
    ToolOutlined,
    GlobalOutlined,
    createFromIconfontCN,
} from "@ant-design/icons";
import "./Dashboard.css";

const IconFont = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});

export default function Dashboard() {
    const [cookies, setCookie, removeCookie] = useCookies(["loggedIn"]);
    const navigate = useNavigate();

    const toggleMap = () => {
        navigate("/");
    };
    const toggleLogOut = () => {
        removeCookie("loggedIn");
    };

    useEffect(() => {
        if (!cookies.loggedIn) {
            navigate("/login"); // Redirect to login page
        }
    }, [cookies, navigate]);

    useEffect(() => {
        const divElement = document.getElementById("viz1707346449443");
        const vizElement = divElement.getElementsByTagName("object")[0];
        vizElement.style.width = "1400px";
        vizElement.style.height = "2127px";

        const scriptElement = document.createElement("script");
        scriptElement.src =
            "https://public.tableau.com/javascripts/api/viz_v1.js";
        document.body.appendChild(scriptElement);

        return () => {
            document.body.removeChild(scriptElement);
        };
    }, []);

    return (
        <div className="dashboardContainer">
            <FloatButton.Group
                className="functionpanel"
                icon={<ToolOutlined />}
            >
                <FloatButton
                    onClick={toggleMap}
                    tooltip={<div>Map</div>}
                    icon={<GlobalOutlined />}
                    className="menubtn mapBtn"
                />

                <FloatButton
                    onClick={toggleLogOut}
                    tooltip={<div>Log Out</div>}
                    icon={<IconFont type="icon-tuichu" />}
                    className="menubtn logoutBtn"
                />
            </FloatButton.Group>
            <div
                className="tableauPlaceholder"
                id="viz1707346449443"
                style={{ position: "relative" }}
            >
                <noscript>
                    <a href="#">
                        <img
                            alt="Dashboard 1"
                            src="https://public.tableau.com/static/images/Ma/MaritimeAnalytics_Final/Dashboard1/1_rss.png"
                            style={{ border: "none" }}
                        />
                    </a>
                </noscript>
                <object className="tableauViz" style={{ display: "none" }}>
                    <param
                        name="host_url"
                        value="https%3A%2F%2Fpublic.tableau.com%2F"
                    />
                    <param name="embed_code_version" value="3" />
                    <param name="site_root" value="" />
                    <param
                        name="name"
                        value="MaritimeAnalytics_Final/Dashboard1"
                    />
                    <param name="tabs" value="no" />
                    <param name="toolbar" value="yes" />
                    <param
                        name="static_image"
                        value="https://public.tableau.com/static/images/Ma/MaritimeAnalytics_Final/Dashboard1/1.png"
                    />
                    <param name="animate_transition" value="yes" />
                    <param name="display_static_image" value="yes" />
                    <param name="display_spinner" value="yes" />
                    <param name="display_overlay" value="yes" />
                    <param name="display_count" value="yes" />
                    <param name="language" value="en-GB" />
                </object>
            </div>
        </div>
    );
}
