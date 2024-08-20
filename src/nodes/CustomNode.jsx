import React, {memo, useCallback, useState, useEffect} from "react";
import {Handle, NodeToolbar, Position} from '@xyflow/react';
import './CustomNode.css';
import { MdOutlineVpnKey } from "react-icons/md";

export default memo(({data, edges, nodes}) => {
    const [connectedHandles, setConnectedHandles] = useState({});

    const updateConnectedHandles = useCallback(() => {
        const newConnectedHandles = {};
        edges.forEach(edge => {
            let index_target = edge.target - 1, index_source = edge.source - 1;
            if (nodes[index_target].data.label.title === data.label.title) {
                    if (edge?.targetHandle) {
                        newConnectedHandles[edge.targetHandle] = true;
                    } else {
                        newConnectedHandles['primaryKeyTarget'] = true;
                    }
            }
            if (nodes[index_source].data.label.title === data.label.title) {
                if (edge?.sourceHandle) {
                    newConnectedHandles[edge.sourceHandle] = true;
                } else {
                    newConnectedHandles['primaryKeySource'] = true;
                }
            }

            setConnectedHandles(newConnectedHandles);
        })
    }, [edges]);

    useEffect(() => {
        updateConnectedHandles();
    }, [edges, updateConnectedHandles]);

    const isConnected = (handleId) => !!connectedHandles[handleId];

    return (
        <>
            <NodeToolbar
            isVisible={data.forceToolbarVisible || undefined}
            position={data.toolbarPosition}
            >
            </NodeToolbar>
            <div className="custom_node">
                <div className="custom_node_header" style={{borderColor: `${data.label.style.background}`, backgroundColor: `${data.label.style.background}`, color: `${data.label.style.color}`}}>
                    <div className="custom_node_title">{data.label.title}</div>
                </div>
                <div className="custom_node_text" style={{backgroundColor: 'white'}}>
                    <div className="custom_node_primaryKey">

                        <Handle type='target' 
                        position={Position.Left} 
                        id={`primaryKeyTarget-${data.label.title}`}
                        style={{background: isConnected('primaryKeyTarget') ? 'black' : 'transparent', 
                        borderColor: isConnected('primaryKeyTarget') ? 'black' : 'transparent', 
                        opactiy: isConnected('primaryKeyTarget') ? '1' : '0'}}
                        />

                        <Handle type='source' 
                        position={Position.Right} 
                        id='primaryKeySource' 
                        style={{background: isConnected('primaryKeySource') ? 'black' : 'transparent', 
                        borderColor: isConnected('primaryKeySource') ? 'black' : 'transparent', 
                        opactiy: isConnected('primaryKeySource') ? '1' : '0'}}
                        />

                        <div className="primaryKey_name">
                            <MdOutlineVpnKey />
                            {data.label?.primaryKey.name}
                        </div>
                        <div className="primaryKey_type">{data.label?.primaryKey.type}</div>
                    </div>
                    <div className="custom_node_keys">
                        {data.label?.keys.map((keyObj, index) => (
                            <div key={index} className="custom_node_key">
                                {Object.keys(keyObj).map((key, i) => (
                                    <div key={i} className='key' style={{position: 'relative'}}>

                                        <Handle type='target' 
                                        position={Position.Left} 
                                        id={`Target${key}`} 
                                        style={{position: 'absolute', 
                                        background: isConnected(`Target${key}`) ? 'black' : 'transparent', 
                                        borderColor: isConnected(`Target${key}`) ? 'black' : 'transparent', 
                                        opactiy: isConnected(`Target${key}`) ? '1' : '0'}}
                                        />

                                        <Handle type='source' 
                                        position={Position.Right} 
                                        id={`Source${key}`} 
                                        style={{position: 'absolute', 
                                        background: isConnected(`Source${key}`) ? 'black' : 'transparent', 
                                        borderColor: isConnected(`Source${key}`) ? 'black' : 'transparent', 
                                        opactiy: isConnected(`Source${key}`) ? '1' : '0'}}
                                        />

                                        <div className="key_name" >{keyObj[key].name}</div>
                                        <div className="key_type" >{keyObj[key].type}</div>
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