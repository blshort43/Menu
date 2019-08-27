import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Card, Flex } from 'components';

const MenuContainer = styled.div`
   position: relative;
   width: fit-content;
   overflow: visible;
`;

const MenuButton = styled(Button)`
   cursor: pointer;
   outline: none;
`;

const MenuListContainer = styled(Card)`
   position: absolute;
   top: 8px;
   right: ${props => (props.listLeft ? '8px' : null)};
   left: ${props => (props.listLeft ? null : '8px')};
`;

const MenuList = styled(Flex)`
   padding-top: 8px;
   padding-bottom: 8px;
   flex-direction: column;
   width: max-content;
`;

export const Menu = ({
   bg,
   float,
   label,
   children,
   color,
   icon,
   listBackground,
   listLeft,
   style,
   ...props
}) => {
   const node = useRef();

   const [open, setOpen] = useState(false);

   useEffect(() => {
      // add when mounted
      document.addEventListener('mousedown', handleClick);
      // return function to be called when unmounted
      return () => {
         document.removeEventListener('mousedown', handleClick);
      };
   }, []);

   const handleClick = e => {
      if (node.current.contains(e.target)) {
         // inside click
         return;
      }
      // outside click
      setOpen(false);
   };

   const handleChange = () => {
      setOpen(false);
   };

   return (
      <MenuContainer style={style} ref={node}>
         <MenuButton
            {...props}
            bg={bg}
            color={color}
            onClick={() => setOpen(!open)}
            icon={icon}
            label={label}
         >
            {(icon &&
               React.cloneElement(icon, {
                  size: icon.props.size || 30
               })) ||
               label}
         </MenuButton>
         {open === true ? (
            <MenuListContainer
               {...props}
               bg={listBackground || 'paper'}
               listLeft={(style && style.float === 'right') || listLeft}
            >
               <MenuList onClick={e => handleChange(e)}>{children}</MenuList>
            </MenuListContainer>
         ) : null}
      </MenuContainer>
   );
};
Menu.propTypes = {
   bg: PropTypes.string,
   color: PropTypes.string,
   float: PropTypes.string,
   label: PropTypes.string,
   children: PropTypes.any,
   icon: PropTypes.any,
   listBackground: PropTypes.string,
   listLeft: PropTypes.bool,
   style: PropTypes.object
};

export default Menu;
