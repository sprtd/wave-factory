import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { NavItem, NavWrapper } from './nav.style'
import { UserAccountContext } from '../../contexts/user-account.context'

const Nav = () => {
  const { isConnectedToEthereum, accountDetails } = useContext(UserAccountContext)

  return (
    <NavWrapper>
      <h1>
        <Link to='/'>WaveFactory</Link>
      </h1>
      <NavItem>
        <ul>
        <li>Profile</li>
          { isConnectedToEthereum ? (
            <a  target="_blank" rel="noopener noreferrer" href={`https://etherscan.io/`} >
              { `${accountDetails.substring(0, 10)}...` } 
            </a>) : (<li>Connect Wallet</li>)}
        </ul>
      </NavItem>

    </NavWrapper>

  )
}

export default Nav