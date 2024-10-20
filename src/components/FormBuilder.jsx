import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Handle,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  {
    id: '1',
    type: 'custom',
    data: { label: 'Start', fields: [], conditions: [] },
    position: { x: 250, y: 5 },
  },
];

// Moved outside component to avoid recreation
const FIELD_TYPES = {
  TEXT: 'text',
  EMAIL: 'email',
  NUMBER: 'number',
  FILE: 'file',
  DATE: 'date',
  SELECT: 'select',
};

const CustomNode = ({ data }) => {
  const [formValues, setFormValues] = useState({});

  const handleNumberChange = (fieldName, value) => {
    setFormValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  return (
    <div className="bg-white border-2 border-gray-300 p-3 rounded min-w-[300px]">
      <div className="font-bold mb-3">{data.label}</div>
      <form className="space-y-3">
        {data.fields.map((field, index) => (
          <div key={index} className="text-sm">
            <label className="block text-gray-700 text-sm font-bold mb-1">
              {field.name} ({field.type}) {field.required ? '*' : ''}
            </label>
            
            {field.type === FIELD_TYPES.TEXT && (
              <input
                type="text"
                placeholder={field.name}
                value={formValues[field.name] || ''}
                onChange={(e) => setFormValues(prev => ({ ...prev, [field.name]: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded text-sm"
              />
            )}

            {field.type === FIELD_TYPES.EMAIL && (
              <input
                type="email"
                placeholder={field.name}
                value={formValues[field.name] || ''}
                onChange={(e) => setFormValues(prev => ({ ...prev, [field.name]: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded text-sm"
              />
            )}

            {field.type === FIELD_TYPES.NUMBER && (
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formValues[field.name] || 50}
                  onChange={(e) => handleNumberChange(field.name, e.target.value)}
                  className="w-full"
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formValues[field.name] || 50}
                  onChange={(e) => handleNumberChange(field.name, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              </div>
            )}

            {field.type === FIELD_TYPES.SELECT && (
              <select
                value={formValues[field.name] || ''}
                onChange={(e) => setFormValues(prev => ({ ...prev, [field.name]: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded text-sm"
              >
                <option value="">Select an option</option>
                {field.options?.map((option, optIndex) => (
                  <option key={optIndex} value={option}>{option}</option>
                ))}
              </select>
            )}

            {field.type === FIELD_TYPES.FILE && (
              <input
                type="file"
                className="w-full p-2 border border-gray-300 rounded text-sm"
                onChange={(e) => setFormValues(prev => ({ ...prev, [field.name]: e.target.files[0]?.name || '' }))}
              />
            )}

            {field.type === FIELD_TYPES.DATE && (
              <input
                type="date"
                value={formValues[field.name] || ''}
                onChange={(e) => setFormValues(prev => ({ ...prev, [field.name]: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded text-sm"
              />
            )}
          </div>
        ))}
      </form>

      {data.conditions.map((condition, index) => (
        <div key={index} className="text-xs mt-2 text-gray-600">
          Connect to "{condition.targetLabel}" when {condition.field} is "{condition.value}"
        </div>
      ))}
      <Handle type="source" position="right" />
      <Handle type="target" position="left" />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

const FormBuilder = ({setTemplate}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  
  // Form field states
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldType, setNewFieldType] = useState(FIELD_TYPES.TEXT);
  const [newFieldRequired, setNewFieldRequired] = useState(false);
  const [fieldOptions, setFieldOptions] = useState('');
  const [showOptionsField, setShowOptionsField] = useState(false);

  // Effect to handle showing/hiding options field
  useEffect(() => {
    setShowOptionsField(newFieldType === FIELD_TYPES.SELECT);
  }, [newFieldType]);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const addNode = () => {
    const newNode = {
      id: Date.now().toString(),
      type: 'custom',
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: { label: `Node ${nodes.length + 1}`, fields: [], conditions: [] },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const handleFieldTypeChange = (e) => {
    const type = e.target.value;
    setNewFieldType(type);
    if (type !== FIELD_TYPES.SELECT) {
      setFieldOptions('');
    }
  };

  const addField = (e) => {
    e.preventDefault();
    if (newFieldName && selectedNode) {
      const newField = {
        name: newFieldName,
        type: newFieldType,
        required: newFieldRequired,
        options: newFieldType === FIELD_TYPES.SELECT ? fieldOptions.split(',').map(opt => opt.trim()) : [],
      };

      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedNode.id
            ? {
                ...node,
                data: {
                  ...node.data,
                  fields: [...node.data.fields, newField],
                },
              }
            : node
        )
      );

      // Reset form
      setNewFieldName('');
      setNewFieldType(FIELD_TYPES.TEXT);
      setNewFieldRequired(false);
      setFieldOptions('');
    }
  };

  const addDynamicCondition = (e) => {
    e.preventDefault();
    const fieldSelect = document.getElementById('conditionField');
    const fieldName = fieldSelect?.value;
    const fieldValue = document.getElementById('conditionValue')?.value;
    const targetNodeId = document.getElementById('conditionTarget')?.value;

    const targetNode = nodes.find((node) => node.id === targetNodeId);

    if (selectedNode && targetNode && fieldName && fieldValue) {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedNode.id
            ? {
                ...node,
                data: {
                  ...node.data,
                  conditions: [
                    ...node.data.conditions,
                    { field: fieldName, value: fieldValue, targetLabel: targetNode.data.label, targetId: targetNodeId },
                  ],
                },
              }
            : node
        )
      );
      const newEdge = { id: `${selectedNode.id}-${targetNodeId}`, source: selectedNode.id, target: targetNodeId };
      setEdges((eds) => [...eds, newEdge]);
    }
  };
  const generateTemplate = () => {
    const template = {
      nodes: nodes.map((node) => ({
        id: node.id,
        label: node.data.label,
        fields: node.data.fields,
        conditions: node.data.conditions,
      })),
      edges,
    };
    setTemplate(template);
    console.log('Generated Template:', JSON.stringify(template, null, 2));
  };

  useEffect(()=>{
    generateTemplate();
  },[nodes,edges])

  return (
    <div className="flex w-full justify-between">
      <div className="p-4 border-r-4 w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Form Builder</h2>
        <div style={{ height: '600px', width: '100%' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={(_, node) => setSelectedNode(node)}
            nodeTypes={nodeTypes}
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>
        <button 
          type="button" 
          onClick={addNode} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
        >
          Add Node
        </button>
      </div>
      <div className="p-4 border-l-4 w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Node Editor</h2>
        {selectedNode && (
          <div>
            <input
              type="text"
              value={selectedNode.data.label}
              onChange={(e) => {
                setNodes((nds) =>
                  nds.map((node) =>
                    node.id === selectedNode.id
                      ? { ...node, data: { ...node.data, label: e.target.value } }
                      : node
                  )
                );
              }}
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 mb-4"
            />
            <h3 className="font-semibold mb-2">Fields:</h3>
            {selectedNode.data.fields.map((field, index) => (
              <div key={index} className="mb-2">
                {field.name} ({field.type}) {field.required ? '*' : ''}
                {field.type === FIELD_TYPES.SELECT && field.options?.length > 0 && (
                  <div className="text-sm text-gray-600">
                    Options: {field.options.join(', ')}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4">
              <input
                type="text"
                placeholder="Field Name"
                value={newFieldName}
                onChange={(e) => setNewFieldName(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 mb-2"
              />
              <select
                value={newFieldType}
                onChange={handleFieldTypeChange}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 mb-2"
              >
                <option value={FIELD_TYPES.TEXT}>Text</option>
                <option value={FIELD_TYPES.EMAIL}>Email</option>
                <option value={FIELD_TYPES.NUMBER}>Number</option>
                <option value={FIELD_TYPES.FILE}>File</option>
                <option value={FIELD_TYPES.DATE}>Date</option>
                <option value={FIELD_TYPES.SELECT}>Select</option>
              </select>
              {showOptionsField && (
                <input
                  type="text"
                  placeholder="Enter options (comma separated)"
                  value={fieldOptions}
                  onChange={(e) => setFieldOptions(e.target.value)}
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 mb-2"
                />
              )}
              <label className="block mb-2">
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
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Add Field
              </button>
            </div>

            <h3 className="font-semibold mt-4 mb-2">Add Conditional Edges:</h3>
            <select 
              id="conditionField"
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 mb-2"
            >
              {selectedNode.data.fields.map((field, index) => (
                <option key={index} value={field.name}>{field.name}</option>
              ))}
            </select>
            <input
              type="text"
              id="conditionValue"
              placeholder="Condition Value (e.g., 60)"
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 mb-2"
            />
            <select
              id="conditionTarget"
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 mb-2"
            >
              <option value="">Select Target Node</option>
              {nodes
                .filter(node => node.id !== selectedNode.id)
                .map(node => (
                  <option key={node.id} value={node.id}>{node.data.label}</option>
              ))}
            </select>
            <button
              onClick={addDynamicCondition}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Add Condition
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormBuilder;