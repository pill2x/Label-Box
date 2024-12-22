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
            <TaskUploader onTaskUploaded={refreshTask} />
            <AnnotationScreen key={refreshKey} />
        </div>
    );
};

export default App;