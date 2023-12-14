import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Card, Space, Button,Tabs } from 'antd';
import {SwapRightOutlined,CloseOutlined} from '@ant-design/icons';
import PollutionChart from '../PollutionChart/PollutionChart';
import DraggableModal from '../drag info/DraggableModal';
import TrackPopup from '../TrackPopup/TrackPopup';
import './shipInfo.css'
import ShipInfoBody from './ShipInfoBody';
import CountryFlag from 'react-country-flag';
import Draggable from 'react-draggable';
import ShipTrack from '../ShipTrack/ShipTrack';
import MockTrack from '../ShipTrack/MockTrack';
import useShipData from '../../hooks/useShipData';

const { Meta } = Card;
const { TabPane } = Tabs;

const ShipInfo = ({ship,setSelectedBoat }) => {

    const mmsi = ship.mmsi;
    const shipData = useShipData(mmsi);
    const closeShipInfo=()=>{
        setSelectedBoat(null);
    }
    //  get ship type picture
    const getTypePath = (vesselType) => {
        vesselType = (vesselType === 'Pleasure Craft') ? 'Pleasure' : vesselType;
         
       if (['Cargo','Craft','Fishing','Navigation_Aids','Passenger','Pleasure','Tanker','Tug'].includes(vesselType)){
         return `ShipIcons/${vesselType}.png`;
       }
       else{
         return 'ShipIcons/Unspecified.png';
       }        
    };
    const typePath = getTypePath(ship.type);

    // get ship country picture
    const getCountry = (shipCountryCode) => {
        if (['NAN','nan'].includes(shipCountryCode)){
          return null;
        }
        else{
          return shipCountryCode;
        }        
    };
    const country = getCountry(shipData.alpha2);

    // get ship country picture
    const [shipImage, setShipImage] = useState('defaultShip2.jpg');


    //Show Chart
    const [showChart, setShowChart] = useState(false);
	const [showTrackPopup, setShowTrackPopup] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);
    const handleShowChart = () => {
        setShowChart(true);
    };
	
    const handleCancel = () => {
        setShowChart(false);
    };

	// show track
	const handleTrackButtonClick = () => {
    setShowTrackPopup(!showTrackPopup);
    // 不立即开始动画，只显示 TrackPopup
	};
	
    
    const calculatePosition=()=>{
        
    }

    return (
        <>  
        <Draggable defaultPosition={{ x: 50, y: 8 }}>
        <div  style={{"z-index":"9999","position": "absolute"}}>
            <Space direction="vertical" size={16} style={{cursor:'auto'}}>
                <Card  style={{ width: 300}} bodyStyle={{padding: "10px"}}>
                    <div >
                        <div className='ship-info-header'>
                            <img alt="shiptype" src={typePath} style={{width: '30px',  height: '30px', verticalAlign: 'middle'}}></img>
                            {country !== null ? (<CountryFlag countryCode={country} svg style={{width: '2.2em',  height: '2.2em', marginLeft:5 }}/>) : (
                                <img src="defaultCountryImage.png" alt="defaul-country" style={{width: '30.8px', height: '30.8px',marginLeft:5 }}/>)}
                            <div className='name-with-type' >
                                <div className='ship-name'>{shipData.vesselName}</div>
                                <div className='ship-type' >{shipData.vesselType}</div>
                            </div>
                            <div style={{ position: 'absolute', top: 10, right: 10,cursor: 'pointer'}}>
                                <CloseOutlined onClick={closeShipInfo}/>
                            </div>
                        </div>
                        <img  alt="ship image" src={shipImage} style={{ width: '100%', marginTop: 2 }} />
                        <div >
                            <ShipInfoBody shipData={shipData} ></ShipInfoBody>
                        </div>
                        <div style={{ marginTop: 10 }}>

                            <Button  type="primary" onClick={handleTrackButtonClick} style={{ width: 120, textAlign: 'center' }} icon={<SwapRightOutlined />}>Past Track</Button>
                            <Button type="primary" style={{ width: 140, marginLeft: 15, textAlign: 'center' }} onClick={handleShowChart}>Pollution Forecast</Button>

                        </div>
                    </div>
                    
                </Card>
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
            </div>
        </Draggable>
            
            
        </>
    );
}

export default ShipInfo;
