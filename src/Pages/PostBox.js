import styled from 'styled-components';
import { useState } from 'react';

export default function PostBox({profilePhoto , username, description, url }) {
    const [liked, setLiked] = useState(false); 
    console.log(profilePhoto);
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
                <p>{username}</p> 
                <span>{description}</span>
                <MainInfo href={url} target="_blank">
                    <MainInfoDescription>
                        <h3>Como aplicar o Material UI em um projeto React</h3>
                        <h4>Hey! I have moved this tutorial to my personal blog. Same content, new location. Sorry about making you click through to another page.</h4>
                        <h5>https://medium.com/@pshrmn/a-simple-react-router</h5>
                    </MainInfoDescription>
                        <img src="https://st.depositphotos.com/1010338/2099/i/600/depositphotos_20999947-stock-photo-tropical-island-with-palms.jpg" alt="link imagem"/>
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
    padding: 19px 23px 20px 20px;
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
    span { 
        font-size: 19px; 
        color: rgba(183, 183, 183, 1); 
        margin-bottom: 10px;
        line-height: 20px;
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

 