import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faEnvelope,
  faUnlockAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  FormCheck,
  Container,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";

import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";
// sweat alert
import Swal from "sweetalert2";
import axios from "axios";
import "./style.css"
export default () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("email", email);
    console.log("password", password);
    await axios
      .post(process.env.REACT_APP_BACKEND_URL + "/users/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log("res", res);
        if (res.status === 200) {
          localStorage.setItem("token", JSON.stringify(res.data.token));
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login Success",
            showConfirmButton: false,
            timer: 1500,
          });
          if (res.data.role === "superAdmin") {
            window.location.href = "/users";
          }
          if (res.data.role === "Employee") {
            window.location.href = "/pres";
          }
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Login Failed",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Wrong Email or Password",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  return (
    <main>
      <>

        <section>
          <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
          <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
          <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
          <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
          <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
          <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
          <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
          <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
          <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
          <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
          <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
          <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
          <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
          <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
          <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
          <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
          <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
          <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
          <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
          <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
          <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
          <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
          <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
          <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
          <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
          <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
          <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
          <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
          <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
          <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
          <span /> <span /> <span /> <span />
          <div className="signin">
            <div className="content1">
              <h2>Sign In</h2>
              <form onSubmit={(e) => handleSubmit(e)} className="form">
                <div className="inputBox">
                  <input type="text" required="" onChange={(e) => setEmail(e.target.value)}
                  /> <i>Username</i>
                </div>
                <div className="inputBox">
                  <input type="password" required="" onChange={(e) => setPassword(e.target.value)}
                  /> <i>Password</i>
                </div>

                <div className="inputBox">
                  <input type="submit" defaultValue="Sign in" />
                </div>
              </form>
            </div>
          </div>
        </section>{" "}
        {/* partial */}
      </>

    </main>
  );
};
