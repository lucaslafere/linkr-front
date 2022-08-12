import { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import { IoIosArrowDown } from 'react-icons/io';
import PostBox from '../Pages/PostBox';
import TokenContext from '../Contexts/TokenContext';


export default function HashtagScreen() {
    const trending = useParams();
    const [ trendingPosts, setTrendingPosts ] = useState(null);
    const { token } = useContext(TokenContext);
    const config = {
        headers: {
            "Authorization": "Bearer " + token
        }
    };

useEffect(() => {
    const request = axios.get(`http://localhost:4000/hashtag/${trending.hashtag}`, config);
        request.then(response => {
            setTrendingPosts(response.data);
        })
        .catch(error => alert(error));
        
}, []);

    return(
    <Container>
        <Header>
            <span>linkr</span>
            <div>
                <IoIosArrowDown color="#FFFFFF" fontSize="35"/>
                <img src='https://st.depositphotos.com/1010338/2099/i/600/depositphotos_20999947-stock-photo-tropical-island-with-palms.jpg' alt="User" width="53" height="53" />
            </div>
        </Header>
        <Content>
            <span># {trending.hashtag}</span>
            <div>
                <Posts>
                    {trendingPosts === null ? <></> : trendingPosts.map((object, index) => <PostBox 
                    key={index}
                    url={object.url} 
                    profilePhoto={object.profilePhoto} 
                    username={object.username} 
                    description={object.description}/>)
                    }
                </Posts>
                <Trendings>
                    <h3>trending</h3>
                    <span># javascript</span>
                    <span># react-native</span>
                    <span># material</span>
                    <span># web-dev</span>
                    <span># mobile</span>
                    <span># css</span>
                    <span># html</span>
                    <span># node</span>
                    <span># sql</span>
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
    padding: 0px 20px;
    div {
        display: flex;
        flex-direction: column;
        
    }
    span {
        color: #FFFFFF;
        font-family: 'Lato';
        font-size: 19px;
        font-weight: bold;
        margin-bottom: 15px;
    }
    h3 {
        font-size: 27px;
        font-weight: bold;
        display: inline-block;
        display: flex;
        align-items: center;
        width: 100%;
        height: 61px;
        border-bottom: 1px solid #484848;
        color: #FFFFFF;
        margin-bottom: 20px;
        font-family: 'Oswald'
        
    }


`;