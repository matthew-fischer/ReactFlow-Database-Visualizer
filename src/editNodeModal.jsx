import React, {useState} from 'react';

const NodeEditModal = ({onsave, onclose}) => {
    const [label, setLabel] = useState('');
    const [background, setBackground] = useState('white');
    const [color, setColor] = useState('black');
    const [type, setType] = useState(null);

    const handleSave = () => {
        onsave({
            label, style: {background: background, color: color},
        });
    };
    return (
        // e.target.value == Retrieves the value of that element. So for setLabel(e.target.value) the value it retrieves is from the input field.
        <div className='editNodeModal'>
            <h2>Edit Node</h2>
            <label>
                Label:
                <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} />
            </label>
            <label>
                BackGround Colour:
                <input type="color" value={background} onChange={(e) => setBackground(e.target.value)} />
            </label>
            <label>
                Text Colour:
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
            </label>
            <button onClick={handleSave}>Save</button>
            <button onClick={onclose}>Cancel</button>
        </div>
    );  
};

export default NodeEditModal;  