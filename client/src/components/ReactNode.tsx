import React, { useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Position,
} from "reactflow";

import { useMemo } from "react";
import { MiniMap } from "reactflow";
import "reactflow/dist/style.css";
import { FileUploadNode } from "./nodes/FileUploadNode";

const getLayoutedElements = (nodes, edges) => {
  return { nodes, edges };
};

const LayoutFlow = () => {
  const nodeTypes = useMemo(() => ({ UploadNode: FileUploadNode }), []);
  const processNodes = [
    {
      id: "1",
      position: { x: 175, y: 0 },
      data: { label: "Process Start" },
    },
    {
      id: "2",
      position: { x: 100, y: 200 },
      data: { label: "Upload Files from Frontend" },

      type: "UploadNode",
    },
    {
      id: "3",
      position: { x: 600, y: 350 },
      data: { label: "Send to Backend" },
      targetPosition: Position.Left,
      sourcePosition: Position.Top,
    },
    {
      id: "4",
      position: { x: 600, y: 250 },
      data: { label: "Send to Google Storage" },
    },
    {
      id: "5",
      position: { x: 600, y: 100 },
      data: { label: "Google functions to trigger Document AI" },
      targetPosition: Position.Bottom,
      sourcePosition: Position.Right,
    },
    {
      id: "6",
      position: { x: 900, y: 100 },
      data: { label: "Fetch Result " },
      targetPosition: Position.Left,
      sourcePosition: Position.Top,
    },
    {
      id: "7",
      position: { x: 900, y: 0 },
      data: { label: "Process End" },
      targetPosition: Position.Bottom,
    },
    {
      id: "User",
      type: "group",
      position: { x: 70, y: -10 },
      style: {
        width: 350,
        height: 450,
      },
      zIndex: -1,
    },
    {
      id: "Backend",
      type: "group",
      position: { x: 500, y: -10 },
      style: {
        width: 350,
        height: 450,
      },
      zIndex: -1,
    },
  ];
  const initialEdges = [
    { id: "e1-2", source: "1", target: "2", animated: true },
    { id: "e2-3", source: "2", target: "3", animated: true },
    { id: "e3-4", source: "3", target: "4", animated: true },
    { id: "e4-5", source: "4", target: "5", animated: true },
    { id: "e5-6", source: "5", target: "6", animated: true },
    { id: "e6-7", source: "6", target: "7", animated: true },
    { id: "e7-8", source: "7", target: "8", animated: true },
  ];
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(processNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onLayout = useCallback(() => {
    const layouted = getLayoutedElements(nodes, edges);

    setNodes([...layouted.nodes]);
    setEdges([...layouted.edges]);

    window.requestAnimationFrame(() => {
      fitView();
    });
  }, [nodes, edges]);

  return (
    <ReactFlow
      nodes={processNodes}
      edges={initialEdges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
    >
      <MiniMap nodeStrokeWidth={3} />
    </ReactFlow>
  );
};

export default function ReactNode() {
  return (
    <div
      className=" bg-gray-50 dark:text-white dark:bg-gray-800 p-10"
      style={{ width: "100vw", height: "80vh" }}
    >
      <ReactFlowProvider>
        <LayoutFlow />
      </ReactFlowProvider>
    </div>
  );
}
