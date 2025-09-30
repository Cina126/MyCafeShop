import './PanelEditor.css';

import 'ckeditor5/ckeditor5.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function PanelEditor({ content = 'سلام! این یک متن تستی است.', setContent }) {

    class MyUploadAdapter {
        constructor(loader) {
            this.loader = loader;
        }

        upload() {
            return this.loader.file
                .then(file => new Promise((resolve, reject) => {
                    const formData = new FormData();
                    formData.append("upload", file);

                    fetch("http://localhost:7000/cafeAPI/articles/uploadImageCKEditor", {
                        method: "POST",
                        body: formData
                    })
                        .then(res => res.json())
                        .then(result => {
                            resolve({ default: result.url });
                        })
                        .catch(err => {
                            reject(err);
                        });
                }));
        }
        abort() {
        }
    }

    function MyCustomUploadPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new MyUploadAdapter(loader);
        };
    }

    return (
        <CKEditor
            editor={ClassicEditor}
            data={content}
            onFocus={() => { document.body.style.overflowX = "hidden" }}
            config={{
                language: "fa",
                alignment: {
                    options: ["left", "right", "center", "justify"],
                },
                extraPlugins: [MyCustomUploadPlugin],
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
                setContent(content)
            }}
        />
    )
}
