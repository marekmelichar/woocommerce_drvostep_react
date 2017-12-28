import React, { Component } from 'react';

import * as actions from '../actions';
import { connect } from 'react-redux';

import axios from 'axios'
import _ from 'lodash'

import Spinner from '../components/spinner/Spinner';

import Tab1 from './Tab1'
import Tab2 from './Tab2'
import Tab3 from './Tab3'

class App extends Component {

  constructor() {
    super()

    this.state = {
      loading: false,
      wood: {},
      attributes: [],
      color: 'black',
      opt1: '',
      opt2: '',
      tab1: true,
      tab2: false,
      tab3: false,
      woodAmount: 2,
    }
  }

  componentWillMount() {

    this.setState({ loading: true })

    var instance = axios.create({
      method: 'get',
      // btoa(key:secret) from WooCommerce API
      baseURL: 'https://drvostepstaging.marekmelichar.cz/wp-json/wc/v2/products',
      headers: {'Authorization': `Basic ${btoa('ck_4e2f7290e45ea1338c626f7f0b4073f1ce190ac9:cs_b14745a6ba61f5441c6e0d4c0a1a9ad03cde89a5')}`},
      maxRedirects: 0,
    });

    instance()
      .then(data => {
        const wood = _.find(data.data, { 'id': 3642 })
        const attributes = wood.attributes
        this.setState({
          wood,
          attributes
        })
      })
      .catch(error => {
        console.log('error', error.message)
        this.setState({ error: error.message })
      })
  }

  componentDidMount() {
    this.setState({ loading: false })
  }

  renderTabs = () => {
    const {tab1, tab2, tab3} = this.state

    return(
      <div className="tabs">
        <div className="tab">
          <div className={`tab-icon ${tab1 ? 'tab-active' : ''}`} onClick={() => this.setState({ tab1: true, tab2: false, tab3: false })}>
            <i className="fas fa-tree"></i>
          </div>
          <div className="tab-heading">1. Dřevo</div>
        </div>
        <div className="tab">
          <div className={`tab-icon ${tab2 ? 'tab-active' : ''}`} onClick={() => this.setState({ tab1: false, tab2: true, tab3: false })}>
            <i className="fas fa-truck"></i>
          </div>
          <div className="tab-heading">2. Doprava</div>
        </div>
        <div className="tab">
          <div className={`tab-icon ${tab3 ? 'tab-active' : ''}`} onClick={() => this.setState({ tab1: false, tab2: false, tab3: true })}>
            <i className="fas fa-list-ul"></i>
          </div>
          <div className="tab-heading">3. Shrnutí</div>
        </div>
      </div>
    )
  }

  calculateTotalPrice = () => {

    const PRICE_OF_WOOD_1_PRMS = 1627.2727272727273

    let recalculatedWoodAmount = (this.state.woodAmount * 1.1).toFixed(1)

    let totalPrice = Math.round(+recalculatedWoodAmount * PRICE_OF_WOOD_1_PRMS)

    return(
      <div className="total-price">
        <div className="total-price-info">
          <div><strong>Celková cena:</strong></div>
          <div>{totalPrice} Kč</div>
        </div>

        <div className="total-price-btn" onClick={() => this.setState({ tab1: false, tab2: true, tab3: false })}>
          Na dopravu
        </div>
      </div>
    )
  }

  handleOptionClick = (e, id, opt) => {

    // console.log(id, opt);

    if (id === 8) {
      return this.setState({ opt1: opt })
    }

    if (id === 7) {
      return this.setState({ opt2: opt })
    }
  }

  increaseWood = () => {
    if (this.state.woodAmount < 7) {
      this.setState({ woodAmount: this.state.woodAmount + 1 })
    }
  }

  decreaseWood = () => {
    if (this.state.woodAmount > 0) {
      this.setState({ woodAmount: this.state.woodAmount - 1 })
    }
  }

  render() {

    // const {opt1, opt2, wood, tab1, tab2, tab3} = this.state
    // const {tab1, tab2, tab3} = this.state
    const {wood, attributes} = this.state

    // console.log(this.state.opt1, this.state.opt2);

    return this.state.loading ? <div><Spinner /></div> : (
      <div className="wrapper-wood">
        <div className="row main-content">
          <div className="column size_50">
            <div className="image">
                <img src="/images/mazanec.png" alt="Jiri Mazanec - Drvostep" />
            </div>
            <div className="row">
              <div className="column size_100 text-center">
                <p>Jmenuji se <strong>Jiří Mazanec</strong> a vyřeším s vámi vaši objednávku.</p>
              </div>
            </div>
            <div className="row">
              <div className="column size_50 contact-info">
                <p>E-mail:</p>
                <a href="mailto:jiri.mazanec@drvostep.eu">jiri.mazanec@drvostep.eu</a>
              </div>
              <div className="column size_50 contact-info">
                <p>Telefon:</p>
                <a href="tel:+420 999 999 999">+420 999 999 999</a>
              </div>
              <div className="column size_50"></div>
            </div>
          </div>
          <div className="column size_50">

            {this.renderTabs()}

            {this.state.tab1 && <Tab1
              wood={wood}
              attributes={attributes}
              handleOptionClick={this.handleOptionClick}
              decreaseWood={this.decreaseWood}
              increaseWood={this.increaseWood}
              woodAmount={this.state.woodAmount}
              loading={this.state.loading}
              calculateTotalPrice={this.calculateTotalPrice}
              opt1={this.state.opt1}
              opt2={this.state.opt2}
            />}
            {this.state.tab2 && <Tab2 />}
            {this.state.tab3 && <Tab3 />}

          </div>
        </div>
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

export default connect(mapStateToProps, actions)(App);


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
