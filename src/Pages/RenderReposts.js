import styled from "styled-components";  
import { useState } from "react";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";

export default function RenderReposts({index,likes,url,description,ownerUsername,ownerProfilePhoto,urlDescription,urlImage,urlTitle,id,reposts,repostedUsername,repostedUserId,loggedUsername}) { 
    const [liked,setLiked] = useState(false);
    const navigate = useNavigate();

    return( 
        <>
        <Post key={index}>
            <RepostMessage>
                <ion-icon name="repeat-sharp" id="repost"></ion-icon>
                <a>Re-posted by <strong onClick={() => navigate(`/timeline/${repostedUserId}`)}>{loggedUsername===repostedUsername ? ("you") : (repostedUsername)}</strong></a>
            </RepostMessage>
            <RepostContainer>
            <PictureAndLike>
                <img src={ownerProfilePhoto} alt={ownerUsername} />
                {liked ? (
                <ion-icon name="heart" id="heart"></ion-icon> ) : (
                <ion-icon name="heart-outline" id="heart-outline"></ion-icon>
                )}
                <p>{likes} likes</p>
                <ion-icon name="chatbubble-ellipses-outline" id="comments"></ion-icon>
                <p>13 comments</p>
                <ion-icon name="repeat-sharp" id="repost"></ion-icon>
                <p>{reposts} re-posts</p>
            </PictureAndLike>
            <PostInfo>
                <p>{ownerUsername}</p> 
                <ReactTagify colors={"#ffffff"} tagClicked={(tag) => navigate(`/hashtag/${tag.slice(1)}`)}>
                <a>{description}</a>
                </ReactTagify>
                <MainInfo onClick={() => window.open(url)}>
                    <MainInfoDescription>
                        <h3>{urlTitle}</h3>
                        <h4>{urlDescription}</h4>
                        <h5>{url}</h5>
                    </MainInfoDescription>
                        <img src={urlImage} alt={urlTitle}/>
                </MainInfo>
            </PostInfo>
            </RepostContainer>
        </Post>
        </>
    )
}  

const Post = styled.li`
  width: 100%;
  height: 309px;
  background-color: rgba(23, 23, 23, 1);
  border-radius: 16px;
  margin-bottom: 18px;
`;
const RepostContainer = styled.div`
    width: 100%; 
    height: 92%; 
    display: flex;
    padding: 15px 23px 20px 20px;
    margin-bottom: 18px;
`
const RepostMessage = styled.div`
    width: 100%; 
    height: 8%; 
    display: flex;
    align-items: center;
    padding: 8px 0px 0px 13px;

    ion-icon { 
        color: rgba(255, 255, 255, 1);
        font-weight: bold;  
        width: 20px; 
        height: 20px;
    }
    
    a { 
        color: rgba(255, 255, 255, 1); 
        font-weight: 300; 
        font-size: 12px;
        margin-left: 7px; 

        strong { 
            &:hover { 
                cursor: pointer;
            }
        }
    }
`
const PictureAndLike = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-bottom: 20px;
    object-fit: cover;
  }

  ion-icon {
    width: 25px;
    height: 25px;

    &:hover {
      cursor: pointer;
    }
  }

    ion-icon#heart {
        color: rgba(172, 0, 0, 1);
    } 

    ion-icon#heart-outline {
        color: white;
    }

    p {
        margin-top: 4px;
        margin-bottom: 15px;
        font-size: 11px; 
        color: white;
    } 

    ion-icon#comments {
        color: white;
    }

    ion-icon#repost {
        color: white;
    }
 `
const PostInfo = styled.div`
    width: 90%;
    height: 100%; 
    display: flex; 
    flex-direction: column;
    margin-left: 18px;

    p { 
        font-size: 19px; 
        color: rgba(255, 255, 255, 1);
        margin-bottom: 8px;
    } 

    a { 
        font-size: 19px; 
        color: rgba(183, 183, 183, 1); 
        margin-bottom: 10px;
        line-height: 20px;
    }
 `
const MainInfo = styled.div`
    width: 100%; 
    height: 90%; 
    border: 1px solid rgba(77, 77, 77, 1);
    border-radius: 12px; 
    display: flex;

    img { 
        width: 30%;
        height: 100%;
        border-radius: 0px 12px 13px 0px;
        object-fit: cover;
    }

    &:hover { 
        cursor: pointer;
    }
 `
const MainInfoDescription = styled.div`
  width: 85%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 24px 28px 23px 20px;

  h3 {
    font-size: 16px;
    color: rgba(206, 206, 206, 1);
    text-align: left;
    margin-bottom: 8px;
  }

  h4 {
    font-size: 16px;
    color: rgba(155, 149, 149, 1);
    text-align: left;
    margin-bottom: 8px;
  }

  h5 {
    font-size: 16px;
    color: rgba(206, 206, 206, 1);
    text-align: left;
    margin-bottom: 8px;
  }
`;


