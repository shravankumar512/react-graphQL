import React, { useState } from 'react'

export default function FileUpload() {
    const [file, setFile] = useState(null);

    const handleFileChanges = (event) => {
        setFile(event.target.files[0])
    }

    const submitFile = () => {
        console.log(file)
    }

    return (
        <div>
            <input type="file" onChange={handleFileChanges} />
            <button type="submit" onClick={submitFile}>Upload</button>
        </div>
    )
}
