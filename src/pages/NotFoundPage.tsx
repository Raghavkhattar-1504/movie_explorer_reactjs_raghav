import { Component } from 'react'
import NavbarNew from '../components/NavbarNew'
import NotFound from '../components/NotFound'
import Footer from '../components/Footer'

export default class NotFoundPage extends Component {
  render() {
    return (
      <>
     <NavbarNew />
     <NotFound />
     <Footer />
     </>
    )
  }
}
