import meter1 from "../assets/img/meter1.svg";
import meter2 from "../assets/img/meter2.svg";
import meter3 from "../assets/img/meter3.svg";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import arrow1 from "../assets/img/arrow1.svg";
import arrow2 from "../assets/img/arrow2.svg";
import colorSharp from "../assets/img/color-sharp.png"
import ReactPlayer from 'react-player';
import ApiVideo from "../assets/videos/ApiVideo.mp4";
import tutovideo from "../assets/videos/tuto.mp4";
import recursovideo from "../assets/videos/recursos.mp4";
import botonvideo from "../assets/videos/botones.mp4";



export const Skills = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section className="skill" id="skills">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="skill-bx wow zoomIn">
                        <h2>¿Cómo funciona APIzzy?</h2>
                        <p>¡APIzzy es muy fácil de utilizar!<br></br> Acontinuacion de dejamos videos para ayudarte a realizar tu primera API de manera "ezzy".</p>
                        <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                            <div className="item">
                              <iframe 
                                    src={ApiVideo}
                                    >
                                </iframe>
                                <h5>Que es una API</h5>
                            </div>
                            <div className="item" >
                              <iframe 
                                  src={tutovideo} 
                                  >
                              </iframe>
                              <h5>Tutorial APIzzy</h5>

                                {/* <ReactPlayer url='https://youtu.be/u2Ms34GE14U' /> */}
                            </div>
                            <div className="item">
                              <iframe 
                                  src={recursovideo} 
                                  >
                                </iframe>
                                <h5>API multi recursos</h5>
                            </div>
                            <div className="item">
                              <iframe 
                                  src={botonvideo} 
                                  >
                                </iframe>
                              <h5>Botones para personalizar</h5>
                            </div>
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
        <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  )
}
