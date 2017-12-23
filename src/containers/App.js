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

  renderAttributes = () => {
    const {wood, attributes} = this.state

    if (wood.id) {
      return (
        <form className="attributes">
          {attributes.map(itm => {
            return(
              <div key={itm.id}>
                <h2>{itm.name}</h2>
                <ul className="flex">
                  {itm.options.map((opt, i) => {
                    return (
                      <li className="item-wrapper" key={opt}>
                        <input
                          id={opt}
                          type="radio"
                          name={`wood${itm.id}`}
                          value={opt}
                          onClick={(e) => this.handleOptionClick(e, itm.id, opt)}
                        />
                        <label
                          htmlFor={opt}
                        >{opt}</label>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
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

  handleOptionClick = (e, id, opt) => {

    // console.log(e.target, id, opt);

    // e.target.classList.toggle('selected')

    if (id === 8) {
      return this.setState({ opt1: opt })
    }

    if (id === 7) {
      return this.setState({ opt2: opt })
    }
  }

  render() {
    const {opt1, opt2, wood, tab1, tab2, tab3} = this.state

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

            {this.state.tab1 && this.renderAttributes()}
            {this.state.tab1 && <a href={opt1 && opt2 ? `https://drvostepstaging.marekmelichar.cz/eshop/?add-to-cart=${wood.id}&attribute_pa_delka=${opt1}&attribute_pa_drevo=${opt2}` : '#'}>SEND TO CART</a>}

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
