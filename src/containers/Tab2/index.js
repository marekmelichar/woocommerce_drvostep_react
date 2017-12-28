import React, { Component } from 'react';
import _ from 'lodash'

import {Obce} from '../../obce'

export default class Tab2 extends Component {

  constructor(props) {
    super(props)

    this.state = {
      Obce: [],
      obec_filter_input_val: ''
    }
  }

  componentWillMount() {
    this.setState({ Obce })
  }

  renderObceFilter = () => {
    const {Obce, obec_filter_input_val} = this.state

    let obj = _.map(Obce, o => {
      if (o.Obec && o.Obec.includes(obec_filter_input_val) && obec_filter_input_val.length) {
        return o
      }
    })

    let final = _.without(obj, undefined)

    return(
      <div>
        <div className="text-center">
          <h2>Kam?</h2>
        </div>
        <div className="text-center">
          <input
            id="obceFilterInput"
            type="text"
            onChange={(e) => this.setState({ obec_filter_input_val: e.target.value })}
            value={this.state.obec_filter_input_val}
          />
        </div>
        <div className="text-center">
          <ul id="obce-result">
            {final.slice(0, 3).map(obj => {
              return(
                <li key={obj.Obec + ' ' + obj.Vzdalenost}>{obj.Obec}</li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {delivery, whenToDeliver} = this.props

    return(
      <div>
        <div className="text-center">
          <h2>Kdo doveze?</h2>
        </div>
        <div className="text-center">
          Dovážíme od 3.3prms. Dřevo sklopíme během 15 minut. <br/> Další čas je za 50kč/hod dle domluvy.
        </div>
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

        <div className="text-center">
          <h2>Kdy?</h2>
        </div>
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
      </div>
    )
  }
}
