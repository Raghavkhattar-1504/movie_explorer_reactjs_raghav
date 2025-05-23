import  { Component } from 'react'
import NavbarNew from '../components/NavbarNew'
import SubscriptionModel from '../components/SubscriptionModel'
import Footer from '../components/Footer'

export default class SubscriptionPage extends Component {
  componentDidMount(): void {
    window.scrollTo(0, 0);
  }
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
