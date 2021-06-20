import React from 'react';

import {fireEvent, screen} from '@testing-library/react';

import {renderReact} from '../../../../test/render/main';
import {translation as translationEN} from '../../../i18n/translations/en/translation';
import {Markdown} from './main';


describe('Markdown', () => {
  it('renders normal links as <a>', async () => {
    renderReact(() => <Markdown>{'[some link](/link)'}</Markdown>);

    const linkElement = screen.getByText('some link');
    expect(linkElement).toHaveAttribute('href', '/link');
    expect(linkElement).toHaveAttribute('target', '_blank');
  });

  it('renders long youtube video link as embed', async () => {
    renderReact(() => <Markdown>{'https://www.youtube.com/watch?v=m8B_tlk-pl0'}</Markdown>);

    const embedElement = screen.getByTestId('youtubeEmbed');
    expect(embedElement).toHaveAttribute('src', '//www.youtube.com/embed/m8B_tlk-pl0');
  });

  it('renders short youtube video link as embed', async () => {
    renderReact(() => <Markdown>{'https://youtu.be/m8B_tlk-pl0'}</Markdown>);

    const embedElement = screen.getByTestId('youtubeEmbed');
    expect(embedElement).toHaveAttribute('src', '//www.youtube.com/embed/m8B_tlk-pl0');
  });

  it('renders image links as <img>', async () => {
    renderReact(() => <Markdown>{'https://i.imgur.com/mtxtE5j.jpeg'}</Markdown>);

    const imageElement = screen.getByAltText('image');
    expect(imageElement).toHaveAttribute('src', 'https://i.imgur.com/mtxtE5j.jpeg');
  });

  it('renders gif as a clickable button', async () => {
    renderReact(() => <Markdown>{'https://i.imgur.com/mtxtE5j.gif'}</Markdown>);

    const openButton = screen.getByText(translationEN.misc.openGif);
    fireEvent.click(openButton);

    expect(screen.getByAltText('image')).toHaveAttribute('src', 'https://i.imgur.com/mtxtE5j.gif');
  });

  it('renders texts as <div>', async () => {
    renderReact(() => <Markdown>{'some text'}</Markdown>);

    expect(screen.getByText('some text', {selector: 'div'})).toBeInTheDocument();
  });

  it('renders a table correctly', async () => {
    const tableText = 'head | col 2\n:---: | :---:\nX | Y';

    renderReact(() => <Markdown>{tableText}</Markdown>);

    expect(screen.getByText('head', {selector: 'th'})).toBeInTheDocument();
    expect(screen.getByText('col 2', {selector: 'th'})).toBeInTheDocument();
    expect(screen.getByText('X', {selector: 'td'})).toBeInTheDocument();
    expect(screen.getByText('Y', {selector: 'td'})).toBeInTheDocument();
  });

  it('renders multiple tables correctly', async () => {
    const tableText = 'head | col 2\n:---: | :---:\nX | Y';
    const table2Text = 'footer | col B\n:---: | :---:\nZ | A';

    renderReact(() => <Markdown>{`${tableText}\n\n${table2Text}`}</Markdown>);

    expect(screen.getByText('head', {selector: 'th'})).toBeInTheDocument();
    expect(screen.getByText('col 2', {selector: 'th'})).toBeInTheDocument();
    expect(screen.getByText('X', {selector: 'td'})).toBeInTheDocument();
    expect(screen.getByText('Y', {selector: 'td'})).toBeInTheDocument();
    expect(screen.getByText('footer', {selector: 'th'})).toBeInTheDocument();
    expect(screen.getByText('col B', {selector: 'th'})).toBeInTheDocument();
    expect(screen.getByText('Z', {selector: 'td'})).toBeInTheDocument();
    expect(screen.getByText('A', {selector: 'td'})).toBeInTheDocument();
  });

  it('colors the text by RGB', async () => {
    const markdown = '[#757575]Text[/]';

    renderReact(() => <Markdown>{markdown}</Markdown>);

    expect(screen.getByText('Text', {selector: 'span'})).toHaveStyle({color: '#757575'});
  });

  it('colors the text by preset color', async () => {
    const markdown = '[red]Text[/]';

    renderReact(() => <Markdown>{markdown}</Markdown>);

    expect(screen.getByText('Text', {selector: 'span'})).toHaveStyle({color: 'red'});
  });

  it('colors multiple texts', async () => {
    const markdown = 'No color [#757575]Text 1[/] [red]Text 2[/]';

    renderReact(() => <Markdown>{markdown}</Markdown>);

    expect(screen.getByText('Text 1', {selector: 'span'})).toHaveStyle({color: '#757575'});
    expect(screen.getByText('Text 2', {selector: 'span'})).toHaveStyle({color: 'red'});
  });

  it('colors text in table', async () => {
    const markdown = 'head | col 2\n:---: | :---:\nX | [red]Y[/]';

    renderReact(() => <Markdown>{markdown}</Markdown>);

    expect(screen.getByText('Y', {selector: 'span'})).toHaveStyle({color: 'red'});
  });

  it('colors text in list', async () => {
    const markdown = '- X\n- [red]Y[/]';

    renderReact(() => <Markdown>{markdown}</Markdown>);

    expect(screen.getByText('Y', {selector: 'span'})).toHaveStyle({color: 'red'});
  });

  it('only color the desired text', async () => {
    const markdown = 'Highlight [red]red[/] only';

    renderReact(() => <Markdown>{markdown}</Markdown>);

    expect(screen.getByText('red', {selector: 'span'})).toHaveStyle({color: 'red'});
  });

  it('does not color if the syntax is incomplete', async () => {
    const markdown = '[red]red';

    renderReact(() => <Markdown>{markdown}</Markdown>);

    expect(screen.getByText('[red]red')).toBeInTheDocument();
  });
});
