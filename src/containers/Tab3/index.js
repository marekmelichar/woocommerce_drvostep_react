import React, { Component } from 'react';

export default class Tab3 extends Component {
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
            <li><strong>{data.totalPrice} Kč</strong></li>
          </ul>
          <ul>
            <li className="list-heading">Doprava</li>
            <li>{data.whereToDeliver}</li>
            <li>{data.distance} km</li>
            <li><strong>{data.deliveryPrice} Kč</strong></li>
          </ul>
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
          {load < 100 ? <div className="info">Pozor, vytížení je pouze {load} procent, zvyšte ho a výrazně snížíte cenu za 1 prms.</div> :
            <div className="info">Efektivně vytíženo na 100%.<br/><br/></div>}
          <div className="fully-load-btn" onClick={handleFullyLoad}>Vytížit</div>
        </div>
        <div className="total-to-order">
          <div className="left">Konečná cena</div>
          <div className="right">{data.totalPrice + data.deliveryPrice} Kč</div>
        </div>
        {this.props.calculateTotalPrice()}
      </div>
    )
  }
}
