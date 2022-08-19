import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

export default function Trendings() {
    const [ trendingsRank, setTrendingsRank ] = useState(null);
  
useEffect(() => {
    axios.get(`https://projeto17-linkrback.herokuapp.com/ranking`)
    .then(response => setTrendingsRank(response.data))
    .catch(error => alert(error))

},[])
    return(
        <TrendingBox>
            <div>
              <span>trending</span>
            </div>
            <div>
              {trendingsRank === null ? 
                <></> : 
                trendingsRank.map(object => 
                <Link to={`/hashtag/${object.name}`}> 
                  <span># {object.name}</span> 
                </Link>)
              }
            </div>
        </TrendingBox>
    )
} 

const TrendingBox = styled.div`
    width: 301px;
    height: 406px;
    background-color: #171717;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    margin-left: 25px;

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

    @media(max-width: 1600px){
        display:none;
    }
`;