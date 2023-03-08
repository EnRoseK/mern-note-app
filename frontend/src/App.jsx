import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import AddNoteDialog from "./components/AddEditNoteDialog";
import Note from "./components/Note";
import * as NotesApi from "./network/notes_api";
import styles from "./styles/NotesPage.module.css";
import styleUtils from "./styles/utils.module.css";
import { FaPlus } from "react-icons/fa";

const App = () => {
  const [notes, setNotes] = useState([]);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    };

    loadNotes();
  }, []);

  const deleteNote = async (note) => {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((n) => n._id !== note._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return (
    <Container>
      <Button
        className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
        onClick={() => setShowAddNoteDialog(true)}
      >
        <FaPlus />
        Add new note
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => {
          return (
            <Col key={`note-${note._id}`}>
              <Note
                {...{
                  note,
                  className: styles.note,
                  onDeleteNoteClicked: deleteNote,
                  onNoteClicked: setNoteToEdit,
                }}
              />
            </Col>
          );
        })}
      </Row>
      {showAddNoteDialog && (
        <AddNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNoteDialog(false);
          }}
        />
      )}
      {noteToEdit && (
        <AddNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote) => {
            setNotes(
              notes.map((note) => {
                if (updatedNote._id === note._id) return updatedNote;
                else return note;
              })
            );

            setNoteToEdit(null);
          }}
        />
      )}
    </Container>
  );
};

export default App;
