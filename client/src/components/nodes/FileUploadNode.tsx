import { useCallback, useEffect, useState } from "react";
import { Handle, Position } from "reactflow";

// const baseUploadFile = (fieldName: string, fileOrFiles: File | FileList) => {
//   const formData = new FormData();
//   let uploadUrl = "";

//   if (fileOrFiles instanceof File) {
//     // 单文件上传
//     formData.set(fieldName, fileOrFiles);
//     // uploadUrl = FileUploadAPI.SINGLE_UPLOAD;
//   } else if (fileOrFiles instanceof FileList) {
//     // 多文件上传
//     // 将 files 类数组转成数组方便遍历
//     const fileArr = Array.from(fileOrFiles);
//     fileArr.forEach((file) => {
//       formData.append(fieldName, file);
//     });
//     uploadUrl = FileUploadAPI.MULTIPLE_UPLOAD;
//   }

//   uploadUrl !== "" &&
//     request.post(uploadUrl, formData, {
//       // 计算上传进度
//       onUploadProgress: (progressEvent: ProgressEvent) => {
//         const uploadedPercent = Math.round(
//           (progressEvent.loaded / progressEvent.total) * 100,
//         );
//         console.log(uploadedPercent);
//       },
//     });
// };

// /**
//  * @description 上传文件 -- 会转成 formData 上传
//  * @param fieldName formData 的 字段名 不指定则默认为 file
//  * @param file input 中选择的文件
//  */
// export const singleUploadFile = (fieldName: string, file: File) => {
//   baseUploadFile(fieldName, file);
// };

// /**
//  * @description 多文件上传
//  * @param fieldName formData 的字段名 不指定则默认为 file
//  * @param files input 中选择的多个文件
//  */
// export const multipleUploadFile = (fieldName: string, files: FileList) => {
//   baseUploadFile(fieldName, files);
// };

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
    data = fileList;
    try {
      const res = await fetch("http://127.0.0.1:8000/files/post", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setState({ isloading: false, error: "", data: res });
    } catch (error) {
      // setState({ isloading: false, error: {error?.message}, data: {} });
    }
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
