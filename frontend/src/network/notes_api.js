const fetchData = async (input, init) => {
  const response = await fetch(input, init);
  if (response.ok) return response;
  else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
};

export const fetchNotes = async () => {
  const response = await fetchData("/api/notes");
  return response.json();
};

export const createNote = async (note) => {
  const response = await fetchData("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

  return response.json();
};

export const updateNote = async (id, note) => {
  const response = await fetchData(`/api/notes/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

  return response.json();
};

export const deleteNote = async (id) => {
  await fetchData(`/api/notes/${id}`, {
    method: "DELETE",
  });
};
