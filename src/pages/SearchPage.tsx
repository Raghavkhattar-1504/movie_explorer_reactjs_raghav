import { Component } from 'react'
import NavbarNew from '../components/NavbarNew'
import Search from '../components/Search'
import Footer from '../components/Footer'

export default class SearchPage extends Component {
  render() {
    return (
      <>
      <NavbarNew />
      <Search />
      <Footer />
      </>
    )
  }
}
