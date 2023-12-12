// DraggableModal.jsx
import React from 'react';
import { Modal } from 'antd';
import Draggable from 'react-draggable'; // 引入拖动库
import ChartComponent from '../pollution chart/Chart';


const DraggableModal = ({ visible, onCancel }) => {
    return (
        <Modal
            title="Pollution Forecast"
            visible={visible}
            onCancel={onCancel}
            footer={null}
            // 使用拖动库
            modalRender={(modal) => (
                <Draggable handle=".ant-modal-header">
                    {modal}
                </Draggable>
            )}
        >
            <ChartComponent />
        </Modal>
    );
}

export default DraggableModal;
