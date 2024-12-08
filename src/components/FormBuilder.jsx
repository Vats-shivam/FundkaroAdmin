import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { CustomNode } from "./CustomNode";
import { NodeConfigPanel } from "./NodeConfigPanel";
import { FIELD_TYPES } from "./constants";

const nodeTypes = {
  custom: CustomNode,
};

const FormBuilder = ({ setTemplate, template }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(template?.nodes?.map(node => ({
    id: node.id,
    type: "custom",
    position: { 
      x: Math.random() * 500, 
      y: Math.random() * 500 
    },
    data: { 
      label: node.label, 
      fields: node.fields || [],
      nextNodes: node.nextNodes || []
    }
  })) || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(template?.edges?.map(edge => ({
    source: edge.source,
    target: edge.target,
    ...(edge.condition && { label: edge.condition })
  })) || []);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback(
    (params) => {
      const existingEdge = edges.find(
        edge => edge.source === params.source 
      );
      if (existingEdge) {
        const sourceNode = nodes.find(node => node.id === params.source);
        const isTargetInNextNodes = sourceNode.data.nextNodes?.some(
          nextNode => nextNode.target === params.target
        );
        if(isTargetInNextNodes){
          return;
        }
        const edgeToReplace = existingEdges.find(edge => 
          !sourceNode.data.nextNodes?.some(
            nextNode => nextNode.target === edge.target
          )
        );
    
        if (edgeToReplace) {
          // Replace the existing edge
          setEdges((eds) => 
            eds.map(edge => 
              edge.source === params.source && 
              edge.target !== params.target
                ? params
                : edge
            )
          );
        }else{
          console.log("hello")
          setEdges((eds) => addEdge(params, eds));
        }
        
      }else{
        console.log(" s")
        setEdges((eds) => addEdge(params, eds));
      }
    },
    [setEdges]
  );
console.log(template,"nodes")
console.log(edges,"Edges")
  const addNode = useCallback(() => {
    const newNode = {
      id: `node_${Date.now()}`,
      type: "custom",
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: { label: `Form ${nodes.length + 1}`, fields: [] },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [nodes, setNodes]);

  const updateNode = useCallback(
    (nodeId, newData) => {
      setNodes((nds) => {
        return nds.map((node) => {
          if (node.id === nodeId) {
            node = { ...node, data: { ...node.data, ...newData } };
            setSelectedNode(node);
          }
          return node;
        });
      });
    },
    [setNodes]
  );

  useEffect(() => {
    // Create a template object to pass back to parent
    const formTemplate = {
      nodes: nodes.map(node => ({
        id: node.id,
        label: node.data.label,
        fields: node.data.fields || [],
        nextNodes: node.data.nextNodes || []
      })),
      edges: edges.map(edge => ({
        source: edge.source,
        target: edge.target,
        ...(edge.label && { condition: edge.label })
      }))
    };

    // Pass the template back to parent component
    setTemplate(formTemplate);

    console.log(formTemplate)
  }, [nodes, edges, setTemplate]);

  const handleNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  const handleClear=()=>{
    setTemplate()
    setNodes([])
    setEdges([])
  }

  return (
    <div className="flex w-full h-[500px]">
      <div className="w-2/3 p-4 border-r">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onNodeClick={handleNodeClick}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
      <NodeConfigPanel
        selectedNode={selectedNode}
        updateNode={updateNode}
        addNode={addNode}
        fieldTypes={FIELD_TYPES}
        setFormTemplate={setTemplate}
        nodes={nodes}
        setEdges={setEdges}
      />
      <button onClick={handleClear}>Clear</button>
    </div>
  );
};

export default FormBuilder;