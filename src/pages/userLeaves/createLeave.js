import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  ButtonGroup,
  Dropdown,
} from "@themesberg/react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "react-phone-input-2/lib/style.css";

import PhoneInput from "react-phone-input-2";
import jwt_decode from "jwt-decode";
export default function AddLeave() {
  const history = useHistory();
  const token = JSON.parse(localStorage.getItem("token"));
  let decoded = null;
  if (token !== null) decoded = jwt_decode(token);

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    user: "",
    reason: "",
    type: 1,
    file: "avatar.png",
  });

  async function Submit(e) {
    e.preventDefault();
    const mydata = new FormData();
    mydata.append("from", formData.from);
    mydata.append("to", formData.to);
    mydata.append("reason", formData.reason);
    mydata.append("user", decoded._id);
    mydata.append("file", formData.file);
    mydata.append("type", formData.type);
 

    /*     mydata.append("latitude", position.lat);
    mydata.append("logitude", position.lng); */

    Swal.fire({
      title: "Are you sure you want to add this request?",

      showCancelButton: true,
      confirmButtonText: "Yes, add it!",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        return await axios
          .post("http://localhost:3000/users/addleave", mydata)
          .then((result) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Leave added successfully",
              showConfirmButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                history.push("/leaves");
              }
            });
          })
          .catch((error) => {
            Swal.showValidationMessage(error);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }
  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <div className="btn-toolbar mb-2 mb-md-2">
          <ButtonGroup>
            <Dropdown.Toggle
              onClick={(e) => history.goBack()}
              as={Button}
              variant="primary"
              size="sm"
              className="me-2"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
              Retour
            </Dropdown.Toggle>
          </ButtonGroup>
        </div>
        <Form onSubmit={(e) => Submit(e)}>
          <h5 className="my-4">Leave information </h5>
          <Row>
            <Col sm={6} className="mb-3">
              <Form.Group id="name">
                <Form.Label>From</Form.Label>
                <Form.Control
                    required
                    type="datetime-local"
                    placeholder="From"
                    value={formData.from}
                    onChange={(e) =>
                        setFormData({ ...formData, from: e.target.value })
                    }
                />
              </Form.Group>
            </Col>

            <Col sm={6} className="mb-3">
              <Form.Group id="name">
                <Form.Label>To</Form.Label>
                <Form.Control
                    required
                    type="datetime-local"
                    placeholder="To"
                    value={formData.to}
                    onChange={(e) =>
                        setFormData({ ...formData, to: e.target.value })
                    }
                />

              </Form.Group>
            </Col>

           

            <Col sm={6} className="mb-3">
              <Form.Group id="type">
                <Form.Label>Type of leave</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(val) =>
                    setFormData({ ...formData, type: val.target.value })
                  }
                  defaultValue="1"
                >
                  <option val="1">Medical</option>
                  <option val="2">Personal</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <h5 className="mb-4">Adminstrative information</h5>

          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="reason">
                <Form.Label>reason</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="4"
                  onChange={(e) =>
                    setFormData({ ...formData, reason: e.target.value })
                  }
                />
              </Form.Group>
            </Col>

    
            {/* <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>{t('phone')}</Form.Label>
                <PhoneInput
                  country={"ca"}
                  onlyCountries={["us", "ca"]}
                  value={value}
                  onChange={(e) => setFormData({ ...formData, phone: e })}
                />
              </Form.Group>
            </Col> */}

            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Additional file</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, file: e.target.files[0] })
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="mt-3">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
