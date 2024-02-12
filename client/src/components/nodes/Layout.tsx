import { useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Edge,
  Node,
} from "reactflow";

import { initialNodes, initialEdges } from "./Node";
import "reactflow/dist/style.css";

const getLayoutedElements = (
  nodes: Node<{ label: string }, string | undefined>[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  edges: Edge<any>[],
) => {
  return { nodes, edges };
};

// eslint-disable-next-line react-refresh/only-export-components
const LayoutFlow = () => {
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
    />
  );
};

export default function () {
  return (
    <ReactFlowProvider>
      <LayoutFlow />
    </ReactFlowProvider>
  );
}
