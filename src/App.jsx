import { useCallback, useState, useMemo } from 'react';
import {ReactFlow, ReactFlowProvider, useReactFlow, addEdge, useNodesState, useEdgesState, MiniMap, Controls, Background, Panel, Position,} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './style.css';
import initialNodes from './nodes/nodes';
import initialEdges from './edges/edges';
import CustomNode from './nodes/CustomNode';
import NodeEditModal from './editNodeModal';

const MCIS_color = '#6ede87';
const STARS_color = '#6865A5';  
const CATS_color = '#ff0072';

const localstorageFlowKey = 'example-flow';

function Flow() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [variant, setVariant] = useState('dots');
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentNodeId, setCurrentNodeId] = useState(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const { setViewport } = useReactFlow();

    const setPosition = useCallback(
        (pos) =>
          setNodes((nodes) =>
            nodes.map((node) => ({
              ...node,
              data: { ...node.data, toolbarPosition: pos },
            })),
          ),
        [setNodes],
      );

    const onConnect = useCallback(
        // To just have a basic edge. (connection) => setEdges((eds) => addEdge(connection, eds)), [setEdges],
        (connection) => setEdges((eds) => addEdge({ ...connection, animated: true, type: 'step'}, eds)), [setEdges],
    );

    const persistentSave = useCallback((params) => {
        if (reactFlowInstance) {
            const flow = reactFlowInstance.toObject();
            localStorage.setItem(localstorageFlowKey, JSON.stringify(flow));
            console.log('Flow saved:', flow);
        }
    }, [reactFlowInstance]);

    const restore = useCallback(() => {
        const restoreFlow = async () => {
            const flow = JSON.parse(localStorage.getItem(localstorageFlowKey));

            if (flow) {
                const {x=0, y=0, zoom=1} = flow.viewport;
                setNodes(flow.nodes || []);
                setEdges(flow.edges || []);
                setViewport({x, y, zoom});
                console.log('Flow restored:', flow);
            }
        };

        restoreFlow();
    }, [setNodes, setEdges, setViewport]);

    const handleEditNode = useCallback((nodeId) => {
        setCurrentNodeId(nodeId);
        setModalOpen(true);
    }, []);

    const handleSaveNode = useCallback((updateNodeData) => {
        setNodes((nodes) => {
            const nodeIndex = nodes.findIndex(node => node.id === currentNodeId);
            if (nodeIndex > -1) {
                const newNodes = [...nodes];
                newNodes[nodeIndex] = {
                    ...newNodes[nodeIndex],
                    data: {
                        ... newNodes[nodeIndex].data,
                        ...updateNodeData,
                    },
                };
                return newNodes;
            }
            return nodes;
        });
        setModalOpen(false);
    }, [setNodes, currentNodeId]);

    const nodeTypes = useMemo(() => ({
        'MCIS': (props) => <CustomNode {...props} handleEditNode={handleEditNode} />,
        'STARS': (props) => <CustomNode {...props} handleEditNode={handleEditNode} />,
        'CATS': (props) => <CustomNode {...props} handleEditNode={handleEditNode} />,
    }), []);

    return (
        <>
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            fitview="true"
        >
            <Background color='#ccc' variant={variant} />
            <Panel>
                <button onClick={() => setVariant('dots')}>Dots</button>
                <button onClick={() => setVariant('lines')}>Lines</button>
                <button onClick={() => setVariant('cross')}>Cross</button>
                <h3></h3>
                <button onClick={() => setPosition(Position.Top)}>Top</button>
                <button onClick={() => setPosition(Position.Bottom)}>Bottom</button>
                <h3></h3>
                <button onClick={persistentSave}>Save Design</button>
                <button onClick={restore}>Restore Design</button>
                <h3></h3>
                <button>Add New Node</button>
            </Panel>
            <MiniMap nodeColor={(n) => {
                if (n.type === "MCIS") return MCIS_color;
                else if (n.type === "STARS") return STARS_color;
                else if (n.type === "CATS") return CATS_color;
                else return 'grey';
            }} 
            nodeStrokeWidth={3} zoomable pannable />
            <Controls />
        </ReactFlow>
        {isModalOpen && <NodeEditModal onsave={handleSaveNode} onclose={() => setModalOpen(false)} />}
        </>
    );
}

export default () => (
    <ReactFlowProvider>
        <Flow />
    </ReactFlowProvider>
);