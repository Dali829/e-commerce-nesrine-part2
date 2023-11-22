import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FilterCategory = (props) => {

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const categoriesEndpoint = 'http://localhost:8800/api/categorie';


  const fetchCategories = async () => {
    try {
      const response = await fetch(categoriesEndpoint);
      const data = await response.json();
      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="card mb-3 accordion">
      <div
        className="card-header fw-bold text-uppercase accordion-icon-button"
        data-bs-toggle="collapse"
        data-bs-target="#filterCategory"
        aria-expanded="true"
        aria-controls="filterCategory"
      >
        Categories
      </div>
      <ul
        className="list-group list-group-flush show"
        id="filterCategory"
      >
        {categories.map((category) => (
          <li className="nav-item">
            <Link className="nav-link" to="/category">
              <li className="list-group-item">
                <Link to="/" className="text-decoration-none stretched-link">
                  {category.title}
                </Link>
              </li>

            </Link>
          </li>
        ))}
       
      </ul>
    </div>
  );
};

export default FilterCategory;
