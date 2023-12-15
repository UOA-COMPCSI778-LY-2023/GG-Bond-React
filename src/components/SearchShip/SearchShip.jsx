import React from "react";
import { Input } from "antd";
import "../SearchShip/SearchShip.css";

const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);

function SearchShip() {
    return (
        <Search
            placeholder="input search text"
            allowClear
            enterButton
            size="large"
            onSearch={onSearch}
            className="shipSearcher"
        />
    );
}

export default SearchShip;
