
function Footer() : JSX.Element {
  return (
    <footer className="bg-gray-900 text-white text-center py-3 mt-20">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between">
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <h3 className="text-xl font-bold mb-2">About Us</h3>
          <p className="text-sm">We are a book store dedicated to providing the best reading experience to our customers.</p>
        </div>
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <h3 className="text-xl font-bold mb-2">Contact Us</h3>
          {/* <p className="text-sm">HCMUS</p> */}
          <p className="text-sm">Ho Chi Minh City</p>
          <p className="text-sm">000000000</p>
          <p className="text-sm">info@bookstore.com</p>
        </div>
        <div className="w-full md:w-1/3">
          <h3 className="text-xl font-bold mb-2">Follow Us</h3>
          <div className="flex">
            <a href="#" className="mr-4 text-lg">
              <i className="fab fa-facebook-square"></i>
            </a>
            <a href="#" className="mr-4 text-lg">
              <i className="fab fa-twitter-square"></i>
            </a>
            <a href="#" className="mr-4 text-lg">
              <i className="fab fa-instagram-square"></i>
            </a>
            <a href="#" className="text-lg">
              <i className="fab fa-pinterest-square"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <p className="text-sm">&copy; 2023 Book Store. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;