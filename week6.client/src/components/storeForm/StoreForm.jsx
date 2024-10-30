


import  { useState, useEffect } from 'react';
import axios from 'axios';
import './StoreForm.css'; // Import the CSS file

const StoreForm = () => {
    const [storeName, setStoreName] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState(null);
    const [stores, setStores] = useState([]);

    useEffect(() => {
        fetchStores();
    }, []);

    const fetchStores = async () => {
        try {
            const response = await axios.get('stores');
            setStores(response.data);
        } catch (error) {
            console.error("Error fetching stores", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setError(null);

        try {
            const response = await axios.post('stores', {
                name: storeName,
            });
            setStatus('success');
            setStoreName('');
            setStores((prevStores) => [...prevStores, response.data]);
        } catch (err) {
            setStatus('error');
            setError(err.response ? err.response.data : 'An error occurred');
        }
    };

    return (
        <div>
            <div className="form-container">
                <h3>Add New Store</h3>
                <form onSubmit={handleSubmit}>
                    <label>
                        Store Name:
                        <input
                            type="text"
                            value={storeName}
                            onChange={(e) => setStoreName(e.target.value)}
                            placeholder="Enter store name"
                        />
                    </label>
                    <button type="submit" disabled={status === 'loading'}>
                        Submit
                    </button>

                    {status === 'loading' && <p>Submitting...</p>}
                    {status === 'success' && <p className="success">Store submitted successfully!</p>}
                    {status === 'error' && <p className="error">Error: {error}</p>}
                </form>
            </div>

            <div className="table-container">
                <h3>Store List</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Store Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stores.map((store) => (
                            <tr key={store.id}>
                                <td>{store.id}</td>
                                <td>{store.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StoreForm;
