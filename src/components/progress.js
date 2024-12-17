// // // // import React, { useState, useEffect } from 'react';
// // // // import './progress.css';  // Ensure you have this CSS file in the same directory

// // // // const ProgressTracker = () => {
// // // //     const [selfCareProgress, setSelfCareProgress] = useState(75);  // Example start values
// // // //     const [dailyCheckInProgress, setDailyCheckInProgress] = useState(50);
// // // //     const [journalingProgress, setJournalingProgress] = useState(90);
// // // //     const [overallProgress, setOverallProgress] = useState(0);

// // // //     useEffect(() => {
// // // //         // Calculate overall progress as an average of all three activities
// // // //         const totalProgress = (selfCareProgress + dailyCheckInProgress + journalingProgress) / 3;
// // // //         setOverallProgress(totalProgress);
// // // //     }, [selfCareProgress, dailyCheckInProgress, journalingProgress]);

// // // //     return (
// // // //         <div className="progress-container">
// // // //             <div className="individual-progress">
// // // //                 <label>Self-Care Challenges: {selfCareProgress}%</label>
// // // //                 <progress value={selfCareProgress} max="100"></progress>
// // // //                 {selfCareProgress === 100 && <div className="badge">🏆 Self-Care Master</div>}
// // // //             </div>
// // // //             <div className="individual-progress">
// // // //                 <label>Daily Check-In: {dailyCheckInProgress}%</label>
// // // //                 <progress value={dailyCheckInProgress} max="100"></progress>
// // // //                 {dailyCheckInProgress === 100 && <div className="badge">🌟 Check-In Champion</div>}
// // // //             </div>
// // // //             <div className="individual-progress">
// // // //                 <label>Journaling: {journalingProgress}%</label>
// // // //                 <progress value={journalingProgress} max="100"></progress>
// // // //                 {journalingProgress === 100 && <div className="badge">✍️ Journaling Genius</div>}
// // // //             </div>
// // // //             <div className="overall-progress">
// // // //                 <label>Overall Progress: {overallProgress.toFixed(1)}%</label>
// // // //                 <progress value={overallProgress} max="100"></progress>
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // };

// // // // export default ProgressTracker;



// // // // Progress.js
import React, { useState, useEffect } from 'react';
import './progress.css';
import axios from 'axios';

const ProgressBar = ({ label, percentage, color }) => (
    <div className="progress-bar">
        <div className="progress-label">
            {label}: {percentage}%
        </div>
        <div className="progress-bar-outer">
            <div
                className="progress-bar-inner"
                style={{
                    width: `${percentage}%`,
                    backgroundColor: color,
                }}
            ></div>
        </div>
        {percentage === 100 && <div className="badge">🏆 {label} Completed!</div>}
    </div>
);

// const Progress = () => {
//     const [selfCareProgress, setSelfCareProgress] = useState(75);  // Example start values
//     const [dailyCheckInProgress, setDailyCheckInProgress] = useState(50);
//     const [journalingProgress, setJournalingProgress] = useState(90);
//     const [overallProgress, setOverallProgress] = useState(0);

//     useEffect(() => {
//         // Calculate overall progress as an average of all three activities
//         const totalProgress = (selfCareProgress + dailyCheckInProgress + journalingProgress) / 3;
//         setOverallProgress(totalProgress.toFixed(1));
//     }, [selfCareProgress, dailyCheckInProgress, journalingProgress]);

//     return (
//         <div className="progress-container">
//             <h2 className="progress-title">Progress Overview</h2>
//             <ProgressBar label="Self-Care Challenges" percentage={selfCareProgress} color="#4CAF50" />
//             <ProgressBar label="Daily Check-In" percentage={dailyCheckInProgress} color="#2196F3" />
//             <ProgressBar label="Journaling" percentage={journalingProgress} color="#FF9800" />
//             <ProgressBar label="Overall Progress" percentage={overallProgress} color="#9C27B0" />
//         </div>
//     );
// };

const Progress = () => {
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
      const email = localStorage.getItem('email');
      if (!email) return;

      axios
          .get(`http://localhost:5002/api/get-progress/${email}`)
          .then((response) => {
              setProgressPercentage(response.data.progressPercentage);
          })
          .catch((error) => console.error('Error fetching progress:', error));
  }, []);

  return (
      <div className="progress-container">
          <h2>Progress</h2>
          <progress value={progressPercentage} max="100"></progress>
          <p>{progressPercentage.toFixed(1)}% Completed</p>
      </div>
  );
};

export default Progress;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ProgressPage = () => {
//   const [progress, setProgress] = useState({
//     selfCare: 0,
//     dailyCheckIn: 50, // Example static data
//     journaling: 90,  // Example static data
//     overall: 0,
//   });

//   useEffect(() => {
//     const fetchProgress = async () => {
//       try {
//         const userId = localStorage.getItem('userId');
//         if (!userId) throw new Error('User not logged in');

//         const response = await axios.get(`http://localhost:5002/api/get-task-status/${userId}`);
//         const selfCare = response.data.progress;

//         // Update overall progress dynamically
//         const overall = (selfCare + progress.dailyCheckIn + progress.journaling) / 3;

//         setProgress((prev) => ({ ...prev, selfCare, overall }));
//       } catch (error) {
//         console.error('Error fetching progress:', error);
//       }
//     };

//     fetchProgress();
//   }, [progress.dailyCheckIn, progress.journaling]);

//   return (
//     <div className="progress-container">
//       <h1>Progress Overview</h1>
//       <div>
//         <p>Self-Care Challenges: {progress.selfCare}%</p>
//         <div style={{ background: '#ddd', height: '20px', borderRadius: '10px' }}>
//           <div
//             style={{
//               width: `${progress.selfCare}%`,
//               background: 'green',
//               height: '100%',
//               borderRadius: '10px',
//             }}
//           />
//         </div>
//       </div>
//       <div>
//         <p>Daily Check-In: {progress.dailyCheckIn}%</p>
//         <div style={{ background: '#ddd', height: '20px', borderRadius: '10px' }}>
//           <div
//             style={{
//               width: `${progress.dailyCheckIn}%`,
//               background: 'blue',
//               height: '100%',
//               borderRadius: '10px',
//             }}
//           />
//         </div>
//       </div>
//       <div>
//         <p>Journaling: {progress.journaling}%</p>
//         <div style={{ background: '#ddd', height: '20px', borderRadius: '10px' }}>
//           <div
//             style={{
//               width: `${progress.journaling}%`,
//               background: 'orange',
//               height: '100%',
//               borderRadius: '10px',
//             }}
//           />
//         </div>
//       </div>
//       <div>
//         <p>Overall Progress: {progress.overall.toFixed(1)}%</p>
//         <div style={{ background: '#ddd', height: '20px', borderRadius: '10px' }}>
//           <div
//             style={{
//               width: `${progress.overall}%`,
//               background: 'purple',
//               height: '100%',
//               borderRadius: '10px',
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProgressPage;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ProgressPage = () => {
//   const [activities, setActivities] = useState([]);  // To store fetched activities
//   const [error, setError] = useState('');            // To store any error message

//   useEffect(() => {
//     const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage

//     // If there's no userId in localStorage, show an error message
//     if (!userId) {
//       setError('User is not logged in');
//       return;
//     }

//     // Fetch activities from backend using the userId
//     axios
//       .get(`http://localhost:5002/api/get-task-status/${userId}`)
//       .then(response => {
//         // Set the activities to the state
//         setActivities(response.data.activities);
//       })
//       .catch(error => {
//         console.error('Error fetching activities:', error);
//         setError('Error fetching activities');
//       });
//   }, []); // Empty array means this effect runs once when the component mounts

//   return (
//     <div>
//       <h2>User Activities</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <ul>
//         {activities.length > 0 ? (
//           activities.map((activity, index) => (
//             <li key={index}>
//               <strong>{activity.action}</strong> at {new Date(activity.timestamp).toLocaleString()}
//             </li>
//           ))
//         ) : (
//           <p>No activities found</p>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default ProgressPage;
