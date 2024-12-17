// // import React from 'react';
// // import { Drawer, Typography, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText } from '@mui/material';
// // import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// // const JournalDrawer = ({ open, onClose, entries, handleSelectEntry }) => {
// //   return (
// //     <Drawer anchor="left" open={open} onClose={onClose}>
// //       <div style={{ width: '300px', padding: '15px', backgroundColor: '#f0f0f0' }}>
// //         <Typography variant="h6" gutterBottom>
// //           View Past Entries
// //         </Typography>
// //         {Object.keys(entries).map((journalType) => (
// //           <Accordion key={journalType}>
// //             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
// //               <Typography>
// //                 {journalType.charAt(0).toUpperCase() + journalType.slice(1)} Journal
// //               </Typography>
// //             </AccordionSummary>
// //             <AccordionDetails>
// //               <List>
// //                 {entries[journalType].length === 0 ? (
// //                   <Typography>No entries yet.</Typography>
// //                 ) : (
// //                   entries[journalType].map((entry, index) => (
// //                     <ListItem
// //                       button
// //                       key={index}
// //                       onClick={() => handleSelectEntry(entry)}
// //                       style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}
// //                     >
// //                       <ListItemText primary={entry.title} secondary={entry.date} />
// //                     </ListItem>
// //                   ))
// //                 )}
// //               </List>
// //             </AccordionDetails>
// //           </Accordion>
// //         ))}
// //       </div>
// //     </Drawer>
// //   );
// // };

// // export default JournalDrawer;
// import React from "react";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   Typography,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// const JournalDrawer = ({ open, onClose, entries, handleSelectEntry }) => {
//   return (
//     <Drawer anchor="right" open={open} onClose={onClose}>
//       <div style={{ width: 300, padding: "10px" }}>
//         <Typography variant="h6" gutterBottom>
//           Previous Entries
//         </Typography>
//         {Object.keys(entries).map((journalType) => (
//           <Accordion key={journalType}>
//             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//               <Typography>
//                 {journalType.charAt(0).toUpperCase() + journalType.slice(1)} Journal
//               </Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <List>
//                 {entries[journalType].length === 0 ? (
//                   <Typography variant="body2" color="textSecondary">
//                     No entries yet.
//                   </Typography>
//                 ) : (
//                   entries[journalType].map((entry, index) => (
//                     <ListItem
//                       button
//                       key={index}
//                       onClick={() => handleSelectEntry(entry)}
//                     >
//                       <ListItemText
//                         primary={entry.title}
//                         secondary={entry.date}
//                       />
//                     </ListItem>
//                   ))
//                 )}
//               </List>
//             </AccordionDetails>
//           </Accordion>
//         ))}
//       </div>
//     </Drawer>
//   );
// };

// export default JournalDrawer;

import React from "react";
import { Drawer, List, ListItem, ListItemText, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const JournalDrawer = ({ open, onClose, entries, handleSelectEntry }) => {
  const journalTypes = ["morning", "daily", "weekly", "gratitude"];

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div style={{ width: 300, padding: 16 }}>
        <Typography variant="h5" style={{ marginBottom: 16 }}>
          Previous Entries
        </Typography>
        {journalTypes.map((journalType) => (
          <Accordion key={journalType}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>
                {journalType.charAt(0).toUpperCase() + journalType.slice(1)} Journal
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {(entries[journalType] || []).length > 0 ? (
                  entries[journalType].map((entry, index) => (
                    <ListItem
                      button
                      key={`${journalType}-${index}`}
                      onClick={() => handleSelectEntry(entry)}
                    >
                      <ListItemText primary={entry.title} secondary={entry.date} />
                    </ListItem>
                  ))
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    No entries available
                  </Typography>
                )}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </Drawer>
  );
};

export default JournalDrawer;


// // import React from "react";
// // import { Drawer, List, ListItem, ListItemText, Typography } from "@mui/material";

// // const JournalDrawer = ({ open, onClose, entries, handleSelectEntry }) => {
// //   return (
// //     <Drawer anchor="right" open={open} onClose={onClose}>
// //       <div style={{ width: 300, padding: 16 }}>
// //         <Typography variant="h5" style={{ marginBottom: 16 }}>
// //           Journal Entries
// //         </Typography>
// //         <List>
// //           {Object.keys(entries).map((journalType) =>
// //             entries[journalType].map((entry, index) => (
// //               <ListItem
// //                 button
// //                 key={`${journalType}-${index}`}
// //                 onClick={() => handleSelectEntry(entry)}
// //               >
// //                 <ListItemText
// //                   primary={entry.title}
// //                   secondary={`${journalType.charAt(0).toUpperCase()}${journalType.slice(1)} - ${entry.date}`}
// //                 />
// //               </ListItem>
// //             ))
// //           )}
// //         </List>
// //       </div>
// //     </Drawer>
// //   );
// // };

// // export default JournalDrawer;
