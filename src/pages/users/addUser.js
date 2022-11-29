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

export const AddUser = () => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    name: "",
    lastn: "",
    Datebirth: new Date(),
    email: "",
    gender: "M",
    phone: "",
    role: "Employee",
    job: "",
    departement: "R&D",
    image: "avatar.png",
  });

  async function Submit(e) {
    e.preventDefault();
    const mydata = new FormData();
    mydata.append("name", formData.name);
    mydata.append("lastn", formData.lastn);
    mydata.append("Datebirth", formData.Datebirth);
    mydata.append("email", formData.email);
    mydata.append("gender", formData.gender);
    mydata.append("image", formData.image);
    mydata.append("phone", formData.phone);
    mydata.append("role", formData.role);
    mydata.append("departement", formData.departement);
    mydata.append("job", formData.job);

    /*     mydata.append("latitude", position.lat);
    mydata.append("logitude", position.lng); */

    Swal.fire({
      title: "Are you sure you want to add this user?",

      showCancelButton: true,
      confirmButtonText: "Yes, add it!",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        return await axios
          .post("http://localhost:3000/users/adduser", mydata)
          .then((result) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "User added successfully",
              showConfirmButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                history.push("/users");
              }
            });
          })
          .catch((error) => {
            Swal.showValidationMessage("email address already exists");
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
          <h5 className="my-4">User personal information </h5>
          <Row>
            <Col sm={6} className="mb-3">
              <Form.Group id="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </Form.Group>
            </Col>

            <Col sm={6} className="mb-3">
              <Form.Group id="name">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, lastn: e.target.value })
                  }
                />
              </Form.Group>
            </Col>

            <Col sm={6} className="mb-3">
              <Form.Group id="date">
                <Form.Label>Birthdate</Form.Label>
                <Form.Control
                  required
                  type="date"
                  onChange={(e) =>
                    setFormData({ ...formData, Datebirth: e.target.value })
                  }
                />
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>phone</Form.Label>
                <PhoneInput
                  country={"tn"}
                  onlyCountries={["tn", "fr", "us"]}
                  value={""}
                  onChange={(e) => setFormData({ ...formData, phone: e })}
                />
              </Form.Group>
            </Col>

            <Col sm={6} className="mb-3">
              <Form.Group id="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(val) =>
                    setFormData({ ...formData, gender: val.target.value })
                  }
                  defaultValue="male"
                >
                  <option val="male">Man</option>
                  <option val="female">Women</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <h5 className="mb-4">Adminstrative information</h5>

            <Col md={6} className="mb-3">
              <Form.Group id="role">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(val) =>
                    setFormData({ ...formData, role: val.target.value })
                  }
                  defaultValue="Employee"
                >
                  <option val="Employee">Employee</option>
                  <option val="superAdmin">superAdmin</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="Departement">
                <Form.Label>Departement</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(val) =>
                    setFormData({ ...formData, departement: val.target.value })
                  }
                  defaultValue="R&D"
                >
                  <option val="R&D">R&D</option>
                  <option val="Cloud">Cloud</option>
                  <option val="Support">Support</option>
                  <option val="HR">Human Resources</option>
                  <option val="Marketing">Marketing</option>
                  <option val="Sales">Sales</option>
                  <option val="Finance">Finance</option>
                  <option val="Security">Security</option>
                  <option val="Legal">Legal</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="Job">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  required
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, job: e.target.value })
                  }
                />
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
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
                <Form.Label>image</Form.Label>
                <Form.Control
                  required
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.files[0] })
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
};
