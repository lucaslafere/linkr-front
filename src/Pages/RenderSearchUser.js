import { useNavigate } from "react-router-dom";
import styled from "styled-components"; 

export default function RenderSearchUser({index,image,username,id}) {  
    const navigate = useNavigate(); 

    function reload(id) { 
        navigate(`/timeline/${id}`); 
        window.location.reload();
    }

    return( 
        <UserCard value={index} onClick={() => reload(id)}>
            <img src={image} />
            <h2>{username}</h2>
        </UserCard> 
    )
} 

const UserCard = styled.li`
    width: 100%;
    height: 0%;
    display: flex; 
    align-items: center;
    margin: 4px 0 4px 0;
    

    img { 
        width: 39px;
        height: 39px; 
        border-radius: 50%;
    }

    h2 { 
        margin-left: 12px;
        /* color: rgba(81, 81, 81, 1); */
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 19px;


        color: #515151;

    } 

    &:hover { 
        cursor: pointer;
    }
 `

