import { Flex } from 'antd';
import './shipInfo.css'
const BasicInfoTab=({ship})=>{
    return(
    <>
        <div className='basic-info-container'>
            <div className="basic-info-item">Navifagiton Status:
                <strong style={{display: 'block', marginTop: 3}}>
                    {ship.status}
                </strong>
            </div>
            <div className="basic-info-item">Length/Width:
                <strong style={{display: 'block', marginTop: 3}}>
                    {ship.length}/{ship.width}
                </strong>
            </div>
            <div className="basic-info-item">Draught:
                <strong style={{display: 'block', marginTop: 3}}>
                    {ship.draught}
                </strong>
            </div>

            
        </div>
        <div className='receive-time'>Received Time: 
            <strong style={{marginLeft: 5}}>
                {ship.time}
            </strong>
        </div>
        <div className='receive-source'>Source: 
            <strong style={{marginLeft: 5}}>
                {ship.source}
            </strong>
        </div>
    </>
    );
    
    
}

export default BasicInfoTab;