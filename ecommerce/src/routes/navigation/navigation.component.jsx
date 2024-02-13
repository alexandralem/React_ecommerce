import { Fragment, useContext } from 'react' //Fragment is a wrapping div

import {Link, Outlet} from 'react-router-dom' // Link is an anchor tag <a>

import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'

import { ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import { UserContext } from '../../context/user.context'
import { CartContext } from '../../context/cart.context'

import { signOutUser } from '../../utils/firebase/firebase.utils'

import './navigation.styles.scss'


const Navigation = () => {
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);

    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrwnLogo className='logo'></CrwnLogo>
                </Link>
                
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                    {currentUser ? (
                        <span className='nav-link' onClick={signOutUser}>SIGN OUT</span>
                    ) : (
                        <Link className='nav-link' to='/sign-in'>
                            SIGN IN
                        </Link>
                    )}
                    <CartIcon></CartIcon>
                </div>
                {isCartOpen && <CartDropdown />} 
                
            </div>
            <Outlet></Outlet>
        </Fragment>
    )
}
//conditional rendering of cart dropdown: if both are true (component is a function so it's always true), then return the last
export default Navigation