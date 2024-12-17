import React from 'react';
import { Typography } from '@mui/material';

const JournalEntryViewer = ({ entry }) => {
    return (
        <div style={{ marginTop: "20px" }}>
            <Typography variant="h5">{entry.type} Entry</Typography>
            <Typography variant="subtitle1">Date: {entry.date}</Typography>
            <Typography variant="body1" style={{ marginTop: "15px" }}>{entry.content}</Typography>
        </div>
    );
};

export default JournalEntryViewer;
