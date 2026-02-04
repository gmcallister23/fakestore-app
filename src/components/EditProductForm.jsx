import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';


function UpdateProduct() {
    const [product, setProduct] = useState(null);
    const [update, setUpdate] = useState(false);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        price: '',
        image: '',        
    });

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
        .then((response) => {
            setProduct(response.data);
            setFormData({
                title: response.data.title,
                description: response.data.description,
                category: response.data.category,
                price: response.data.price,
                image: response.data.image,
            });
            setLoading(false);
        })
        .catch((error) => {
            setError("Failed to fetch product.");
            setLoading(false);

        });
    }, [id]);

    const handleChange = (e) => {
        const{ name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        setMessage('Updating product...');
        
        try {
            const response = await axios.put(`https://fakestoreapi.com/products/${id}`, formData);
            console.log(response.data);
            setProduct(response.data);
            setUpdate(true);
            setError(null);
            setMessage('');
        } catch(error) {
            setError(`Error updating product. Please try again: ${error.message}`);
            setMessage('');
        }
    }
    if (loading) return <p>Loading product...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Container className='mt-5'>
            <h2 className='mt-5'>Edit Product</h2>
            {update && <Alert variant='success' dismissible>{product.title} updated successfully!</Alert>}
            {error && <Alert variant='danger' dismissible>{error}</Alert>}
            {message && <Alert variate='info'>{message}</Alert>}
            <Form onSubmit={handleUpdate}>

                <Form.Group className='mb-3'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type='text' placeholder='Enter a title' name='title' value={formData.title} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type='text' placeholder='Enter a description' name='description' value={formData.description} onChange={handleChange} required/>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control type='text' placeholder='Enter a category' name='category' value={formData.category} onChange={handleChange} required />               
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control type='number' placeholder='Enter a price' name='price' value={formData.price} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control type='text' placeholder='Enter an image url' name='image' value={formData.image} onChange={handleChange} required />
                </Form.Group>

                <Button variant='primary' type='submit'>
                    Update Product
                </Button>
            </Form>
        </Container>

    );
}

export default UpdateProduct;
