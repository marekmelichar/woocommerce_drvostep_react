import React, { Component } from 'react';
import _ from 'lodash'

import {Obce} from '../../obce'

export default class Tab2 extends Component {

  constructor(props) {
    super(props)

    this.state = {
      Obce: [],
      filterValue: '',
      showFilterResults: false,
      showError: false
    }
  }

  componentWillMount() {
    this.setState({ Obce })
  }

  handleFiltering = e => {
    this.props.handleOptionClick(e, 14, '', '')
    this.setState({
      filterValue: e.target.value,
      showFilterResults: true
    })
  }

  handleOptionClick = (e, id, obec, vzdalenost) => {
    this.props.handleOptionClick(e, id, obec, vzdalenost)
    this.setState({ showFilterResults: false, showError: false })
  }

  renderObceFilter = () => {
    const {Obce, filterValue, showFilterResults} = this.state

    const {delivery, whereToDeliver, woodAmount, mustHaveWhereToDeliver} = this.props

    let obj = _.map(Obce, o => {

      // able to filter value without diacritics + replace space and comma to "-"
      if (o.Obec) {
        if (o.Obec.normalize('NFD').replace(/[\u0300-\u036f]/g, "").split(/[ ,]+/).join('-').toUpperCase().includes(filterValue.split(/[ ,]+/).join('-').toUpperCase()) ||
            o.Obec.split(/[ ,]+/).join('-').toUpperCase().includes(filterValue.split(/[ ,]+/).join('-').toUpperCase())) {
          return o
        }
      }
    })

    let final = _.without(obj, undefined)

    if (delivery === 'osobní odběr' && woodAmount >= 3) {
      return (
        <div className="where-to-deliver">
          {/* <h2>Název obce (bez ulice)</h2> */}
          <div className="osobni-odber-veta">Po telefonické domluvě si <br/> dřevo u nás vyzvednete.</div>
        </div>
      )
    }

    if (woodAmount < 3) {
      return (
        <div className="where-to-deliver">
          {/* <h2>Název obce (bez ulice)</h2> */}
          <div className="osobni-odber-veta">Máte vybráno pod 3.3 prms dřeva, po telefonické <br/> domluvě si dřevo u nás vyzvednete.</div>
        </div>
      )
    }

    // console.log('mustHaveWhereToDeliver', mustHaveWhereToDeliver);

    return (
      <div className="where-to-deliver">
        {/* {delivery !== 'osobní odběr' && woodAmount >= 3 && <h2>Název obce (bez ulice)</h2>} */}
        <h2>Název obce (bez ulice)</h2>
        <div className="text-center">
          <input
            id="obceFilterInput"
            type="text"
            placeholder="Pište obec - část obce BEZ ULICE a vyberte tlačítkem dole"
            onChange={e => this.handleFiltering(e)}
            value={whereToDeliver ? whereToDeliver : filterValue}
          />
          {mustHaveWhereToDeliver && <span className="input-error-info-warning" onClick={() => document.getElementById('obceFilterInput').focus()}>* povinné pole</span>}
        </div>
        {showFilterResults && <div className="text-center filtered-values">
          <form className="attributes">
            <div className="attribute">
              <ul className="flex">
                {showFilterResults && final.slice(0, 3).map(o => {
                  return(
                    <li key={o.Obec + ' ' + o.Vzdalenost} className="item-wrapper">
                      <div className="__info-icon __top" data-tooltip={o.Obec}>
                        <input
                          id={o.Obec}
                          type="radio"
                          name={o.Obec}
                          value={o.Obec}
                          onChange={e => this.handleOptionClick(e, 14, o.Obec, o.Vzdalenost)}
                        />
                        <label
                          htmlFor={o.Obec}
                          className={whereToDeliver === o.Obec ? 'checked' : ''}
                        ><span className="obec-text-inside">{o.Obec}</span></label>
                      </div>
                    </li>
                  )
                })}
                {!final.length && <li style={{color: 'red'}}>Pište obec - část obce BEZ ULICE a vyberte tlačítkem dole.</li>}
              </ul>
            </div>
          </form>
        </div>}
        {whereToDeliver &&
          <div className="call-for-details-txt">
            Pro detailní domluvu dopravy vás zkontaktuji nejpozději následující pracovní den, nebo mi rovnou zavolejte.
          </div>}
      </div>
    )
  }

  handleDovezeDrvostepIfLessThan = e => {
    e.preventDefault()

    this.setState({ showError: true })
  }

  render() {
    // console.log(this.state.color);
    const {delivery, whenToDeliver, woodAmount} = this.props

    const {showError} = this.state

    // console.log(this.props.whereToDeliver);

    return(
      <div className="-delivery-body main-content-body tab2">
        <h2 className="pt-15">Kdo doveze?</h2>
        <p className="delivery-info">
          <strong>Dovážíme od 3.3prms.</strong> Dřevo sklopíme během 15 minut. <br/> Další čas je za 50kč/hod dle domluvy.
          {/* <strong style={ this.state.color ? { color: this.state.color } : {}}>Dovážíme od 3.3prms.</strong> Dřevo sklopíme během 15 minut. <br/> Další čas je za 50kč/hod dle domluvy. */}
        </p>
        <form className="attributes who">
          <div className="attribute">
            <ul className="flex">
              <li className="item-wrapper">
                <input
                  id="osobniOdber"
                  type="radio"
                  name="osobniOdber"
                  value="Osobní odběr"
                  onChange={(e) => this.props.handleOptionClick(e, 9, 'osobní odběr')}
                  checked={delivery === 'osobní odběr'}
                />
                <label
                  htmlFor="osobniOdber"
                  className={delivery === 'osobní odběr' ? 'checked' : ''}
                >Osobní odběr</label>
              </li>
              <li className="item-wrapper">
                <input
                  id="dovezeDrvostep"
                  type="radio"
                  name="dovezeDrvostep"
                  value="Doveze Drvoštěp"
                  onChange={(e) => this.props.handleOptionClick(e, 10, 'doveze Drvoštěp')}
                  checked={delivery === 'doveze Drvoštěp'}
                />
                <label
                  htmlFor="dovezeDrvostep"
                  className={delivery === 'doveze Drvoštěp' ? 'checked' : woodAmount < 3 ? 'disabled' : ''}
                  // disabled={this.props.woodAmount < 3 ? true : false}
                  // style={ this.props.woodAmount < 3 ? { pointerEvents: 'none' } : {}}
                  onClick={woodAmount < 3 ? (e) => this.handleDovezeDrvostepIfLessThan(e) : null }
                >Doveze Drvoštěp</label>
              </li>
            </ul>
          </div>
        </form>
        {showError && <div className="error-info-warning">Dovážíme od 3.3prms.</div>}

        <h2>Kdy?</h2>
        <form className="attributes when">
          <div className="attribute">
            <ul className="flex">
              <li className="item-wrapper">
                <input
                  id="coNejdrive"
                  type="radio"
                  name="coNejdrive"
                  value="Co nejdříve"
                  onChange={(e) => this.props.handleOptionClick(e, 11, 'co nejdříve')}
                  checked={whenToDeliver === 'co nejdříve'}
                />
                <label
                  htmlFor="coNejdrive"
                  className={whenToDeliver === 'co nejdříve' ? 'checked' : ''}
                >Co nejdříve</label>
              </li>
              <li className="item-wrapper">
                <input
                  id="doTydne"
                  type="radio"
                  name="doTydne"
                  value="Do týdne"
                  onChange={(e) => this.props.handleOptionClick(e, 12, 'do týdne')}
                  checked={whenToDeliver === 'do týdne'}
                />
                <label
                  htmlFor="doTydne"
                  className={whenToDeliver === 'do týdne' ? 'checked' : ''}
                >Do týdne</label>
              </li>
              <li className="item-wrapper">
                <input
                  id="doMesice"
                  type="radio"
                  name="doMesice"
                  value="Do měsíce"
                  onChange={(e) => this.props.handleOptionClick(e, 13, 'do měsíce')}
                  checked={whenToDeliver === 'do měsíce'}
                />
                <label
                  htmlFor="doMesice"
                  className={whenToDeliver === 'do měsíce' ? 'checked' : ''}
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
