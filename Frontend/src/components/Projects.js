import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import projImg3 from "../assets/img/project-img3.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import requirements from "../assets/texts/apizzy_dependencies.txt";
import imagenArchivo from "../assets/img/archivo.png";
import { FormularioAPI } from './APIForm';

const descargarArchivo = async () => {
  const response = await fetch(requirements);
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'apizzy_dependencies.txt';
  a.click();
  window.URL.revokeObjectURL(url);
};
const buttonStyle = {
  background: '#', // Color de fondo del recuadro
  border: '2px solid #f2f2f2', // Borde del recuadro
  borderRadius: '5px', // Bordes redondeados
  padding: '10px 20px', // Espaciado interno
  cursor: 'pointer', // Cambiar cursor a mano al pasar por encima
  display: 'flex', // Para alinear horizontalmente la imagen y el texto
  alignItems: 'center', // Alinear verticalmente la imagen y el texto
  justifyContent: 'center', // Centrar los elementos
};

const imageStyle = {
  width: '24px', // Ancho de la imagen
  height: '24px', // Alto de la imagen
  marginRight: '10px', // Espacio a la derecha de la imagen
};
const textStyle = {
  color: 'white'
};

const divStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
export const Projects = () => {

  const projects = [
    {
      title: "Diseña",
      description: "Apis de varios métodos.",
      imgUrl: projImg1,
    },
    {
      title: "Implementa",
      description: "Post, Get, Put y Delete.",
      imgUrl: projImg2,
    },
    {
      title: "Aprende",
      description: "Con Apizzy.",
      imgUrl: projImg3,
    },
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Descubre</h2>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Tab 1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Tab 2</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Tab 3</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                      <Row>
                        {
                          projects.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <p style={{ textAlign: 'center' }}>
                        Para garantizar el correcto funcionamiento de las APIs creadas con APIzzy, es esencial que instales ciertas librerías específicas de Python. Hemos preparado un archivo llamado <code>apizzy_dependencies.txt</code> que contiene una lista de estas librerías, junto con las versiones recomendadas. A continuación, te detallamos la utilidad de cada una de estas dependencias:
                      </p>
                      <p style={{ textAlign: 'justify' }}>
                        <ul>
                          <li><code>aniso8601==9.0.1:</code> Utilizada para el manejo de fechas y tiempos en un formato específico.</li>
                          <li><code>black==23.7.0:</code> Formateador de código que asegura la consistencia y legibilidad del mismo.</li>
                          <li><code>blinker==1.6.2:</code> Proporciona soporte para señales (signals) y mecanismos de comunicación entre componentes.</li>
                          <li><code>click==8.1.7:</code> Herramienta para crear interfaces de línea de comandos.</li>
                          <li><code>Flask==2.3.2, Flask-Cors==4.0.0, Flask-RESTful==0.3.10:</code> Librerías fundamentales para la creación, gestión y comunicación de APIs con soporte CORS.</li>
                          <li><code>itsdangerous==2.1.2:</code> Proporciona varias herramientas para trabajar con datos confiables y seguros.</li>
                          <li><code>Jinja2==3.1.2:</code> Motor de plantillas para Python, ampliamente utilizado con Flask.</li>
                          <li><code>MarkupSafe==2.1.3:</code> Implementa una cadena de caracteres que escapa automáticamente para evitar la inyección de código.</li>
                          <li><code>mypy-extensions==1.0.0:</code> Extensiones para el soporte de tipos opcionales.</li>
                          <li><code>packaging==23.1:</code> Proporciona soporte para trabajar con paquetes de Python.</li>
                          <li><code>pathspec==0.11.2:</code> Utilidad para coincidencia de rutas de archivos.</li>
                          <li><code>platformdirs==3.10.0:</code> Proporciona directorios específicos de la plataforma.</li>
                          <li><code>psycopg2-binary==2.9.6:</code> Adaptador de base de datos PostgreSQL para Python.</li>
                          <li><code>pytz==2023.3:</code> Biblioteca de zonas horarias.</li>
                          <li><code>six==1.16.0:</code> Proporciona compatibilidad entre Python 2 y Python 3.</li>
                          <li><code>Werkzeug==2.3.7:</code> Kit de herramientas WSGI para Python.</li>
                        </ul>
                        
                      <div style={divStyle}>
                        {/* Otros elementos del componente */}
                        <button onClick={descargarArchivo} style={buttonStyle}>
                          <img src={imagenArchivo} alt="Descargar archivo de requisitos" style={imageStyle} />
                          <span style={textStyle}>Descargar requirements.txt</span>
                        </button>
                      </div>                    
                      </p>
                      <p style={{ textAlign: 'center' }}>
                        Para instalar todas estas dependencias, simplemente ejecuta el siguiente comando:
                        <br />
                        <code>pip install -r apizzy_dependencies.txt</code>
                        <br />
                        Gracias por elegir APIzzy y te deseamos un desarrollo fluido y exitoso con nuestra herramienta.
                      </p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <p style={{ textAlign: 'center' }}> ¡Bienvenido a APIzzy! Simplificamos el mundo de las APIs para ti. Comienza con nuestro intuitivo formulario y descubre cómo crear tu propia API en cuestión de minutos. ¡Dale vida a tus ideas digitales!</p>
                        <FormularioAPI/>
                    </Tab.Pane>

                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  )
}
