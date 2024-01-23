import React from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
};
const disabledDate = (current) => {
    return current && current < dayjs().endOf("day");
};

const disabledRangeTime = (_, type) => {
    if (type === "start") {
        return {
            disabledHours: () => range(0, 60).splice(4, 20),
            disabledMinutes: () => range(30, 60),
            disabledSeconds: () => [55, 56],
        };
    }
    return {
        disabledHours: () => range(0, 60).splice(20, 4),
        disabledMinutes: () => range(0, 31),
        disabledSeconds: () => [55, 56],
    };
};

const DownloadTimePicker = ({ setSelectedTimeRange }) => {
    const handleTimeRangeChange = (dayjs, dateString) => {
        setSelectedTimeRange(dateString);
    };
    return (
        <div className="timescale-box">
            <h4>Time Scale</h4>
            <DatePicker.RangePicker
                disabledDate={disabledDate}
                disabledTime={disabledRangeTime}
                showTime={{
                    hideDisabledOptions: true,
                    defaultValue: [
                        dayjs("00:00:00", "HH:mm:ss"),
                        dayjs("11:59:59", "HH:mm:ss"),
                    ],
                }}
                format="YYYY-MM-DD HH:mm:ss"
                changeOnBlur={true}
                onChange={handleTimeRangeChange}
            />
        </div>
    );
};

export default DownloadTimePicker;
