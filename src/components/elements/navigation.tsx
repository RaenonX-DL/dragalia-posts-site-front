import React from 'react';
import {Nav} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {LinkContainer} from 'react-router-bootstrap';

import GoogleSignin from './googleSignin';
import LanguageSwitch from './langSwitch';
import Path from '../../constants/path';

export const Navigation = () => {
  const {t} = useTranslation();

  return (
    <>
      <Navbar collapseOnSelect expand="lg" variant="dark">
        <Navbar.Brand href={Path.getHome()}>OM 龍絆攻略站</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* Left part of the navbar */}
          <Nav className="mr-auto">
            <LinkContainer to={Path.QUEST_DIR}>
              <Nav.Link>{t('posts.quest.dir')}</Nav.Link>
            </LinkContainer>
            <LinkContainer to={Path.NEW_OBJECT_DIR}>
              <Nav.Link>{t('posts.new-object.dir')}</Nav.Link>
            </LinkContainer>
            <LinkContainer to={Path.MISC_DIR}>
              <Nav.Link>{t('posts.misc.dir')}</Nav.Link>
            </LinkContainer>
            <NavDropdown title={t('game.data.dir')} id="collapsible-nav-dropdown">
              <NavDropdown.Header>{t('game.data.passive')}</NavDropdown.Header>
              <LinkContainer to={Path.CEX}>
                <NavDropdown.Item>{t('game.data.cex')}</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to={Path.PRINT}>
                <NavDropdown.Item>{t('game.data.print')}</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider/>
              <NavDropdown.Header>{t('game.data.active')}</NavDropdown.Header>
              <LinkContainer to={Path.SKILL_ATK}>
                <NavDropdown.Item>{t('game.data.skill-atk')}</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to={Path.SKILL_SUP}>
                <NavDropdown.Item>{t('game.data.skill-sup')}</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider/>
              <NavDropdown.Header>{t('game.data.others')}</NavDropdown.Header>
              <LinkContainer to={Path.STORY}>
                <NavDropdown.Item>{t('game.data.story')}</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <NavDropdown title={t('game.tools.dir')} id="collapsible-nav-dropdown">
              <LinkContainer to={Path.DMG_CALC}>
                <NavDropdown.Item>{t('game.tools.damage')}</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to={Path.ROTATION_CALC}>
                <NavDropdown.Item>{t('game.tools.rotation')}</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <LinkContainer to={Path.getAbout()}>
              <Nav.Link>{t('about')}</Nav.Link>
            </LinkContainer>
          </Nav>
          {/* Right part of the navbar */}
          <Nav>
            <LanguageSwitch/>
            <GoogleSignin/>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Navbar collapseOnSelect expand="lg" bg="om-gradient" variant="dark" sticky="top" style={{zIndex: 0}}>
        Dummy Title Oasis of the Maniacs AAAAA BBBBB CCCCCC
      </Navbar>
    </>
  );
};
