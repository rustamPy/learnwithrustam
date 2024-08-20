import React from 'react';

const AudioPlayer = ({ audioSrc, visible }) => {
    return visible ? (
        <div style={{ marginTop: '10px' }}>
            <audio controls>
                <source src={audioSrc} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    ) : null;
};

export default AudioPlayer;
