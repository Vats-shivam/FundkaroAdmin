import React, { useState, useEffect } from "react";
import { addEdge } from "reactflow";
import toast from "react-hot-toast";
import { FIELD_TYPES } from "./constants";
import { Trash2 } from "lucide-react";

export const NodeConfigPanel = ({
  selectedNode,
  updateNode,
  addNode,
  fieldTypes,
  setFormTemplate,
  nodes,
  setEdges,
  deleteField
}) => {
  const [newFieldName, setNewFieldName] = useState("");
  const [newFieldType, setNewFieldType] = useState(fieldTypes.TEXT);
  const [newFieldRequired, setNewFieldRequired] = useState(false);
  const [fieldOptions, setFieldOptions] = useState("");
  const [routingField, setRoutingField] = useState("");
  const [routingValue, setRoutingValue] = useState("");
  const [routingTarget, setRoutingTarget] = useState("");
  const [availableFields, setAvailableFields] = useState([]);
  const [nodeLabel, setNodeLabel] = useState("");
  const [operators] = useState(['==', '!=', '>', '<', '>=', '<=']);
  const [selectedOperator, setSelectedOperator] = useState('==');
  const [profileMapping, setProfileMapping] = useState('');
  const [isStartNode, setIsStartNode] = useState(false);

  useEffect(() => {
    if (selectedNode) {
      setNodeLabel(selectedNode.data.label);
      setIsStartNode(selectedNode.data.isStartNode || false);
      setAvailableFields(selectedNode.data.fields || []);
    }
  }, [selectedNode]);

  const handleNodeLabelChange = (e) => {
    setNodeLabel(e.target.value);
    updateNode(selectedNode.id, { 
      label: e.target.value,
      isStartNode: isStartNode 
    });
  };

  const handleStartNodeChange = (e) => {
    setIsStartNode(e.target.checked);
    // Unset other start nodes
    if (e.target.checked) {
      nodes.forEach(node => {
        if (node.id !== selectedNode.id && node.data.isStartNode) {
          updateNode(node.id, { isStartNode: false });
        }
      });
    }
    updateNode(selectedNode.id, { isStartNode: e.target.checked });
  };

  const addField = () => {
    if (!selectedNode || !newFieldName.trim()) {
      alert("Please enter a field name");
      return;
    }

    // Check for duplicate field names
    if (selectedNode.data.fields?.some(field => field.name === newFieldName)) {
      alert("Field name already exists");
      return;
    }

    const newField = {
      id: `field_${Date.now()}`, // Add unique id for each field
      name: newFieldName,
      type: newFieldType.toUpperCase(), // Convert to uppercase to match backend enum
      label: newFieldName,
      required: newFieldRequired,
      options: (newFieldType === 'SELECT' || newFieldType === 'RADIO')
        ? fieldOptions.split(",").map(opt => opt.trim()).filter(opt => opt)
        : undefined,
      profileMapping: profileMapping || null
    };

    updateNode(selectedNode.id, {
      fields: [...(selectedNode.data.fields || []), newField],
    });

    // Reset form
    setNewFieldName("");
    setNewFieldType(fieldTypes.TEXT);
    setNewFieldRequired(false);
    setFieldOptions("");
    setProfileMapping("");
  };

  const handleDeleteField = (fieldId) => {
    if (!selectedNode) return;
    
    // Check if field is used in any routings
    const isUsedInRouting = selectedNode.data.nextNodes?.some(
      next => next.condition && next.condition.field === fieldId
    );
    
    if (isUsedInRouting) {
      const confirmDelete = window.confirm(
        "This field is used in routing conditions. Deleting it will also remove associated routings. Continue?"
      );
      
      if (!confirmDelete) return;
    }
    
    // Call the deleteField function from props
    deleteField(selectedNode.id, fieldId);
    
    // Show success message
    toast.success("Field deleted successfully");
  };

  const addRouting = () => {
    if (!selectedNode) return;
    
    if (!routingField || !routingValue || !routingTarget) {
      toast.error("Please fill in all routing details");
      return;
    }

    // Find target node by label
    const targetNodeExists = nodes.find(node => node.data.label === routingTarget);
    if (!targetNodeExists) {
      toast.error("Target form not found");
      return;
    }

    // Create the edge with proper condition object structure
    const edge = {
      id: `edge-${selectedNode.id}-${targetNodeExists.id}`,
      source: selectedNode.id,
      target: targetNodeExists.id,
      label: `${routingField} ${selectedOperator} ${routingValue}`,
      condition: {
        field: routingField,
        operator: selectedOperator,
        value: routingValue,
        targetNodeId: targetNodeExists.id
      }
    };

    setEdges(eds => [...eds, edge]);

    // Update node's nextNodes array
    const newRouting = {
      target: targetNodeExists.id,
      condition: `${routingField} ${selectedOperator} ${routingValue}`
    };

    updateNode(selectedNode.id, {
      nextNodes: [...(selectedNode.data.nextNodes || []), newRouting],
    });

    // Reset routing inputs
    setRoutingField("");
    setRoutingValue("");
    setRoutingTarget("");
    setSelectedOperator("==");

    toast.success("Routing added successfully");
  };

  return (
    <div className="w-full p-4 bg-white border-l">
      <h2 className="text-xl font-bold mb-4">Form Builder</h2>
      <button
        onClick={addNode}
        type="button"
        className="w-full bg-blue-500 text-white p-2 rounded mb-4 hover:bg-blue-600 transition-colors"
      >
        Add New Form
      </button>

      {selectedNode && (
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold mb-2">Form Settings</h3>
            <input
              type="text"
              value={nodeLabel}
              onChange={handleNodeLabelChange}
              placeholder="Form Name"
              className="w-full p-2 border rounded"
            />
            <label className="flex items-center mt-2">
              <input
                type="checkbox"
                checked={isStartNode}
                onChange={handleStartNodeChange}
                className="mr-2"
              />
              Start Node
            </label>
          </div>

          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold mb-2">Add Field</h3>
            <div className="space-y-2">
              <input
                type="text"
                value={newFieldName}
                onChange={(e) => setNewFieldName(e.target.value)}
                placeholder="Field Name"
                className="w-full p-2 border rounded"
              />
              <select
                value={newFieldType}
                onChange={(e) => setNewFieldType(e.target.value)}
                className="w-full p-2 border rounded"
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
                  className="w-full p-2 border rounded"
                />
              )}
              <label className="flex items-center">
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
                className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors"
              >
                Add Field
              </button>
            </div>
          </div>

          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold mb-2">Add Routing</h3>
            <div className="space-y-2">
              <select
                value={routingField}
                onChange={(e) => setRoutingField(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Field</option>
                {availableFields.map(field => (
                  <option key={field.id || field.name} value={field.name}>
                    {field.label}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedOperator}
                onChange={(e) => setSelectedOperator(e.target.value)}
                className="w-full p-2 border rounded"
              >
                {operators.map(op => (
                  <option key={op} value={op}>{op}</option>
                ))}
              </select>

              <input
                type="text"
                value={routingValue}
                onChange={(e) => setRoutingValue(e.target.value)}
                placeholder="Value"
                className="w-full p-2 border rounded"
              />

              <select
                value={routingTarget}
                onChange={(e) => setRoutingTarget(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Target Form</option>
                {nodes
                  .filter(node => node.id !== selectedNode.id)
                  .map(node => (
                    <option key={node.id} value={node.data.label}>
                      {node.data.label}
                    </option>
                  ))}
              </select>

              <button
                onClick={addRouting}
                type="button"
                className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600 transition-colors"
              >
                Add Routing
              </button>
            </div>
          </div>

          {selectedNode.data.fields?.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Current Fields</h3>
              <div className="space-y-2">
                {selectedNode.data.fields.map((field, index) => (
                  <div key={field.id || index} className="p-2 bg-gray-50 rounded flex justify-between items-center">
                    <span>{field.label} ({field.type})</span>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-3">
                        {field.required ? "Required" : "Optional"}
                      </span>
                      <button
                        onClick={() => handleDeleteField(field.id || index)}
                        type="button"
                        className="text-red-500 hover:bg-red-50 p-1 rounded-full transition-colors"
                        title="Delete field"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};