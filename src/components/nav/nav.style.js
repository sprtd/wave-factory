import styled from "styled-components";

const NavWrapper = styled.header`
  width: 100%;
  top: 0;
  position: sticky;
  background: #2f3542;

  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    a {
      text-decoration: none;
      color: #eee;
      margin-left: 50px;
    }
  }

  nav {
   
  }
`

const NavItem = styled.nav`

  


    ul {
      list-style: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      

      li {
        margin-right: 50px;
        color: #fff;
        font-size: 24px;

        &:nth-child(2) {
          background: #a4b0be;
          opacity: 0.8;
          padding: 5px;
          border-radius: 5px;
          cursor: pointer;
          transition: 0.5s;
          
          &:hover {
            opacity: 0.9;
            transition: 0.5s;
            
            
          }

        }
        
      }

      a {
        margin-right: 50px;
        text-decoration: none;
        background: #a4b0be;
        padding: 5px 10px;
        border-radius: 6px;


        color: #fff;
        font-size: 24px;
        &:hover {
          opacity: 0.9;
          transition: 0.5s;
          
          
        }
      }

    }

`



export { NavWrapper, NavItem }

