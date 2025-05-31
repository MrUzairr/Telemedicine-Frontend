import { savings } from "../../data/data";
import { iconsImgs, personsImgs } from "../../utils/images";
import "./Savings.css";

const Savings = () => {
  return (
    <div className="subgrid-two-item grid-common grid-common1 grid-c6">
        <div className="grid-c-title">
            <h3 className="grid-c-title-text">Savings</h3>
            <button className="grid-c-title-icon">
                <img src={ iconsImgs.plus } />
            </button>
        </div>
        <div className="grid-c6-content">
            <div className="grid-items">
                {
                    savings.map((saving) => (
                        <div className="grid-item" key = { saving.id }>
                            <div className="grid-item-top">
                                <div className="grid-item-top-l">
                                    <div className="avatar img-fit-cover">
                                        <img src={ personsImgs.person_one } />
                                    </div>
                                    <p className="text text-silver-v1">{ saving.title }</p>
                                </div>
                                <div className="grid-item-top-r">
                                    <span className="text-silver-v1">$ { saving.saving_amount }</span>
                                </div>
                            </div>
                            <div className="grid-item-bottom">
                                <div className="grid-item-badges">
                                    <span className="grid-item-badge grid-item-badge1">Date taken { saving.date_taken }</span>
                                    <span className="grid-item-badge grid-item-badge1">Amount left $ { saving.amount_left }</span>
                                </div>
                                <div className="grid-item-progress">
                                    <div className="grid-item-fill grid-item-fill1"></div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Savings
