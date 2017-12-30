import React, { Component } from 'react';

export default class Tab3 extends Component {
  render() {
    const {data, handleFullyLoad} = this.props

    const load = Math.round(data.recalculatedWoodAmount / 7.7 * 100)

    return(
      <div className="totals-body">
        <div className="totals-lists">
          <ul>
            <li className="list-heading">Dřevo</li>
            <li>{data.opt2}</li>
            <li>{data.recalculatedWoodAmount} prms</li>
            <li>{data.totalPrice} Kč</li>
          </ul>
          <ul>
            <li className="list-heading">Doprava</li>
            <li>{data.whereToDeliver}</li>
            <li>{data.distance} km</li>
            <li>{data.deliveryPrice} Kč</li>
          </ul>
          <ul>
            <li className="list-heading">Vytížení</li>
            <li>{load} %</li>
          </ul>
        </div>
        <div className="totals-loaded-cars">
          <div className="truck">
            <i className="fas fa-truck"></i>
            <span className="truck-back">
              <span className="truck-fill" style={{top: 100-load + '%'}}></span>
            </span>
          </div>
          <div className="info">{load < 100 ? `Pozor, vytížení je pouze ${load} procent, zvyšte ho a výrazně snížíte cenu za 1 prms.` : 'Efektivně vytíženo na 100%.'}</div>
          <div className="btn" onClick={handleFullyLoad}>Vytížit</div>
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
