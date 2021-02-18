import React, { useCallback, useRef, useState } from 'react';
import Webcam from "react-webcam";

export default function Capture() {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };
    const handleCapture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot({width: 400, height: 400});
        setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);
    return (
        <div>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
            />
            <button type="button" onClick={handleCapture}>Capture Image</button>
            {imgSrc && (<img src={imgSrc}/>)}
        </div>
    )
}