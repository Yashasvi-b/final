import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';

const JournalEntryForm = ({ journalType, onSave }) => {
    const [formData, setFormData] = useState({
        date: new Date().toLocaleDateString(),
        content: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onSave({ type: journalType, ...formData });
        setFormData({ date: new Date().toLocaleDateString(), content: '' });
    };

    return (
        <div style={{ marginTop: "20px" }}>
            <Typography variant="h5">{journalType}</Typography>
            <TextField
                label="Content"
                name="content"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={formData.content}
                onChange={handleChange}
                style={{ marginTop: '15px' }}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: "15px" }}>
                Save Entry
            </Button>
        </div>
    );
};

export default JournalEntryForm;
