import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import { Link } from "react-router-dom";
import renderFormGroupField from "../../helpers/renderFormGroupField";
import renderFormField from "../../helpers/renderFormField";
import axios from 'axios';

import {
  required,
  maxLength20,
  minLength8,
  maxLengthMobileNo,
  minLengthMobileNo,
  digit,
  name,
} from "../../helpers/validation";
import { ReactComponent as IconPhone } from "bootstrap-icons/icons/phone.svg";
import { ReactComponent as IconShieldLock } from "bootstrap-icons/icons/shield-lock.svg";
import { ReactComponent as IconEnvelope } from "bootstrap-icons/icons/envelope.svg";
import { useState } from "react";


const SignUpForm = (props) => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [mobile, setMobile] = useState('');
  const [adresse, setAdresse] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [reussitMessage, setReussitMessage] = useState('');


  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8800/api/auth/register', {
        "firstname": nom,
        "lastname": prenom,
        "adresse": adresse,
        "tel": mobile,
        "role": "user",
        "password": password,
        "email": email

      });

      if (response.status === 201 || response.status === 200) {
        // L'inscription a réussi, rediriger ou effectuer d'autres actions
        console.log('Inscription réussie');
        setReussitMessage('Inscription réussie');
      } else {
        // L'inscription a échoué, afficher le message d'erreur
        setErrorMessage('Erreur lors de l\'inscription');
        console.error('Échec de l\'inscription');
      }
    } catch (error) {
      // Afficher le message d'erreur en cas d'erreur lors de la requête
      setErrorMessage('Erreur lors de l\'inscription');
      console.error('Erreur lors de l\'inscription', error);
    }
  };

  const { handleSubmit, submitting, onSubmit, submitFailed } = props;
  return (
    <form
      onSubmit={handleRegister}
      className={`needs-validation ${submitFailed ? "was-validated" : ""}`}
      noValidate
    >
      <div className="row mb-3">
        <div className="col-md-6">
          <Field
            onChange={(e) => setNom(e.target.value)}
            name="firstName"
            type="text"
            label="First Name"
            component={renderFormField}
            placeholder="First Name"
            validate={[required, name]}
            required={true}
          />
        </div>
        <div className="col-md-6">
          <Field
            onChange={(e) => setPrenom(e.target.value)}
            name="lastName"
            type="text"
            label="Last Name"
            component={renderFormField}
            placeholder="Last Name"
            validate={[required, name]}
            required={true}
          />
        </div>
      </div>
      <Field
        onChange={(e) => setEmail(e.target.value)}
        name="email"
        type="email"
        label="Mobile no"
        component={renderFormGroupField}
        placeholder="email error"
        icon={IconEnvelope}
        validate={[required, maxLengthMobileNo, minLengthMobileNo, digit]}
        required={true}

        className="mb-3"
      />
      <Field
        onChange={(e) => setMobile(e.target.value)}
        name="mobileNo"
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
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        type="password"
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
          type="submit"
          className="btn btn-primary mb-3"
          disabled={submitting}
        >
          Create
        </button>
      </div>
      {reussitMessage && (
                    <div style={{ color: 'blue', textAlign: "center" }}>
                      {reussitMessage}
                    </div>
                  )}
      {errorMessage && (
        <div style={{ color: 'red', textAlign: "center" }}>
          {errorMessage}
        </div>
      )}
      <Link className="float-start" to="/account/signin" title="Sign In">
        Sing In
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
    form: "signup",
  })
)(SignUpForm);
