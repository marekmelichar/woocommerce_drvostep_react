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
      tab2: false
    }
  }

  componentWillMount() {

    this.setState({ loading: true })

    var instance = axios.create({
      method: 'get',
      baseURL: 'https://drvostepstaging.marekmelichar.cz/wp-json/wc/v2/products',
      headers: {'Authorization': `Basic ${btoa('ck_04a41244ee12646ca7e0022bba3610adc38f4bfe:cs_8e070ea82e127e2f4406df96fe946e76d446f82a')}`},
      maxRedirects: 0,
    });

    instance()
      .then(data => {
        const wood = _.find(data.data, { 'id': 97 })
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
    const {wood, opt1, opt2} = this.state

    if (this.state.wood.id) {
      return (
        <div>
          {this.state.attributes.map(itm => {
            return <div key={itm.name}>
              <h1>{itm.name}</h1>
              {itm.options.map(opt => {
                return <h2 key={opt} className="aaa" onClick={(e) => this.handleOptionClick(e, itm.id, opt)}>{opt}</h2>
              })}
            </div>
          })}
          <a href={opt1 && opt2 ? `https://drvostepstaging.marekmelichar.cz/?add-to-cart=${wood.id}&attribute_pa_delka=${opt2}&attribute_pa_drevo=${opt1}` : '#'}>SEND TO CART</a>
        </div>
      )
    }

    return <span>Loading....<Spinner /></span>
  }

  handleOptionClick = (e, id, opt) => {
    // console.log('click ', e.target.className, id, opt);

    e.target.classList.toggle('active')

    if (id === 1) {
      return this.setState({ opt1: opt })
    }

    if (id === 2) {
      return this.setState({ opt2: opt })
    }
  }

  render() {
    console.log(this.state.tab1, this.state.tab2);
    return this.state.loading ? <div><Spinner /></div> : (
      <div className="row">
        <div className="row tabs">
          <div className="column size_50">
            <div className="number" onClick={() => this.setState({ tab1: true, tab2: false })}>1</div>
          </div>
          <div className="column size_50">
            <div className="number" onClick={() => this.setState({ tab1: false, tab2: true })}>2</div>
          </div>
        </div>

        {this.state.tab1 && this.renderAttributes()}
        {this.state.tab2 && <div>TAB 2</div>}
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
