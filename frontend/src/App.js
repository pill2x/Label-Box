import React, { useState } from 'react';
import TaskUploader from './components/TaskUploader';
import AnnotationScreen from './components/AnnotationScreen';

const App = () => {
    const [refreshKey, setRefreshKey] = useState(0);

    const refreshTask = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    };

    return (
        <div className="App">
            <h1>Labelbox Web App</h1>
            <div className="main-content">
                <div className="upload-screen">
                    <TaskUploader onTaskUploaded={refreshTask} />
                </div>
                <div className="annotation-screen">
                    <AnnotationScreen key={refreshKey} />
                </div>
            </div>
        </div>
    );
};

export default App;
