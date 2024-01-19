import "./BackgroundVideo.css"

const videoFiles = [
    "BackgroundVideos/Video1.mp4",
    "BackgroundVideos/Video2.mp4",
    "BackgroundVideos/Video3.mp4",
  ];

const BackgroundVideo=()=>{
    const getTypePath = () => {
        const randomIndex = Math.floor(Math.random() * videoFiles.length);
        const selectedVideo = videoFiles[randomIndex];
        return selectedVideo;
    }
    const randomVideo = getTypePath();
    return(
        <>
            <div className="video-container">
                <video
                    className="video-element"
                    controls={false}
                    autoPlay
                    muted
                    loop
                    style={{ width: "100%", height: "100%" }}>
                    {/* <source src="BackgroundVideos/Video1.mp4" type="video/mp4" /> */}
                    <source src={randomVideo} type="video/mp4" />
                </video>
            </div>           
        </>
    );
}
export default BackgroundVideo;