import React from 'react';

const CalendarHeader = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div style={{
      display: 'flex',
      borderRadius:'8px',
      width:'99%',
      justifyContent: 'space-around',
      marginBottom:'20px',
      padding: '10px',
      borderBottom: '1px solid #ccc', // Optional: if you want a bottom border
      backgroundColor: '#f8f9fa',
      color: '#333',
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      fontWeight: 'bold'
    }}>
      {daysOfWeek.map(day => (
        <div key={day} style={{ textAlign: 'center', flex: 1 }}>
          {day}
        </div>
      ))}
    </div>
  );
};

export default CalendarHeader;