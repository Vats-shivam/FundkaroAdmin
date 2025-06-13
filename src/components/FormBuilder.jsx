"use client"

import { useState, useCallback, useEffect } from "react"
import ReactFlow, { addEdge, Background, Controls, MiniMap, useNodesState, useEdgesState } from "reactflow"
import "reactflow/dist/style.css"
import { CustomNode } from "./CustomNode"
import { NodeConfigPanel } from "./NodeConfigPanel"
import { FIELD_TYPES } from "./constants"
import { AlertCircle } from "lucide-react"


const nodeTypes = {
  custom: CustomNode,
}

const FormBuilder = ({ setTemplate, template }) => {
  // Initialize nodes with empty array if template or template.nodes is undefined
  const [nodes, setNodes, onNodesChange] = useNodesState(
    template?.nodes?.map((node) => ({
      id: node.id,
      type: "custom",
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      data: {
        label: node.label,
        isStartNode: node.isStartNode || false,
        fields: node.fields || [],
        nextNodes: node.nextNodes || [],
      },
    })) || [],
  )

  // Initialize edges with empty array if template or template.edges is undefined
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    template?.edges?.map((edge) => ({
      id: `edge-${edge.source}-${edge.target}`,
      source: edge.source,
      target: edge.target,
      ...(edge.condition && { label: edge.condition }),
    })) || [],
  )

  const [selectedNode, setSelectedNode] = useState(null)
  const [flowErrors, setFlowErrors] = useState([])

  const onConnect = useCallback(
    (params) => {
      const sourceNode = nodes.find((node) => node.id === params.source)

      if (!sourceNode) return

      // Update nextNodes of source node
      const updatedNextNodes = sourceNode.data.nextNodes || []
      updatedNextNodes.push({
        target: params.target,
        condition: params.condition,
      })

      // Update the source node with new nextNodes
      setNodes((nds) =>
        nds.map((node) =>
          node.id === params.source ? { ...node, data: { ...node.data, nextNodes: updatedNextNodes } } : node,
        ),
      )

      // Add the new edge
      setEdges((eds) => addEdge(params, eds))
    },
    [setEdges, nodes, setNodes],
  )

  const addNode = useCallback(() => {
    const newNode = {
      id: `node_${Date.now()}`,
      type: "custom",
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: { label: `Form ${nodes.length + 1}`, fields: [] },
    }
    setNodes((nds) => nds.concat(newNode))
  }, [nodes, setNodes])

  const updateNode = useCallback(
    (nodeId, newData) => {
      setNodes((nds) => {
        return nds.map((node) => {
          if (node.id === nodeId) {
            node = { ...node, data: { ...node.data, ...newData } }
            setSelectedNode(node)
          }
          return node
        })
      })
    },
    [setNodes],
  )

  const deleteField = useCallback(
    (nodeId, fieldId) => {
      // First, find the node and its field
      const node = nodes.find((n) => n.id === nodeId);
      if (!node) return;
      
      const field = node.data.fields.find((f) => f.id === fieldId);
      if (!field) return;
      
      // Remove the field from the node
      const updatedFields = node.data.fields.filter((f) => f.id !== fieldId);
      
      // Update the node's nextNodes array to remove any conditions referring to this field
      const updatedNextNodes = (node.data.nextNodes || []).filter((next) => {
        // Keep nextNodes entries that don't have conditions related to this field
        return !(next.condition && next.condition.includes(field.name));
      });
      
      // Update the node with the new fields and nextNodes
      const updatedNodeData = {
        ...node.data,
        fields: updatedFields,
        nextNodes: updatedNextNodes,
      };
      
      // Find edges that might have conditions related to this field
      const edgesToRemove = edges.filter((edge) => {
        // Check if the edge is from this node and has a label (condition) containing the field name
        return edge.source === nodeId && edge.label && edge.label.includes(field.name);
      });
      
      // Remove affected edges
      if (edgesToRemove.length > 0) {
        const edgeIdsToRemove = edgesToRemove.map((edge) => edge.id);
        setEdges((eds) => eds.filter((edge) => !edgeIdsToRemove.includes(edge.id)));
      }
      
      // Update the node
      updateNode(nodeId, updatedNodeData);
      
      // If this was the selected node, update the selected node reference
      if (selectedNode && selectedNode.id === nodeId) {
        setSelectedNode({
          ...selectedNode,
          data: updatedNodeData,
        });
      }
    },
    [nodes, edges, setEdges, updateNode, selectedNode]
  );

  const validateFlow = useCallback(() => {
    const errors = []

    // Check for start node using isStartNode flag
    const startNodes = nodes.filter((node) => node.data.isStartNode)
    const endNodes = nodes.filter((node) => !edges.some((edge) => edge.source === node.id))

    if (startNodes.length === 0) {
      errors.push("Please mark a node as start node")
    } else if (startNodes.length > 1) {
      errors.push("Only one start node is allowed")
    }

    // Validate at least one end point
    if (endNodes.length === 0) {
      errors.push("Flow must have at least one endpoint")
    }

    // Check for loops
    const visited = new Set()
    const visiting = new Set()

    const detectLoop = (nodeId) => {
      if (visiting.has(nodeId)) {
        return true
      }
      if (visited.has(nodeId)) {
        return false
      }

      visiting.add(nodeId)

      const outgoingEdges = edges.filter((edge) => edge.source === nodeId)
      for (const edge of outgoingEdges) {
        if (detectLoop(edge.target)) {
          return true
        }
      }

      visiting.delete(nodeId)
      visited.add(nodeId)
      return false
    }

    if (startNodes[0] && detectLoop(startNodes[0].id)) {
      errors.push("Flow contains loops which are not allowed")
    }

    // Check for unreachable nodes
    const reachableNodes = new Set()
    const traverse = (nodeId) => {
      reachableNodes.add(nodeId)
      edges
        .filter((edge) => edge.source === nodeId)
        .forEach((edge) => {
          if (!reachableNodes.has(edge.target)) {
            traverse(edge.target)
          }
        })
    }

    if (startNodes[0]) {
      traverse(startNodes[0].id)
    }

    nodes.forEach((node) => {
      if (!reachableNodes.has(node.id)) {
        errors.push(`Node "${node.data.label}" is unreachable`)
      }
    })

    setFlowErrors(errors)
    return errors.length === 0
  }, [nodes, edges])

  useEffect(() => {
    const isValid = validateFlow()

    if (isValid) {
      const formTemplate = {
        nodes: nodes.map((node) => ({
          id: node.id,
          label: node.data.label,
          isStartNode: node.data.isStartNode || false,
          fields: node.data.fields || [],
          nextNodes: node.data.nextNodes || [],
        })),
        edges: edges.map((edge) => ({
          source: edge.source,
          target: edge.target,
          ...(edge.label && { condition: edge.label }),
        })),
      }

      setTemplate(formTemplate)
    }

    return () => {
      // Cleanup function
      setTemplate(null)
    }
  }, [nodes, edges, setTemplate, validateFlow])

  const handleNodeClick = (event, node) => {
    setSelectedNode(node)
  }

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear the data? This action cannot be undone.")) {
      setTemplate({
        nodes: [],
        edges: [],
      });
      setNodes([]);
      setEdges([]);
      setSelectedNode(null);
      setFlowErrors([]);
    }
  };
  

  return (
    <div className="flex flex-col w-full h-full space-y-4">
      <div className="flex justify-end space-x-2 p-2">
        <button  type="button" className="px-4 py-2 border rounded-md hover:bg-gray-100 transition-colors" onClick={addNode}>
          Add Node
        </button>
        <button
          type="button"
          className="px-4 py-2 border rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
          onClick={handleClear}
        >
          Clear All
        </button>
      </div>

      <div className="flex flex-col md:flex-row w-full h-[500px] border rounded-lg overflow-hidden">
        {/* Flow Editor - Takes more space on larger screens */}
        <div className="w-full md:w-2/3 h-full border-b md:border-b-0 md:border-r">
          <div className="relative w-full h-full">
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
              <Controls position="bottom-right" />
              <MiniMap position="top-right" />
            </ReactFlow>
          </div>
        </div>

        {/* Configuration Panel */}
        <div className="w-full md:w-1/3 h-full overflow-y-auto">
          <NodeConfigPanel
            selectedNode={selectedNode}
            updateNode={updateNode}
            addNode={addNode}
            fieldTypes={FIELD_TYPES}
            setFormTemplate={setTemplate}
            nodes={nodes}
            setEdges={setEdges}
            deleteField={deleteField}
          />
        </div>
      </div>

      {/* Error Display */}
      {flowErrors.length > 0 && (
        <div className="mt-4 p-4 border border-red-300 bg-red-50 rounded-md">
          <div className="flex items-center gap-2 text-red-600 font-medium">
            <AlertCircle className="h-4 w-4" />
            <span>Flow Validation Errors</span>
          </div>
          <div className="mt-2">
            <ul className="list-disc list-inside text-red-600">
              {flowErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default FormBuilder