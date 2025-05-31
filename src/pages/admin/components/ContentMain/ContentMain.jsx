import "./ContentMain.css";
import Cards from "../Cards/Cards";
import Transactions from "../Transactions/Transactions";
import Report from "../Report/Report";
import Budget from "../Budget/Budget";
import Subscriptions from "../Subscriptions/Subscriptions";
import Savings from "../Savings/Savings";
import Loans from "../Loans/Loans";
import Financial from "../Financial/Financial";
import Doctor from "../../menus/addDoctor/index";
import Account from "../../menus/account/index";


const ContentMain = ({ activeTab }) => {
  let content;
  console.log("activeTab",activeTab)
  if (activeTab === "doctors") {     
      content = <Doctor/>
  }
  else if (activeTab === "account") {     
    content = <Account/>
}
  else{
    content = (<>
      <div className="content-grid-one">
            <Cards />
            <Transactions />
            <Report />
        </div>
        <div className="content-grid-two">
            <Budget />
            <div className="grid-two-item">
              <div className="subgrid-two">
                <Subscriptions />
                <Savings />
              </div>
            </div>

            <div className="grid-two-item">
              <div className="subgrid-two">
                <Loans />
                <Financial />
              </div>
            </div>
        </div>
        </>
    )
  }        
    

  return (
    <div className="main-content-holder">
       {content}
    </div>
  )
}

export default ContentMain
