import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { Link, useNavigate } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import axios from "axios";

import Accordion from "react-bootstrap/Accordion";

import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../Redux/actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () => console.log("totally custom!"));

  return <div onClick={decoratedOnClick}>{children}</div>;
}
const MyNotes = ({ search }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  console.log('userInfo:', userInfo)

  console.log("userInfo:", userInfo.token);

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const { loading, notes, error } = noteList;

  console.log("notes:", notes);

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);

  const { loading: loadingDelete, error: errorDelete, success: successDelete } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are You Sure ?")) {
      dispatch(deleteNoteAction(id)); 
    }
  };

  // const fetchNotes = async () => {
  //   const { data } = await axios.get("/api/notes");

  //   // > CORS ---> Cross Origin Resource Sharing -->packg json   "proxy":"http:/127.0.0.1:8080/",
  //   setNotes(data);
  // };

  useEffect(() => {
    // fetchNotes();

    if (!userInfo.user) {
      navigate("/");
    }
    dispatch(listNotes());

  }, [dispatch, successCreate, successUpdate, userInfo, successDelete,navigate]);

  return (
    <MainScreen title={`Welcome Back ${userInfo.user? userInfo.user.name:"User"} notes..`}>
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          {" "}
          Create Note
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading></Loading>}
      {notes &&
        notes
          .reverse()
          .filter((fileterdNote) => fileterdNote.title.toLowerCase().includes(search.toLowerCase()))
          .map((note) => (
            <Accordion key={note._id}>
              <Card style={{ margin: 10 }}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      textAlign: "left",
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                    <CustomToggle eventKey="0">{note.title}</CustomToggle>
                  </span>
                  <div>
                    <Button href={`/note/${note._id}`}>Edit</Button>
                    <Button onClick={() => deleteHandler(note._id)} variant="danger" className="mx-2">
                      Delete
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body style={{ textAlign: "left" }}>
                    <h4>
                      <Badge bg="success">Catagory-{note.catagory}</Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <p>{note.content}</p>
                      <footer className="blockquote-footer">{`Created On : ${note.createdAt.substring(0, 10)}`}</footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          ))}
    </MainScreen>
  );
};

export default MyNotes;
