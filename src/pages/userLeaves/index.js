import React, { useEffect } from "react";
import {
  faAngleDown,
  faAngleUp,
  faArrowDown,
  faArrowUp,
  faCheck,
  faEdit,
  faEllipsisH,
  faExternalLinkAlt,
  faEye,
  faPlus,
  faSearch,
  faTrash,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Nav,
  Card,
  Modal,
  Button,
  Table,
  Dropdown,
  Pagination,
  ButtonGroup,
  Breadcrumb,
  InputGroup,
  Form,
} from "@themesberg/react-bootstrap";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import moment from "moment-timezone";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
export const Leaves = () => {
  const [leaves, setLeaves] = React.useState([]);
  const history = useHistory();

  const token = JSON.parse(localStorage.getItem("token"));
  let decoded = null;
  if (token !== null) decoded = jwt_decode(token);
  const role = decoded?.role;

  const fetchData = async () => {
    try {
      const { data: response } = await axios.get(
        "http://localhost:3000/users/getleaves/" + decoded._id
      );
      setLeaves(response);
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchAdminData = async () => {
    try {
      const { data: response } = await axios.get(
        "http://localhost:3000/users/getallleaves"
      );
      setLeaves(response);
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    if (role === "superAdmin") {
      fetchAdminData();
    } else {
      fetchData();
    }
  }, []);

  const [show, setShow] = React.useState(false);
  function handleClose() {
    setShow(false);
  }
  const [image, setImage] = React.useState("");
  function showModal(url) {
    setShow(true);
    setImage(url);
  }

  function changeStatus(id, status) {
    Swal.fire({
      title: "Are you sure?",
      text: "You will chnage the status of this leave!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put("http://localhost:3000/users/approveleave/" + id, {
            status: status,
          })
          .then((res) => {
            if (res.status === 200) {
              Swal.fire("Changed!", "Status has been changed.", "success");
              if (role === "superAdmin") {
                fetchAdminData();
              } else {
                fetchData();
              }
            }
          });
      }
    });
  }

  return (
    <>
      <Modal as={Modal.Dialog} centered show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="h6">Image</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <img
            src={"http://localhost:3000/uploads/" + image}
            style={{ width: "100%" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{
              className: "breadcrumb-dark breadcrumb-transparent",
            }}
          ></Breadcrumb>
          <h4>Leaves</h4>
        </div>
        {role !== "superAdmin" && (
          <div className="btn-toolbar mb-2 mb-md-0">
            <ButtonGroup>
              <Dropdown.Toggle
                onClick={(e) => history.push("/newleave")}
                as={Button}
                variant="primary"
                size="sm"
                className="me-2"
              >
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                Request Leave
              </Dropdown.Toggle>
            </ButtonGroup>
          </div>
        )}
      </div>
      <div className="d-block mb-4 mb-md-2">
        <Col xs={8} md={6} lg={3} xl={4}>
          <InputGroup>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
            <Form.Control type="text" placeholder="search" />
          </InputGroup>
        </Col>
      </div>
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
                <th className="border-bottom">#</th>
                <th className="border-bottom">User</th>
                <th className="border-bottom">from</th>
                <th className="border-bottom">to</th>
                <th className="border-bottom">Duration</th>
                <th className="border-bottom">Status</th>
                <th className="border-bottom">Cause</th>
                <th className="border-bottom">Media</th>
                {role === "superAdmin" && (
                  <th className="border-bottom">Action</th>
                )}
              </tr>
            </thead>
            <tbody>
              {leaves?.map((leave, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>
                    {leave?.user?.name} {leave?.user?.lastn}
                  </td>
                  <td>{moment(leave?.from).format("DD/MM/YYYY HH:mm")}</td>
                  <td>{moment(leave?.to).format("DD/MM/YYYY HH:mm")}</td>
                  <td>
                    {Math.round(
                      (new Date(leave?.to) - new Date(leave?.from)) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    Days
                  </td>
                  <td>
                    {leave?.status === "pending" ? (
                      <Button disabled variant="warning">
                        pending
                      </Button>
                    ) : leave?.status === "accepted" ? (
                      <Button disabled variant="success">
                        accepted
                      </Button>
                    ) : (
                      <Button disabled variant="danger">
                        declined
                      </Button>
                    )}
                  </td>
                  <td>{leave?.reason}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={(e) => showModal(leave?.file)}
                    >
                      <FontAwesomeIcon icon={faEye} className="me-2" />
                      View
                    </Button>
                  </td>

                  {role === "superAdmin" && leave.status === "pending" && (
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle
                          as={Button}
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                        >
                          <FontAwesomeIcon icon={faEllipsisH} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={(e) =>
                              changeStatus(leave?._id, "accepted")
                            }
                          >
                            <FontAwesomeIcon icon={faCheck} className="me-2" />
                            Accept
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={(e) =>
                              changeStatus(leave?._id, "declined")
                            }
                          >
                            <FontAwesomeIcon icon={faTrash} className="me-2" />
                            Decline
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
          <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
            <Nav>
              <Pagination className="mb-2 mb-lg-0">
                <Pagination.Prev>Previous</Pagination.Prev>
                <Pagination.Item active>1</Pagination.Item>
                <Pagination.Item>2</Pagination.Item>
                <Pagination.Item>3</Pagination.Item>
                <Pagination.Item>4</Pagination.Item>
                <Pagination.Item>5</Pagination.Item>
                <Pagination.Next>Next</Pagination.Next>
              </Pagination>
            </Nav>
            <small className="fw-bold">
              Showing <b>{1}</b> out of <b>25</b> entries
            </small>
          </Card.Footer>
        </Card.Body>
      </Card>
    </>
  );
};
