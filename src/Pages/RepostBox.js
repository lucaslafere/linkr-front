import { useState } from "react";
import styled from "styled-components";

export default function RepostBox({ id }) { 
    return(
        <Reposts>
            <Repostbox>
                <Box>
                    <a>Do you want to re-post this link?</a>
                    <Buttons>
                        <button id="cancel">No, cancel</button>
                        <button id="share">Yes, share!</button>
                    </Buttons>
                </Box>
            </Repostbox>
        </Reposts>
    )
} 

const Reposts = styled.div`
    width: 100%; 
    height: 950px; 
    display: flex;
    align-items: center; 
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 2;
    position: fixed; 
    left: 0; 
    top: 0
`
 const Repostbox = styled.div`
    width: 30%; 
    height: 20%; 
    background-color: rgba(51, 51, 51, 1);
    border-radius: 20px;
    display: flex; 
    justify-content: center;
    z-index: 1; 
`
 const Box = styled.div`
    width: 60%; 
    height: 100%; 
    display: flex; 
    justify-content: center;
    flex-direction: column;

    a { 
        color: white; 
        font-size: 29px; 
        font-weight: 700;
        text-align: center;
    }
`
 const Buttons = styled.div`
    width: 100%; 
    display: flex; 
    justify-content: space-between;
    align-items: center;
    margin-top: 22px;

    button { 
        width: 40%; 
        height: 37px; 
        display: flex; 
        justify-content: center; 
        align-items: center; 
        border-radius: 5px;
        font-weight: 700; 
        font-size: 18px; 
        border: none;

        &:hover { 
            cursor: pointer;
        }
    }

    button#cancel { 
        background-color: rgba(255, 255, 255, 1); 
        color: rgba(24, 119, 242, 1); 
    }

    button#share { 
        background-color: rgba(24, 119, 242, 1); 
        color: rgba(255, 255, 255, 1); 
    }
`
 