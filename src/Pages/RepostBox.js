import { useContext, useState } from "react";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import TokenContext from "../Contexts/TokenContext";

export default function RepostBox({ setOpenModal, repostId }) { 
    const [loading, setLoading] = useState(false); 
    const { token } = useContext(TokenContext);
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    console.log(token);

    async function repost(postId) { 
        console.log(postId);
        setLoading(true);
        try {
            const promise = await axios.post(`https://projeto17-linkrback.herokuapp.com/repost/${postId}`,postId,config);
            console.log(promise.data);
            setLoading(false);
            setOpenModal(false);
            window.location.reload();
        } catch (error) {
            setLoading(false);
            setOpenModal(false);
            console.log(error);
        }
    }

    return(
        <Reposts>
            <Repostbox>
                <Box>
                    <a>Do you want to re-post this link?</a>
                    <Buttons>
                        <button id="cancel" onClick={() => setOpenModal(false)}>No, cancel</button>
                        <button id="share" onClick={() => repost(repostId)}>
                            {loading ? ( 
                                <ThreeDots color="#fff" height={80} width={80} /> 
                                ) : ("Yes, share!") }
                        </button>
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

    @media (max-width: 1000px) {
        width: 35%;
        height: 25%;
    }
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

    @media (max-width: 1000px) {
        button { 
            height: 60px;
        }
    }
`
 