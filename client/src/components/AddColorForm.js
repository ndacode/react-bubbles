import React, { useState } from "react";

const AddColorForm = ({ addColor }) => {
  const initialColor = { id: null, color: "", code: { hex: "" } };

  const [color, setColor] = useState(initialColor);

  const handleInputChange = event => {
    const { name, hex, value } = event.target;

    setColor({ ...color, [name]: value, [hex]: value });
  };

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        if (!color.color || !color.color) return;

        addColor(color);
        setColor(initialColor);
      }}
    >
      <label>COLOR</label>
      <input
        type="text"
        name="color"
        value={color.color}
        onChange={handleInputChange}
      />

      <label>HEX CODE</label>
      <input
        type="text"
        name="hex"
        value={color.hex}
        onChange={handleInputChange}
      />
      <button>ADD NEW COLOR</button>
    </form>
  );
};

export default AddColorForm;
