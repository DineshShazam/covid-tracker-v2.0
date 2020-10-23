import React from 'react'
import './Footer.css'

const Footer = () => {

    return (
        <footer class="bg-dark" style={{  background: "#262626"}}>
        <section id="footer" class="py-5">
          <div class="container text-center">
            {/* <a href="#" class="twitter"></a>
            <a href="#" class="linkedin"></a>
            <a href="#" class="facebook"></a>
            <a href="#" class="skype"></a>
            <a href="#" class="flickr"></a> */}
            <h6 class="m-0 mt-4 text-center text-white text-capitalize">Copyright &copy; 2020 designed by designer</h6>
          </div>
        </section>
      </footer>
    )
}

export default Footer