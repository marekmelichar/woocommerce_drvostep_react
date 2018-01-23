import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip'

import Spinner from '../../components/Spinner';

export default class Tab1 extends Component {

  constructor(props) {
    super(props)

    this.state = {}
  }

  // renderAttributes = () => {
  //   const {wood, attributes, opt1, opt2} = this.props
  //
  //   if (wood.id) {
  //     return (
  //       <form className="attributes">
  //         {attributes.map(itm => {
  //           return(
  //             <div key={itm.id} className="attribute">
  //               <h2>{itm.name}</h2>
  //               <ul className="flex">
  //                 {itm.options.map((opt, i) => {
  //                   // console.log(opt,i);
  //                   return (
  //                     <li className={itm.id === 7 ? "item-wrapper drevina" : "item-wrapper"} key={opt}>
  //                       <input
  //                         id={opt}
  //                         type="radio"
  //                         name={`wood${itm.id}`}
  //                         value={opt}
  //                         onChange={(e) => this.props.handleOptionClick(e, itm.id, opt)}
  //                         checked={opt === opt1 || opt === opt2}
  //                       />
  //                       <label
  //                         htmlFor={opt}
  //                         className={opt === opt1 || opt === opt2 ? 'checked' : ''}
  //                       >{opt}</label>
  //                     </li>
  //                   )
  //                 })}
  //               </ul>
  //             </div>
  //           )
  //         })}
  //       </form>
  //     )
  //   }

  renderAttributes = () => {
    const {wood, attributes, opt1, opt2, mustHaveWoodLength, mustHaveWoodType} = this.props

    // console.log(mustHaveWoodType);

    if (wood.id) {
      return (
        <form className="attributes">
          <div className="attribute">
            <h2>{attributes[0].name}</h2>
            <ul className="flex">
              {attributes[0].options.map((opt, i) => {
                return (
                  <li key={`${opt}_${i}`} className={"item-wrapper"}>
                    <input
                      id={opt}
                      type="radio"
                      name={`wood${attributes[0].id}`}
                      value={opt}
                      onChange={(e) => this.props.handleOptionClick(e, attributes[0].id, opt)}
                      checked={opt === opt1}
                    />
                    <label
                      htmlFor={opt}
                      className={opt === opt1 ? 'checked' : ''}
                    >{opt}</label>
                  </li>
                )
              })}
            </ul>
            {mustHaveWoodLength && <div className="error-info-warning">
              Vyberte délku dřeva
            </div>}
          </div>

          <div className="attribute">
            <h2>{attributes[1].name}</h2>
            <ul className="flex">

              {opt1 === '50cm' &&
                <li className={"item-wrapper drevina predsuch"}>
                  <input
                    id={attributes[1].options[0]}
                    type="radio"
                    name={`wood${attributes[1].id}`}
                    value={attributes[1].options[0]}
                    onChange={(e) => this.props.handleOptionClick(e, attributes[1].id, attributes[1].options[0])}
                    checked={attributes[1].options[0] === opt2}
                  />
                  <label
                    htmlFor={attributes[1].options[0]}
                    className={attributes[1].options[0] === opt2 ? 'checked' : ''}
                  >{attributes[1].options[0]} <br/> <span className="minitext">vlhkost do 30%</span></label>
                </li>
              }

              {opt1 !== '50cm' &&
                <li className={"item-wrapper drevina"}>
                  <input
                    id={attributes[1].options[1]}
                    type="radio"
                    name={`wood${attributes[1].id}`}
                    value={attributes[1].options[1]}
                    onChange={(e) => this.props.handleOptionClick(e, attributes[1].id, attributes[1].options[1])}
                    checked={attributes[1].options[1] === opt2}
                  />
                  <label
                    htmlFor={attributes[1].options[1]}
                    className={attributes[1].options[1] === opt2 ? 'checked' : ''}
                  >{attributes[1].options[1]}</label>
                </li>
              }
              {mustHaveWoodType && <div className="drevina-error-info-warning">
                Vyberte dřevinu
              </div>}
            </ul>
          </div>
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

    const {opt1, woodAmount, increaseWood, decreaseWood, handleClickOnWood} = this.props

    let compareToMoistWood = 0
    let savedAmount = 0

    let recalculatedWoodAmount = (woodAmount * 1.1).toFixed(1)

    if (recalculatedWoodAmount === '0.0') {
      compareToMoistWood = 0
    }

    if (recalculatedWoodAmount === '1.1') {
      compareToMoistWood = 1.6
      savedAmount = 1025
    }

    if (recalculatedWoodAmount === '2.2') {
      compareToMoistWood = 3.3
      savedAmount = 2230
    }

    if (recalculatedWoodAmount === '3.3') {
      compareToMoistWood = 4.9
      savedAmount = 3255
    }

    if (recalculatedWoodAmount === '4.4') {
      compareToMoistWood = 6.5
      savedAmount = 4280
    }

    if (recalculatedWoodAmount === '5.5') {
      compareToMoistWood = 8.1
      savedAmount = 5305
    }

    if (recalculatedWoodAmount === '6.6') {
      compareToMoistWood = 9.8
      savedAmount = 6510
    }

    if (recalculatedWoodAmount === '7.7') {
      compareToMoistWood = 11.4
      savedAmount = 7535
    }

    return(
      <div className="wood-range-input">
        <h2>Množství</h2>
        <div className="wood-actual-info">
          <strong>{woodAmount === 0 ? 0 : recalculatedWoodAmount + ' prms'}</strong> suchého
          <span className="tooltip-holder" data-tip='Štípané dříví sypané do prostoru krychle o rozměru 1x1x1 metru.'>
            <i className="info-icon fas fa-info-circle"></i>
          </span>
        </div>
        <div className="wood-body">
          <div className="wood-handler-left no-select" onClick={decreaseWood}>-</div>
          <div className="wood-counter progress" onClick={e => handleClickOnWood(e, '.wood-counter.progress')}>
            <div className="filling progress-bar" role="progressbar" style={{ width: 100 / 7 * woodAmount + '%' }} aria-valuenow={100 / 7 * woodAmount} aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <div className="wood-handler-right no-select" onClick={increaseWood}>+</div>
        </div>
        {opt1 !== '50cm' && <div>
          <div className="wood-comparison">odpovídá <strong>{compareToMoistWood} prms</strong> nedosušeného</div>
          <div className="wood-info">Suchým dřevem ušetříte až <strong>{savedAmount} Kč</strong>, prodloužíte životnost kamen <br/> a zachráníte sousedské vztahy.</div>
        </div>}
      </div>
    )
  }

  render() {
    return this.props.loading ? <div><Spinner /></div> : (
      <div className="main-content-body tab1">
        {this.renderAttributes()}
        {this.renderWoodAmount()}
        {this.props.calculateTotalPrice()}
        <ReactTooltip place="top" />
      </div>
    )
  }
}
