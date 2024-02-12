import { useState } from "react";
import { Handle, Position } from "reactflow";

interface FileUploadNodeProps {
  isConnectable: boolean;
}

export function FileUploadNode({ isConnectable }: FileUploadNodeProps) {
  const [fileList, setFileList] = useState<File[]>([]);
  const [state, setState] = useState({ isloading: false, error: "", data: "" });

  const addToFileList = (e) => {
    // no validation for now
    const filesArray = Array.from(e.target.files) as File[];
    const newArray = fileList.concat(filesArray);
    setFileList(newArray);
  };

  const deleteFile = (index: number) => {
    // delete files
    let newArray = fileList;
    newArray = newArray.filter((e) => fileList.indexOf(e) !== index);
    setFileList(newArray);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setState({ isloading: true, error: "", data: "" });
    if (fileList.length < 1) {
      setState({ isloading: true, error: "The file is empty.", data: "" });
    } else {
      const formData = new FormData();
      fileList.forEach((e) => formData.append("upload", e));
      try {
        await fetch(`${import.meta.env.VITE_LOCAL}files/api`, {
          method: "POST",
          body: formData,
        });
        setState({ isloading: false, error: "", data: "Successfully upload" });
      } catch (error) {
        setState({ isloading: false, error: "something wrong", data: "" });
      }
    }
    setFileList([]);
  };

  return (
    <div className="text-updater-node h-auto ">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <p className="text-xs text-center">Upload Files</p>
      <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-400 dark:border-gray-200 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-[80%]">
        <form onSubmit={submitForm}>
          <label htmlFor="text">PDF File Upload:</label>
          <input
            multiple
            type="file"
            id="files"
            className="clip"
            accept=".pdf"
            onChange={addToFileList}
          />
          <label htmlFor="selectFile"></label>
          <div id="showFileName">
            {fileList &&
              fileList.map((e, index) => (
                <p key={e.name} onClick={() => deleteFile(index)}>
                  {e.name}
                </p>
              ))}
          </div>
          <button className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Confirm
          </button>
        </form>
        {state?.data && <p>{state.data}</p>}
        {state?.error && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {state.error}
          </p>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default FileUploadNode;
