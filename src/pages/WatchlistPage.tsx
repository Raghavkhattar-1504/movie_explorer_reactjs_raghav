import { Component } from 'react'
import NavbarNew from '../components/NavbarNew'
import Watchlist from '../components/Watchlist'
import Footer from '../components/Footer'

export default class WatchlistPage extends Component {
    componentDidMount(): void {
    window.scrollTo(0, 0);
  }
  render() {
    return (
        <>
        <NavbarNew />
        <Watchlist />
        <Footer />
        </>
    )
  }
}
