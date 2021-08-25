import React, { Component, useState, useEffect, useRef } from "react";
import {
  EditorState,
  convertToRaw,
  ContentState,
  SelectionState,
  Modifier,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
// import htmlToDraft from "html-to-draftjs";
import DraftPasteProcessor from "draft-js/lib/DraftPasteProcessor";
import { makeStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";

// class EditorConvertToHTML extends Component {
//   constructor(props) {
//     super(props);
//     this.myRef = React.createRef();
//     let editorState;
//     if (this.props.sign.trim() !== "") {
//       console.log("Something");
//       const processedText = DraftPasteProcessor.processHTML(this.props.sign);
//       const contentState = ContentState.createFromBlockArray(processedText);
//       //move focus to the end.
//       EditorState.editorState = EditorState.createWithContent(contentState);
//       editorState = EditorState.moveFocusToEnd(editorState);
//     } else {
//       console.log("Nothing");
//       editorState = EditorState.createEmpty();
//     }

//     this.state = {
//       editorState: editorState,
//       textState: "",
//       lastSign: this.props.sign,
//     };
//   }
//   componentWillReceiveProps(nextProps) {
//     // let editorState;
//     // if (nextProps.sign.trim() !== "") {
//     //   console.log("Something");
//     //   const processedText = DraftPasteProcessor.processHTML(nextProps.sign);
//     //   const contentState = ContentState.createFromBlockArray(processedText);
//     //   //move focus to the end.
//     //   editorState = EditorState.createWithContent(contentState);
//     //   editorState = EditorState.moveFocusToEnd(editorState);
//     // } else {
//     //   console.log("Nothing");
//     //   editorState = EditorState.createEmpty();
//     // }

//     // this.setState({
//     //   editorState: this.state.editorState + editorState,
//     // });

//     // get current editor state
//     if (
//       nextProps.sign.trim() !== "" &&
//       nextProps.sign !== this.state.lastSign
//     ) {
//       const currentContent = this.state.editorState.getCurrentContent();

//       // create new selection state where focus is at the end
//       const blockMap = currentContent.getBlockMap();
//       const key = blockMap.last().getKey();
//       const length = blockMap.last().getLength();
//       const selection = new SelectionState({
//         anchorKey: key,
//         anchorOffset: length,
//         focusKey: key,
//         focusOffset: length,
//       });

//       //insert text at the selection created above
//       const textWithInsert = Modifier.insertText(
//         currentContent,
//         selection,
//         nextProps.sign,
//         null
//       );
//       const editorWithInsert = EditorState.push(
//         this.state.editorState,
//         textWithInsert,
//         "insert-characters"
//       );

//       //also focuses cursor at the end of the editor
//       const newEditorState = EditorState.moveSelectionToEnd(
//         editorWithInsert,
//         textWithInsert.getSelectionAfter()
//       );
//       // setEditorState(newEditorState);
//       this.setState({
//         editorState: newEditorState,
//       });
//     }
//   }

//   onEditorStateChange = (editorState) => {
//     this.setState(
//       {
//         editorState,
//         // textState: draftToHtml(convertToRaw(editorState.getCurrentContent())),
//         //   textState: editorState.getCurrentContent(),
//       },
//       () => {
//         this.myRef.current.innerHTML = draftToHtml(
//           convertToRaw(editorState.getCurrentContent())
//         );
//       }
//     );
//   };

//   render() {
//     const { editorState } = this.state;
//     return (
//       <div>
//         <Editor
//           editorState={editorState}
//           wrapperClassName="demo-wrapper"
//           editorClassName="demo-editor"
//           onEditorStateChange={this.onEditorStateChange}
//         />

//         <h4>Preview</h4>
//         <div className="demo-editor" ref={this.myRef} />
//       </div>
//     );
//   }
// }
// export default EditorConvertToHTML;

const useStyles = makeStyles((theme) => ({
  saveButton: {
    position: "absolute",
    top: "-100px",
    right: 0,
  },
}));

const MySlate = ({ data, sign, sendAs, setSign }) => {
  console.log("MY SLATE rendered");
  const classes = useStyles();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [textState, setTextState] = useState("");
  const myRef = useRef("");

  const previewTemplate = (temp) => {
    // console.log("Hello");
    let template = temp.replace(/{([^{}]+)}/g, function (keyExpr, key) {
      const arr = key.split("-");
      if (data.hasOwnProperty(arr[0]) && data[arr[0]].hasOwnProperty(arr[1])) {
        return data[arr[0]][arr[1]];
      } else if (!data.hasOwnProperty(arr[0])) {
        return "";
      } else if (arr[0] === "emails") {
        // if(arr[1] === "primary"){
        //   return data["primaryEmail"]
        // }
        return data["primaryEmail"];
      } else if (arr[0] === "phones") {
        const found = data["phones"].find((phone) => phone.type === "home");
        return found["value"];
      } else {
        return "";
      }
    });
    console.log(template);
    return template;
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    // if (myRef.current) {
    // myRef.current.innerHTML = draftToHtml(
    //   convertToRaw(editorState.getCurrentContent())
    // );
    // previewTemplate(myRef.current.innerHTML);
    myRef.current.innerHTML = previewTemplate(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
    console.log("TEXT -> ", myRef.current.innerText);
    // }
  };

  useEffect(() => {
    const currentContent = editorState.getCurrentContent();

    // create new selection state where focus is at the end
    const blockMap = currentContent.getBlockMap();
    const key = blockMap.last().getKey();
    const length = blockMap.last().getLength();
    const selection = new SelectionState({
      anchorKey: key,
      anchorOffset: length,
      focusKey: key,
      focusOffset: length,
    });

    //insert text at the selection created above
    const textWithInsert = Modifier.insertText(
      currentContent,
      selection,
      sign,
      null
    );
    const editorWithInsert = EditorState.push(editorState, textWithInsert, " ");

    //also focuses cursor at the end of the editor
    const newEditorState = EditorState.moveSelectionToEnd(
      editorWithInsert,
      textWithInsert.getSelectionAfter()
    );
    setEditorState(newEditorState);
    // if (myRef.current) {
    myRef.current.innerHTML = previewTemplate(
      draftToHtml(convertToRaw(newEditorState.getCurrentContent()))
    );
    // }
  }, [data, sign, sendAs]);

  const handleSave = () => {
    console.log(myRef.current.innerHTML);

    const obj = {
      sendAs: sendAs,
      signature: myRef.current.innerHTML,
    };

    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ obj: obj }),
    };

    fetch("http://localhost:9000/api/create/signature", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setEditorState(EditorState.createEmpty());
        myRef.current.innerHTML = "";
        setSign("");
      });
  };

  return (
    <div>
      {myRef.current.innerText && (
        <IconButton
          edge="start"
          color="secondary"
          aria-label="save"
          onClick={handleSave}
          className={classes.saveButton}
        >
          <SaveIcon />
        </IconButton>
      )}
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={onEditorStateChange}
      />

      <h4>Preview</h4>
      <div className="demo-editor" style={{ overflow: "scroll" }} ref={myRef} />
    </div>
  );
};

export default MySlate;
