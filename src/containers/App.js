import React, { Component } from 'react';

import * as actions from '../actions';
import { connect } from 'react-redux';

import axios from 'axios'
import _ from 'lodash'

import Spinner from '../components/spinner/Spinner';

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
    }
  }

  componentWillMount() {

    this.setState({ loading: true })

    var instance = axios.create({
      method: 'get',
      // btoa(key:secret) from WooCommerce API
      baseURL: 'https://drvostepstaging.marekmelichar.cz/wp-json/wc/v2/products',
      headers: {'Authorization': `Basic ${btoa('ck_9f0085f12fddda97bdd774930973eccb7605b7fb:cs_3e7b6168aeab374dd92ddfdfce2199ef062559aa')}`},
      // baseURL: 'https://woocommerce.marekmelichar.cz/wp-json/wc/v2/products',
      // headers: {'Authorization': `Basic ${btoa('ck_a1dc7487f74328e855ad20e7bfc7924da15ebcfc:cs_83abaadb572428a054eebf57415bc09d1fb0f1c8')}`},
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
      .catch(err => console.log('error', err))

  }

  componentDidMount() {
    this.setState({ loading: false })
  }

  renderAttributes = () => {
    const {wood, attributes, opt1, opt2} = this.state

    // console.log(wood, opt1, opt2);

    if (this.state.wood.id) {
      return (
        <div>
          {attributes.map(itm => {
            // console.log(itm);
            return <div key={itm.name}>
              <h1>{itm.name}</h1>
              {itm.options.map(opt => {
                return <h2 key={opt} className="aaa" onClick={(e) => this.handleOptionClick(e, itm.id, opt)}>{opt}</h2>
              })}
            </div>
          })}
          {/* <a href={opt1 && opt2 ? `https://drvostepstaging.marekmelichar.cz/?add-to-cart=${wood.id}&attribute_pa_delka=${opt2}&attribute_pa_drevo=${opt1}` : '#'}>SEND TO CART</a> */}
          <a href={opt1 && opt2 ? `https://drvostepstaging.marekmelichar.cz/eshop/?add-to-cart=${wood.id}&attribute_pa_delka=${opt2}&attribute_pa_drevo=${opt1}` : '#'}>SEND TO CART</a>
        </div>
      )
    }

    return <span>Loading....<Spinner /></span>
  }

  handleOptionClick = (e, id, opt) => {
    // console.log('click ', e.target.className, id, opt);

    e.target.classList.toggle('active')

    if (id === 8) {
      return this.setState({ opt1: opt })
    }

    if (id === 7) {
      return this.setState({ opt2: opt })
    }
  }

  render() {
    // console.log(this.state.tab1, this.state.tab2);
    return this.state.loading ? <div><Spinner /></div> : (
      <div className="wrapper-wood">
        <div className="row main-content">
          <div className="column size_50">
            <div className="image">
              {/* <div className="mazanec"></div> */}
                <img src="/images/mazanec.png" alt="Jiri Mazanec - Drvostep" />
            </div>
            <div className="row">
              <div className="column size_100 text-center">
                <p>Jmenuji se Jiří Mazanec a vyřeším s vámi vaši objednávku.</p>
              </div>
            </div>
            <div className="row">
              <div className="column size_50 text-center">
                <p>E-mail:</p>
                <a href="mailto:jiri.mazanec@drvostep.eu">jiri.mazanec@drvostep.eu</a>
              </div>
              <div className="column size_50 text-center">
                <p>Telefon:</p>
                <a href="tel:+420 999 999 999">+420 999 999 999</a>
              </div>
              <div className="column size_50"></div>
            </div>

            {/* <p>Jmenuji se Jiří Mazanec a vyřeším s vámi vaši objednávku.</p>

            <p>E-mail:</p>
            <a href="mailto:jiri.mazanec@drvostep.eu">jiri.mazanec@drvostep.eu</a>

            <p>Telefon:</p>
            <a href="tel:+420 999 999 999">+420 999 999 999</a> */}

          </div>
          <div className="column size_50">

            <div className="row">
              <div className="column size_33">
                <div className="number" onClick={() => this.setState({ tab1: true, tab2: false, tab3: false })}>1</div>
              </div>
              <div className="column size_33">
                <div className="number" onClick={() => this.setState({ tab1: false, tab2: true, tab3: false })}>2</div>
              </div>
              <div className="column size_33">
                <div className="number" onClick={() => this.setState({ tab1: false, tab2: false, tab3: true })}>3</div>
              </div>
            </div>

            {this.state.tab1 && <div>
              {this.renderAttributes()}
            </div>}

            {this.state.tab2 && <div>TAB 2</div>}
            {this.state.tab3 && <div>TAB 3</div>}
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
 // 3.3 = 4.9
 // vzit to z drvostepu stavajiciho
