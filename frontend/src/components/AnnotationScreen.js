import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Annotation from 'react-image-annotation';

const AnnotationScreen = () => {
    const [task, setTask] = useState(null);
    const [annotations, setAnnotations] = useState([]);
    const [annotation, setAnnotation] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchTask = () => {
        setLoading(true);
        axios.get('http://localhost:5000/get-task')
            .then((res) => setTask(res.data.task))
            .catch(() => setError('Failed to load task. Please try again later.'))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchTask();
    }, []);

    const saveAnnotations = () => {
        if (annotations.length === 0) {
            alert("Please add some annotations first.");
            return;
        }
        setLoading(true);
        axios.post('http://localhost:5000/submit-annotation', {
            task_id: task._id, // Fixed key for MongoDB documents
            annotations
        })
        .then(() => {
            alert('Annotations saved!');
            setAnnotations([]);
        })
        .catch(() => alert('Failed to save annotations. Please try again.'))
        .finally(() => setLoading(false));
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            {error ? (
                <p>{error}</p>
            ) : task ? (
                <div>
                    <Annotation
                        src={task.image_url}
                        annotations={annotations}
                        value={annotation}
                        onChange={setAnnotation}
                        onSubmit={(newAnnotation) => {
                            setAnnotations([...annotations, newAnnotation]);
                            setAnnotation({});
                        }}
                    />
                    <button onClick={saveAnnotations}>Save</button>
                </div>
            ) : (
                <p>No tasks available.</p>
            )}
        </div>
    );
};

export default AnnotationScreen;