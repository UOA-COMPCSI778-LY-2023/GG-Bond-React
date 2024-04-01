// DraggableModal.jsx
import React from "react";
import { Modal } from "antd";
import Draggable from "react-draggable";
import ChartComponent from "../PollutionChart/PollutionChart";

const DraggableModal = ({ visible, onCancel, mmsi }) => {
    return (
        <Modal
            title="Pollution Forecast"
            visible={visible}
            onCancel={onCancel}
            footer={null}
            style={{ top: 10 }}
            // 使用拖动库
            modalRender={(modal) => (
                <Draggable handle=".ant-modal-header">{modal}</Draggable>
            )}
        >
            <ChartComponent mmsi={mmsi} />
        </Modal>
    );
};

export default DraggableModal;
