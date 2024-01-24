import "./BackgroundVideo.css"

const videoFiles = [
    "BackgroundVideos/Video4.mp4",
    "BackgroundVideos/Video5.mp4",
    "BackgroundVideos/Video6.mp4",
    "BackgroundVideos/Video7.mp4",
    "BackgroundVideos/Video8.mp4",
    "BackgroundVideos/Video9.mp4",
    "BackgroundVideos/Video10.mp4",
    "BackgroundVideos/Video11.mp4",
    "BackgroundVideos/Video12.mp4",
    "BackgroundVideos/Video13.mp4",
  ];

const BackgroundVideo=()=>{
    const getTypePath = () => {
        const randomIndex = Math.floor(Math.random() * videoFiles.length);
        const selectedVideo = videoFiles[randomIndex];
        return selectedVideo;
    }
    const randomVideo = getTypePath();
    return(
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
    );
}
export default BackgroundVideo;