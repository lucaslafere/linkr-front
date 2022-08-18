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
            <a>{username}</a>
        </UserCard> 
    )
} 

const UserCard = styled.li`
    width: 100%;
    height: 0%;
    display: flex; 
    align-items: center;

    img { 
        width: 39px;
        height: 39px; 
        border-radius: 50%;
    }

    a { 
        margin-left: 12px;
        font-size: 19px; 
        color: rgba(81, 81, 81, 1);
    } 

    &:hover { 
        cursor: pointer;
    }
 `

