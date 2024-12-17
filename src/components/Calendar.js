import React, { useState, useEffect } from "react";
import "./Calendar.css";

const CalendarComponent = () => {
  const today = new Date();
  const [activeDay, setActiveDay] = useState(today.getDate());
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [eventsArr, setEventsArr] = useState([]);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventTimeFrom, setEventTimeFrom] = useState("");
  const [eventTimeTo, setEventTimeTo] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [mood, setMood] = useState(50);
  const [sleepHours, setSleepHours] = useState(6);
  const [feelings, setFeelings] = useState("");
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [filterMonth, setFilterMonth] = useState(null);
  const [filterYear, setFilterYear] = useState(null);
  const months = [
    "January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  useEffect(() => {
    getEvents();
    loadEntries();
  }, []);

  useEffect(() => {
    initCalendar();
  }, [month, year]);

  // const getEvents = () => {
  //   const storedEvents = localStorage.getItem("events");
  //   if (storedEvents) setEventsArr(JSON.parse(storedEvents));
  // };
  const getEvents = () => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) setEventsArr(JSON.parse(storedEvents));
    const storedEntries = localStorage.getItem("entries");
    if (storedEntries) setEntries(JSON.parse(storedEntries));
  };
 


  const filterEntries = () => {
    const filtered = entries.filter((entry) => {
      return (filterMonth === null || entry.month === filterMonth) &&
             (filterYear === null || entry.year === filterYear);
    });
    setFilteredEntries(filtered);
  };
  

  

  useEffect(() => {
    filterEntries();
  }, [filterMonth, filterYear, entries]);

  const saveEvents = (events) => {
    localStorage.setItem("events", JSON.stringify(events));
    setEventsArr(events);
  };
 
  

  
  const initCalendar = () => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    let days = [];

    for (let x = day; x > 0; x--) {
      days.push(<div key={`prev-${x}`} className="day prev-date">{prevDays - x + 1}</div>);
    }

    for (let i = 1; i <= lastDate; i++) {
      const hasEvent = eventsArr.some(
        (e) => e.day === i && e.month === month + 1 && e.year === year
      );
      days.push(
        <div
          key={i}
          className={`day ${i === activeDay ? "active" : ""} ${hasEvent ? "event" : ""}`}
          onClick={() => handleDayClick(i)}
        >
          {i}
        </div>
      );
    }

    for (let j = 1; j <= nextDays; j++) {
      days.push(<div key={`next-${j}`} className="day next-date">{j}</div>);
    }

    return days;
  };

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const handleDayClick = (day) => {
    setActiveDay(day);
    updateEvents(day);
  };

  const updateEvents = (day) => {
    const events = eventsArr.find(
      (event) => event.day === day && event.month === month + 1 && event.year === year
    );
    if (events) {
      return events.events.map((e, index) => (
        <div
          key={index}
          className={`event ${e.completed ? "completed" : ""}`}
          onClick={() => toggleEventCompletion(day, index)}
        >
          <div className="title"><h3>{e.title}</h3></div>
          <div className="time">{e.time}</div>
        </div>
      ));
    } else {
      return <div className="no-event"><h3>No Events</h3></div>;
    }
  };

  const toggleEventCompletion = (day, eventIndex) => {
    const updatedEvents = JSON.parse(JSON.stringify(eventsArr));
    updatedEvents.forEach((event) => {
      if (event.day === day && event.month === month + 1 && event.year === year) {
        event.events[eventIndex].completed = !event.events[eventIndex].completed;
      }
    });
    saveEvents(updatedEvents);
  };

  const handleAddEvent = () => {
    if (!eventTitle || !eventTimeFrom || !eventTimeTo) {
      alert("Please fill all the fields");
      return;
    }

    const newEvent = {
      title: eventTitle,
      time: `${eventTimeFrom} - ${eventTimeTo}`,
      completed: false
    };

    const newEventsArr = [...eventsArr];
    const eventIndex = newEventsArr.findIndex(
      (event) => event.day === activeDay && event.month === month + 1 && event.year === year
    );

    if (eventIndex !== -1) {
      newEventsArr[eventIndex].events.push(newEvent);
    } else {
      newEventsArr.push({
        day: activeDay,
        month: month + 1,
        year: year,
        events: [newEvent]
      });
    }

    saveEvents(newEventsArr);
    setShowAddEvent(false);
    setEventTitle("");
    setEventTimeFrom("");
    setEventTimeTo("");
  };

  const handleGoToDate = () => {
    const [enteredMonth, enteredYear] = dateInput.split("/");
    if (enteredMonth >= 1 && enteredMonth <= 12 && enteredYear.length === 4) {
      setMonth(parseInt(enteredMonth) - 1);
      setYear(parseInt(enteredYear));
      setDateInput("");
    } else {
      alert("Invalid date format. Use mm/yyyy.");
    }
  };

  const handleCheckIn = () => {
    setShowCheckInModal(true);
  };

  const saveCheckIn = () => {
    const newEntry = {
      date: today.toDateString(),
      mood,
      sleepHours,
      feelings,
      month: today.getMonth(),
      year: today.getFullYear(),
    };
    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    localStorage.setItem("entries", JSON.stringify(updatedEntries));
    setShowCheckInModal(false);
    setFeelings("");
    setMood(50);
    setSleepHours(6);
  };
  
  const loadEntries = () => {
    const storedEntries = localStorage.getItem("entries");
    if (storedEntries) {
      const parsedEntries = JSON.parse(storedEntries);
      setEntries(parsedEntries);
      setFilteredEntries(parsedEntries); // Initialize filtered entries with all entries
    }
  };
  

  return (
    <div className="container">
      <div className="left">
        <div className="calendar">
          <div className="month">
            <i className="fas fa-angle-left prev" onClick={prevMonth}></i>
            <div className="date">{`${months[month]} ${year}`}</div>
            <i className="fas fa-angle-right next" onClick={nextMonth}></i>
          </div>
          <div className="weekdays">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>
          <div className="days">
            {initCalendar()}
          </div>
          <div className="goto-today">
            <div className="goto">
              <input
                type="text"
                placeholder="mm/yyyy"
                className="date-input"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
              />
              <button className="goto-btn" onClick={handleGoToDate}>Go</button>
            </div>
            <button className="check-in-btn" onClick={handleCheckIn}>Check-in</button>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="today-date">
          <div className="event-day">{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][new Date(year, month, activeDay).getDay()]}</div>
          <div className="event-date">{`${activeDay} ${months[month]} ${year}`}</div>
        </div>
        <div className="events">
          {updateEvents(activeDay)}
        </div>
        {showAddEvent && (
          <div className="add-event-wrapper active">
            <div className="add-event-header">
              <div className="title">Add Event</div>
              <i className="fas fa-times close" onClick={() => setShowAddEvent(false)}></i>
            </div>
            <div className="add-event-body">
              <div className="add-event-input">
                <input
                  type="text"
                  placeholder="Event Name"
                  className="event-name"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                />
              </div>
              <div className="add-event-input">
                <input
                  type="text"
                  placeholder="Event Time From"
                  className="event-time-from"
                  value={eventTimeFrom}
                  onChange={(e) => setEventTimeFrom(e.target.value)}
                />
              </div>
              <div className="add-event-input">
                <input
                  type="text"
                  placeholder="Event Time To"
                  className="event-time-to"
                  value={eventTimeTo}
                  onChange={(e) => setEventTimeTo(e.target.value)}
                />
              </div>
            </div>
            <div className="add-event-footer">
              <button className="add-event-btn" onClick={handleAddEvent}>Add Event</button>
            </div>
          </div>
        )}
      </div>
      <button className="add-event" onClick={() => setShowAddEvent(true)}>
        <i className="fas fa-plus"></i>
      </button>

      {showCheckInModal && (
        <div className="modal-overlay">
          <div className="check-in-modal">
            <button className="close-modal-btn" onClick={() => setShowCheckInModal(false)}>&times;</button>
            <h2>Today's Date: {today.toDateString()}</h2>
            <div className="mood-section">
              <label>How are you feeling?</label>
              <input
                type="range"
                min="0"
                max="100"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="mood-slider"
              />
              <div className="mood-indicator">
                <span>😊</span>
                <span>😐</span>
                <span>😞</span>
              </div>
            </div>
            <div className="sleep-section">
              <label>How much did you sleep?</label>
              <div className="sleep-options">
                {[4, 6, 8, 10].map((hour) => (
                  <button
                    key={hour}
                    className={`pill ${sleepHours === hour ? "selected" : ""}`}
                    onClick={() => setSleepHours(hour)}
                  >
                    {hour} hrs
                  </button>
                ))}
              </div>
            </div>
            <div className="feelings-section">
              <label>How was your day?</label>
              <textarea
                value={feelings}
                onChange={(e) => setFeelings(e.target.value)}
                placeholder="Share your thoughts..."
              />
            </div>
            <button className="save-check-in-btn" onClick={saveCheckIn}>Save Check-in</button>

            <div className="previous-entries-section" style={{ color:"#000", paddingBottom:"20px",paddingTop:"20px"}}>
              <h4>Previous Entries</h4>
              <div className="filter-buttons">
                <select
                  className="filter-button"
                  value={filterMonth ?? ""}
                  onChange={(e) => setFilterMonth(e.target.value === "" ? null : parseInt(e.target.value))}
                >
                  <option value="">All Months</option>
                  {months.map((month, index) => (
                    <option value={index} key={index}>{month}</option>
                  ))}
                </select>
                <select
  className="filter-button"
  value={filterYear ?? ""}
  onChange={(e) => setFilterYear(e.target.value === "" ? null : parseInt(e.target.value))}
>
  <option value="">All Years</option>
  {[...new Set(entries.map(entry => entry.year))].map((year) => (
    <option value={year} key={year}>{year}</option>
  ))}
</select>

              </div>
              <ul className="entry-list">
                {filteredEntries.map((entry, index) => (
                  <li key={index} className="entry-item">
                    <strong>{entry.date}</strong> - Mood: {entry.mood}, Sleep: {entry.sleepHours} hrs, Feelings: {entry.feelings}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
  
    </div>
   
    
  );
  
 
};

export default CalendarComponent;
