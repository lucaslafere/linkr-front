import styled from 'styled-components';
import { ReactTagify } from "react-tagify";
import { useState, useContext } from 'react';
import UserContext from '../Contexts/UserContext';


export default function PostBox({id ,profilePhoto , username, description, url, urlDescription, urlTitle, urlImage, setIdDeleting, setDeleting}) {
    const [liked, setLiked] = useState(false); 
    const [ editing, setEditing ] = useState(false);
    
    const { userData, setUserData } = useContext(UserContext);
    
    console.log(userData);

    function deletingPost() {
        setIdDeleting(id)
        setDeleting(true);
    }
    
    return(
        <Post>
            <PictureAndLike>
                <img src={profilePhoto} alt="User"/>
                { liked ? 
                  <ion-icon  name="heart" id="heart" onClick={() => setLiked(!liked)}></ion-icon> :
                  <ion-icon name="heart-outline" id="heart-outline" onClick={() => setLiked(!liked)}></ion-icon>
                }
                <p>13 likes</p>
            </PictureAndLike>
            <PostInfo>
                <div>
                    <p>{username}</p>
                    {/* {userData.username === username ?  */}
                        <div>
                            <ion-icon name="pencil-outline" onClick={() => setEditing(!editing)}></ion-icon>
                            <ion-icon name="trash-outline" onClick={deletingPost}></ion-icon>
                        </div>
                    {/* : <></>
                    } */}
                </div>
                <ReactTagify colors={"#ffffff"} tagClicked={(tag) => alert(tag)}>
                    <span>{description}</span>
                </ReactTagify>
                <MainInfo href={url} target="_blank">
                    <MainInfoDescription>
                        <h3>{urlTitle}</h3>
                        <h4>{urlDescription}</h4>
                        <h5>{url}</h5>
                    </MainInfoDescription>
                        <img src={urlImage}/>
                </MainInfo>
            </PostInfo>
        </Post>
    )
} 

const Post = styled.li`
    width: 611px;
    height: 276px; 
    display: flex;
    background-color: rgba(23, 23, 23, 1);
    padding: 19px 22px 10px 20px;
    border-radius: 16px;
    margin-bottom: 18px;
    
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
        color: #FFFFFF;
    }     
    p {
        margin-top: 4px;
        font-size: 11px; 
        color: #FFFFFF;
        font-family: "Lato";
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
    span { 
        font-size: 17px; 
        color: #B7B7B7; 
        font-family: 'Lato';
        margin-bottom: 10px;
        line-height: 20px;
    }
    > div:nth-child(1) {
        display: flex;
        width: 100%;
        justify-content: space-between;
    }
    ion-icon {
        font-size: 20px;
        color: #FFFFFF;
        margin-left: 10px;
    }
 `
 const MainInfo = styled.a`
    display: inline-block;
    width: 100%; 
    height: 155px; 
    border: 1px solid rgba(77, 77, 77, 1);
    border-radius: 12px; 
    display: flex;
    img { 
        width: 30%;
        height: 100%;
        border-radius: 0px 12px 13px 0px;
        object-fit: cover;
    }
 `
 const MainInfoDescription = styled.div`
    width: 85%; 
    height: 100%; 
    display: flex; 
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 20px 28px 15px 20px; 
    h3 { 
        font-size: 16px;
        color: rgba(206, 206, 206, 1);
        text-align: left;
        margin-bottom: 8px;
    }
    h4 { 
        font-size: 11px;
        color: rgba(155, 149, 149, 1);
        text-align: left;
        margin-bottom: 8px;
    }
    h5 { 
        font-size: 11px;
        color: rgba(206, 206, 206, 1);
        text-align: left;
        margin-bottom: 8px;
    }
 `

 