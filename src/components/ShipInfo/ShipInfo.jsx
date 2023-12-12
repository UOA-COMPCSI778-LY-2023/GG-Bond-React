import React, { useState } from 'react';
import { Avatar, Card, Space, Button } from 'antd';
import PollutionChart from '../PollutionChart/PollutionChart';
import DraggableModal from '../drag info/DraggableModal';
import TrackPopup from '../TrackPopup/TrackPopup';

const { Meta } = Card;

const ShipInfo = ({ ship }) => {
  const [showChart, setShowChart] = useState(false);
  const [showTrackPopup, setShowTrackPopup] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTrackButtonClick = () => {
    setShowTrackPopup(!showTrackPopup);
    // 不立即开始动画，只显示 TrackPopup
  };

  const handleShowChart = () => {
    setShowChart(true);
  };

  const handleCancel = () => {
    setShowChart(false);
  };

  return (
	<>
		<Space direction="vertical" size={16}>
		  <Card style={{ width: 300 }}>
			<Meta
			  avatar={<Avatar src={ship.image} />}
			  title={ship.name}
			  description={ship.type}
			/>
			<img alt="ship image" src={ship.image} style={{ width: 250, marginTop: 10 }} />
			<div style={{ marginTop: 10 }}>
			  <Button type="primary" onClick={handleTrackButtonClick} style={{ width: 95, textAlign: 'center' }}>Past Track</Button>
			  <Button type="primary" onClick={handleShowChart} style={{ width: 135, marginLeft: 20, textAlign: 'center' }}>Pollution Forecast</Button>
			</div>
		  </Card>
		  {showChart && <PollutionChart showChart={showChart} handleCancel={handleCancel} mmsi={ship.mmsi} />}
		  <TrackPopup
			visible={showTrackPopup}
			onClose={() => {
			  setShowTrackPopup(false);
			  setIsAnimating(false);
			}}
			isAnimating={isAnimating}
			setIsAnimating={setIsAnimating}
		  />
		  <DraggableModal visible={showChart} onCancel={handleCancel} />
		</Space>
	</>
  );
};

export default ShipInfo;
