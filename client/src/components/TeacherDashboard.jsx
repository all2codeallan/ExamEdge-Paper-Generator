import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import AIChatLauncherModal from './ai/AIChatLauncherModal';

import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { api } from '../utils/api';
import '../styles/dashboard.css';

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLauncherModalOpen, setIsLauncherModalOpen] = useState(false);
  const [selectedCourseForAI, setSelectedCourseForAI] = useState(null);
  useEffect(() => {
    // Check authentication on mount
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    
    if (!token || userRole !== 'faculty') {
      navigate('/login-faculty');
      return;
    }

    // Fetch courses
    fetchCourses();
  }, [navigate]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await api.get('/faculty-dashboard/');
      localStorage.setItem('name', response.data.name);
      console.log('API Response:', response.data); // Debug log
      if (response.data.courses && response.data.courses.length > 0) {
        setCourses(response.data.courses);
        console.log('Fetched courses:', response.data.courses); // Debug: log all courses
      } else {
        setError('No courses found.');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      if (error.response?.status === 403) {
        // Forbidden - likely a role/permission issue
        navigate('/login-faculty');
      } else {
        setError('Failed to load courses. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = (courseId, action) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    
    if (!token || userRole !== 'faculty') {
      navigate('/login-faculty');
      return;
    }

    if (action === 'manage') {
      navigate(`/manage-question-bank/${courseId}`);
    } else if (action === 'create') {
      navigate(`/create-question-paper/${courseId}`);
    }
    // else if (action === 'quiz') {
    //   navigate(`/quiz/${courseId}`);
    // }

  };



  const handleOpenAIChatLauncher = (course) => {
    setSelectedCourseForAI(course);
    setIsLauncherModalOpen(true);
  };

  const handleCloseAIChatLauncher = () => {
    setIsLauncherModalOpen(false);
    setSelectedCourseForAI(null);
  };


  if (loading) {
    return (
      <>
        <Header page="Dashboard" />
        <div className="dashboard-page">
          <div className="loading">Loading courses...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header page="Faculty Dashboard" />
      <div className="dashboard-page">
        <div className="dashboard">
          <h1>Teacher Dashboard</h1>
          {error && <div className="error-message">{error}</div>}
          <div className="course-list">
            {courses.map((course) => {
              console.log('Course object:', course); // Debug: log each course
              return (
                <Accordion key={course._id || course.id || course.course_id}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel-${course._id || course.id || course.course_id}-content`} id={`panel-${course._id || course.id || course.course_id}-header`}>
                    <div className="course-name">{course.name}</div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div>
                      <div className="dropdown">
                        <button onClick={() => handleNavigation(course._id || course.id || course.course_id, 'manage')}>Manage Question Bank</button>
                        <button onClick={() => handleNavigation(course._id || course.id || course.course_id, 'create')}>Create Question Paper</button>
                        <button onClick={() => handleOpenAIChatLauncher(course)}>Generate with AI Assistant</button>

                        {/* <button onClick={() => {
                          // Prefer _id, fallback to id or course_id
                          const id = course._id || course.id || course.course_id;
                          window.open(`http://localhost:3000/create-exam?courseId=${id}`, '_self');
                        }}>Create Quiz</button> */}
                      </div>
                      {/* <ul className="unit-list">
                        {course.units?.map((unit, index) => (
                          <li key={index} className="unit-item">{unit}</li>
                        ))}
                      </ul> */}
                    </div>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          {selectedCourseForAI && (
        <AIChatLauncherModal
          open={isLauncherModalOpen}
          onClose={handleCloseAIChatLauncher}
          course={selectedCourseForAI}
          navigate={navigate}
        />
      )}
          </div>
        </div>
      </div>
    </>
  );
}





// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from './Header';
// import AIChatLauncherModal from './ai/AIChatLauncherModal';

// import { Accordion, AccordionSummary, AccordionDetails, Button, Box, Typography, CircularProgress } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import SmartToyIcon from '@mui/icons-material/SmartToy';
// import NoteAddIcon from '@mui/icons-material/NoteAdd';
// import SettingsIcon from '@mui/icons-material/Settings';
// import { api } from '../utils/api';
// import '../styles/dashboard.css';

// export default function TeacherDashboard() {
//   const navigate = useNavigate();
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isLauncherModalOpen, setIsLauncherModalOpen] = useState(false);
//   const [selectedCourseForAI, setSelectedCourseForAI] = useState(null);

//   useEffect(() => {
//     // Check authentication on mount
//     const token = localStorage.getItem('token');
//     const userRole = localStorage.getItem('userRole');
    
//     if (!token || userRole !== 'faculty') {
//       navigate('/login-faculty');
//       return;
//     }

//     // Fetch courses
//     fetchCourses();
//   }, [navigate]);

//   const fetchCourses = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get('/faculty-dashboard/');
//       localStorage.setItem('name', response.data.name);
//       console.log('API Response:', response.data); // Debug log
//       if (response.data.courses && response.data.courses.length > 0) {
//         setCourses(response.data.courses);
//       } else {
//         setError('No courses found.');
//       }
//     } catch (error) {
//       console.error('Error fetching courses:', error);
//       if (error.response?.status === 403) {
//         // Forbidden - likely a role/permission issue
//         navigate('/login-faculty');
//       } else {
//         setError('Failed to load courses. Please try again later.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleManageQB = (courseId) => {
//     navigate(`/manage-question-bank/${courseId}`);
//   };

//   const handleCreateManual = (courseId) => {
//     navigate(`/create-question-paper/${courseId}`);
//   };

//   const handleOpenAIChatLauncher = (course) => {
//     setSelectedCourseForAI(course);
//     setIsLauncherModalOpen(true);
//   };

//   const handleCloseAIChatLauncher = () => {
//     setIsLauncherModalOpen(false);
//     setSelectedCourseForAI(null);
//   };

//   if (loading) {
//     return (
//       <>
//         <Header page="Dashboard" />
//         <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
//           <CircularProgress />
//           <Typography ml={2}>Loading courses...</Typography>
//         </Box>
//       </>
//     );
//   }

//   return (
//     <>
//       <Header page="Faculty Dashboard" />
//       <Box className="dashboard-page" sx={{ p: 3 }}>
//         <Box className="dashboard" sx={{ maxWidth: '900px', margin: 'auto' }}>
//           <Typography variant="h4" component="h1" gutterBottom>
//             Teacher Dashboard
//           </Typography>
//           {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
          
//           {courses.length === 0 && !loading && (
//             <Typography>No courses assigned to you yet.</Typography>
//           )}

//           <Box className="course-list">
//             {courses.map((course) => (
//               <Accordion key={course.id} sx={{ mb: 2, '&:before': { display: 'none' } }} TransitionProps={{ unmountOnExit: true }}>
//                 <AccordionSummary 
//                   expandIcon={<ExpandMoreIcon />} 
//                   aria-controls={`panel-${course.id}-content`} 
//                   id={`panel-${course.id}-header`}
//                   sx={{ backgroundColor: 'action.hover' }}
//                 >
//                   <Typography variant="h6" className="course-name">{course.name} ({course.code})</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails sx={{ p: 2, borderTop: '1px solid rgba(0, 0, 0, 0.12)' }}>
//                   <Box>
//                     <Typography variant="subtitle1" gutterBottom>Units:</Typography>
//                     {course.units && course.units.length > 0 ? (
//                       <Box component="ul" sx={{ listStyleType: 'disc', pl: 2, mb: 2 }}>
//                         {course.units.map((unit, index) => (
//                           <Typography component="li" key={index} className="unit-item">{unit}</Typography>
//                         ))}
//                       </Box>
//                     ) : (
//                       <Typography sx={{mb:2}}>No units defined for this course.</Typography>
//                     )}
//                     <Box className="dropdown" sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
//                       <Button 
//                         variant="outlined" 
//                         startIcon={<SettingsIcon />} 
//                         onClick={() => handleManageQB(course.id)}
//                       >
//                         Manage Question Bank
//                       </Button>
//                       <Button 
//                         variant="outlined" 
//                         startIcon={<NoteAddIcon />} 
//                         onClick={() => handleCreateManual(course.id)}
//                       >
//                         Create Paper Manually
//                       </Button>
//                       <Button 
//                         variant="contained" 
//                         color="primary" 
//                         startIcon={<SmartToyIcon />} 
//                         onClick={() => handleOpenAIChatLauncher(course)}
//                       >
//                         Generate with AI Assistant
//                       </Button>
//                     </Box>
//                   </Box>
//                 </AccordionDetails>
//               </Accordion>
//             ))}
//           </Box>
//         </Box>
//       </Box>
//       {selectedCourseForAI && (
//         <AIChatLauncherModal
//           open={isLauncherModalOpen}
//           onClose={handleCloseAIChatLauncher}
//           course={selectedCourseForAI}
//           navigate={navigate}
//         />
//       )}
//     </>
//   );
// }