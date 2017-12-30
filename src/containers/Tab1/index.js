import React, { Component } from 'react';

import Spinner from '../../components/Spinner';

export default class Tab1 extends Component {

  constructor() {
    super()

    this.state = {}
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
    return this.props.loading ? <div><Spinner /></div> : (
      <div>
        {this.renderAttributes()}
        {this.renderWoodAmount()}
        {this.props.calculateTotalPrice()}
      </div>
    )
  }
}
