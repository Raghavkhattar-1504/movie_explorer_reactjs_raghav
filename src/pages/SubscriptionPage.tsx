import  { Component } from 'react'
import NavbarNew from '../components/NavbarNew'
import SubscriptionModel from '../components/SubscriptionModel'
import Footer from '../components/Footer'

export default class SubscriptionPage extends Component {
  render() {
    return (
      <>
      <NavbarNew />
      <SubscriptionModel />
      <Footer />
      </>
    )
  }
}
