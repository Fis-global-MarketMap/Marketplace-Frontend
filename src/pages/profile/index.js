import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faCartArrowDown,
  faChartPie,
  faChevronDown,
  faClipboard,
  faCommentDots,
  faFileAlt,
  faPlus,
  faRocket,
  faStore,
  faUserPlus,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Button,
  Dropdown,
  Form,
  Card,
  ButtonGroup,
  Modal,
} from "@themesberg/react-bootstrap";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import skills from "./skills.json";

import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import BusinessCenter from "@material-ui/icons/BusinessCenter";

import RepeatIcon from "@material-ui/icons/Repeat";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

// import linkedin icon
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Swal from "sweetalert2";
// import github icon
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import ProfileCover from "../../assets/img/profile-cover.jpg";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useParams } from "react-router-dom";
export default function Profile() {
  const [birthday, setBirthday] = React.useState("");
  const [profile, setProfile] = React.useState({});

  const token = JSON.parse(localStorage.getItem("token"));
  let decoded = null;
  if (token !== null) decoded = jwt_decode(token);

  // id from params
  let { id } = useParams();
  console.log(id);
  if (id === undefined) {
    id = decoded?._id;
  }
  const useStyles = makeStyles((theme) => ({
    root: {
      width: 500,
      "& > * + *": {
        marginTop: theme.spacing(3),
      },
    },
    paper: {
      padding: "6px 16px",
    },
    secondaryTail: {
      backgroundColor: theme.palette.secondary.main,
    },
  }));
  const classes = useStyles();
  const [selectedSkills, setSelectedSkills] = React.useState([]);

  function getProfile() {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/users/getprofile/" + id)
      .then((response) => {
        console.log(response);
        setProfile(response?.data);
        let sameSkills = skills?.filter((skill) =>
          response?.data?.skills?.map((s) => s?.name).includes(skill?.name)
        );
        setSelectedSkills([...sameSkills]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  React.useEffect(() => {
    getProfile();
  }, []);

  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);

  const [formData, setFormData] = React.useState({
    github: "",
    linkedin: "",
    skills: [],
  });

  const [timeLine, setTimeLine] = React.useState({
    title: "",
    description: "",
    from: "",
    to: "",
  });

  async function submitData(e) {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to update your profile?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (formData.github === "") {
          formData.github = profile.github;
        }
        if (formData.linkedin === "") {
          formData.linkedin = profile.linkedin;
        }
        if (formData.skills.length === 0) {
          formData.skills = profile.skills;
        }
        axios
          .put(process.env.REACT_APP_BACKEND_URL + "/users/updateprofile/" + id, formData)
          .then((response) => {
            console.log(response);
            Swal.fire("Updated!", "Your profile has been updated.", "success");
            getProfile();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }

  async function submitTimeLine(e) {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to add this experience?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(process.env.REACT_APP_BACKEND_URL + "/users/addexperience/" + id, timeLine)
          .then((response) => {
            console.log(response);
            Swal.fire("Added!", "Your experience has been added.", "success");
            handleClose();
            getProfile();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }

  return (
    <>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add Experience</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(e) => submitTimeLine(e)}>
          <Modal.Body>
            <Form.Group id="companyName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Company Name"
                required
                onChange={(e) =>
                  setTimeLine({ ...timeLine, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group id="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="4"
                onChange={(e) =>
                  setTimeLine({ ...timeLine, description: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group id="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter Start Date"
                required
                onChange={(e) =>
                  setTimeLine({ ...timeLine, from: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group id="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter End Date"
                required
                onChange={(e) =>
                  setTimeLine({ ...timeLine, to: e.target.value })
                }
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
      

        <div className="d-flex">
         
        </div>
      </div>

      <Row>
        <Col xs={12} xl={8}>
          <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
              <h5 className="mb-4">General information</h5>
              <Form onSubmit={(e) => submitData(e)}>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group id="firstName">
                      <Form.Label>Github</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Github url"
                        defaultValue={profile?.github}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            github: e.target.value,
                          });
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group id="lastName">
                      <Form.Label>LinkedIn</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Also your linkedIn url"
                        defaultValue={profile?.linkedin}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            linkedin: e.target.value,
                          });
                        }}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Autocomplete
                      multiple
                      id="tags-standard"
                      options={skills}
                      getOptionLabel={(option) => option.label}
                      defaultValue={selectedSkills}
                      // display old skills

                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label="Skills"
                          placeholder="Skill"
                        />
                      )}
                      onChange={(e, val) => {
                        // push into skills array
                        setFormData({
                          ...formData,
                          skills: val,
                        });
                      }}
                    />
                  </Col>
                </Row>

                <div className="mt-3">
                  <Button variant="primary" type="submit">
                    Save All
                  </Button>
                </div>
              </Form>

              <div className="mt-6">
                <div className="flex row">
                  <h5 className="mb-4">Experience Timeline</h5>
                  <div className="btn-toolbar mb-2 mb-md-0">
                    <ButtonGroup>
                      <Dropdown.Toggle
                        onClick={(e) => setShow(true)}
                        as={Button}
                        variant="primary"
                        size="sm"
                        className="me-2"
                      >
                        <FontAwesomeIcon icon={faPlus} className="me-2" />
                        Add
                      </Dropdown.Toggle>
                    </ButtonGroup>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <Timeline align="alternate">
                    {profile?.timeline?.map((exp) => (
                      <TimelineItem>
                        <TimelineOppositeContent>
                          <Typography variant="body2" color="textSecondary">
                            {moment(exp?.from).format("DD/MM/YYYY")} to{" "}
                            {moment(exp?.to).format("DD/MM/YYYY")}
                          </Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                          <TimelineDot style={{ backgroundColor: "orange" }}>
                            <BusinessCenter />
                          </TimelineDot>
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                          <Paper elevation={3} className={classes.paper}>
                            <Typography variant="h6" component="h1">
                              {exp.title}
                            </Typography>
                            <Typography>{exp?.description}</Typography>
                          </Paper>
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                  </Timeline>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} xl={4}>
          <Row>
            <Col xs={12}>
              <Card border="light" className="text-center p-0 mb-4">
                <div
                  style={{ backgroundImage: `url(${ProfileCover})` }}
                  className="profile-cover rounded-top"
                />
                {console.log(profile?.user?.image)}
                <Card.Body className="pb-5">
                  <Card.Img
                    src={
                      process.env.REACT_APP_BACKEND_URL + "/uploads/" + profile?.user?.image
                    }
                    alt={profile?.user?.name}
                    className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4"
                  />
                  <Card.Title>
                    {profile?.user?.name} {profile?.user?.lastn}
                  </Card.Title>
                  <Card.Subtitle className="fw-normal">
                    {profile?.user?.job}
                  </Card.Subtitle>
                  <Card.Text className="text-gray mb-4">
                    {profile?.user?.department}
                  </Card.Text>

                  {profile?.linkedin && (
                    <Button
                      onClick={() => window.open(profile?.linkedin, "_blank")}
                      variant="secondary"
                      size="sm"
                      className="me-2"
                    >
                      <FontAwesomeIcon icon={faLinkedin} className="me-1" />{" "}
                      LinkedIn
                    </Button>
                  )}
                  {profile?.github && (
                    <Button
                      onClick={() => {
                        window.open(profile?.github, "_blank");
                      }}
                      variant="primary"
                      size="sm"
                    >
                      <FontAwesomeIcon icon={faGithub} className="me-1" />{" "}
                      GitHub
                    </Button>
                  )}
                </Card.Body>
              </Card>{" "}
            </Col>
            <Col xs={12}>
              <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                  <h5 className="mb-4">Skills</h5>
                  {profile?.skills?.map((skill, index) => (
                    <Chip
                      label={skill?.name}
                      style={{
                        backgroundColor: "orange",
                        margin: "5px",
                      }}
                    />
                  ))}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
