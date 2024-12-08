import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

export const CustomNode = memo(({ data, isConnectable }) => {
  return (
    <div className="bg-white border-2 border-gray-300 p-4 rounded-lg shadow-md w-[300px]">
      <div className="font-bold text-lg mb-3">{data.label}</div>
      
      <div className="space-y-2">
        {data.fields && data.fields.map((field, index) => (
          <div key={index} className="text-sm">
            <span className="font-medium">{field.name}</span>
            <span className="text-gray-500 ml-2">({field.type})</span>
            {field.required && <span className="text-red-500 ml-1">*</span>}
            {field.options && (
              <div className="text-xs text-gray-400">
                Options: {field.options.join(', ')}
              </div>
            )}
          </div>
        ))}
      </div>

      {data.routing && Object.keys(data.routing).length > 0 && (
        <div className="mt-3 text-xs text-gray-600">
          <strong>Routing:</strong>
          {Object.entries(data.routing).map(([key, value], index) => (
            <div key={index}>
              When {key} → Go to {value}
            </div>
          ))}
        </div>
      )}

      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </div>
  );
});

CustomNode.displayName = 'CustomNode';
