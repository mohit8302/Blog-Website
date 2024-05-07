import React, { useState } from 'react';

const FontOptions = ({ onChange }) => {
    const [selectedFont, setSelectedFont] = useState('Arial'); // Initial selected font

    const handleFontChange = (e) => {
        const selectedFont = e.target.value;
        setSelectedFont(selectedFont);
        onChange(selectedFont); // Pass selected font to parent component
    };

    return (
        <select value={selectedFont} onChange={handleFontChange}>
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Times New Roman">Times New Roman</option>
            {/* Add more font options as needed */} 
        </select>
    );
};

const BlogPost = ({ title, content }) => {
    const [selectedFont, setSelectedFont] = useState('Arial'); // Initial selected font

    const handleFontChange = (font) => {
        setSelectedFont(font);
    };

    return (
        <div>
            <div className="text-5xl font-extrabold" style={{ fontFamily: selectedFont }}>
                {title}
            </div>
            <div className="pt-4" style={{ fontFamily: selectedFont }}>
                {content}
            </div>
            <FontOptions onChange={handleFontChange} />
        </div>
    );
};

export default BlogPost;
