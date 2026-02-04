import { useState, useEffect } from 'react';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';


function DeleteProduct( productId, onDelete) {
    const [show, setShow] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();


    const handleDelete = async () => {
        setLoading(true);
        setError(null);
        try {
            await axios.delete(`https://fakestoreapi.com/products/${productId}`);
            onDelete(productId);
            setShow(false);
        } catch (err) {
            setError('Failed to delete product. Please try again.')
        } finally {
            setLoading(false);
        }
    }; 

    return(
        <>
        <Button variant="danger" onClick={() => setShow(true)}>Delete Product</Button>
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this product? This action cannot be undone.
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
                <Button variant="danger" onClick={handleDelete} disabled={loading}>
                    {loading ? 'Deleting...' : 'Delete'}
                </Button>
            </Modal.Footer>
        </Modal>
        
        </>
    )

}

export default DeleteProduct;
