import { useEffect, useRef, useState } from "react";
import { useMutation } from "@apollo/client";

import { PickerButton, PickerModalBox } from "./ColorPickerStyledElements";
import { Row } from "../Grid/GridElements";
import { UPDATE_USER_TODO } from "../../utils/graphql/todoMutations";

const ColorPicker = ({ todo, single }) => {
  const colorPickerRef = useRef(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [todoColor, setTodoColor] = useState(todo.color);
  const handleShowColorPicker = () => setShowColorPicker(!showColorPicker);
  useEffect(() => {
    const pageClickEvent = (e) => {
      if (
        colorPickerRef.current !== null &&
        !colorPickerRef.current.contains(e.target)
      ) {
        setShowColorPicker(!showColorPicker);
      }
    };

    if (showColorPicker) {
      window.addEventListener("click", pageClickEvent);
    }

    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [showColorPicker]);

  const [updateTodoColor] = useMutation(UPDATE_USER_TODO, {
    variables: {
      TodoId: todo.id,
      TodoName: todo.toDoName,
      body: todo.body,
      isComplete: todo.isComplete,
      globality: todo.globality,
      canRemind: todo.canRemind,
      canComment: todo.canComment,
      isPublic: todo.isPublic,
      color: todoColor,
    },
  });

  const handleColorSelect = async (color) => {
    await setTodoColor(color);
    setShowColorPicker(!showColorPicker)
    updateTodoColor();
  };
  return (
    <div>
      <PickerModalBox
        ref={colorPickerRef}
        className={showColorPicker ? single ? "picker-modal-single showPicker" : "showPicker" : ""}
      >
        <Row >
          <PickerButton
            color="green"
            onClick={() => handleColorSelect("green")}
          />
          <PickerButton color="red" onClick={() => handleColorSelect("red")} />
          <PickerButton
            color="orange"
            onClick={() => handleColorSelect("orange")}
          />
        </Row>
        <Row>
          <PickerButton
            color="purple"
            onClick={() => handleColorSelect("purple")}
          />
          <PickerButton
            color="black"
            onClick={() => handleColorSelect("black")}
          />
          <PickerButton
            color="blue"
            onClick={() => handleColorSelect("blue")}
          />
        </Row>
        <Row>
          <PickerButton
            color="yellow"
            onClick={() => handleColorSelect("yellow")}
          />
          <PickerButton
            color="magenta"
            onClick={() => handleColorSelect("magenta")}
          />
          <PickerButton
            color="grey"
            onClick={() => handleColorSelect("grey")}
          />
        </Row>
      </PickerModalBox>
      <PickerButton onClick={handleShowColorPicker} color={todoColor} className={single ? "picker-single" : ""} />
    </div>
  );
};

export default ColorPicker;
