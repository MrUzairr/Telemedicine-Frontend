import "./Content.css";
import ContentTop from '../../components/ContentTop/ContentTop';
import ContentMain from '../../components/ContentMain/ContentMain';

const Content = ({ activeTab }) => {

  return (
    <div className='main-content'>
      <ContentTop  activeTab={activeTab}/>
      <ContentMain activeTab={activeTab} /> {/* Pass the active tab */}
    </div>
  )
}

export default Content
