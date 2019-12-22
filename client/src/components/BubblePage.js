import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../Auth/axiosAuth";
import ColorTable from "../components/ColorTable";
import AddColorForm from "../components/AddColorForm";
import EditColorForm from "../components/EditColorForm";
import Bubbles from "./Bubbles";

const BubblePage = () => {
  const initialColor = { id: "", color: "", code: { hex: "" } };
  const [colorList, setColorList] = useState([]);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  useEffect(() => {
    axiosWithAuth()
      .get("http://localhost:5000/api/colors/")
      .then(response => {
        //  console.log(response)
        setColorList(response.data);
      })
      .catch(error => {
        console.log("The data was not returned", error);
      });
  }, []);

  const addColor = color => {
    color.id = colorList.length + 1;
    axiosWithAuth()
      .post(`http://localhost:5000/api/colors/`, color)
      .then(res => setColorList([...colorList, color]))
      .catch(res => console.log(res.err));

    setColorList([...colorList, color]);
  };

  // const deleteColor = id => {

  // }
  const deleteColor = (color, id, updateColors) => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(
        res => console.log(res),
        setColorList(colorList.filter(color => color.id !== color.id))
      )
      .catch(res => console.log(res.err));
  };

  const editColor = color => {
    setEditing(true);
    setColorToEdit({ id: color.id, color: "", code: { hex: "" } });
  };

  // SAME AS saveEdit
  const updateColor = e => {
    // e.preventDefault();
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(response => {
        console.log(response);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h1>Bubble Page</h1>
      <div className="flex-row"></div>
      <div>
        {editing ? (
          <div>
            <h2>EDIT COLOR</h2>
            <EditColorForm
              editing={editing}
              setEditing={setEditing}
              colorToEdit={colorToEdit}
              updateColor={updateColor}
              setColorToEdit={setColorToEdit}
            />
          </div>
        ) : (
          <div>
            <h2>ADD COLOR</h2>
            <AddColorForm addColor={addColor} />
          </div>
        )}
        <ColorTable
          colorList={colorList}
          editColor={editColor}
          colorToEdit={colorToEdit}
          deleteColor={deleteColor}
        />
        <Bubbles colors={colorList} />
      </div>
    </div>
  );
};

export default BubblePage;
