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

const { Meta } = Card;
const { TabPane } = Tabs;
const ShipInfo = ({ ship,setSelectedBoat }) => {
    
    // const [ship, setShip] = useState();
    const [shipImage, serShipImage] = useState('defaultShip2.jpg');
    const closeShipInfo=()=>{
        setSelectedBoat(null);
    }
    
    // useEffect(() => {
    //     console.log(ship.Avatarmmsi);
    //     const url = `/MockData/MockSingleShipData${ship.mmsi}.json` //api request
    //     console.log(url);

    //     const fetchShipDetail = async ()=>{
    //        const response = await fetch(url);
    //        setShip(response);
    //     };
    //     fetchShipDetail();  
    // },[ship.mmsi]);
	
    //Show Chart
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

    const getCountry = (shipCountryCode) => {
        if (['US','CN','AU'].includes(shipCountryCode)){
          return shipCountryCode;
        }
        else{
          return null;
        }        
      };
      const country = getCountry(ship.country_code);

    const calculatePosition=()=>{
        
    }

    return (
        <>  
        <Draggable>
        <div  style={{"z-index":"9999","position": "absolute"}}>
            <Space direction="vertical" size={16} style={{cursor:'auto'}}>
                <Card  style={{ width: 300}} bodyStyle={{padding: "10px"}}>
                    <div >
                        <div className='ship-info-header'>
                            <img alt="shiptype" src={typePath} style={{width: '30px',  height: '30px', verticalAlign: 'middle'}}></img>
                            {country !== null ? (<CountryFlag countryCode={country} svg style={{width: '2.2em',  height: '2.2em', marginLeft:5 }}/>) : (
                                <img src="defaultCountryImage.png" alt="defaul-country" style={{width: '30.8px', height: '30.8px',marginLeft:5 }}/>)}
                            <div className='name-with-type' >
                                <div className='ship-name'>{ship.name}</div>
                                <div className='ship-type' >{ship.type}</div>
                            </div>
                            <div style={{ position: 'absolute', top: 10, right: 10,cursor: 'pointer'}}>
                                <CloseOutlined onClick={closeShipInfo}/>
                            </div>
                        </div>
                        
                        <img  alt="ship image" src={shipImage} style={{ width: '100%', marginTop: 2 }} />
                        <div >
                            <ShipInfoBody ship={ship} ></ShipInfoBody>
                        </div>
                        <div style={{ marginTop: 10 }}>

                            <Button  type="primary" onClick={handleTrackButtonClick} style={{ width: 120, textAlign: 'center' }} icon={<SwapRightOutlined />}>Past Track</Button>
                            <Button type="primary" style={{ width: 140, marginLeft: 15, textAlign: 'center' }} onClick={handleShowChart}>Pollution Forecast</Button>

                        </div>
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
            </div>
        </Draggable>
            
            
        </>
    );
}

export default ShipInfo;
