import React, {memo} from "react";
import {Handle, NodeToolbar, Position} from '@xyflow/react';
import './CustomNode.css';
import { MdOutlineVpnKey } from "react-icons/md";

export default memo(({id, data, handleEditNode}) => {
    return (
        <>
            <NodeToolbar
            isVisible={data.forceToolbarVisible || undefined}
            position={data.toolbarPosition}
            >
            <button onClick={() => handleEditNode(id)}>Edit Node</button>
            </NodeToolbar>
            <div className="custom_node">
                <div className="custom_node_header" style={{borderColor: `${data.style.background}`, backgroundColor: `${data.style.background}`, color: `${data.style.color}`}}>
                    <div className="custom_node_title">{data.label.title}</div>
                </div>
                <div className="custom_node_text">
                    <div className="custom_node_primaryKey">
                        <Handle type='target' position={Position.Left} id='primaryKey-target' />
                        <Handle type='source' position={Position.Right} id='primaryKey-source' />
                        <MdOutlineVpnKey />
                        {data.label?.primaryKey}
                    </div>
                    <div className="custom_node_keys">
                        {data.label.keys.map((keyObj, index) => (
                                <div key={index} className="custom_node_key">
                                    {Object.keys(keyObj).map((key, i) => (
                                        <div key={i} className="custom_node_key_item">
                                            {keyObj[key]}
                                        </div>
                                    ))}
                                </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
});


/*{data_keys.map(key => 
    <div className="custom_node_key">
        <Handle type='target' position={Position.Left} id='' />
        <Handle type='source' position={Position.Right} id='' />
        
    </div>
)}
*/