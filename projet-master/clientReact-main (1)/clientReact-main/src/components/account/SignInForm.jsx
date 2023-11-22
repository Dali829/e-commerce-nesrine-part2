import React, { useContext, useState } from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import { Link } from "react-router-dom";
import renderFormGroupField from "../../helpers/renderFormGroupField";
import axios from 'axios';
import {
  required,
  maxLength20,
  minLength8,
  maxLengthMobileNo,
  minLengthMobileNo,
  digit,
} from "../../helpers/validation";
import { ReactComponent as IconPhone } from "bootstrap-icons/icons/phone.svg";
import { ReactComponent as IconShieldLock } from "bootstrap-icons/icons/shield-lock.svg";
import { AuthContext } from '../../context/AuthContext.js';


const SignInForm = (props) => {
 
  const [errorMessage, setErrorMessage] = useState('');

const [tel,setTel]=useState();
const [password,setPassword]=useState();
const { loading, error, dispatch } = useContext(AuthContext);

const handleLogin = async (e) => {
  e.preventDefault();
  dispatch({ type: "LOGIN_START" });
  try {
    const response = await axios.post('http://localhost:8800/api/auth/loginUser', {
      "tel":tel,
      "password": password,
    });

    if (response.status === 200) {
      // L'authentification a réussi, rediriger ou effectuer d'autres actions
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });

      console.log('Authentification réussie');
      window.location.replace('/');
    } else {
      // L'authentification a échoué, afficher le message d'erreur
      dispatch({ type: "LOGIN_FAILURE" });
      setErrorMessage('Nom d\'utilisateur ou mot de passe incorrect');
      console.error('Échec de l\'authentification');
    }
  } catch (error) {
    // Afficher le message d'erreur en cas d'erreur lors de la requête
    dispatch({ type: "LOGIN_FAILURE" });
    setErrorMessage('Erreur lors de l\'authentification');
    console.error('Erreur lors de l\'authentification', error);
  }
};

  const { handleSubmit, submitting, onSubmit, submitFailed } = props;
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`needs-validation ${submitFailed ? "was-validated" : ""}`}
      noValidate
    >
      <Field
        name="mobileNo"
        onChange={(e)=>setTel(e.target.value)}
        type="number"
        label="Mobile no"
        component={renderFormGroupField}
        placeholder="Mobile no without country code"
        icon={IconPhone}
        validate={[required, maxLengthMobileNo, minLengthMobileNo, digit]}
        required={true}
        max="999999999999999"
        min="9999"
        className="mb-3"
      />
      <Field
        name="password"
        type="password"
        onChange={(e)=>setPassword(e.target.value)}
        label="Your password"
        component={renderFormGroupField}
        placeholder="******"
        icon={IconShieldLock}
        validate={[required, maxLength20, minLength8]}
        required={true}
        maxLength="20"
        minLength="8"
        className="mb-3"
      />
      <div className="d-grid">
        <button
        onClick={handleLogin}
          type="submit"
          className="btn btn-primary mb-3"
          disabled={submitting}
        >
          Log In
        </button>
      </div>
      {errorMessage && (
                    <div style={{color:'red',textAlign:"center"}}>
                      {errorMessage}
                    </div>
                  )}
      <Link className="float-start" to="/account/signup" title="Sign Up">
        Create your account
      </Link>
      <Link
        className="float-end"
        to="/account/forgotpassword"
        title="Forgot Password"
      >
        Forgot password?
      </Link>
      <div className="clearfix"></div>
      <hr></hr>
      <div className="row">
        <div className="col- text-center">
          <p className="text-muted small">Or you can join with</p>
        </div>
        <div className="col- text-center">
          <Link to="/" className="btn btn-light text-white bg-twitter me-3">
            <i className="bi bi-twitter-x" />
          </Link>
          <Link to="/" className="btn btn-light text-white me-3 bg-facebook">
            <i className="bi bi-facebook mx-1" />
          </Link>
          <Link to="/" className="btn btn-light text-white me-3 bg-google">
            <i className="bi bi-google mx-1" />
          </Link>
        </div>
      </div>
    </form>
  );
};

export default compose(
  reduxForm({
    form: "signin",
  })
)(SignInForm);
