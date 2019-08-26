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
  left: ${props => (props.listRight ? '8px' : null)};
`;

const MenuList = styled(Flex)`
  padding-top: 8px;
  padding-bottom: 8px;
  flex-direction: column;
  width: max-content;
`;

export const Menu = ({
  label,
  children,
  icon,
  listLeft,
  listRight,
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
    <MenuContainer ref={node}>
      <MenuButton
        {...props}
        onFocus={() => setOpen(!open)}
        icon={icon}
        label={label}
      >
        {(icon &&
          React.cloneElement(icon, {
            size: icon.props.size || 30,
          })) ||
          label}
      </MenuButton>
      {open === true ? (
        <MenuListContainer listLeft={listLeft} listRight={listRight}>
          <MenuList onClick={e => handleChange(e)}>{children}</MenuList>
        </MenuListContainer>
      ) : null}
    </MenuContainer>
  );
};
Menu.propTypes = {
  label: PropTypes.string,
  children: PropTypes.any,
  icon: PropTypes.any,
  listLeft: PropTypes.bool,
  listRight: PropTypes.bool,
};

export default Menu;
