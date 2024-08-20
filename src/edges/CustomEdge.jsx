import React from 'react';
import { BaseEdge, getSmoothStepPath } from '@xyflow/react';
import Marker from './Markers.jsx';

const CustomEdge = (props) => {
    const { id, sourceX, sourceY, targetX, targetY, style={}, markerId } = props;
    const [EdgePath] = getSmoothStepPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition: 'right',
        targetPosition: 'left',
    });

    if (markerId === "One-to-Many") {
        return (
            <>
                <Marker />
                <BaseEdge 
                    id={id}
                    path={EdgePath}
                    style={{...style, 
                        strokeWidth: 2,
                        stroke: "#333",  // This is the edge color.
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        markerEnd: 'url(#target_many)'
                    }}
                />
            </>
        )
    }
    else if (markerId === "Many-to-One") {
        return (
            <>
                <Marker />
                <BaseEdge 
                    id={id}
                    path={EdgePath}
                    style={{...style, 
                        strokeWidth: 2,
                        stroke: "#333",  // This is the edge color.
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        markerStart: 'url(#source_many)'
                    }}
                />
            </>
        )
    }
    else if (markerId === "Many-to-Many") {
        return (
            <>
                <Marker />
                <BaseEdge 
                    id={id}
                    path={EdgePath}
                    style={{...style, 
                        strokeWidth: 2,
                        stroke: "#333",  // This is the edge color.
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        markerStart: 'url(#source_many)',
                        markerEnd: 'url(#target_many)'
                    }}
                />
            </>
        )
    }
    else if (markerId === "One-to-One") {
        return (
            <>
                <BaseEdge 
                    id={id}
                    path={EdgePath}
                    style={{...style, 
                        strokeWidth: 2,
                        stroke: "#333",  // This is the edge color.
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                    }}
                />
            </>
        )
    }
}

export default CustomEdge;