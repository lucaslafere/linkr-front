import styled from "styled-components";

export default function RenderHashtags({index,name}) { 
    return( 
        <Hashtag value={index}> 
            <a># {name}</a>
        </Hashtag> 
    )
} 

const Hashtag = styled.li`
    width: 100%; 
    height: 31px; 

    a { 
        font-size: 19px; 
        font-weight: 700;
        color: rgba(255, 255, 255, 1); 

        &:hover { 
            cursor: pointer;
        }
    }
 `