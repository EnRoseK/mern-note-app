import { Card } from "react-bootstrap";
import styles from "../styles/Note.module.css";
import styleUtils from "../styles/utils.module.css";
import { formatDate } from "../utils/formatDate.js";
import { MdDelete } from "react-icons/md";

const Note = ({ note, className, onDeleteNoteClicked, onNoteClicked }) => {
  const { title, text, createdAt, updatedAt } = note;

  let createdUpdatedText;
  if (updatedAt > createdAt) {
    createdUpdatedText = "Updated: " + formatDate(updatedAt);
  } else {
    createdUpdatedText = "Created: " + formatDate(createdAt);
  }

  return (
    <Card
      onClick={() => onNoteClicked(note)}
      className={`${styles.noteCard} ${className}`}
    >
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styleUtils.flexCenter}>
          {title}
          <MdDelete
            onClick={(e) => {
              onDeleteNoteClicked(note);
              e.stopPropagation();
            }}
            className="text-muted ms-auto"
          />
        </Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{createdUpdatedText}</Card.Footer>
    </Card>
  );
};

export default Note;
