import React, { Component } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

class EditorConvertToHTML extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  state = {
    editorState: EditorState.createEmpty(),
    textState: "",
  };

  onEditorStateChange = (editorState) => {
    this.setState(
      {
        editorState,
        // textState: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        //   textState: editorState.getCurrentContent(),
      },
      () => {
        this.myRef.current.innerHTML = draftToHtml(
          convertToRaw(this.state.editorState.getCurrentContent())
        );
      }
    );
  };

  render() {
    const { editorState, value } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
        <h4>Preview</h4>
        <div className="demo-editor" ref={this.myRef} />
      </div>
    );
  }
}
export default EditorConvertToHTML;
