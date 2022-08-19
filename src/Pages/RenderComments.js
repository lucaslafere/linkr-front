import { useNavigate } from "react-router-dom";
import styled from "styled-components"; 

export default function RenderComments({index,coment,profilePhoto,username,userId}) { 
    const navigate = useNavigate(); 

    function changeUserPage(userId) { 
        navigate(`/timeline/${userId}`); 
        window.location.reload();
    }

    return( 
        <UsersComment index={index}>
            <img src={profilePhoto} alt={username} onClick={() => changeUserPage(userId)}/> 
            <CommentsMainInfo>
                <a><strong onClick={() => changeUserPage(userId)}>{username}</strong>following</a>
                <p>{coment}</p>
                <div>.</div>
            </CommentsMainInfo>
        </UsersComment> 
    )
}

const UsersComment = styled.li`
  width: 100%; 
  height: 100%;
  display: flex;
  margin-top: 14px;

  img { 
    height: 39px; 
    width: 39px; 
    border-radius: 50%;
    object-fit: cover; 

    &:hover { 
        cursor: pointer;
    }
  }  
`
const CommentsMainInfo = styled.div`
  margin-left: 18px; 
  width: 90%;

  a { 
    color: rgba(86, 86, 86, 1); 
    font-size: 14px; 

    strong { 
        color: rgba(243, 243, 243, 1);
        font-weight: 700;
        margin-right: 5px; 

        &:hover { 
        cursor: pointer;
        }
    }
  }

  p { 
    margin-top: 3px;
    text-align: left;
    color: rgba(172, 172, 172, 1);
    font-size: 14px; 
  }

  div { 
    margin-top: 18px;
    width: 100%; 
    height: 1px;
    border: 1px solid rgba(53, 53, 53, 1);
  }
`