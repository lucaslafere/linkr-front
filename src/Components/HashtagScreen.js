import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from "react-router-dom";
import { IoIosArrowDown } from 'react-icons/io';
import axios from 'axios';
import styled from 'styled-components';
import PostBox from '../Pages/PostBox';
import TokenContext from '../Contexts/TokenContext';


export default function HashtagScreen() {
  const [ trendingPosts, setTrendingPosts ] = useState(null);
  const [ trendingsRank, setTrendingsRank ] = useState(null);
  const { token } = useContext(TokenContext);
  const trending = useParams();
  const config = {
        headers: {
            "Authorization": "Bearer " + token
        }
    };


  useEffect(() => {
    axios.get(`http://localhost:4000/hashtag/${trending.hashtag}`, config)
    .then(response => setTrendingPosts(response.data))
    .catch(error => alert(error));

    axios.get(`http://localhost:4000/ranking`)
    .then(response => setTrendingsRank(response.data))
    .catch(error => alert(error));

  }, [trending]);

  return(
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
                    key={index}
                    url={object.url} 
                    profilePhoto={object.profilePhoto} 
                    username={object.username} 
                    description={object.description}
                    urlDescription={object.urlDescription}
                    urlTitle={object.urlTitle}
                    urlImage={object.urlImage}
                    />)
                    }
                </Posts>
                <Trendings>
                    <div>
                        <span>trending</span>
                    </div>
                    <div>
                        {trendingsRank === null ? 
                        <></> : 
                        trendingsRank.map(object => 
                            <Link to={`/hashtag/${object.name}`}> 
                            <span>{object.name}</span> 
                            </Link>)
                        }
                        <span># javascript</span>
                        <span># react-native</span>
                        <span># material</span>
                        <span># web-dev</span>
                        <span># mobile</span>
                        <span># css</span>
                    </div>
                    
                </Trendings>
            </div>
            
        </Content>
    </Container>
    );
};

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #333333;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`
const Header = styled.div`
    width: 100%;
    height: 72px;
    background-color: #151515;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
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
`;
const Trendings = styled.div`
    margin-left: 20px;
    width: 301px;
    height: 406px;
    background-color: #171717;
    border-radius: 16px;
    display: flex;
    flex-direction: column;

    > div:nth-child(1) {
        display: flex;
        align-items: center;
        width: 100%;
        height: 61px;
        border-bottom: 1px solid #484848;
        padding: 0px 20px;
        span {
            font-size: 27px;
            font-weight: bold;
            color: #FFFFFF;
            font-family: 'Oswald';
        }
        
    }
    > div:nth-child(2) {
        display: flex;
        flex-direction: column;
        padding: 10px 20px;
        
        span {
            display: inline-block;
            color: #FFFFFF;
            font-family: 'Lato';
            font-size: 19px;
            font-weight: bold;
            margin-top: 12px;
        }
    }
    
        
`;