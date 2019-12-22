import React from "react";

const ColorTable = ({ editColor, deleteColor, colorList }) => (
  <div className="colors-wrap">
    <p>COLORS</p>
    <ul>
      {colorList.map(color => (
        <li key={color.id} color={color.color} onClick={() => editColor(color)}>
          <span>
            <span
              className="delete"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                deleteColor(color);
              }}
            >
              DELETE
            </span>{" "}
            {color.color}
          </span>
          <div
            className="color-box"
            style={{ backgroundColor: color.code.hex }}
          />
        </li>
      ))}
    </ul>
  </div>
);

export default ColorTable;
