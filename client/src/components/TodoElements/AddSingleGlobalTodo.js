import { useMutation } from "@apollo/client";
import { useEffect, useRef, useState } from "react";

import {
  CheckBox,
  CheckBoxLabel,
  CheckBoxWrapper,
  PlusButton,
  TodoGrid,
  SubmitTodoButton,
  TodoBodyInput,
} from ".";
import { CREATE_TODO} from "../../utils/graphql/todoMutations";
import { GET_USER_TODOS } from "../../utils/graphql/todoQueries";
import { useForm } from "../../utils/hooks";
import {
  PickerButton,
  PickerModalBox,
} from "../ColorPicker/ColorPickerStyledElements";
import { Col, Row } from "../Grid/GridElements";

const AddSingleGlobalTodo = ({username}) => {
  const [addTodo, setAddTodo] = useState(false);
  const [todoColor, setTodoColor] = useState("green");
  const [showColorPicker, setShowColorPicker] = useState(false);

  const colorPickerRef = useRef(null);

  const { values, onChange, onSubmit } = useForm(createTodoCallback, {
    body: "",
    canRemind: false,
    canComment: false,
    isPublic: false,
  });

  const handleColorSelect = async (color) => {
    await setTodoColor(color);
    setShowColorPicker(!showColorPicker);
  };
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
  const handleAddGlobalTodo = () => setAddTodo(true);

  const [createGlobalTodo] = useMutation(CREATE_TODO, {
    variables: {
      toDoName: values.body,
      body: "No additional Notes",
      globality: true,
      canRemind: values.canRemind,
      canComment: values.canComment,
      isPublic: values.isPublic,
      color: todoColor,
    },
    update(proxy, result) {
        const data = proxy.readQuery({
            query: GET_USER_TODOS,
            variables: {
                globality: true,
                username: username,
            }
        })
        proxy.writeQuery({
            query: GET_USER_TODOS,
            variables: {
                globality: true,
                username: username,
            },
            data: {
                getSelectedToDosByUsername: [result.data.createToDo, ...data.getSelectedToDosByUsername]
            }
        })
    }
  });

 function createTodoCallback() {
    createGlobalTodo();
    setAddTodo(!addTodo)
  }

  return (
    <li className="addTodo">
      {addTodo ? (
        <TodoGrid as="form" onSubmit={onSubmit}>
          <Col span="1" spanMd="1" spanSm="1">
            <PickerModalBox
              ref={colorPickerRef}
              className={showColorPicker ? "showPicker" : ""}
            >
              <Row>
                <PickerButton
                  type="button"
                  color="green"
                  onClick={() => handleColorSelect("green")}
                />
                <PickerButton
                  type="button"
                  color="red"
                  onClick={() => handleColorSelect("red")}
                />
                <PickerButton
                  type="button"
                  color="orange"
                  onClick={() => handleColorSelect("orange")}
                />
              </Row>
              <Row>
                <PickerButton
                  type="button"
                  color="purple"
                  onClick={() => handleColorSelect("purple")}
                />
                <PickerButton
                  type="button"
                  color="black"
                  onClick={() => handleColorSelect("black")}
                />
                <PickerButton
                  type="button"
                  color="blue"
                  onClick={() => handleColorSelect("blue")}
                />
              </Row>
              <Row>
                <PickerButton
                  type="button"
                  color="yellow"
                  onClick={() => handleColorSelect("yellow")}
                />
                <PickerButton
                  type="button"
                  color="magenta"
                  onClick={() => handleColorSelect("magenta")}
                />
                <PickerButton
                  type="button"
                  color="grey"
                  onClick={() => handleColorSelect("grey")}
                />
              </Row>
            </PickerModalBox>
            <PickerButton
              type="button"
              color={todoColor}
              onClick={handleShowColorPicker}
            />
          </Col>
          <Col span="11" spanMd="11" spanSm="11">
            <TodoBodyInput
              placeholder="What do you need todo?"
              name="body"
              onChange={onChange}
              value={values.body}
            />
          </Col>

          <Col span="4" spanMd="4" spanSm="4">
            <p style={{ float: "left" }}>Remind?</p>
          </Col>
          <Col span="4" spanMd="4" spanSm="4">
            <p style={{ float: "right" }}>Comment?</p>
          </Col>
          <Col span="4" spanMd="4" spanSm="4">
            <p style={{ float: "right" }}>Public?</p>
          </Col>
          <Col span="4" spanMd="4" spanSm="4">
            <CheckBoxWrapper>
              <CheckBox
                id="canRemind"
                type="checkbox"
                name="canRemind"
                checked={values.canRemind}
                onChange={onChange}
              />
              <CheckBoxLabel htmlFor="canRemind" />
            </CheckBoxWrapper>
          </Col>
          <Col span="4" spanMd="4" spanSm="4">
            <CheckBoxWrapper float="right">
              <CheckBox
                id="canComment"
                type="checkbox"
                name="canComment"
                checked={values.canComment}
                onChange={onChange}
              />
              <CheckBoxLabel htmlFor="canComment" />
            </CheckBoxWrapper>
          </Col>
          <Col span="4" spanMd="4" spanSm="4">
            <CheckBoxWrapper float="right">
              <CheckBox
                id="isPublic"
                type="checkbox"
                name="isPublic"
                checked={values.isPublic}
                onChange={onChange}
              />
              <CheckBoxLabel htmlFor="isPublic" />
            </CheckBoxWrapper>
          </Col>
          <Row>
            <SubmitTodoButton type="submit" disabled={!values.body.trim()}>
              Add Todo!
            </SubmitTodoButton>
          </Row>
        </TodoGrid>
      ) : (
        <TodoGrid>
          <Col span="1" spanMd="1" spanSm="1">
            <PlusButton onClick={handleAddGlobalTodo} />
          </Col>
          <Col>
            <p style={{margin: "0"}}>Add a global Todo!</p>
          </Col>
        </TodoGrid>
      )}
    </li>
  );
};

export default AddSingleGlobalTodo;
