import { useState, useEffect } from 'react';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router';
import DeleteProduct from "./DeleteProduct"


function EditProducts () {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("https://fakestoreapi.com/products")
        .then((response) => {
            setProducts(response.data);
            setLoading(false);
        })
    }, []);

    if (loading) return <p>Loading products...</p>
    if (error) return <p>{error}</p>

    return(
        <>
        
        <Container fluid>
            <h1 className="text-center mb-4 mt-4">Product List - Edit Products</h1>
            <Row>
                {products.map((product) => (
                    <Col key={product.id} md={4} className="mb-3">
                        <Card className="p-5" style={{maxHeight: '70vh', overflow: 'auto'}}>
                            <Card.Img variant="top" src={product.image} alt={product.title} fluid style={{height: '250px', objectFit: 'contain'}}/>
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>{product.price}</Card.Text>
                                <Card.Text>{product.description}</Card.Text>
                                <Card.Text>{product.category}</Card.Text>
                            </Card.Body>
                            <Link className="custom-button" to={`/edit/${product.id}`}>Update Product Info</Link>
                            <DeleteProduct productId={product.id} onDelete={(id) => setProducts(products.fileter(p => p.id !== id))} />
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
        </>
    )
}

export default EditProducts;
