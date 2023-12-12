
import './shipInfo.css'
const ShipInfoBody=({ship})=>{
    return(
    <>
        <div className='detail-info-container' style={{marginTop:2}}>
            <div style={{display:'flex'}}>

                <div className='info-column1' style={{width:'50%'}}>
                    <div className="detail-info-item">MMSI:
                        <strong style={{marginLeft:5}}>
                            {ship.mmsi}
                        </strong>
                    </div>
                    <div className="detail-info-item" >IMO:
                        <strong style={{marginLeft:5}}>
                            {ship.imo}
                        </strong>
                    </div>
                    <div className="detail-info-item">Callsign:
                        <strong style={{marginLeft:5}}>
                            {ship.callsign}
                        </strong>
                    </div>
                    <div className='detail-info-item'>Source: 
                        <strong style={{marginLeft: 5}}>
                            {ship.source}
                        </strong>
                    </ div>
                    
                </div>

                
                <div className='info-column2'  style={{width:'50%'}}>
                    <div className="detail-info-item">Length(m):
                        <strong style={{marginLeft:5}}>
                        {ship.length}
                        </strong>
                    </div>
                    <div className="detail-info-item">Width(m):
                        <strong style={{marginLeft:5}}>
                            {ship.width}
                        </strong>
                    </div>
                    <div className="detail-info-item">Draught:
                        <strong style={{marginLeft:5}}>
                            {ship.draught}
                        </strong>
                    </div>
                    <div className="detail-info-item">Vessel Class:
                        <strong style={{marginLeft:5}}>
                            {ship.vessel_class}
                        </strong>
                    </div>
                </div>
            </div>

            <div >
                <div className="detail-info-item" style={{marginTop:"-1px"}}>Country:
                        <strong style={{marginLeft:5}}>
                            {ship.country}
                        </strong>
                </div>
                <div className="detail-info-item" >Navifagiton Status:
                    <strong style={{marginLeft: 5}}>
                        {ship.status}
                    </strong>
                </div>
                <div className="detail-info-item"  >Main Vessel Type:
                    <strong style={{marginLeft:5}}>
                        {ship.vessel_type_main}
                    </strong>
                </div>
                <div className="detail-info-item" >Sub Vessel Type:
                    <strong style={{marginLeft:5}}>
                        {ship.vessel_type_sub}
                    </strong>
                </div>
                <div className='detail-info-item'>Received Time: 
                    <strong style={{marginLeft: 5}}>
                        {ship.time}
                    </strong>
                </div>
                
                

            </div>
        </div>
    </>
    );
}

export default ShipInfoBody;