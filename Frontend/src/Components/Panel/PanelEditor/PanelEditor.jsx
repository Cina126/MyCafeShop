import './PanelEditor.css';

import 'ckeditor5/ckeditor5.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function PanelEditor() {

    function Base64AdapterPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return {
                upload: () =>
                    loader.file.then(
                        (file) =>
                            new Promise((resolve, reject) => {
                                const reader = new FileReader();
                                reader.onload = () => {
                                    // reader.result یک data:...base64... خواهد بود
                                    resolve({ default: reader.result });
                                };
                                reader.onerror = (err) => reject(err);
                                reader.readAsDataURL(file);
                            })
                    ),
                abort: () => {
                    /* no-op */
                },
            };
        };
    };

    return (
        <CKEditor
            editor={ClassicEditor}
            data="<p>سلام! این یک متن تستی است.</p>"
            config={{
                language: "fa",
                extraPlugins: [Base64AdapterPlugin],
                alignment: {
                    options: ["left", "right", "center", "justify"],
                },
                toolbar: [
                    "heading",
                    "|",
                    "bold",
                    "italic",
                    "link",
                    "bulletedList",
                    "numberedList",
                    "alignment",
                    "|",
                    "insertTable",
                    "uploadImage",
                    "undo",
                    "redo",
                ],
            }}
            onChange={(event, editor) => {
                const content = editor.getData();
                console.log(content, event, editor);
            }}
        />
    )
}
