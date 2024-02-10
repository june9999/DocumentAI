import { useCallback, useEffect, useState } from "react";
import { Handle, Position } from "reactflow";

export function FileUploadNode({ data, isConnectable }) {
  const [fileList, setFileList] = useState([]);
  const [state, setState] = useState({ isloading: false, error: "", data: {} });

  const addToFileList = (e) => {
    const filesArray = Array.from(e.target.files);
    const newArray = fileList.concat(filesArray);
    console.log(newArray);
    setFileList(newArray);
  };

  const deleteFile = (e, index) => {
    let newArray = fileList;
    console.log();
    newArray = newArray.filter((e) => fileList.indexOf(e) !== index);
    setFileList(newArray);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setState({ isloading: true, error: "", data: {} });
    const formData = new FormData();
    fileList.forEach((e) => formData.append("upload", e));
    console.log(formData);
    try {
      const res = await fetch("http://127.0.0.1:8000/files/files", {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });
      setState({ isloading: false, error: "", data: res });
    } catch (error) {
      // setState({ isloading: false, error: {error?.message}, data: {} });
    }
    setFileList([]);
  };

  useEffect(() => {});
  return (
    <div className="text-updater-node ">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <form onSubmit={submitForm}>
        <label htmlFor="text">File Upload:</label>
        <input
          multiple
          type="file"
          id="files"
          className="clip"
          onChange={addToFileList}
        />
        <label htmlFor="selectFile">Choose File:</label>
        {fileList &&
          fileList.map((e, index) => (
            <p onClick={() => deleteFile(e, index)}>{e.name}</p>
          ))}
        <div id="showFileName"></div>
        <button className="text-black">Confirm</button>
      </form>
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
