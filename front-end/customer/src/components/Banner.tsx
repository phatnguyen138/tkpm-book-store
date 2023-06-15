import { Link } from "react-router-dom";

function Banner(): JSX.Element {
  return (
    <div className="relative">
      <img src="https://t3.ftcdn.net/jpg/03/21/97/42/360_F_321974259_BnmlxfkknMol8HiQ0dg1bwQizor48uB9.jpg" alt="Banner" className="w-full h-auto" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-4xl font-bold text-white">Welcome to My Book Store!</h1>
        <p className="mt-4 text-lg text-white">Find your favorite books and more...</p>
        <Link to='/list/tat-ca'>
          <button className="mt-8 bg-white text-black py-3 px-6 rounded-full font-bold hover:bg-gray-200">Shop Now</button>
        </Link>
      </div>
    </div>
  );
}

export default Banner;