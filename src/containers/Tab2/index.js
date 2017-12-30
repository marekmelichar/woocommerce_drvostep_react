import React, { Component } from 'react';
import _ from 'lodash'

import {Obce} from '../../obce'

export default class Tab2 extends Component {

  constructor(props) {
    super(props)

    this.state = {
      Obce: [],
    }
  }

  componentWillMount() {
    this.setState({ Obce })
  }

  renderObceFilter = () => {
    const {Obce} = this.state

    const {whereToDeliver, filterValue} = this.props

    let obj = _.map(Obce, o => {
      // to be able to filter value without diacritics
      if (o.Obec && o.Obec.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase().includes(filterValue.toUpperCase()) && filterValue.length) {
        return o
      }
    })

    let final = _.without(obj, undefined)

    return(
      <div className="where-to-deliver">
        <h2>Kam?</h2>
        <div className="text-center">
          <input
            id="obceFilterInput"
            type="text"
            placeholder="název města kam se poveze dřevo"
            onChange={e => this.props.handleFilterValue(e.target.value)}
            value={filterValue}
          />
        </div>
        <div className="text-center filtered-values">
          <form className="attributes">
            <div className="attribute">
              <ul className="flex">
                {final.slice(0, 3).map(o => {
                  return(
                    <li key={o.Obec + ' ' + o.Vzdalenost} className="item-wrapper">
                      <input
                        id={o.Obec}
                        type="radio"
                        name={o.Obec}
                        value={o.Obec}
                        onChange={(e) => this.props.handleOptionClick(e, 14, o.Obec, o.Vzdalenost)}
                        checked={whereToDeliver === o.Obec}
                      />
                      <label
                        htmlFor={o.Obec}
                        className={whereToDeliver === o.Obec ? 'checked' : ''}
                      >{o.Obec}</label>
                    </li>
                  )
                })}
              </ul>
            </div>
          </form>
        </div>
      </div>
    )
  }

  render() {
    const {delivery, whenToDeliver} = this.props

    return(
      <div className="delivery-body">
        <h2>Kdo doveze?</h2>
        <p className="delivery-info">
          Dovážíme od 3.3prms. Dřevo sklopíme během 15 minut. <br/> Další čas je za 50kč/hod dle domluvy.
        </p>
        <form className="attributes">
          <div className="attribute">
            <ul className="flex">
              <li className="item-wrapper">
                <input
                  id="osobniOdber"
                  type="radio"
                  name="osobniOdber"
                  value="Osobní odběr"
                  onChange={(e) => this.props.handleOptionClick(e, 9, 'osobniOdber')}
                  checked={delivery === 'osobniOdber'}
                />
                <label
                  htmlFor="osobniOdber"
                  className={delivery === 'osobniOdber' ? 'checked' : ''}
                >Osobní odběr</label>
              </li>
              <li className="item-wrapper">
                <input
                  id="dovezeDrvostep"
                  type="radio"
                  name="dovezeDrvostep"
                  value="Doveze Drvoštěp"
                  onChange={(e) => this.props.handleOptionClick(e, 10, 'dovezeDrvostep')}
                  checked={delivery === 'dovezeDrvostep'}
                />
                <label
                  htmlFor="dovezeDrvostep"
                  className={delivery === 'dovezeDrvostep' ? 'checked' : ''}
                >Doveze Drvoštěp</label>
              </li>
            </ul>
          </div>
        </form>

        <h2>Kdy?</h2>
        <form className="attributes">
          <div className="attribute">
            <ul className="flex">
              <li className="item-wrapper">
                <input
                  id="coNejdrive"
                  type="radio"
                  name="coNejdrive"
                  value="Co nejdříve"
                  onChange={(e) => this.props.handleOptionClick(e, 11, 'coNejdrive')}
                  checked={whenToDeliver === 'coNejdrive'}
                />
                <label
                  htmlFor="coNejdrive"
                  className={whenToDeliver === 'coNejdrive' ? 'checked' : ''}
                >Co nejdříve</label>
              </li>
              <li className="item-wrapper">
                <input
                  id="doTydne"
                  type="radio"
                  name="doTydne"
                  value="Do týdne"
                  onChange={(e) => this.props.handleOptionClick(e, 12, 'doTydne')}
                  checked={whenToDeliver === 'doTydne'}
                />
                <label
                  htmlFor="doTydne"
                  className={whenToDeliver === 'doTydne' ? 'checked' : ''}
                >Do týdne</label>
              </li>
              <li className="item-wrapper">
                <input
                  id="doMesice"
                  type="radio"
                  name="doMesice"
                  value="Do měsíce"
                  onChange={(e) => this.props.handleOptionClick(e, 13, 'doMesice')}
                  checked={whenToDeliver === 'doMesice'}
                />
                <label
                  htmlFor="doMesice"
                  className={whenToDeliver === 'doMesice' ? 'checked' : ''}
                >Do měsíce</label>
              </li>
            </ul>
          </div>
        </form>

        {this.renderObceFilter()}
        {this.props.calculateTotalPrice()}
      </div>
    )
  }
}
