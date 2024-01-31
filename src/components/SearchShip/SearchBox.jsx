import React, { useState, useCallback } from "react";
import "./MarineTrafficStyle.css";
import { Input } from "antd";
import debounce from "lodash/debounce";

const { Search } = Input;

function SearchBox({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const debouncedSearch = useCallback(
        debounce((value) => {
            handleSearch(value);
        }, 800),
        []
    );

    const handleSearch = async (value) => {
        if (isLoading) return;
        setIsLoading(true);

        try {
            await onSearch(value);
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };

    const onChange = (e) => {
        setSearchTerm(e.target.value);
        debouncedSearch(e.target.value);
    };

    return (
        <div className="search-box-container">
            <Search
                placeholder="Search ships by MMSI/Vessel Name"
                allowClear
                enterButton={false}
                loading={isLoading}
                value={searchTerm}
                onChange={onChange}
            />
        </div>
    );
}

export default SearchBox;
