import styled from "styled-components"; 

export default function RenderSearchUser({index,image,username}) { 
    return( 
        <UserCard value={index}>
            <img src={image} />
            <a>{username}</a>
        </UserCard> 
    )
} 

const UserCard = styled.li`
    width: 100%;
    height: 100%;
    display: flex; 
    align-items: center;
    padding: 14px 17px;

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

