import Container from 'react-bootstrap/Container';
import { Link } from 'react-router'

function Home () {
    return (
        <div style={{minHeight: '100vh', backgroundColor: 'lightgray'}}>
        <Container fluid>
            <h1 className="text-center p-5">Welcome</h1>
            <p className="text-center">Welcome to FakeStore. Here you can test out how to build an eCommerce app without actual products. <br></br>You can view individual products, add, update and delete different products. <br></br> Click the button below to view the avaiable products. <br></br> Use the navbar to investigate other funcionality.</p>
            <div className="text-center p-4">
            <Link className="custom-button" to={`/products`}>View Products</Link>
            </div>
        </Container>
        </div>
    )
}

export default Home;