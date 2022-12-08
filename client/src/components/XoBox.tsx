import React from "react";
import { PlayerTurn } from '../types';

interface XoBoxProps{
    value: ('' | 'X' | 'O');
    onChange: () => void;
    whoWon: PlayerTurn | null;
}

function XoBox({value, onChange, whoWon}: XoBoxProps){
    return(
        <>
        <button onClick={onChange} disabled={value !== '' || whoWon !== null} className="box" id="box-id">
            {value}
        </button>
        </>
    )
}

export default XoBox