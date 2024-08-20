import { useCallback, useState, useMemo, useEffect } from 'react';
import {ReactFlowProvider, ReactFlow, addEdge, useNodesState, useEdgesState, MiniMap, Controls, Background, Panel, useReactFlow} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './style.css';
import CustomNode from './nodes/CustomNode';
import CustomEdge from './edges/CustomEdge';
import Sidebar from './sidebar';
import { fetchNodes } from "./nodes/nodes";
import { fetchEdges } from './edges/edges';

const edgeTypes = {
    'One-to-Many': (props) => <CustomEdge {...props} markerId="One-to-Many" />,
    'Many-to-One': (props) => <CustomEdge {...props} markerId="Many-to-One" />,
    'Many-to-Many': (props) => <CustomEdge {...props} markerId="Many-to-Many" />,
    'One-to-One': (props) => <CustomEdge {...props} markerId="One-to-One" />
};

function App({prop}) {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [variant, setVariant] = useState('cross');
    const [isLoading, setIsLoading] = useState(true);

    let jsonFile = prop;
    useEffect(() => {
        const load = async () => {
            setIsLoading(true);
            try {
                const Nodes = await fetchNodes(`${jsonFile}`);
                setNodes(Nodes);
                const Edges = await fetchEdges(`${jsonFile}`);
                setEdges(Edges);
            } catch (error) {
                console.error("Error loading data: ", error);
            } finally {
                setIsLoading(false);
            }
        };

        load();
    }, [jsonFile, setEdges, setNodes])


    const onConnect = useCallback(
        // To just have a basic edge. (connection) => setEdges((eds) => addEdge(connection, eds)), [setEdges],
        (connection) => setEdges((eds) => addEdge({ ...connection, animated: true, type: 'step'}, eds)), [setEdges],
    );

    const nodeTypes = useMemo(() => ({
        'OTHER': (props) => <CustomNode {...props} edges={edges} nodes={nodes} />,
        'Database1': (props) => <CustomNode {...props} edges={edges} nodes={nodes} />,
        'Database2': (props) => <CustomNode {...props} edges={edges} nodes={nodes} />,
        'Database3': (props) => <CustomNode {...props} edges={edges} nodes={nodes} />,
    }), [edges]);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    let colors = {};
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].type === "Database1") {
            const one_color = nodes[i].data.label.style.background;
            colors['Database1'] = one_color;
        }
        else if (nodes[i].type === "Database2") {
            const two_color = nodes[i].data.label.style.background;
            colors['Database2'] = two_color;
        }
        else if (nodes[i].type === "Database3") {
            const three_color = nodes[i].data.label.style.background;
            colors['Database3'] = three_color;
        }
        else {
            const DEFAULT_color = 'grey';
            colors['OTHER'] = DEFAULT_color;
        }
    }

    return (
        <>
        <ReactFlowProvider>
            <div className='reactflow_container'>
                <ReactFlow
                    edges={edges}
                    nodes={nodes}
                    onEdgesChange={onEdgesChange}
                    onNodesChange={onNodesChange}
                    edgeTypes={edgeTypes}
                    nodeTypes={nodeTypes}
                    onConnect={onConnect}
                    fitView='true'
                    style={{margin: '0px'}}
                >
                    <Background color='#ccc' variant={variant} /> 
                    <Controls className="custom_controls" position='bottom-left'/>
                    <MiniMap className="custom_minimap" nodeColor={(n) => {
                        if (n.type === "Database1") return colors.Database1;
                        else if (n.type === "Database2") return colors.Database2;
                        else if (n.type === "Database3") return colors.Database3;
                        else return colors.OTHER;
                        }} 
                        nodeStrokeWidth={3}
                        position='bottom-right' />
                    
                    <Panel className="custom_panel" >
                        <div className="buttons">
                            <button onClick={() => setVariant('dots')}>Dots</button>
                            <button onClick={() => setVariant('lines')}>Lines</button>
                            <button onClick={() => setVariant('cross')}>Cross</button>
                        </div>
                    </Panel>
                </ReactFlow>
            </div>
            
            <Sidebar nodeTypes={nodeTypes} nodes={nodes} colors={colors} />
        </ReactFlowProvider>
        </>
    );
}   

export default App;