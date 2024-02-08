import { useCallback } from "react";
import { Handle, Position } from "reactflow";

export function FileUploadNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <div>
        <label htmlFor="text">File Upload:</label>
        {/* <input id="text" name="text" onChange={onChange} className="nodrag" /> */}
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
