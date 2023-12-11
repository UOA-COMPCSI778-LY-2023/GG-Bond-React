import './shipInfo.css'
const DetailInfoTab=({ship})=>{
    return(
    <>
        <div className='detail-info-container'>
            <div className="detail-info-item">MMSI:
                <strong style={{marginLeft:5}}>
                    {ship.mmsi}
                </strong>
            </div>
            <div className="detail-info-item">IMO:
                 <strong style={{marginLeft:5}}>
                    {ship.imo}
                </strong>
            </div>
            <div className="detail-info-item">Callsign:
                 <strong style={{marginLeft:5}}>
                    {ship.callsign}
                </strong>
            </div>
            <div className="detail-info-item">Vessel Class:
                 <strong style={{marginLeft:5}}>
                    {ship.vessel_class}
                </strong>
            </div>
            <div className="detail-info-item">Country:
                 <strong style={{marginLeft:5}}>
                    {ship.country}
                </strong>
            </div>
            <div className="detail-info-item">Main Vessel Type:
                 <strong style={{marginLeft:5}}>
                    {ship.vessel_type_main}
                </strong>
            </div>
            <div className="detail-info-item">Sub Vessel Type:
                 <strong style={{marginLeft:5}}>
                    {ship.vessel_type_sub}
                </strong>
            </div>
        </div>
    </>
    );
}

export default DetailInfoTab;