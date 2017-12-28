import React, { Component } from 'react';

import * as actions from '../../actions';
import { connect } from 'react-redux';

// import axios from 'axios'
// import _ from 'lodash'

import Spinner from '../../components/spinner/Spinner';

class Tab1 extends Component {

  constructor() {
    super()

    this.state = {
      // loading: false,
      // wood: {},
      // attributes: [],
      // color: 'black',
      // opt1: '',
      // opt2: '',
      // tab1: true,
      // tab2: false,
      // tab3: false,
      // woodAmount: 2,
    }
  }

  renderAttributes = () => {
    const {wood, attributes, opt1, opt2} = this.props

    if (wood.id) {
      return (
        <form className="attributes">
          {attributes.map(itm => {
            return(
              <div key={itm.id} className="attribute">
                <h2>{itm.name}</h2>
                <ul className="flex">
                  {itm.options.map((opt, i) => {
                    // console.log(opt === opt1 || opt === opt2);
                    return (
                      <li className="item-wrapper" key={opt}>
                        <input
                          id={opt}
                          type="radio"
                          name={`wood${itm.id}`}
                          value={opt}
                          onChange={(e) => this.props.handleOptionClick(e, itm.id, opt)}
                          checked={opt === opt1 || opt === opt2}
                        />
                        <label
                          htmlFor={opt}
                          className={opt === opt1 || opt === opt2 ? 'checked' : ''}
                        >{opt}</label>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </form>
      )
    }

    return (
      <form className="attributes placeholders">
        <h2><Spinner /></h2>
        <h2><Spinner /></h2>
        <h2><Spinner /></h2>

        {this.state.error && <div className="error">{this.state.error}<i className="fas fa-exclamation-circle"></i></div>}
      </form>
    )
  }

  renderWoodAmount = () => {

    const {woodAmount, increaseWood, decreaseWood} = this.props

    let compareToMoistWood = 0

    let recalculatedWoodAmount = (woodAmount * 1.1).toFixed(1)

    if (recalculatedWoodAmount === '0.0') {
      compareToMoistWood = 0
    }

    if (recalculatedWoodAmount === '1.1') {
      compareToMoistWood = 1.6
    }

    if (recalculatedWoodAmount === '2.2') {
      compareToMoistWood = 3.3
    }

    if (recalculatedWoodAmount === '3.3') {
      compareToMoistWood = 4.9
    }

    if (recalculatedWoodAmount === '4.4') {
      compareToMoistWood = 6.5
    }

    if (recalculatedWoodAmount === '5.5') {
      compareToMoistWood = 8.1
    }

    if (recalculatedWoodAmount === '6.6') {
      compareToMoistWood = 9.8
    }

    if (recalculatedWoodAmount === '7.7') {
      compareToMoistWood = 11.4
    }

    return(
      <div className="wood-range-input">
        <h2>Množství</h2>



        <div className="wood-actual-info">
          <strong>{woodAmount === 0 ? 0 : recalculatedWoodAmount + ' prms'}</strong> suchého
          <span className="tooltip-holder">
            <span className="info-icon top" data-tooltip={'tady bude nejaky info text'}><i className="fas fa-info-circle"></i></span>
          </span>
        </div>
        <div className="wood-body">
          <div className="wood-handler-left no-select" onClick={decreaseWood}>-</div>
          <div className="wood-counter">
            <div className="filling" style={{ width: 100 / 7 * woodAmount + '%' }}></div>
          </div>
          <div className="wood-handler-right no-select" onClick={increaseWood}>+</div>
        </div>
        <div className="wood-comparison">odpovídá <strong>{compareToMoistWood} prms</strong> nedosušeného</div>
        <div className="wood-info">Suché dřevo má výtopnost až o <strong>30 procent</strong> lepší a šetří vaše kamna i sousedské vztahy.</div>
      </div>
    )
  }

  render() {

    // const {opt1, opt2, wood, tab1, tab2, tab3} = this.state

    return this.props.loading ? <div><Spinner /></div> : (
      <div>
        {this.renderAttributes()}
        {this.renderWoodAmount()}
        {this.props.calculateTotalPrice()}
        {/* <a href={opt1 && opt2 ? `https://drvostepstaging.marekmelichar.cz/eshop/?add-to-cart=${wood.id}&attribute_pa_delka=${opt1}&attribute_pa_drevo=${opt2}` : '#'}>SEND TO CART</a>   */}
      </div>
    )
  }
}

function mapStateToProps(state) {
  // console.log('state', state);
  return {
    // authorized: state.auth.payload
  };
}

export default connect(mapStateToProps, actions)(Tab1);


/**
 * INFO
 */


 // 7.7 prms je 1 vozik
 // naskakuje to po 1.1
 // pomer sucheho ku mokremu drevu do vypoctu mnozstvi dreva
 // defaultni mnozstvi cca za 3000 kc
 // 15% je suche drevo
 // 50% je mokre drevo

 // suche vs. mokre
 // 1.1 = 1.6
 // 2.2 = 3.3
 // 3.3 = 4.9
 // 4.4 = 6.5
 // 5.5 = 8.1
 // 6.6 = 9.8
 // 7.7 = 11.4
 //
 // vzit to z drvostepu stavajiciho
 //
 // ceny:
 // 1.1 = 1790
 // 2.2 = 3580
 // 3.3 = 5370
 // 4.4 = 7160
 // 5.5 = 8950
 // 6.6 = 10740
 // 7.7 = 12530
