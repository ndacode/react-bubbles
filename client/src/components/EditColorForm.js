import React, { useState } from "react";

const EditColorForm = ({
  setColorToEdit,
  updateColor,
  setEditing,
  colorToEdit
}) => {
  const [color, setColor] = useState(colorToEdit);

  const handleInputChange = event => {
    const { name, hex, value } = event.target;
    setColor({ ...color, [name]: value, [hex]: value });
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        updateColor(colorToEdit);
      }}
    >
      <legend>EDIT COLOR</legend>

      <label>
        COLOR NAME:
        <input
          onChange={e =>
            setColorToEdit({ ...colorToEdit, color: e.target.value })
          }
          value={colorToEdit.color}
        />
      </label>

      <label>
        HEX CODE:
        <input
          onChange={e =>
            setColorToEdit({
              ...colorToEdit,
              code: { hex: e.target.value }
            })
          }
          value={colorToEdit.code.hex}
        />
        <button>Update Color</button>
      </label>
      <button onClick={() => setEditing(false)} className="button muted-button">
        Cancel
      </button>
    </form>
  );
};

export default EditColorForm;
