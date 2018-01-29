import React, { Component } from 'react';
import axios from 'axios'
import $ from 'jquery'
// import _ from 'lodash'
import accounting from 'accounting'

import Spinner from '../components/Spinner';

import Tab1 from './Tab1'
import Tab2 from './Tab2'
import Tab3 from './Tab3'

// const PRICE_OF_WOOD_1_PRMS = 1627.2727272727273
// const PRICE_OF_WOOD_1_PRMS = 1628

const PRICE_OF_WOOD_25CM = 1955 / 1.1
const PRICE_OF_WOOD_25CM_PREDSUCH = 1755 / 1.1
const PRICE_OF_WOOD_33CM = 1890 / 1.1
const PRICE_OF_WOOD_33CM_PREDSUCH = 1690 / 1.1
// const PRICE_OF_WOOD_50CM = ??? / 1.1
const PRICE_OF_WOOD_50CM_PREDSUCH = 1450 / 1.1

const PRODUCT_ID = 3642
// const PAGE_ID = 3642

const calculate = (opt1, opt2, recalculatedWoodAmount) => {

  let totalPrice

  if (!opt1) {
    totalPrice = 0
  }

  if (opt1 === '25cm' && opt2 === 'Suchý buk') {
    totalPrice = Math.round(+recalculatedWoodAmount * PRICE_OF_WOOD_25CM)
  }

  if (opt1 === '25cm' && opt2 === 'Předsušený buk') {
    totalPrice = Math.round(+recalculatedWoodAmount * PRICE_OF_WOOD_25CM_PREDSUCH)
  }

  if (opt1 === '33cm' && opt2 === 'Suchý buk') {
    totalPrice = Math.round(+recalculatedWoodAmount * PRICE_OF_WOOD_33CM)
  }

  if (opt1 === '33cm' && opt2 === 'Předsušený buk') {
    totalPrice = Math.round(+recalculatedWoodAmount * PRICE_OF_WOOD_33CM_PREDSUCH)
  }

  // if (opt1 === '50cm' && opt2 === 'Suchý buk') {
  //   totalPrice = Math.round(+recalculatedWoodAmount * PRICE_OF_WOOD_50CM)
  // }

  if (opt1 === '50cm' && opt2 === 'Předsušený buk') {
    totalPrice = Math.round(+recalculatedWoodAmount * PRICE_OF_WOOD_50CM_PREDSUCH)
  }

  return totalPrice
}

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      wood: {},
      attributes: [],
      opt1: '',
      opt2: '',
      tab1: true,
      tab2: false,
      tab3: false,
      woodAmount: 3,
      delivery: {
        doveze_drvostep: '',
        osobni_odber: ''
      },
      whenToDeliver: '',
      whereToDeliver: '',
      filterValue: '',
      totalPrice: 0,
      recalculatedWoodAmount: 0,
      distance: 0,
      deliveryPrice: 0,
      mustHaveWoodLength: false,
      mustHaveWoodType: false,
      mustHaveWhereToDeliver: false
    }
  }

  componentWillMount() {

    this.setState({ loading: true })

    var instance = axios.create({
      method: 'get',
      // btoa(key:secret) from WooCommerce API
      baseURL: `https://drvostepstagingbrown.marekmelichar.cz/wp-json/wc/v2/products/${PRODUCT_ID}`,
      headers: {'Authorization': `Basic ${btoa('ck_890d5fac6c5984059c4db0519a3ac259043f80a4:cs_db86c197f1bf4a7a3a1aced7e3d8df1e51e44903')}`},
      maxRedirects: 0,
    });

    instance()
      .then(data => {
        // console.log(data.data);
        // const wood = _.find(data.data, { 'id': 3642 })
        const wood = data.data

        const attributes = wood.attributes

        // console.dir(attributes);

        this.setState({
          wood,
          attributes,
        })
      })
      .catch(error => {
        console.log('error', error.message)
        this.setState({ error: error.message })
      })
  }

  componentDidMount() {

    const {opt1, opt2, woodAmount} = this.state

    let recalculatedWoodAmount = (woodAmount * 1.1).toFixed(1)

    // let totalPrice = Math.round(+recalculatedWoodAmount * PRICE_OF_WOOD_1_PRMS)

    let totalPrice = calculate(opt1, opt2, recalculatedWoodAmount)

    const localStorage = window.localStorage

    return this.setState({
      loading: false,
      totalPrice,
      recalculatedWoodAmount,
      opt1: localStorage.getItem('opt1') || '',
      opt2: localStorage.getItem('opt2') || '',
      woodAmount: +localStorage.getItem('woodAmount') || +woodAmount,
      delivery: {
        doveze_drvostep: localStorage.getItem('doveze_drvostep') || 'doveze Drvoštěp',
        osobni_odber: localStorage.getItem('osobni_odber') || ''
      },
      whenToDeliver: localStorage.getItem('whenToDeliver') || 'do měsíce',
      whereToDeliver: localStorage.getItem('whereToDeliver') || '',
      deliveryPrice: localStorage.getItem('deliveryPrice') || '',
      distance: localStorage.getItem('distance') || ''
    })
  }

  componentDidUpdate() {
    const {opt1, opt2, woodAmount, delivery, whenToDeliver, whereToDeliver, deliveryPrice, distance} = this.state

    const localStorage = window.localStorage

    localStorage.setItem('opt1', opt1)
    localStorage.setItem('opt2', opt2)
    localStorage.setItem('woodAmount', woodAmount)
    localStorage.setItem('doveze_drvostep', delivery.doveze_drvostep)
    localStorage.setItem('osobni_odber', delivery.osobni_odber)
    localStorage.setItem('whenToDeliver', whenToDeliver)
    localStorage.setItem('whereToDeliver', whereToDeliver)
    localStorage.setItem('deliveryPrice', deliveryPrice)
    localStorage.setItem('distance', distance)
  }

  componentWillUnmount() {
    const localStorage = window.localStorage

    localStorage.removeItem('opt1')
    localStorage.removeItem('opt2')
    localStorage.removeItem('woodAmount')
    localStorage.removeItem('doveze_drvostep')
    localStorage.removeItem('osobni_odber')
    localStorage.removeItem('whenToDeliver')
    localStorage.removeItem('whereToDeliver')
    localStorage.removeItem('deliveryPrice')
    localStorage.removeItem('distance')
  }

  renderTabs = () => {

    const {opt1, opt2, tab1, tab2, tab3, woodAmount} = this.state

    let recalculatedWoodAmount = (woodAmount * 1.1).toFixed(1)

    // let totalPrice = Math.round(+recalculatedWoodAmount * PRICE_OF_WOOD_1_PRMS)

    let totalPrice = calculate(opt1, opt2, recalculatedWoodAmount)

    return(
      <div className="tabs">
        <div className="tab">
          <div className={`tab-icon ${tab1 ? 'tab-active' : ''}`} onClick={() => this.setState({ tab1: true, tab2: false, tab3: false, totalPrice, recalculatedWoodAmount })}>
            <i className="fas fa-tree"></i>
          </div>
          <div className="tab-heading">1. Dřevo</div>
        </div>
        <i className="fas fa-angle-right"></i>
        <div className="tab">
          {/* <div className={`tab-icon ${tab2 ? 'tab-active' : ''}`} onClick={() => this.setState({ tab1: false, tab2: true, tab3: false, totalPrice, recalculatedWoodAmount })}> */}
          <div className={`tab-icon ${tab2 ? 'tab-active' : ''}`} onClick={() => this.handleGoToTab2(totalPrice, recalculatedWoodAmount)}>
            <i className="fas fa-truck"></i>
          </div>
          <div className="tab-heading">2. Doprava</div>
        </div>
        <i className="fas fa-angle-right"></i>
        <div className="tab">
          {/* <div className={`tab-icon ${tab3 ? 'tab-active' : ''}`} onClick={() => this.setState({ tab1: false, tab2: false, tab3: true, totalPrice, recalculatedWoodAmount })}> */}
          <div className={`tab-icon ${tab3 ? 'tab-active' : ''}`} onClick={() => this.handleGoToTab3(totalPrice, recalculatedWoodAmount)}>
            <i className="fas fa-list-ul"></i>
          </div>
          <div className="tab-heading">3. Shrnutí</div>
        </div>
      </div>
    )
  }

  handleGoToTab2 = (totalPrice, recalculatedWoodAmount) => {

    const {opt1, opt2, tab1, tab3} = this.state

    if (tab1) {
      if (!opt1 && opt2) {
        return this.setState({
          mustHaveWoodLength: true,
          mustHaveWoodType: false
        })
      }

      if (opt1 && !opt2) {
        return this.setState({
          mustHaveWoodLength: false,
          mustHaveWoodType: true
        })
      }

      if (opt1 === '50cm' && opt2 !== 'Předsušený buk') {
        return this.setState({
          mustHaveWoodLength: false,
          mustHaveWoodType: true
        })
      }

      if (!opt1 && !opt2) {
        return this.setState({
          mustHaveWoodLength: true,
          mustHaveWoodType: true
        })
      }

      return this.setState({
        tab1: false,
        tab2: true,
        tab3: false,
        totalPrice,
        recalculatedWoodAmount,
        mustHaveWoodLength: false,
        mustHaveWoodType: false
      })
    }

    if (tab3) {
      return this.setState({
        tab1: false,
        tab2: true,
        tab3: false,
        totalPrice,
        recalculatedWoodAmount,
      })
    }
  }

  handleGoToTab3 = (totalPrice, recalculatedWoodAmount) => {

    const {whereToDeliver, delivery} = this.state

    if (whereToDeliver === '') {
      this.setState({
        mustHaveWhereToDeliver: true
      })
    }

    // if (whereToDeliver) {
    if (whereToDeliver || delivery.osobni_odber) {
      return this.setState({
        tab1: false,
        tab2: false,
        tab3: true,
        totalPrice,
        recalculatedWoodAmount,
        mustHaveWhereToDeliver: false
      })
    }
  }

  calculateTotalPrice = () => {

    const {tab1, tab2, tab3, opt1, opt2, woodAmount, delivery, whenToDeliver, whereToDeliver, deliveryPrice, distance} = this.state

    let recalculatedWoodAmount = (this.state.woodAmount * 1.1).toFixed(1)

    let totalPrice = calculate(opt1, opt2, recalculatedWoodAmount)

    if (tab1) {
      return(
        <div className="total-price _row not-fit">
          <div className="_row">
            <div className="_column size_100 flex">
              <div className="total-price-info">
                <div><strong>Celková cena:</strong></div>
                <div>{accounting.formatNumber(totalPrice, 0, ' ')} Kč</div>
              </div>
              <div className="total-price-btn" onClick={() => this.handleGoToTab2(totalPrice, recalculatedWoodAmount)}>
                Na dopravu
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (tab2) {
      return(
        <div className="total-price _row not-fit">
          <div className="_row">
            <div className="_column size_100 flex">
              <div className="total-price-info">
                <div><strong>Celková cena:</strong></div>
                <div>{accounting.formatNumber(totalPrice, 0, ' ')} Kč</div>
              </div>
              <div className="back-btn" onClick={() => this.setState({ tab1: true, tab2: false, tab3: false, totalPrice, recalculatedWoodAmount })}>
                Na výběr dřeva
              </div>
              {/* <div className="total-price-btn" onClick={() => this.setState({ tab1: false, tab2: false, tab3: true, totalPrice, recalculatedWoodAmount })}> */}
              <div className="total-price-btn" onClick={() => this.handleGoToTab3(totalPrice, recalculatedWoodAmount)}>
                Shrnutí
              </div>
            </div>
          </div>
        </div>
      )
    }

    let orderLink = ''

    // this is for delivery = doveze_drvostep
    if (opt1 && opt2 && woodAmount > 0 && delivery.doveze_drvostep && whenToDeliver && whereToDeliver && totalPrice) {

      totalPrice = totalPrice + 2*deliveryPrice

      // orderLink = `https://drvostepstagingbrown.marekmelichar.cz/eshop/?add-to-cart=3642&attribute_pa_delka=${opt1}&attribute_pa_drevo=${opt2}&delivery=${delivery.doveze_drvostep || delivery.osobni_odber}&whenToDeliver=${whenToDeliver}&whereToDeliver=${whereToDeliver}%20${2*distance}%20km&quantity=1&price=${totalPrice}&prms=${recalculatedWoodAmount}`
      // orderLink = `/cart/?add-to-cart=${PRODUCT_ID}&attribute_pa_delka=${opt1}&attribute_pa_drevo=${opt2}&delivery=${delivery.doveze_drvostep || delivery.osobni_odber}&whenToDeliver=${whenToDeliver}&whereToDeliver=${whereToDeliver}%20${2*distance}%20km&quantity=1&price=${totalPrice}&prms=${recalculatedWoodAmount}`
      // orderLink = `${window.location.origin}/?page-id=${PAGE_ID}&add-to-cart=${PRODUCT_ID}&attribute_pa_delka=${opt1}&attribute_pa_drevo=${opt2}&delivery=${delivery.doveze_drvostep || delivery.osobni_odber}&whenToDeliver=${whenToDeliver}&whereToDeliver=${whereToDeliver}%20${2*distance}%20km&quantity=1&price=${totalPrice}&prms=${recalculatedWoodAmount}`
      orderLink = `/cart/?add-to-cart=${PRODUCT_ID}&attribute_pa_delka=${opt1}&attribute_pa_drevo=${opt2}&delivery=${delivery.doveze_drvostep || delivery.osobni_odber}&whenToDeliver=${whenToDeliver}&whereToDeliver=${whereToDeliver}%20${2*distance}%20km&quantity=1&price=${totalPrice}&prms=${recalculatedWoodAmount}`
    }

    // this is for delivery = osobni odber
    if (opt1 && opt2 && woodAmount > 0 && delivery.osobni_odber && whenToDeliver && totalPrice) {

      // orderLink = `https://drvostepstagingbrown.marekmelichar.cz/eshop/?add-to-cart=3642&attribute_pa_delka=${opt1}&attribute_pa_drevo=${opt2}&delivery=${delivery.osobni_odber}&whenToDeliver=${whenToDeliver}&quantity=1&price=${totalPrice}&prms=${recalculatedWoodAmount}`
      // orderLink = `${window.location.origin}/?page-id=${PAGE_ID}&add-to-cart=${PRODUCT_ID}&attribute_pa_delka=${opt1}&attribute_pa_drevo=${opt2}&delivery=${delivery.osobni_odber}&whenToDeliver=${whenToDeliver}&quantity=1&price=${totalPrice}&prms=${recalculatedWoodAmount}`
      orderLink = `/cart/?add-to-cart=${PRODUCT_ID}&attribute_pa_delka=${opt1}&attribute_pa_drevo=${opt2}&delivery=${delivery.osobni_odber}&whenToDeliver=${whenToDeliver}&quantity=1&price=${totalPrice}&prms=${recalculatedWoodAmount}`
    }

    if (tab3) {
      return(
        <div className="total-price _row not-fit">
          <div className="_row">
            <div className="_column size_100 flex">
              <div className="back-btn" onClick={() => this.setState({ tab1: false, tab2: true, tab3: false, totalPrice, recalculatedWoodAmount })}>
                Na dopravu
              </div>
              <a rel="nofollow"
                // onClick={(e) => this.handleOrderButtonClick(e)}
                href={orderLink}
                data-quantity="1"
                data-product_id={PRODUCT_ID}
                data-product_sku=""
                className="total-price-btn"
                >
                Objednat
              </a>
            </div>
          </div>
        </div>
      )
    }
  }

  // handleOrderButtonClick = e => {
  //   e.preventDefault()
  //
  //   var btn = $('.cart_item .product-name a')
  //   var remove = $('.product-remove')
  //
  //   $(btn).each(function(i, item) {
  //     if ($(item).text().includes('Palivové dřevo')) {
  //       remove[i+1].click()
  //     }
  //   })



  //
  //   // axios.get('/erase_cart.php').then(data => {
  //   //   console.log(data);
  //   // })
  //
  //   // axios.post('/wp-content/plugins/woocommerce_drvostep/erase_cart.php', {
  //   //   params: {
  //   //     do: 'delete_wood_from_cart',
  //   //     action: 'ACTION_NAME',
  //   //     _ajax_nonce: `<?php echo wp_create_nonce( 'my_ajax_nonce' ); ?>`
  //   //   }
  //   // })
  //   // .then(function (response) {
  //   //   console.log(response);
  //   // })
  //   // .catch(function (error) {
  //   //   console.log(error);
  //   // });
  //
  //   var data = {
  //       action: 'ACTION_NAME',
  //       do: 'delete_wood_from_cart',
  //       _ajax_nonce: `<?php echo wp_create_nonce( 'my_ajax_nonce' ); ?>`
  //   };
  //
  //   // since 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php
  //   // If you need it on a public facing page, uncomment the following line:
  //   // var ajaxurl = '<?php echo admin_url('admin-ajax.php'); ?>';
  //   $.post('/wp-content/plugins/woocommerce_drvostep/erase_cart.php', data, function(response) {
  //       console.log('Got this from the server: ' + response);
  //   });
  // }

  increaseWood = () => {

    let {woodAmount} = this.state

    if (woodAmount < 7) {

      this.setState({ woodAmount: woodAmount + 1 }, () => {
        // here must use this.state.woodAmount otherwise it doesnt work
        if (this.state.woodAmount < 3) {
          this.setState({
            delivery: {
              doveze_drvostep: '',
              osobni_odber: 'osobní odběr'
            }
          })
        }
      })
    }
  }

  decreaseWood = () => {

    let {woodAmount} = this.state

    if (woodAmount > 1) {

      this.setState({ woodAmount: woodAmount - 1 }, () => {
        // here must use this.state.woodAmount otherwise it doesnt work
        if (this.state.woodAmount < 3) {
          this.setState({
            delivery: {
              doveze_drvostep: '',
              osobni_odber: 'osobní odběr'
            }
          })
        }
      })
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
          deliveryPrice: 0,
        })
      }
      return this.setState({
        whereToDeliver: opt,
        distance,
        deliveryPrice,
        mustHaveWhereToDeliver: false
      })
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
      return this.setState({
        opt1: opt,
        mustHaveWoodLength: false,
        mustHaveWoodType: false
      })
    }

    if (id === 7) {
      return this.setState({
        opt2: opt,
        mustHaveWoodLength: false,
        mustHaveWoodType: false
      })
    }
  }

  handleFilterValue = e => {
    return this.setState({ filterValue: e })
  }

  handleFullyLoad = () => {

    const {opt1, opt2, loading} = this.state

    let recalculatedWoodAmount = (7 * 1.1).toFixed(1)

    let totalPrice = calculate(opt1, opt2, recalculatedWoodAmount, loading)

    return this.setState({ recalculatedWoodAmount, totalPrice, woodAmount: 7 })
  }

  handleClickOnWood = (e, selector) => {

    let {woodAmount} = this.state

    var pos_parent = document.querySelector(selector).getBoundingClientRect();

    var click_relative_in_parent = e.pageX - pos_parent.left

    var result_number_in_percent = Math.round(click_relative_in_parent / pos_parent.width * 100)

    let breakpoint = 100 / 7

    if (result_number_in_percent < breakpoint) {
      woodAmount = 1
    }

    if (result_number_in_percent > breakpoint && result_number_in_percent < 2 * breakpoint) {
      woodAmount = 2
    }

    if (result_number_in_percent > 2 * breakpoint && result_number_in_percent < 3 * breakpoint) {
      woodAmount = 3
    }

    if (result_number_in_percent > 3 * breakpoint && result_number_in_percent < 4 * breakpoint) {
      woodAmount = 4
    }

    if (result_number_in_percent > 4 * breakpoint && result_number_in_percent < 5 * breakpoint) {
      woodAmount = 5
    }

    if (result_number_in_percent > 5 * breakpoint && result_number_in_percent < 6 * breakpoint) {
      woodAmount = 6
    }

    if (result_number_in_percent > 6 * breakpoint && result_number_in_percent < 7 * breakpoint) {
      woodAmount = 7
    }

    return this.setState({ woodAmount }, () => {
      if (this.state.woodAmount < 3) {
        this.setState({
          delivery: {
            doveze_drvostep: '',
            osobni_odber: 'osobní odběr'
          }
        })
      }
    })
  }

  render() {

    const {wood, attributes, delivery, whenToDeliver, whereToDeliver} = this.state

    return this.state.loading ? <div><Spinner /></div> : (
      <div className="wrapper-wood">
        <div className="_row main-content">
          <div className="_column size_50 person">
            <div className="image">
                <img src="/images/mazanec.png" alt="Jiri Mazanec - Drvostep" />
            </div>
            <div className="_row">
              <div className="_column size_100 text-center">
                <p className="name-under-photo">Jmenuji se <strong>Jiří Mazanec</strong> a vyřeším s vámi vaši objednávku.</p>
              </div>
            </div>
            <div className="_row">
              <div className="_column size_50 contact-info">
                <p>E-mail:</p>
                <a href="mailto:jiri.mazanec@drvostep.eu">jiri.mazanec@drvostep.eu</a>
              </div>
              <div className="_column size_50 contact-info">
                <p>Telefon:</p>
                <a href="tel:+420 737 214 666">+420 737 214 666</a>
              </div>
              <div className="_column size_50"></div>
            </div>
          </div>
          <div className="_column size_50">

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
              handleClickOnWood={this.handleClickOnWood}
              mustHaveWoodLength={this.state.mustHaveWoodLength}
              mustHaveWoodType={this.state.mustHaveWoodType}
            />}
            {this.state.tab2 && <Tab2
              handleOptionClick={this.handleOptionClick}
              delivery={delivery.osobni_odber || delivery.doveze_drvostep}
              whenToDeliver={whenToDeliver}
              whereToDeliver={whereToDeliver}
              calculateTotalPrice={this.calculateTotalPrice}
              handleFilterValue={this.handleFilterValue}
              filterValue={this.state.filterValue}
              woodAmount={this.state.woodAmount}
              mustHaveWhereToDeliver={this.state.mustHaveWhereToDeliver}
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
