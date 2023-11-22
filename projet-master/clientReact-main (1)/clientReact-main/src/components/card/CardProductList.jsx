import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CardProductList = (props) => {
  const showToastMessage = (msg) => {
    toast.success(msg + " !", {
        position: toast.POSITION.TOP_RIGHT,
    });
};
const showToastMessage1 = (msg) => {
    toast.error(msg + " !", {
        position: toast.POSITION.TOP_RIGHT,
    });
};

const [credentials, setCredentials] = useState({
    compaigneTitle: undefined,
    description: undefined,
    startingDate: undefined,
    endingDate: undefined,
    endingSoon: false
   
});
  const { user } = useContext(AuthContext);
  const handleRegister = async (e,id) => {
    e.preventDefault();
    const test = JSON.parse(localStorage.getItem("user"));
    

    try {
      const response = await axios.post('http://localhost:8800/api/basket', {
        "userProfil": test["_id"],
        "productSelected": id

      });

      if (response.status === 201 || response.status === 200) {
        // L'inscription a réussi, rediriger ou effectuer d'autres actions
        console.log('Inscription réussie');
        showToastMessage("succeed")
      } else {
        // L'inscription a échoué, afficher le message d'erreur
        console.error('Échec de l\'inscription');
        showToastMessage1("it's necessary to sign in first !!")

      }
    } catch (error) {
      // Afficher le message d'erreur en cas d'erreur lors de la requête
      console.error('Erreur lors de l\'inscription', error);
      showToastMessage1("it's necessary to sign in first !!")

    }
  };


  const product = props.data;
  return (
    <div className="card">
      <div className="row g-0">
        <div className="col-md-3 text-center">
          <img src={product.image} className="img-fluid" alt="..." />
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h6 className="card-subtitle me-2 d-inline">
              <Link to={product.link} className="text-decoration-none">
                {product.productName}
              </Link>
            </h6>
            {product.isNew && (
              <span className="badge bg-success me-2">New</span>
            )}
            {product.isHot && <span className="badge bg-danger me-2">Hot</span>}

            <div>
              {product.star > 0 &&
                Array.from({ length: 5 }, (_, key) => {
                  if (key <= product.star)
                    return (
                      <i
                        className="bi bi-star-fill text-warning me-1"
                        key={key}
                      />
                    );
                  else
                    return (
                      <i
                        className="bi bi-star-fill text-secondary me-1"
                        key={key}
                      />
                    );
                })}
            </div>
            {product.description &&
              product.description.includes("|") === false && (
                <p className="small mt-2">{product.description}</p>
              )}
            {product.description && product.description.includes("|") && (
              <ul className="mt-2">
                {product.description.split("|").map((desc, idx) => (
                  <li key={idx}>{desc}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-body">
            <div className="mb-2">
              <span className="fw-bold h5">${product.price}</span>
              {product.originPrice > 0 && (
                <del className="small text-muted ms-2">
                  ${product.originPrice}
                </del>
              )}
              {(product.discountPercentage > 0 ||
                product.discountPrice > 0) && (
                <span className={`rounded p-1 bg-warning ms-2 small`}>
                  -
                  {product.discountPercentage > 0
                    ? product.discountPercentage + "%"
                    : "$" + product.discountPrice}
                </span>
              )}
            </div>
            {product.isFreeShipping && (
              <p className="text-success small mb-2">
                <i className="bi bi-truck" /> Free shipping
              </p>
            )}

            <div className="btn-group d-flex" role="group">
              <button onClick={(e)=>handleRegister(e,product._id)}
                type="button"
                className="btn btn-sm btn-primary"
                title="Add to cart"
              >
                <i className="bi bi-cart-plus" />
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                title="Add to wishlist"
              >
                <i className="bi bi-heart-fill" />
              </button>
            </div>
          </div>
        </div>
      </div><ToastContainer />
    </div>
  );
};

export default CardProductList;
