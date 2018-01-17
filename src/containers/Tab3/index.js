import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip'
import accounting from 'accounting'

export default class Tab3 extends Component {

  renderDeliery = () => {

    const {data} = this.props

    if (data.delivery.osobni_odber) {
      return (
        <ul>
          <li className="list-heading">Doprava</li>
          <li className="invisible-char">--</li>
          <li className="invisible-char">--</li>
          <li>{data.delivery.osobni_odber}</li>
        </ul>
      )
    }

    if (data.woodAmount < 3) {
      return (
        <ul>
          <li className="list-heading">Doprava</li>
          <li className="invisible-char">--</li>
          <li className="invisible-char">--</li>
          <li>{data.delivery.osobni_odber}</li>
        </ul>
      )
    }

    return (
      <ul>
        <li className="list-heading">Doprava</li>
        <li>{data.whereToDeliver}</li>
        <li>
          {2 * data.distance} km
          <span className="tooltip-holder" data-tip='Doprava se počítá tam i zpět.'>
            <i className="info-icon fas fa-info-circle"></i>
          </span>
        </li>
        {/* <li><strong>{accounting.formatMoney(2 * data.deliveryPrice, '', ',')} Kč</strong></li> */}
        <li><strong>{accounting.formatNumber(2 * data.deliveryPrice, 0, ' ')} Kč</strong></li>
      </ul>
    )
  }

  render() {
    const {data, handleFullyLoad} = this.props

    const load = Math.round(data.recalculatedWoodAmount / 7.7 * 100)

    return(
      <div className="-totals-body main-content-body tab3">
        <div className="totals-lists">
          <ul>
            <li className="list-heading">Dřevo</li>
            <li>{data.opt2}</li>
            <li>{data.recalculatedWoodAmount} prms</li>
            {/* <li><strong>{accounting.formatMoney(data.totalPrice, '', ',')} Kč</strong></li> */}
            <li><strong>{accounting.formatNumber(data.totalPrice, 0, ' ')} Kč</strong></li>
          </ul>
          {this.renderDeliery()}
          <ul>
            <li className="list-heading">Vytížení</li>
            <li><strong>{load} %</strong></li>
          </ul>
        </div>
        <div className="totals-loaded-cars">
          <div className="truck">
            <i className="fas fa-truck"></i>
            <span className="truck-back">
              <span className="truck-fill-bottom"></span>
              <span className="truck-fill" style={{top: 100-load + '%'}}></span>
            </span>
          </div>
          {load < 100 ? <div className="info">Pozor, vytížení je pouze {load}%, zvyšte ho a o 145 Kč snížíte <br/> cenu za 1 prms, to je o 8% méně.</div> :
            <div className="info">Efektivně vytíženo na 100%.<br/><br/></div>}
          <div className="fully-load-btn" onClick={handleFullyLoad}>Vytížit</div>
        </div>
        <div className="total-to-order">
          <div className="left">Konečná cena</div>
          {/* <div className="right">{accounting.formatMoney(data.totalPrice + (2 * data.deliveryPrice), '', ',')} Kč</div> */}
          <div className="right">{accounting.formatNumber(data.totalPrice + (2 * data.deliveryPrice), 0, ' ')} Kč</div>
        </div>
        {this.props.calculateTotalPrice()}
        <ReactTooltip place="top" />
      </div>
    )
  }
}
