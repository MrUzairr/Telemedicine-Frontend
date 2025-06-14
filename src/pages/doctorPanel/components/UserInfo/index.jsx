import React, { useState, useMemo, useContext, useEffect } from "react";
import Logout from "@mui/icons-material/Logout";
import {
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import {
  AuthenticationContext,
  SessionContext,
} from "@toolpad/core/AppProvider";
import { useNavigate } from "react-router-dom";

// Utility function to truncate email
const truncateEmail = (email, maxLength = 10) => {
  if (!email) return "";
  if (email.length <= maxLength) return email;
  const [name, domain] = email.split("@");
  return name.length > maxLength
    ? `${name.substring(0, maxLength)}...@${domain}`
    : `${name}...@${domain}`;
};

// Default session data
const demoSession = {
  user: {
    name: "M. Uzair",
    email: truncateEmail("publicmail760@gmail.com"),
    image: "myPic2.png",
  },
};

export default function AccountCustomSlotProps({ admin }) {
  const navigate = useNavigate();
  console.log("Doctor Panel Data:", admin); // Debugging console log

  // Initialize session state
  const [session, setSession] = useState(demoSession);
  const [anchorEl, setAnchorEl] = useState(null); // State for controlling the menu

  // Authentication context
  const authentication = useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: admin?.fullName || "Unknown",
            email: truncateEmail(admin?.email) || "No email",
            image: admin?.profilePicture || "",
          },
        });
      },
      signOut: () => {
        setSession(null);
        localStorage.removeItem("doctorAuth");
        navigate("/");
      },
    };
  }, [admin]); // 👈 Fix: Add `admin` as a dependency
  console.log("Session Data:", session); // Debugging console log
  // Trigger sign-in when `admin` data updates
  useEffect(() => {
    if (admin) {
      authentication.signIn(); // 👈 Call sign-in when `admin` updates
    }
  }, [admin, authentication]);

  // Handle menu open/close
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AuthenticationContext.Provider value={authentication}>
      <SessionContext.Provider value={session}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "8px",
            width: "250px",
            margin: "10px",
            transition: "all 0.3s ease",
          }}
        >
          {/* Avatar and User Info */}
          <IconButton onClick={handleMenuOpen} sx={{ padding: 0 }}>
            <Avatar
              src={`http://localhost:3005/images/${session?.user?.image}`}
              alt={session?.user?.name}
              sx={{
                width: 50,
                height: 50,
                boxShadow: 2,
                transition: "all 0.3s ease",
                "&:hover": { transform: "scale(1.1)" },
                "& img": {
                  objectFit: "cover", // Ensures the image scales properly
                  objectPosition: "top", // Aligns focus to the top
                },
              }}
            />
          </IconButton>

          <Box sx={{ marginLeft: 1, textAlign: "left" }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", fontSize: "14px", color: "#333" }}
            >
              {session?.user?.name}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ fontSize: "12px" }}
            >
              {session?.user?.email}
            </Typography>
          </Box>
        </Box>

        {/* Menu for Logout */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MenuItem
            onClick={() => {
              authentication.signOut();
              handleMenuClose();
            }}
          >
            <Logout sx={{ marginRight: 1 }} /> Logout
          </MenuItem>
        </Menu>
      </SessionContext.Provider>
    </AuthenticationContext.Provider>
  );
}

// import React, { useState, useMemo, useContext } from 'react';
// import Logout from '@mui/icons-material/Logout';
// import { Account } from '@toolpad/core/Account';
// import { AppProvider, AuthenticationContext, SessionContext } from '@toolpad/core/AppProvider';

// // Utility function to truncate email
// const truncateEmail = (email, maxLength = 10) => {
//   if (email.length <= maxLength) return email;
//   const [name, domain] = email.split('@');
//   return name.length > maxLength
//     ? `${name.substring(0, maxLength)}...@${domain}`
//     : `${name}...@${domain}`;
// };

// // Define a type for Session if not provided by `@toolpad/core`
// const demoSession = {
//   user: {
//     name: 'Bharat Kashyap',
//     email: truncateEmail('bharatkashyap@outlook.com'),
//     image: 'https://avatars.githubusercontent.com/u/19550456',
//   },
// };

// export default function AccountCustomSlotProps() {
//   // Initialize session state
//   const [session, setSession] = useState(demoSession);

//   // Use context to dynamically access session data (if needed later)
//   const sessionContextValue = useContext(SessionContext);
//   console.log(sessionContextValue?.user?.name);

//   // Define authentication methods
//   const authentication = useMemo(() => {
//     return {
//       signIn: () => {
//         setSession({
//           user: {
//             name: 'Bharat Kashyap',
//             email: 'bharatkashyap@outlook.com',
//             image: 'https://avatars.githubusercontent.com/u/19550456',
//           },
//         });
//       },
//       signOut: () => {
//         setSession(null);
//       },
//     };
//   }, []);

//   return (
//     <AuthenticationContext.Provider value={authentication}>
//       <SessionContext.Provider value={session}>
//         <div
//           style={{
//             fontSize: '0.25rem',
//             transform: 'scale(0.8)',
//             maxWidth: '50px',
//             textAlign: 'left', // Ensures text is aligned to the left
//           }}
//         >
//           <Account
//             slotProps={{
//               signInButton: {
//                 color: 'success',
//               },
//               signOutButton: {
//                 color: 'success',
//                 startIcon: <Logout />,
//               },
//               preview: {
//                 variant: 'expanded',
//                 slotProps: {
//                   avatarIconButton: {
//                     sx: {
//                       width: 'fit-content',
//                       margin: 'auto',
//                     },
//                   },
//                   avatar: {
//                     variant: 'rounded',
//                   },
//                   userInfo: {
//                     sx: {
//                       textAlign: 'left', // Additional safeguard to align user info text
//                     },
//                   },
//                 },
//               },
//             }}
//           />
//         </div>
//       </SessionContext.Provider>
//     </AuthenticationContext.Provider>
//   );
// }

// import React, { useState, useMemo, useContext } from 'react';
// import Logout from '@mui/icons-material/Logout';
// import { Account } from '@toolpad/core/Account';
// import { AppProvider, AuthenticationContext, SessionContext } from '@toolpad/core/AppProvider';

// // Define a type for Session if not provided by `@toolpad/core`
// const demoSession = {
//   user: {
//     name: 'Bharat Kashyap',
//     email: 'bharatkashyap@outlook.com',
//     image: 'https://avatars.githubusercontent.com/u/19550456',
//   },
// };

// export default function AccountCustomSlotProps() {
//   // Initialize session state
//   const [session, setSession] = useState(demoSession);

//   // Use context to dynamically access session data (if needed later)
//   const sessionContextValue = useContext(SessionContext);
//   console.log(sessionContextValue?.user?.name);

//   // Define authentication methods
//   const authentication = useMemo(() => {
//     return {
//       signIn: () => {
//         setSession({
//           user: {
//             name: 'Bharat Kashyap',
//             email: 'bharatkashyap@outlook.com',
//             image: 'https://avatars.githubusercontent.com/u/19550456',
//           },
//         });
//       },
//       signOut: () => {
//         setSession(null);
//       },
//     };
//   }, []);

//   return (
//     <AuthenticationContext.Provider value={authentication}>
//       <SessionContext.Provider value={session}>
//         <Account
//           slotProps={{
//             signInButton: {
//               color: 'success',
//             },
//             signOutButton: {
//               color: 'success',
//               startIcon: <Logout />,
//             },
//             preview: {
//               variant: 'expanded',
//               slotProps: {
//                 avatarIconButton: {
//                   sx: {
//                     width: 'fit-content',
//                     margin: 'auto',
//                   },
//                 },
//                 avatar: {
//                   variant: 'rounded',
//                 },
//               },
//             },
//           }}
//         />
//       </SessionContext.Provider>
//     </AuthenticationContext.Provider>
//   );
// }
