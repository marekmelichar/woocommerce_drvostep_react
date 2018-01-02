import React, { Component } from 'react';
import axios from 'axios'
import _ from 'lodash'

import Spinner from '../components/Spinner';

import Tab1 from './Tab1'
import Tab2 from './Tab2'
import Tab3 from './Tab3'

// const PRICE_OF_WOOD_1_PRMS = 1627.2727272727273
const PRICE_OF_WOOD_1_PRMS = 1628

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      wood: {},
      attributes: [],
      opt1: 'délka dřeva',
      opt2: 'druh dřeva',
      tab1: true,
      tab2: false,
      tab3: false,
      woodAmount: 2,
      delivery: {
        doveze_drvostep: '',
        osobni_odber: ''
      },
      whenToDeliver: 'kdy',
      whereToDeliver: 'obec',
      filterValue: '',
      totalPrice: 0,
      recalculatedWoodAmount: 0,
      distance: 0,
      deliveryPrice: 0
    }
  }

  componentWillMount() {

    this.setState({ loading: true })

    var instance = axios.create({
      method: 'get',
      // btoa(key:secret) from WooCommerce API
      baseURL: 'https://drvostepstaging.marekmelichar.cz/wp-json/wc/v2/products',
      headers: {'Authorization': `Basic ${btoa('ck_760c9cd63b37310f8faaf6ce0d52389f94fb81ad:cs_14ea24b81c0b2fa73ab109c4e5c70e9f4d7353b7')}`},
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

    let recalculatedWoodAmount = (this.state.woodAmount * 1.1).toFixed(1)

    let totalPrice = Math.round(+recalculatedWoodAmount * PRICE_OF_WOOD_1_PRMS)

    this.setState({ loading: false, totalPrice, recalculatedWoodAmount })
  }

  renderTabs = () => {

    let recalculatedWoodAmount = (this.state.woodAmount * 1.1).toFixed(1)

    let totalPrice = Math.round(+recalculatedWoodAmount * PRICE_OF_WOOD_1_PRMS)

    const {tab1, tab2, tab3} = this.state

    return(
      <div className="tabs">
        <div className="tab">
          <div className={`tab-icon ${tab1 ? 'tab-active' : ''}`} onClick={() => this.setState({ tab1: true, tab2: false, tab3: false, totalPrice, recalculatedWoodAmount })}>
            <i className="fas fa-tree"></i>
          </div>
          <div className="tab-heading">1. Dřevo</div>
        </div>
        <div className="tab">
          <div className={`tab-icon ${tab2 ? 'tab-active' : ''}`} onClick={() => this.setState({ tab1: false, tab2: true, tab3: false, totalPrice, recalculatedWoodAmount })}>
            <i className="fas fa-truck"></i>
          </div>
          <div className="tab-heading">2. Doprava</div>
        </div>
        <div className="tab">
          <div className={`tab-icon ${tab3 ? 'tab-active' : ''}`} onClick={() => this.setState({ tab1: false, tab2: false, tab3: true, totalPrice, recalculatedWoodAmount })}>
            <i className="fas fa-list-ul"></i>
          </div>
          <div className="tab-heading">3. Shrnutí</div>
        </div>
      </div>
    )
  }

  calculateTotalPrice = () => {

    let recalculatedWoodAmount = (this.state.woodAmount * 1.1).toFixed(1)

    let totalPrice = Math.round(+recalculatedWoodAmount * PRICE_OF_WOOD_1_PRMS)

    const {tab1, tab2, tab3, opt1, opt2, woodAmount, delivery, whenToDeliver, whereToDeliver, deliveryPrice} = this.state


    if (tab1) {
      return(
        <div className="total-price">
          <div className="total-price-info">
            <div><strong>Celková cena:</strong></div>
            <div>{totalPrice} Kč</div>
          </div>

          <div className="total-price-btn" onClick={() => this.setState({ tab1: false, tab2: true, tab3: false, totalPrice, recalculatedWoodAmount })}>
            Na dopravu
          </div>
        </div>
      )
    }

    if (tab2) {
      return(
        <div className="total-price">
          <div className="total-price-info">
            <div><strong>Celková cena:</strong></div>
            <div>{totalPrice} Kč</div>
          </div>

          <div className="back-btn" onClick={() => this.setState({ tab1: true, tab2: false, tab3: false, totalPrice, recalculatedWoodAmount })}>
            Na výběr dřeva
          </div>
          <div className="total-price-btn" onClick={() => this.setState({ tab1: false, tab2: false, tab3: true, totalPrice, recalculatedWoodAmount })}>
            Shrnutí
          </div>
        </div>
      )
    }

    let orderLink = ''

    if (opt1 && opt2 && woodAmount > 0 && (delivery.doveze_drvostep || delivery.osobni_odber) && whenToDeliver && whereToDeliver && totalPrice) {

      if (delivery.doveze_drvostep) {
        totalPrice = totalPrice + deliveryPrice
      }

      orderLink = `https://drvostepstaging.marekmelichar.cz/cart/?add-to-cart=3642&attribute_pa_delka=${opt1}&attribute_pa_drevo=${opt2}&delivery=${delivery.doveze_drvostep || delivery.osobni_odber}&whenToDeliver=${whenToDeliver}&whereToDeliver=${whereToDeliver}&quantity=1&price=${totalPrice}`
    }

    if (tab3) {
      return(
        <div className="total-price">
          <div className="back-btn" onClick={() => this.setState({ tab1: false, tab2: true, tab3: false, totalPrice, recalculatedWoodAmount })}>
            Na dopravu
          </div>
          <a href={orderLink} className="total-price-btn">
            Objednat
          </a>
        </div>
      )
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

  handleOptionClick = (e, id, opt, distance) => {

    let deliveryPrice = 0;

    if (distance) {
      deliveryPrice = +distance * 20
    } else {
      deliveryPrice = +this.state.distance * 20
    }

    if (id === 14) {
      if (this.state.delivery.osobni_odber) {
        return this.setState({
          whereToDeliver: opt,
          distance,
          deliveryPrice: 0
        })
      }
      return this.setState({ whereToDeliver: opt, distance, deliveryPrice })
    }

    if (id === 11 || id === 12 || id === 13) {
      return this.setState({ whenToDeliver: opt })
    }

    if (id === 10) {
      return this.setState({
        delivery: {
          doveze_drvostep: opt,
          osobni_odber: ''
        },
        distance: this.state.distance,
        deliveryPrice
      })
    }

    if (id === 9) {
      return this.setState({
        delivery: {
          doveze_drvostep: '',
          osobni_odber: opt
        },
        distance: this.state.distance,
        deliveryPrice: 0
      })
    }

    if (id === 8) {
      return this.setState({ opt1: opt })
    }

    if (id === 7) {
      return this.setState({ opt2: opt })
    }
  }

  handleFilterValue = e => {
    return this.setState({ filterValue: e })
  }

  handleFullyLoad = () => {

    let recalculatedWoodAmount = (7 * 1.1).toFixed(1)

    let totalPrice = Math.round(+recalculatedWoodAmount * PRICE_OF_WOOD_1_PRMS)

    return this.setState({ recalculatedWoodAmount, totalPrice, woodAmount: 7 })
  }

  render() {

    const {wood, attributes, delivery, whenToDeliver, whereToDeliver} = this.state

    return this.state.loading ? <div><Spinner /></div> : (
      <div className="wrapper-wood">
        <div className="row main-content">
          <div className="column size_50">
            <div className="image">
                <img src="/images/mazanec.png" alt="Jiri Mazanec - Drvostep" />
            </div>
            <div className="row">
              <div className="column size_100 text-center">
                <p className="name-under-photo">Jmenuji se <strong>Jiří Mazanec</strong> a vyřeším s vámi vaši objednávku.</p>
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
            {this.state.tab2 && <Tab2
              handleOptionClick={this.handleOptionClick}
              delivery={delivery.osobni_odber || delivery.doveze_drvostep}
              whenToDeliver={whenToDeliver}
              whereToDeliver={whereToDeliver}
              calculateTotalPrice={this.calculateTotalPrice}
              handleFilterValue={this.handleFilterValue}
              filterValue={this.state.filterValue}
            />}
            {this.state.tab3 && <Tab3
              data={this.state}
              handleFullyLoad={this.handleFullyLoad}
              calculateTotalPrice={this.calculateTotalPrice}
            />}

          </div>
        </div>
      </div>
    )
  }
}

export default App
