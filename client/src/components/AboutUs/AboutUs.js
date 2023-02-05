import React from 'react'
// import "./AboutUs.css";
import styles from './AboutUs.module.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

const AboutUs= () =>{
 
    return(
     <>   
     <React.Fragment>
<h1>¡Quiénes Somos!</h1>

<Container className={styles.container} >
<h2 className={styles.titulo}>Sobre nosotros</h2>

<div className={styles.texts}>
<Row>
<Col xs={12} md={12}>

<p >
    Desde 1997 en Somos Más trabajamos con los chicos y chicas,
mamás y papás, abuelos y vecinos del barrio La Cava generando
procesos de crecimiento y de inserción social. Uniendo las manos de
todas las familias, las que viven en el barrio y las que viven fuera de
él, es que podemos pensar, crear y garantizar estos procesos. Somos
una asociación civil sin fines de lucro que se creó en 1997 con la
intención de dar alimento a las familias del barrio. Con el tiempo
fuimos involucrándonos con la comunidad y agrandando y mejorando
nuestra capacidad de trabajo. Hoy somos un centro comunitario que
acompaña a más de 700 personas a través de las áreas de:
Educación, deportes, primera infancia, salud, alimentación y trabajo
social.
</p>
</Col>
</Row>
</div>

<div className={styles.texts}>
<Row>
        <Col xs={12} md={6}>
        <h3>Visión</h3>
<p > Mejorar la calidad de vida de niños y familias en situación de
vulnerabilidad en el barrio La Cava, otorgando un cambio de rumbo
en cada individuo a través de la educación, salud, trabajo, deporte,
responsabilidad y compromiso.
</p>
        </Col>
        <Col xs={12} md={6}>
        <h3>Misión</h3>
<p >Trabajar articuladamente con los distintos aspectos de la vida de las
familias, generando espacios de desarrollo personal y familiar,
brindando herramientas que logren mejorar la calidad de vida a
través de su propio esfuerzo.</p>
        </Col>
      </Row>
      </div> 
    
<h2 className={styles.titulo}>Fundadores</h2>

   
    <CardGroup className={`${styles.cards} pb-4`} >
      <Card className={styles.card}>
        <Card.Img variant="top" src='images/Marita-Gomez.jpeg'  className={styles.fundador}/>
        <Card.Body>
          <Card.Title>Marita Gomez</Card.Title>
          <Card.Text>
          Fundadora Marita estudió la carrera de nutrición y se especializó en nutrición
infantil. Toda la vida fue voluntaria en distintos espacios en el barrio hasta que
decidió abrir un comedor propio. Comenzó trabajando con 5 familias y culminó
su trabajo transformando Somos Más en la organización que es hoy.
          </Card.Text>
        </Card.Body>        
      </Card>


      <Card className={styles.card}>
        <Card.Img variant="top" src='images/Maria-Irola.jpg'  className={styles.fundador} />
        <Card.Body>
          <Card.Title>María Irola</Card.Title>
          <Card.Text>
          Presidenta María estudió economía y se especializó en economía para el
desarrollo. Comenzó como voluntaria en la fundación y fue quien promovió el
crecimiento y la organización de la institución acompañando la transformación
de un simple comedor barrial al centro comunitario de atención integral que es
hoy en día.
          </Card.Text>
        </Card.Body>
        
      </Card>
      
    </CardGroup>

</Container>
</React.Fragment>
</>

)
}







export default AboutUs;