import styled from "styled-components";

const NavLinkStyle = styled.div`
    font-family: verdana; 
    font-weight: bold; 
    list-style-type: none;
    display: flex;
    flex-direction: column;
    @media (min-width: 768px) {    
    margin: 0px 10px;
    }
    a: {color: #c9cba3}
    a:link { color: #c9cba3; text-decoration: none;  }
    a:active {color: #ffe1a8}
`
export default NavLinkStyle