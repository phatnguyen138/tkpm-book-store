import ProductCategories from "../components/ProductCategories"
import Banner from "../components/Banner";

function HomePage() : JSX.Element {
    return <div className="page-container">
        <Banner/>
        <ProductCategories/>
    </div>
}

export default HomePage;