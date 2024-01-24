
 import "../ShipMarker/WarningAnimation.css";

const WarningAnimation = ({colorType}) => {
    return(
        <div class="container">
        <div class={`circle-${colorType}`}></div>
        </div>
    )
}
export default WarningAnimation;