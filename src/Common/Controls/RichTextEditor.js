import { CKEditor } from "ckeditor4-react";
import React from "react";

function RichTextEditor(props) {
  const handleEditorChange = (event) => {
    props.onChange(event.editor.getData());
  };
  return (
    <div className="richtexteditor">
      {props.disabled === true ? (
        <CKEditor
          config={{
            enterMode: 3,
            language: "vi",
            resize_minWidth: "100%",
            resize_maxHeight: 600,
            //filebrowserBrowseUrl: '/browser/browse.php',
            //filebrowserUploadUrl: '/uploader/upload.php',
            forcePasteAsPlainText: false,
            pasteFromWordRemoveStyles: false,
            pasteFromWordRemoveFontStyles: false,
            allowedContent: true,
            pasteFromWordNumberedHeadingToList: false,
            pasteFromWordPromptCleanup: false,
            pasteFilter: null,
            extraPlugins: ["justify", "colorbutton", "font"],
            colorButton_enableMore: true,
          }}
          initData={props.data || ""}
          readOnly={props.readOnly}
          onChange={handleEditorChange}
        />
      ) : (
        <CKEditor
          config={{
            enterMode: 3,
            language: "vi",
            resize_minWidth: "100%",
            resize_maxHeight: 600,
            //filebrowserBrowseUrl: '/browser/browse.php',
            //filebrowserUploadUrl: '/uploader/upload.php',
            forcePasteAsPlainText: false,
            pasteFromWordRemoveStyles: false,
            pasteFromWordRemoveFontStyles: false,
            allowedContent: true,
            pasteFromWordNumberedHeadingToList: false,
            pasteFromWordPromptCleanup: false,
            pasteFilter: null,
            extraPlugins: ["justify", "colorbutton", "font", "colordialog"],
          }}
          initData={props.data || ""}
          onChange={handleEditorChange}
        />
      )}
    </div>
  );
}

export default React.memo(RichTextEditor);
