// import React, { useState } from "react";
// import "./Psychologist.css";

// const psychologists = [
//   {
//     name: "Dr. Sonam Dullat",
//     profileLink: "https://www.linkedin.com/in/dr-sonam-dullat-010053295/",
//     title: "Manager (Student Counsellor - TICC) Certified CBT, Trauma-Informed Therapist.",
//     specialty: "Anxiety, Stress Management, Relationship Counseling, and Personal development.",
//     desc: "Dr. Sonam Dullat is a dedicated psychologist specializing in anxiety, stress management, relationship counseling, and personal development. She empowers individuals to overcome challenges and lead fulfilling, balanced lives.",
//     location: "G-Block, Room No: 105, Thapar University, Patiala, Punjab",
//     contact: "+91-8872739998.",
//     image: "https://www.thapar.edu/upload/files/TICC/sonamdullat.jpg",
//   },
//   {
//     name: "Dr. Harneet Kaur Kohli",
//     title: "B.D.S (M.A.H.E) | MA(Clinical Psychology) | MHA Psychologist",
//     specialty: "Psychotherapy, Family and couple therapy, Child counselling, Cognitive behaviour therapy, Mindfulness, Dialectical behaviour therapy, Pain management by hypnotherapy, Sleep disorder therapy",
//     desc: "Dr. Harneet Kaur Kohli is the best Psychologist in Patiala and is currently associated with Manipal Hospital Patiala.",
//     location: "Manipal Hospital, 22, near Bhupindra Road, Patiala, Punjab",
//     contact: "Phone: +91-7947106581",
//     image: "https://www.manipalhospitals.com/uploads/doctors_photo/psychologist-in-patiala-dr-harneet-kaur-kohli.png",
//   },
//   {
  //   name: "Dr. Arvind Sharma",
  //   title: " Neuropsychiatrist, MD in Mental Health (Psychiatry)",
  //   specialty: "Relationship Counseling",
  //   desc: "Dr. Sharma is considered the best psychiatrist in Patiala with vast experience and knowledge in the field of psychiatry. He has excellent motivational skills and provides great counseling that helps patients recover quickly.",
  //   location: "22 No Phatak, Friends Colony, Patiala (Behind Lakshmi Palace)",
  //   contact: "Phone: +91-7942684250",
  //   image: "https://content.jdmagicbox.com/comp/patiala/g4/9999px175.x175.210423175640.e1g4/catalogue/dr-arvind-sharma-s-neuropsychiatry-clinic-friends-colony-patiala-psychiatrists-lhlkoeton6.jpg",
  // },
  // {
  //   name: "Dr. Mayank Rajput",
  //   title: "Senior Consultant Psychologist, M.Phil, M.Sc",
  //   specialty: "Cognitive Behaviour Therapy, Rational Emotive Behaviour Therapy, Psychodynamic Therapy, Mindfulness",
  //   desc: "User is a clinical psychologist with seven years of experience, specializing in a variety of mental health conditions. They use a tailored eclectic approach and actively promote mental health awareness.",
  //   location: "Senior Consultant Psychologist at Amaha ",
  //   contact: "Phone: +91 123 456 7892",
  //   image: "https://assets.theinnerhour.com/profilepics/mayank_rajput.png",
  // }
// ];

// const Psychologist = () => {
//   const [selectedPsychologist, setSelectedPsychologist] = useState(null);

//   const handleSelectPsychologist = (psychologist) => {
//     setSelectedPsychologist(psychologist);
//   };

//   return (
//     <div className="psychologist-page">
//       <h1>Connect with Psychologists</h1>
      
//       <div className="psychologist-cards">
//         {psychologists.map((psychologist, index) => (
//           <div
//             className="psychologist-card"
//             key={index}
//             onClick={() => handleSelectPsychologist(psychologist)}
//           >
//             <img
//               src={psychologist.image}
//               alt={psychologist.name}
//               className="psychologist-image"
//             />
//             <div className="psychologist-details">
//               <h3>{psychologist.name}</h3>
//               <p>{psychologist.title}</p> <br></br>
//               <center><p> <svg width="32" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602"/></svg> {psychologist.location}</p></center>
//               {/* <p>{psychologist.contact}</p> */}
//               <a
//                 href={psychologist.profileLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="profile-link"
//               >
//                 View Profile
//               </a>
//             </div>
//           </div>
//         ))}
//       </div>

//       {selectedPsychologist && (
//         <div className="selected-psychologist">
//           {/* <h2>Selected Psychologist</h2> */}
//           <h2><strong>{selectedPsychologist.name}</strong></h2>
//           <p><strong>Specialty:</strong> {selectedPsychologist.specialty}</p>
//           {/* <p><strong>Location:</strong> {selectedPsychologist.location}</p> */}
          
//           <p><strong>Description:</strong> {selectedPsychologist.desc}</p>
//           <p><strong>Contact:</strong> {selectedPsychologist.contact}</p>
//           <a
//             href={selectedPsychologist.profileLink}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="profile-link"
//           >
//             View Profile
//           </a>
//           <p>Start a chat or call for professional guidance.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Psychologist;
import React, { useState } from "react";

const psychologists = [
  {
    name: "Dr. Sonam Dullat",
    profileLink: "https://www.linkedin.com/in/dr-sonam-dullat-010053295/",
    title: "Manager (Student Counsellor - TICC) Certified CBT, Trauma-Informed Therapist.",
    specialty: "Anxiety, Stress Management, Relationship Counseling, and Personal development.",
    desc: "Dr. Sonam Dullat is a dedicated psychologist specializing in anxiety, stress management, relationship counseling, and personal development.",
    location: "G-Block, Room No: 105, Thapar University, Patiala, Punjab",
    contact: "+91-8872739998.",
    image: "https://www.thapar.edu/upload/files/TICC/sonamdullat.jpg",
  },
  {
    name: "Dr. Harneet Kaur Kohli",
    profileLink: "https://www.manipalhospitals.com",
    title: "B.D.S (M.A.H.E) | MA(Clinical Psychology) | MHA Psychologist",
    specialty: "Psychotherapy, Family and couple therapy, Child counselling, Cognitive behaviour therapy",
    desc: "Dr. Harneet Kaur Kohli is the best Psychologist in Patiala and is currently associated with Manipal Hospital Patiala.",
    location: "Manipal Hospital, 22, near Bhupindra Road, Patiala, Punjab",
    contact: "Phone: +91-7947106581",
    image: "https://www.manipalhospitals.com/uploads/doctors_photo/psychologist-in-patiala-dr-harneet-kaur-kohli.png",
  },{
  name: "Dr. Arvind Sharma",
  title: " Neuropsychiatrist, MD in Mental Health (Psychiatry)",
  specialty: "Relationship Counseling",
  desc: "Dr. Sharma is considered the best psychiatrist in Patiala with vast experience and knowledge in the field of psychiatry. He has excellent motivational skills and provides great counseling that helps patients recover quickly.",
  location: "22 No Phatak, Friends Colony, Patiala (Behind Lakshmi Palace)",
  contact: "Phone: +91-7942684250",
  image: "https://content.jdmagicbox.com/comp/patiala/g4/9999px175.x175.210423175640.e1g4/catalogue/dr-arvind-sharma-s-neuropsychiatry-clinic-friends-colony-patiala-psychiatrists-lhlkoeton6.jpg",
},
{
  name: "Dr. Mayank Rajput",
  title: "Senior Consultant Psychologist, M.Phil, M.Sc",
  specialty: "Cognitive Behaviour Therapy, Rational Emotive Behaviour Therapy, Psychodynamic Therapy, Mindfulness",
  desc: "User is a clinical psychologist with seven years of experience, specializing in a variety of mental health conditions. They use a tailored eclectic approach and actively promote mental health awareness.",
  location: "Senior Consultant Psychologist at Amaha ",
  contact: "Phone: +91 123 456 7892",
  image: "https://assets.theinnerhour.com/profilepics/mayank_rajput.png",
}
];

const Psychologist = () => {
  const [selectedPsychologist, setSelectedPsychologist] = useState(null);

  const handleSelectPsychologist = (psychologist) => {
    setSelectedPsychologist(psychologist);
  };

  const closeModal = () => {
    setSelectedPsychologist(null);
  };

  const pageStyle = {
    minHeight: "100vh", // Full viewport height
    margin: "0", // Remove margin
    background: "linear-gradient(to bottom, #a6d4ba, #ffffff)", // Gradient background
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center", // Center content vertically
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    boxSizing: "border-box",
  };
  

  const cardContainerStyle = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "20px",
    marginTop: "20px",
  };

  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "15px",
    width: "280px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const cardHoverStyle = {
    transform: "scale(1.05)",
    boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",
  };

  const imageStyle = {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "50%",
    marginBottom: "10px",
  };

  const linkStyle = {
    display: "inline-block",
    marginTop: "10px",
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "color 0.3s ease",
  };

  const linkHoverStyle = {
    color: "#0056b3",
    textDecoration: "underline",
  };

  const modalOverlayStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "1000",
  };

  const modalStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",
    width: "90%",
    maxWidth: "600px",
    textAlign: "left",
    color: "#333",
  };

  const closeButtonStyle = {
    marginTop: "15px",
    padding: "10px 15px",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return(

  <div style={pageStyle}>
      <h1 style={{ color: "#008C8C", fontSize: "2rem", marginBottom: "20px" }}>
        Connect with Psychologists
      </h1>

      {/* Card List */}
      <div style={cardContainerStyle}>
        {psychologists.map((psychologist, index) => (
          <div
            key={index}
            style={{ ...cardStyle }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = cardHoverStyle.transform;
              e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            <img src={psychologist.image} alt={psychologist.name} style={imageStyle} />
            <h3 style={{ fontSize: "18px", color: "#333", margin: "10px 0" }}>
              {psychologist.name}
            </h3>
            <p style={{ color: "#555", fontSize: "14px" }}>{psychologist.title}</p>
            <span
              style={{ ...linkStyle }}
              onMouseOver={(e) => (e.currentTarget.style.color = linkHoverStyle.color)}
              onMouseOut={(e) => (e.currentTarget.style.color = linkStyle.color)}
              onClick={() => handleSelectPsychologist(psychologist)}
            >
              View Details
            </span>
          </div>
        ))}
      </div>

      {/* Modal Pop-Up */}
      {selectedPsychologist && (
        <div style={modalOverlayStyle} onClick={closeModal}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginBottom: "10px" }}>{selectedPsychologist.name}</h2>
            <p>
              <strong>Specialty:</strong> {selectedPsychologist.specialty}
            </p>
            <p>
              <strong>Description:</strong> {selectedPsychologist.desc}
            </p>
            <p>
              <strong>Location:</strong> {selectedPsychologist.location}
            </p>
            <p>
              <strong>Contact:</strong> {selectedPsychologist.contact}
            </p>
            <button style={closeButtonStyle} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Psychologist;
