import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
    dropTargetForExternal,
    monitorForExternal,
} from "@atlaskit/pragmatic-drag-and-drop/external/adapter";
import { containsFiles, getFiles } from "@atlaskit/pragmatic-drag-and-drop/external/file";
import { preventUnhandled } from "@atlaskit/pragmatic-drag-and-drop/prevent-unhandled";
import { useEffect, useRef, useState } from "react";

export default function Uploads() {
    const formRef = useRef<HTMLFormElement>(null);
    const dropAreaRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [state, setState] = useState<"idle" | "over" | "potential">("idle");

    useEffect(() => {
        const dropArea = dropAreaRef.current;
        const form = formRef.current;
        const fileInput = fileInputRef.current;
        if (!dropArea || !fileInput || !form) return;

        return combine(
            dropTargetForExternal({
                canDrop: containsFiles,
                element: dropArea,
                onDragEnter: () => setState("over"),
                onDragLeave: () => setState("potential"),
                onDrop: ({ source }) => {
                    const dataTransfer = new DataTransfer();
                    getFiles({ source }).forEach((file) => {
                        dataTransfer.items.add(file);
                    });
                    fileInput.files = dataTransfer.files;
                    form.requestSubmit();
                },
            }),
            monitorForExternal({
                canMonitor: containsFiles,
                onDragStart: () => {
                    setState("potential");
                    preventUnhandled.start();
                },
                onDrop: () => {
                    setState("idle");
                    preventUnhandled.stop();
                },
            }),
        );
    }, []);

    return (
        <>
            <div className={`drop-area ${state}`} ref={dropAreaRef} />
            <div>
                <button
                    className="choose-file-box content-box content-box-text"
                    onClick={() => {
                        fileInputRef.current?.click();
                    }}
                    type="button"
                >
                    Choose a file
                </button>
            </div>
            <form
                action="./files"
                className="upload-form"
                encType="multipart/form-data"
                method="POST"
                ref={formRef}
            >
                <input
                    className="drop-files-input"
                    multiple
                    name="files"
                    onChange={() => {
                        formRef.current?.requestSubmit();
                    }}
                    ref={fileInputRef}
                    type="file"
                />
            </form>
        </>
    );
}
