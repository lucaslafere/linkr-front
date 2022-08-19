import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from "react-router-dom";
import { IoIosArrowDown } from 'react-icons/io';
import axios from 'axios';
import styled from 'styled-components';
import PostBox from '../Pages/PostBox';
import TokenContext from '../Contexts/TokenContext';
import Trendings from '../Pages/Trending';
import DeleteBox from '../Pages/DeleteBox';


export default function HashtagScreen() {
  const [deleting, setDeleting] = useState(false);
  const [updatePosts, setUpdatePosts] = useState(false);
  const [idDeleting, setIdDeleting] = useState(null);
  const [ trendingPosts, setTrendingPosts ] = useState(null);
  const { token } = useContext(TokenContext);
  const trending = useParams();
  const data = JSON.parse(localStorage.getItem("userInfo"));
  const config = {
        headers: {
            "Authorization": "Bearer " + token
        }
    };


  useEffect(() => {
    axios.get(`https://projeto17-linkrback.herokuapp.com/hashtag/${trending.hashtag}`, config)
    .then(response => setTrendingPosts(response.data))
    .catch(error => alert(error));

  }, [trending]);

  function postIsLiked (usersArray) {
      console.log(usersArray)
    const userLiked = usersArray.find(object => object.userId === data.id);
     if(userLiked === undefined) {
       return false
     };

     if(userLiked.userId) {
       return true;
     }
  }
 
  return(
      <>
    {deleting ? (
        <DeleteBox
          id={idDeleting}
          setDeleting={setDeleting}
          setUpdatePosts={setUpdatePosts}
          updatePosts={updatePosts}
        />
      ) : (
        <> </>
      )}
    <Container>
        <Header>
            <span>linkr</span>
            <div>
                <IoIosArrowDown color="#FFFFFF" fontSize="35"/>
                <img src='https://st.depositphotos.com/1010338/2099/i/600/depositphotos_20999947-stock-photo-tropical-island-with-palms.jpg' 
                alt="User" width="53" height="53" />
            </div>
        </Header>
        <Content>
            <span># {trending.hashtag}</span>
            <div>
                <Posts>
                    {trendingPosts === null ? <></> : 
                    trendingPosts.map((object, index) => <PostBox
                    id={object.id}
                    key={index}
                    url={object.url}
                    profilePhoto={object.profilePhoto}
                    username={object.username}
                    description={object.description ? object.description : ""}
                    urlDescription={object.urlDescription}
                    urlTitle={object.urlTitle}
                    urlImage={object.urlImage}
                    likes={object.likes}
                    setIdDeleting={setIdDeleting}
                    setDeleting={setDeleting}
                    setUpdatePosts={setUpdatePosts}
                    updatePosts={updatePosts}
                    userId={object.userId}
                    //liked={() => postIsLiked(object.usersLiked)}
                    />)
                    }
                </Posts>
               <Trendings />
            </div>
            
        </Content>
    </Container>
    </>
    );
};

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #333333;
    display: flex;
    flex-direction: column;
    align-items: center;
    
`
const Header = styled.div`
    width: 100%;
    height: 72px;
    background-color: #151515;
    box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    left:0;
    top:0;
    z-index: 1;
    span {
        display: inline-block;
        margin-left: 28px;
        color: #FFFFFF;
        font-size: 49px;
        font-weight: bold;
        font-family: "Passion One"
    }
    div {
        margin-right: 18px;
        display: flex;
        align-items: center;
        height: 100%;
        img {
            width: 53px;
            height: 53px;
            border-radius: 26.5px;
            margin-left: 10px;
        }
    }
`
const Content = styled.div`
    margin-top: 150px;
     > span {
         display: inline-block;
         margin-bottom: 55px;
        color: #FFFFFF;
        font-family: "Oswald";
        font-size: 43px;
        font-weight: bold;
    }
    > div {
        display: flex;
    }
`;

const Posts = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 50px;
`;
