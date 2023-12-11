import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Card, Space, Button,Tabs } from 'antd';
import {SwapRightOutlined} from '@ant-design/icons';
import PollutionChart from '../PollutionChart/PollutionChart';
import './shipInfo.css'
import BasicInfoTab from './basicInfoTab';
import DetailInfoTab from './detailInfoTab';
import CountryFlag from 'react-country-flag';

const { Meta } = Card;
const { TabPane } = Tabs;
const ShipInfo = ({ ship }) => {
    
    // const [ship, setShip] = useState();
    const [shipImage, serShipImage] = useState('defaultShip2.jpg');
    
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

    return (
        <>
            <Space direction="vertical" size={16}>
                <Card style={{ width: 300}} bodyStyle={{padding: "10px"}}>
                    <div >
                        <div className='ship-info-header'>
                            <img alt="shiptype" src={typePath} style={{width: '30px',  height: '30px', verticalAlign: 'middle'}}></img>
                            {country !== null ? (<CountryFlag countryCode={country} svg style={{width: '2.2em',  height: '2.2em', marginLeft:5 }}/>) : (
                                <img src="defaultCountryImage.png" alt="defaul-country" style={{width: '30.8px', height: '30.8px',marginLeft:5 }}/>)}
                            <div className='name-with-type' >
                                <div className='ship-name'>{ship.name}</div>
                                <div className='ship-type' >{ship.type}</div>
                            </div>
                        </div>
                        
                        <img alt="ship image" src={shipImage} style={{ width: '100%', marginTop: 10 }} />
                        <div >
                            <Tabs defaultActiveKey="1" style={{height:245}}>
                                <TabPane tab="Basic Info" key="1" >
                                    <BasicInfoTab ship={ship}></BasicInfoTab>
                                </TabPane>
                                <TabPane tab="Detail Info" key="2">
                                <DetailInfoTab ship={ship} ></DetailInfoTab>
                                </TabPane>
                            </Tabs>
                        </div>
                        <div style={{ marginTop: 10 }}>
                            <Button  type="primary" style={{ width: 120, textAlign: 'center' }} icon={<SwapRightOutlined />}>Past Track</Button>
                            <Button type="primary" style={{ width: 140, marginLeft: 15, textAlign: 'center' }} onClick={handleShowChart}>Pollution Forecast</Button>
                        </div>


                    </div>
                    
                </Card>
                <PollutionChart showChart={showChart} handleCancel={handleCancel} mmsi={ship.mmsi} />
            </Space>
        </>
    );
}

export default ShipInfo;
