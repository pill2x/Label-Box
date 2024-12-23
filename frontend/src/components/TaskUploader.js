import React, { useState } from 'react';
import axios from 'axios';
import '../components/css/styles.css';

const TaskUploader = ({ onTaskUploaded }) => {
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const uploadTask = () => {
        if (!imageUrl) {
            alert("Please provide a valid image URL.");
            return;
        }
        setLoading(true);
        axios.post('http://localhost:5000/create-task', { image_url: imageUrl })
            .then(() => {
                alert('Task uploaded!');
                setImageUrl('');
                onTaskUploaded(); // Trigger re-fetching the task
            })
            .catch(() => setError('Failed to upload task. Please try again later.'))
            .finally(() => setLoading(false));
    };

    return (
        <div className="task-uploader">
            <h3>Upload Task</h3>
            <input
                className="task-input"
                type="text"
                placeholder="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                disabled={loading}
            />
            <button onClick={uploadTask} disabled={loading} className="upload-btn">
                {loading ? 'Uploading...' : 'Upload'}
            </button>
            {error && <p className="error-text">{error}</p>}
        </div>
    );
};

export default TaskUploader;
