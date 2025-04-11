import Tilt from 'react-parallax-tilt';
import './TiltImg.demozap.css';

const TiltImg = ({ src, alt }) => (
  <Tilt
    className="tilt-img"
    tiltMaxAngleX={50}
    tiltMaxAngleY={50}
    perspective={900}
    scale={1.0}
    transitionSpeed={3000}
    gyroscope={true}
  >
    <img src={src} className="inner-element" alt={alt} />
  </Tilt>
);

export default TiltImg;