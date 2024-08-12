import React, { useState, useEffect, useContext } from 'react'
import './CSS/ShopCategory.scss'
import { Link } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext' //new
import dropdown_icon from '../components/Assets/dropdown_icon.png'
import Item from '../components/Item/Item'
import axios from 'axios';

const ShopCategory = (props) => { 
  const { allProducts , setAllProducts} = useContext(ShopContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [perPage, setPerPage] = useState(12);
  const [totalProducts, setTotalProducts] = useState(0);
  const [showingFrom, setShowingFrom] = useState(0);
  const [showingTo, setShowingTo] = useState(0);
  const [sortOption, setSortOption] = useState('');
  
  const [filters, setFilters] = useState({
    price: '',
    occasions: '',
    flowerType: '',
    color: '',
    style: '',
  });
  useEffect(() => {
      fetchData()
  }, [filters, sortOption])

  useEffect(() => {
    const from = (currentPage - 1) * perPage + 1;
    const to = Math.min(currentPage * perPage, totalProducts);
    const showingTo = allProducts.length > 0 ? to : 0;
    setShowingFrom(from);
    setShowingTo(showingTo);
  }, [currentPage, perPage, totalProducts, allProducts]);

  const handleFilterChange = (e, category, value) => {
    setFilters(prevFilters => {
      if (category === 'price') {
        return {
          ...prevFilters,
          [category]: prevFilters[category] === value ? '' : value
        };
      } else {
        return {
          ...prevFilters,
          [category]: e.target.checked ? value : ''
        };
      }
    });
  };

  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/products/allProducts', { ...filters, sortOption });
      setAllProducts(response.data.products);
      setTotalPages(response.data.totalPages);
      setTotalProducts(response.data.totalProducts);
    } catch (error) {
      console.error('Error fetching filtered data:', error);
    }
  };
  const handlePageChange = (page) => {
    if (page === 'previous' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (page === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (typeof page === 'number') {
      setCurrentPage(page);
    }
  };
  const handleSortChange = (sortOption) => {
    setSortOption(sortOption);
  };

  return (
    <>
      <div className='shop-category1'>
        <div className="sidebar">
          <div className="heading">
            <h2>FILTER BY</h2>
          </div>
          {/* Price Filter */}
          <div className="filter">
            <h4>Price</h4>
            <ul>
              <li>
                <input type="checkbox" id="price1" name="price" checked={filters.price.includes('0, 49.99')} onChange={(e) => handleFilterChange(e, 'price', '0, 49.99')} />
                <label htmlFor="price1">$49.99 or less (2)</label>
              </li>
              <li>
                <input type="checkbox" id="price2" checked={filters.price.includes('50,74.99')} onChange={(e) => handleFilterChange(e, 'price', '50,74.99')} />
                <label htmlFor="price2">$50 - $74.99 (6)</label>
              </li>
              <li>
                <input type="checkbox" id="price3" checked={filters.price.includes('75,99.99')} onChange={(e) => handleFilterChange(e, 'price', '75,99.99')} />
                <label htmlFor="price3">$75 - $99.99 (20)</label>
              </li>
              <li>
                <input type="checkbox" id="price4" checked={filters.price.includes('100,124.99')} onChange={(e) => handleFilterChange(e, 'price', '100,124.99')} />
                <label htmlFor="price4">$100 - $124.99 (12)</label>
              </li>
              <li>
                <input type="checkbox" id="price5" checked={filters.price.includes('125,149.99')} onChange={(e) => handleFilterChange(e, 'price', '125,149.99')} />
                <label htmlFor="price5">$125 - $149.99 (11)</label>
              </li>
              <li>
                <input type="checkbox" id="price6" checked={filters.price.includes('150')} onChange={(e) => handleFilterChange(e, 'price', '150')} />
                <label htmlFor="price6">$150 and above (45)</label>
              </li>
            </ul>
          </div>

          {/* Occasions Filter */}
          <div className="filter">
            <h4>Occasions</h4>
            <ul>
              <li>
                <input type="checkbox" id="occasion1" checked={filters.occasions === 'mothers-day' ? true : false} onChange={(e) => handleFilterChange(e, 'occasions', 'mothers-day')} />
                <label htmlFor="occasion1">Mother's Day (20)</label>
              </li>
              <li>
                <input type="checkbox" id="occasion2" checked={filters.occasions === 'anniversary' ? true : false} onChange={(e) => handleFilterChange(e, 'occasions', 'anniversary')} />
                <label htmlFor="occasion2">Anniversary (34)</label>
              </li>
              <li>
                <input type="checkbox" id="occasion3" checked={filters.occasions === 'birthday' ? true : false} onChange={(e) => handleFilterChange(e, 'occasions', 'birthday')} />
                <label htmlFor="occasion3">Birthday (34)</label>
              </li>
              <li>
                <input type="checkbox" id="occasion4" checked={filters.occasions === 'congrats' ? true : false} onChange={(e) => handleFilterChange(e, 'occasions', 'congrats')} />
                <label htmlFor="occasion4">Congrats (28)</label>
              </li>
              <li>
                <input type="checkbox" id="occasion5" checked={filters.occasions === 'get_well' ? true : false} onChange={(e) => handleFilterChange(e, 'occasions', 'get_well')} />
                <label htmlFor="occasion5">Get Well (18)</label>
              </li>
              <li>
                <input type="checkbox" id="occasion6" checked={filters.occasions === 'graduation' ? true : false} onChange={(e) => handleFilterChange(e, 'occasions', 'graduation')} />
                <label htmlFor="occasion6">Graduation (3)</label>
              </li>
              <li>
                <input type="checkbox" id="occasion7" checked={filters.occasions === 'im_sorry' ? true : false} onChange={(e) => handleFilterChange(e, 'occasions', 'im_sorry')} />
                <label htmlFor="occasion7">I'm Sorry (19)</label>
              </li>
              <li>
                <input type="checkbox" id="occasion8" checked={filters.occasions === 'just_because' ? true : false} onChange={(e) => handleFilterChange(e, 'occasions', 'just_because')} />
                <label htmlFor="occasion8">Just Because (39)</label>
              </li>
              <li>
                <input type="checkbox" id="occasion9" checked={filters.occasions === 'love_and_romance' ? true : false} onChange={(e) => handleFilterChange(e, 'occasions', 'love_and_romance')} />
                <label htmlFor="occasion9">Love and Romance (28)</label>
              </li>
              <li>
                <input type="checkbox" id="occasion10" checked={filters.occasions === 'new_baby' ? true : false} onChange={(e) => handleFilterChange(e, 'occasions', 'new_baby')} />
                <label htmlFor="occasion10">New Baby (8)</label>
              </li>
              <li>
                <input type="checkbox" id="occasion11" checked={filters.occasions === 'spring' ? true : false} onChange={(e) => handleFilterChange(e, 'occasions', 'spring')} />
                <label htmlFor="occasion11">Spring (17)</label>
              </li>
              <li>
                <input type="checkbox" id="occasion12" checked={filters.occasions === 'sympathy_and_funeral' ? true : false} onChange={(e) => handleFilterChange(e, 'occasions', 'sympathy_and_funeral')} />
                <label htmlFor="occasion12">Sympathy and Funeral (37)</label>
              </li>
              <li>
                <input type="checkbox" id="occasion13" checked={filters.occasions === 'thank_you' ? true : false} onChange={(e) => handleFilterChange(e, 'occasions', 'thank_you')} />
                <label htmlFor="occasion13">Thank You (38)</label>
              </li>
              <li>
                <input type="checkbox" id="occasion14" checked={filters.occasions === 'wedding' ? true : false} onChange={(e) => handleFilterChange(e, 'occasions', 'wedding')} />
                <label htmlFor="occasion14">Wedding (7)</label>
              </li>
            </ul>
          </div>

          {/* Flower Type Filter */}
          <div className="filter">
            <h4>Flower Type</h4>
            <ul>
              <li>
                <input type="checkbox" id="flower1" checked={filters.flowerType === 'dahlias' ? true : false} onChange={(e) => handleFilterChange(e, 'flowerType', 'dahlias')} />
                <label htmlFor="flower1">Dahlias (3)</label>
              </li>
              <li>
                <input type="checkbox" id="flower2" checked={filters.flowerType === 'delphinium' ? true : false} onChange={(e) => handleFilterChange(e, 'flowerType', 'delphinium')} />
                <label htmlFor="flower2">Delphinium (5)</label>
              </li>
              <li>
                <input type="checkbox" id="flower3" checked={filters.flowerType === 'daisies' ? true : false} onChange={(e) => handleFilterChange(e, 'flowerType', 'daisies')} />
                <label htmlFor="flower3">Daisies (2)</label>
              </li>
              <li>
                <input type="checkbox" id="flower4" checked={filters.flowerType === 'hyacinth' ? true : false} onChange={(e) => handleFilterChange(e, 'flowerType', 'hyacinth')} />
                <label htmlFor="flower4">Hyacinth (4)</label>
              </li>
              <li>
                <input type="checkbox" id="flower5" checked={filters.flowerType === 'hydrangeas' ? true : false} onChange={(e) => handleFilterChange(e, 'flowerType', 'hydrangeas')} />
                <label htmlFor="flower5">Hydrangeas (47)</label>
              </li>
              <li>
                <input type="checkbox" id="flower6" checked={filters.flowerType === 'succulents' ? true : false} onChange={(e) => handleFilterChange(e, 'flowerType', 'succulents')} />
                <label htmlFor="flower6">Succulents (3)</label>
              </li>
              <li>
                <input type="checkbox" id="flower7" checked={filters.flowerType === 'lilies' ? true : false} onChange={(e) => handleFilterChange(e, 'flowerType', 'lilies')} />
                <label htmlFor="flower7">Lilies (13)</label>
              </li>
              <li>
                <input type="checkbox" id="flower8" checked={filters.flowerType === 'calla_lilies' ? true : false} onChange={(e) => handleFilterChange(e, 'flowerType', 'calla_lilies')} />
                <label htmlFor="flower8">Calla Lilies (9)</label>
              </li>
              <li>
                <input type="checkbox" id="flower9" checked={filters.flowerType === 'cymbidium_orchid' ? true : false} onChange={(e) => handleFilterChange(e, 'flowerType', 'cymbidium_orchid')} />
                <label htmlFor="flower9">Cymbidium Orchid (15)</label>
              </li>
              <li>
                <input type="checkbox" id="flower10" checked={filters.flowerType === 'phalaenopsis_orchids' ? true : false} onChange={(e) => handleFilterChange(e, 'flowerType', 'phalaenopsis_orchids')} />
                <label htmlFor="flower10">Phalaenopsis Orchids (9)</label>
              </li>
              <li>
                <input type="checkbox" id="flower11" checked={filters.flowerType === 'roses' ? true : false} onChange={(e) => handleFilterChange(e, 'flowerType', 'roses')} />
                <label htmlFor="flower11">Roses (73)</label>
              </li>
              <li>
                <input type="checkbox" id="flower12" checked={filters.flowerType === 'snapdragons' ? true : false} onChange={(e) => handleFilterChange(e, 'flowerType', 'snapdragons')} />
                <label htmlFor="flower12">Snapdragons (1)</label>
              </li>
              <li>
                <input type="checkbox" id="flower13" checked={filters.flowerType === 'Sunflowers' ? true : false} onChange={(e) => handleFilterChange(e, 'flowerType', 'Sunflowers')} />
                <label htmlFor="flower13">Sunflowers (3)</label>
              </li>
              <li>
                <input type="checkbox" id="flower14" checked={filters.flowerType === 'tulips' ? true : false} onChange={(e) => handleFilterChange(e, 'flowerType', 'tulips')} />
                <label htmlFor="flower14">Tulips (11)</label>
              </li>
              <li>
                <input type="checkbox" id="flower15" checked={filters.flowerType === 'mixed_bouquet' ? true : false} onChange={(e) => handleFilterChange(e, 'flowerType', 'mixed_bouquet')} />
                <label htmlFor="flower15">Mixed Bouquet (75)</label>
              </li>
            </ul>
          </div>

          {/* Color Filter */}
          <div className="filter">
            <h4>Color</h4>
            <ul>
              <li>
                <input type="checkbox" id="color1" checked={filters.color === 'blue' ? true : false} onChange={(e) => handleFilterChange(e, 'color', 'blue')} />
                <label htmlFor="color1">Blue (7)</label>
              </li>
              <li>
                <input type="checkbox" id="color2" checked={filters.color === 'bright' ? true : false} onChange={(e) => handleFilterChange(e, 'color', 'bright')} />
                <label htmlFor="color2">Bright (22)</label>
              </li>
              <li>
                <input type="checkbox" id="color3" checked={filters.color === 'lavender' ? true : false} onChange={(e) => handleFilterChange(e, 'color', 'lavender')} />
                <label htmlFor="color3">Lavender (12)</label>
              </li>
              <li>
                <input type="checkbox" id="color4" checked={filters.color === 'mixed' ? true : false} onChange={(e) => handleFilterChange(e, 'color', 'mixed')} />
                <label htmlFor="color4">Mixed (50)</label>
              </li>
              <li>
                <input type="checkbox" id="color5" checked={filters.color === 'orange' ? true : false} onChange={(e) => handleFilterChange(e, 'color', 'orange')} />
                <label htmlFor="color5">Orange (6)</label>
              </li>
              <li>
                <input type="checkbox" id="color6" checked={filters.color === 'pastel' ? true : false} onChange={(e) => handleFilterChange(e, 'color', 'pastel')} />
                <label htmlFor="color6">Pastel (8)</label>
              </li>
              <li>
                <input type="checkbox" id="color7" checked={filters.color === 'pink' ? true : false} onChange={(e) => handleFilterChange(e, 'color', 'pink')} />
                <label htmlFor="color7">Pink (23)</label>
              </li>
              <li>
                <input type="checkbox" id="color8" checked={filters.color === 'purple' ? true : false} onChange={(e) => handleFilterChange(e, 'color', 'purple')} />
                <label htmlFor="color8">Purple (20)</label>
              </li>
              <li>
                <input type="checkbox" id="color9" checked={filters.color === 'red' ? true : false} onChange={(e) => handleFilterChange(e, 'color', 'red')} />
                <label htmlFor="color9">Red (24)</label>
              </li>
              <li>
                <input type="checkbox" id="color10" checked={filters.color === 'white' ? true : false} onChange={(e) => handleFilterChange(e, 'color', 'white')} />
                <label htmlFor="color10">White (41)</label>
              </li>
              <li>
                <input type="checkbox" id="color11" checked={filters.color === 'yellow' ? true : false} onChange={(e) => handleFilterChange(e, 'color', 'yellow')} />
                <label htmlFor="color11">Yellow (10)</label>
              </li>
            </ul>
          </div>

          {/* Style Filter */}
          <div className="filter">
            <h4>Style</h4>
            <ul>
              <li>
                <input type="checkbox" id="style1" checked={filters.style === 'luxurious' ? true : false} onChange={(e) => handleFilterChange(e, 'style', 'luxurious')} />
                <label htmlFor="style1">Luxurious (3)</label>
              </li>
              <li>
                <input type="checkbox" id="style2" checked={filters.style === 'modern' ? true : false} onChange={(e) => handleFilterChange(e, 'style', 'modern')} />
                <label htmlFor="style2">Modern (4)</label>
              </li>
              <li>
                <input type="checkbox" id="style3" checked={filters.style === 'traditional' ? true : false} onChange={(e) => handleFilterChange(e, 'style', 'traditional')} />
                <label htmlFor="style3">Traditional (24)</label>
              </li>
            </ul>
          </div>
        </div>

        <div className='right'>
          <div className='website-names'>
            <p>{props.names} Designs</p>
          </div>
       
          <div className='shopcategory-indexSort'>
            <div>
              <p>
                <span>Showing {showingFrom}-{showingTo}</span> out of {totalProducts} products
              </p>
            </div>

            <div className='shopcategory-sort'>
              <p>Sort by</p>
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {sortOption === 'priceLowToHigh' ? 'Price: Low to High' : sortOption === 'priceHighToLow' ? 'Price: High to Low' : sortOption === 'newest' ? 'Newest' : 'Featured Items'}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#" onClick={() => handleSortChange('priceLowToHigh')}>Price: Low to High</a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={() => handleSortChange('priceHighToLow')}>Price: High to Low</a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={() => handleSortChange('newest')}>Newest</a>
                  </li>
                </ul>
              </div>
            </div>

          </div>

          <div className='shopcategory-products'>
            {allProducts.map((item, i) => (
              <Item
                key={i}
                id={item._id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
              />
            ))}
          </div>

          <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange('previous')}>
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(page)}>
                {page}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange('next')}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
        </div>
      </div>
    </>
  )
}

export default ShopCategory