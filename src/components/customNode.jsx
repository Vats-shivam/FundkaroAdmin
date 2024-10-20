const CustomNode = ({ data }) => {
    return (
      <div className="bg-white border-2 border-gray-300 p-3 rounded relative">
        <div className="font-bold">{data.label}</div>
        {data.fields.map((field, index) => (
          <div key={index} className="text-sm">
            {field.name} ({field.type}) {field.required ? '*' : ''}
            {field.condition && <span className="text-xs"> (Condition: {field.condition})</span>}
          </div>
        ))}
        <div className="handle-source">
          <Handle
            type="source"
            position="right"
            id="source"
            style={{ background: '#555' }}
          />
        </div>
        <div className="handle-target">
          <Handle
            type="target"
            position="left"
            id="target"
            style={{ background: '#555' }}
          />
        </div>
      </div>
    );
  };
  