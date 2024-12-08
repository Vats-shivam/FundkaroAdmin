import React, { useState } from "react";
import { addEdge } from "reactflow";

export const NodeConfigPanel = ({
  selectedNode,
  updateNode,
  addNode,
  fieldTypes,
  setFormTemplate,
  nodes,
  setEdges
}) => {
  const [newFieldName, setNewFieldName] = useState("");
  const [newFieldType, setNewFieldType] = useState(fieldTypes.TEXT);
  const [newFieldRequired, setNewFieldRequired] = useState(false);
  const [fieldOptions, setFieldOptions] = useState("");
  const [routingField, setRoutingField] = useState("");
  const [routingValue, setRoutingValue] = useState("");
  const [routingTarget, setRoutingTarget] = useState("");

  const addField = () => {
    if (!selectedNode) return;
    const newField = {
      name: newFieldName,
      type: newFieldType,
      label: newFieldName,
      required: newFieldRequired,
      options:
        newFieldType === fieldTypes.SELECT
          ? fieldOptions.split(",").map((opt) => opt.trim())
          : undefined,
      validation: {
        minLength: 0,
        maxLength: 100,
      },
    };
    updateNode(selectedNode.id, {
      fields: [...(selectedNode.data.fields || []), newField],
    });
    setNewFieldName("");
    setNewFieldType(fieldTypes.TEXT);
    setNewFieldRequired(false);
    setFieldOptions("");
  };

  const addRouting = () => {
    if (!selectedNode) return;
    
    // Validate routing inputs
    if (!routingField || !routingValue || !routingTarget) {
      alert("Please fill in all routing details");
      return;
    }

    // Check if target node exists
    // console.log(nodes)
    const targetNodeExists = nodes.filter(node => node.data.label === routingTarget);
    console.log(targetNodeExists[0])
    if (!targetNodeExists[0]) {
      alert("Target node does not exist");
      return;
    }

    // Create routing condition
    const newRouting = {
      condition: {
        field: routingField,
        value: routingValue,
        targetNodeId: targetNodeExists[0].id,
      },
    };

    // Update the current node's routing
    updateNode(selectedNode.id, {
      nextNodes: [...(selectedNode.data.nextNodes || []), newRouting],
    });

    const params = {
        source: selectedNode.id,
        sourceHandle: null,
        targetHandle: null,
        target: targetNodeExists[0].id,
    }
    console.log(params)
    // Add edge directly
    setEdges((eds) => addEdge(params, eds)); 
    // setEdges((prevEdges) => [
    //   ...prevEdges,
    //   {
    //     id: `${selectedNode.id}-${targetNodeExists.id}`,
    //     source: selectedNode.id,
    //     target: targetNodeExists.id,
    //     type: 'default', // or any custom edge type
    //     label: `${routingField} = ${routingValue}`, // Optional: add condition label
    //   },
    // ]);

    // console.log(edges)

    // Update form template with routing information
    setFormTemplate((prevTemplate) => ({
      ...prevTemplate,
      edges: [
        ...(prevTemplate.edges || []),
        {
          source: selectedNode.id,
          target: targetNodeExists[0].id,
          condition: {
            field: routingField,
            value: routingValue,
          },
        },
      ],
    }));

    // Reset routing inputs
    setRoutingField("");
    setRoutingValue("");
    setRoutingTarget("");
  };

  return (
    <div className="w-1/3 p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Form Builder</h2>
      <button
        onClick={addNode}
        type="button"
        className="w-full bg-blue-500 text-white p-2 rounded mb-4"
      >
        Add New Form
      </button>

      {selectedNode && (
        <>
          <h3 className="text-lg font-semibold mb-2">
            Edit Form: {selectedNode.data.label}
          </h3>
          <input
            type="text"
            value={newFieldName}
            onChange={(e) => setNewFieldName(e.target.value)}
            placeholder="Field Name"
            className="w-full p-2 border rounded mb-2"
          />
          <select
            value={newFieldType}
            onChange={(e) => setNewFieldType(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          >
            {Object.entries(fieldTypes).map(([key, value]) => (
              <option key={key} value={value}>
                {value}
              </option>
            ))}
          </select>
          {newFieldType === fieldTypes.SELECT && (
            <input
              type="text"
              value={fieldOptions}
              onChange={(e) => setFieldOptions(e.target.value)}
              placeholder="Options (comma-separated)"
              className="w-full p-2 border rounded mb-2"
            />
          )}
          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={newFieldRequired}
              onChange={(e) => setNewFieldRequired(e.target.checked)}
              className="mr-2"
            />
            Required
          </label>
          <button
            onClick={addField}
            type="button"
            className="w-full bg-green-500 text-white p-2 rounded mb-4"
          >
            Add Field
          </button>

          <h3 className="text-lg font-semibold mb-2">Add Routing</h3>
          <input
            type="text"
            value={routingField}
            onChange={(e) => setRoutingField(e.target.value)}
            placeholder="Field"
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            value={routingValue}
            onChange={(e) => setRoutingValue(e.target.value)}
            placeholder="Value"
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            value={routingTarget}
            onChange={(e) => setRoutingTarget(e.target.value)}
            placeholder="Target Form ID"
            className="w-full p-2 border rounded mb-2"
          />
          <button
            onClick={addRouting}
            type="button"
            className="w-full bg-purple-500 text-white p-2 rounded mb-4"
          >
            Add Routing
          </button>
        </>
      )}
    </div>
  );
};