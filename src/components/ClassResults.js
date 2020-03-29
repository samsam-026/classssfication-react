import React from 'react';

function ClassResults({ classification }) {
    return (
        <ul className="class-results">
            <li><strong>Species: </strong>{classification.className}</li>
            <li><strong>Common name: </strong>{classification.commonName}</li>
            <li><strong>Venomous: </strong>{classification.isVenomous ? "Yes" : "No"}</li>
            <li><strong>Confidence: </strong>{classification.confidence}%</li>
        </ul>
    )
}

export default ClassResults;