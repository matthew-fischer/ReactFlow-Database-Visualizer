import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, Search } from 'lucide-react';
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({nodeTypes, nodes, colors}) => {
    const [expandedCategories, setExpandedCategories] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [types, setTypes] = useState({});
    const { pathname } = useLocation();

    useEffect(() => {
        if (nodes) {
            let newTypes = {};
            for (let key in nodeTypes) {
                newTypes[key] = [];
            }
            for (let i = 0; i < nodes.length; i++) {    
                if (newTypes[nodes[i].type]) {
                    newTypes[nodes[i].type].push(nodes[i].data.label.title);
                }
            }
            setTypes(newTypes);
        }
    }, [nodes, nodeTypes]);

    useEffect(() => {
        // Initialize all categories as expanded
        const initialExpanded = {};
        Object.keys(types).forEach(category => {
            for (let i = 0; i < nodes.length; i++) {
                if (category === nodes[i].type) {
                    if (nodes[i]?.data.label.title) {
                        initialExpanded[category] = true;
                    } else {
                        initialExpanded[category] = false;
                    }
                }
            }
        });
        setExpandedCategories(initialExpanded);
    }, [types]);

    const toggleCategory = (category) => {
        setExpandedCategories(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    const filteredTypes = Object.keys(types).reduce((acc, category) => {
        acc[category] = types[category].filter(item => {
            if (!searchTerm) {return item} else {
             return item.toLowerCase().includes(searchTerm.toLowerCase())}
        });
        
        return acc;
    }, []);

    const clearButton = () => {
        setSearchTerm('');
    }

    return (
        <div className='sidebar'>
            <div className="title">
                <h2>Relation Diagram</h2>
            </div>
            <div className='search_container'>
                <Search size={20} />
                <input 
                type="text"
                placeholder='Search Table'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} />
                <button className="clearbutton" onClick={() => clearButton()}>x</button>
                
            </div>
            {Object.entries(filteredTypes).map(([category, items]) => (
                <div key={category} className="category">
                    <div className={`${expandedCategories[category]}`}
                    onClick={() => toggleCategory(category)} 
                    style={{border: "solid 0.15em black", 
                    borderLeft: `solid 0.23em ${colors[category]}`, 
                    fontWeight: "bold", fontSize: "larger", 
                    padding: "0.5em", marginBottom: "0.15em",
                    backgroundColor: "rgb(118, 117, 118)",
                    display: "flex", justifyContent: "space-between", alignItems: "center" }} >
                    <span>{category}</span>
                        {expandedCategories[category] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </div>
                    {expandedCategories[category] && (
                        <ul className="category-items">
                            {items.map((item, index) => (
                                <li key={index}>{<Link to={`/${item.replace(" ", "_")}`} 
                                style={{textDecoration: "none", color: "black", 
                                borderLeft: `${(pathname.slice(1, ) === item.replace(" ", "_")) ? `solid 0.3em ${colors[category]}` : 'none'}`,
                                padding: "0.15em"}}>{item}</Link>}</li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );

};

export default Sidebar;