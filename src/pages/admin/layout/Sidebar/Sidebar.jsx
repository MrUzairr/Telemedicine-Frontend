import { useEffect, useState } from 'react';
import { personsImgs } from '../../utils/images';
import { navigationLinks } from '../../data/data';
import "./Sidebar.css";
import { useContext } from 'react';
import { SidebarContext } from '../../context/sidebarContext';
import UserInfo from '../../components/UserInfo';

const Sidebar = ({ setActiveTab }) => {
  const [activeLinkIdx, setActiveLinkIdx] = useState(0); // Use 0-based index for easier comparison
  const [sidebarClass, setSidebarClass] = useState("");
  const { isSidebarOpen } = useContext(SidebarContext);
  const admin = JSON.parse(localStorage.getItem("adminAuth"));
  useEffect(() => {
    setSidebarClass(isSidebarOpen ? 'sidebar-change' : '');
  }, [isSidebarOpen]);

  const handleLinkClick = (tabName, index) => {
    setActiveTab(tabName); // Update the active tab in the parent
    setActiveLinkIdx(index); // Correctly update the active link index
  };
  return (
    <div className={`sidebar ${sidebarClass}`}>
      {/* <div className="user-info">
        <div className="info-img img-fit-cover">
          <img src={personsImgs.person_two} onClick={handleImage} style={{cursor:"pointer"}} alt="profile" />
        </div>
        <div style={{display:'flex',flexDirection:'column',fontSize:'16px',textAlign:'left'}}>
        <span className="info-name" style={{fontSize:'14px'}}>alice-doe</span>
        <p style={{fontSize:'12px'}}>publicmail760@gmail.com</p>
        </div>

      </div> */}
      <div style={{fontSize:'16px'}}>
      <UserInfo admin={admin}/>
      </div>

      <nav className="navigation">
        <ul className="nav-list">
          {navigationLinks.map((navigationLink, index) => (
            <li className="nav-item" key={navigationLink.id}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default navigation
                  handleLinkClick(navigationLink.title.toLowerCase(), index);
                }}
                className={`nav-link ${index === activeLinkIdx ? 'active' : ''}`}
              >
                <img
                  src={navigationLink.image}
                  className="nav-link-icon"
                  alt={navigationLink.title}
                />
                <span className="nav-link-text">{navigationLink.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;


// import { useEffect, useState } from 'react';
// import { personsImgs } from '../../utils/images';
// import { navigationLinks } from '../../data/data';
// import "./Sidebar.css";
// import { useContext } from 'react';
// import { SidebarContext } from '../../context/sidebarContext';

// const Sidebar = ({ setActiveTab }) => {
//   const [activeLinkIdx,setActiveLinkIdx] = useState(1);
//   const [sidebarClass, setSidebarClass] = useState("");
//   const { isSidebarOpen } = useContext(SidebarContext);

//   useEffect(() => {
//     if(isSidebarOpen){
//       setSidebarClass('sidebar-change');
//     } else {
//       setSidebarClass('');
//     }
//   }, [isSidebarOpen]);

//   const handleLinkClick = (tabName, index) => {
//     setActiveTab(tabName); // Update the active tab in the parent
//     setActiveLinkIdx(index); // Update the active link index
//   };

//   return (
//     <div className={ `sidebar ${sidebarClass}` }>
//       <div className="user-info">
//           <div className="info-img img-fit-cover">
//               <img src={ personsImgs.person_two } alt="profile image" />
//           </div>
//           <span className="info-name">alice-doe</span>
//       </div>

//       <nav className="navigation">
//           <ul className="nav-list">
//             {
//               navigationLinks.map((navigationLink,index) => (
//                 <li className="nav-item" key = { navigationLink.id }>
//                   <a href="#"  onClick={() => handleLinkClick(navigationLink.title.toLowerCase(), index)} className={ `nav-link ${ navigationLink.id === activeLinkIdx ? 'active' : null }` }>
//                       <img src={ navigationLink.image } className="nav-link-icon" alt = { navigationLink.title } />
//                       <span className="nav-link-text">{ navigationLink.title }</span>
//                   </a>
//                 </li>
//               ))
//             }
//           </ul>
//       </nav>
//     </div>
//   )
// }

// export default Sidebar
