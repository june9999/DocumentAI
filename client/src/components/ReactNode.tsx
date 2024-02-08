import ReactFlow from "reactflow";

import "reactflow/dist/style.css";

const processNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "Process Start" },
    sourcePosition: "right",
  },
  {
    id: "2",
    position: { x: 300, y: 0 },
    data: { label: "Upload Files from Frontend" },
    targetPosition: "left",
    sourcePosition: "right",
  },
  {
    id: "3",
    position: { x: 500, y: 0 },
    data: { label: "Send to Backend" },
    targetPosition: "left",
    sourcePosition: "right",
  },
  {
    id: "4",
    position: { x: 500, y: 100 },
    data: { label: "Send to Google Storage" },
    targetPosition: "left",
    sourcePosition: "right",
  },
  {
    id: "5",
    position: { x: 700, y: 0 },
    data: { label: "Fetch from Document API to Backend" },
    targetPosition: "left",
    sourcePosition: "right",
  },
  {
    id: "6",
    position: { x: 900, y: 0 },
    data: { label: "Fetch from Backend to Frontend " },
    targetPosition: "left",
    sourcePosition: "right",
  },
  {
    id: "7",
    position: { x: 1100, y: 0 },
    data: { label: "Show Result" },
    targetPosition: "left",
    sourcePosition: "right",
  },
  {
    id: "8",
    position: { x: 1300, y: 0 },
    data: { label: "Process End" },
    targetPosition: "left",
  },
];
const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e3-4", source: "3", target: "4" },
  { id: "e4-5", source: "4", target: "5" },
  { id: "e5-6", source: "5", target: "6" },
  { id: "e5-6", source: "5", target: "6" },
  { id: "e6-7", source: "6", target: "7" },
  { id: "e7-8", source: "7", target: "8" },
];

export default function ReactNode() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow nodes={processNodes} edges={initialEdges} />
    </div>
  );
}
