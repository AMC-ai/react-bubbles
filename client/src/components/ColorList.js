import React, { useState } from "react";
import api from "../utils/api";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [addColor, setAddColor] = useState(initialColor);

  const updateColorHexCode = (e) => {
    setAddColor({
      ...addColor,
      code: { hex: e.target.value }
    });
  }

  const updateColorName = (e) => {
    setAddColor({
      ...addColor,
      color: e.target.value
    });
  }

  const handleSubmit = (e) => {
    console.log(e);
    console.log(addColor)
    e.preventDefault();
    api()
      .post('/api/colors', addColor)
      .then(() => {
        api()
          .get('/api/colors')
          .then(res => updateColors(res.data))
          .catch(err => console.log(err))
      })

  }

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    api()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(() => {
        api().get('/api/colors')
          .then(res =>
            updateColors(res.data))
          .catch(err => console.log(err))
        setEditing(false);
      })
      .catch(err => {
        // console.log(err)
      })
  };


  const deleteColor = (color) => {
    api()
      .delete(`/api/colors/${color.id}`)
      .then(() => {
        api()
          .get('/api/colors')
          .then(res =>
            updateColors(res.data))
          .catch(err => console.log(err))
        setEditing(false);
      })
      .catch(err => {
        // console.log(err)
      })
  };


  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                e.stopPropagation();
                deleteColor(color)
              }
              }>
                x
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
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <h3>Add Colors Here!</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="color"
          value={addColor.color}
          onChange={updateColorName}

          placeholder="New Color Name"
        />

        <input
          type="text"
          name="code"
          value={addColor.code.hex}
          onChange={updateColorHexCode}
          placeholder="Color Hex Code"

        />
        <button type='submit'>Add Color</button>
      </form>
    </div>
  );
};

export default ColorList;
