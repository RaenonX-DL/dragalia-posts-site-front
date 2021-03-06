import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../test/render/main';
import * as scrollUtils from '../../../../utils/scroll';
import {Paginator} from './paginator';


describe('Paginator', () => {
  let getQueryParam: jest.Mock;
  let onPageClick: jest.Mock;
  let scrollToTop: jest.SpyInstance;

  beforeEach(() => {
    getQueryParam = jest.fn();
    onPageClick = jest.fn();
    scrollToTop = jest.spyOn(scrollUtils, 'scrollElementToTop');
  });

  it('shows correct available page numbers', async () => {
    renderReact(() => (
      <Paginator
        state={{
          currentPage: 2,
          currentStart: 10,
          maxPage: 7,
          pageLimit: 10,
        }}
        onPageClick={onPageClick}
        getNewQueryParam={getQueryParam}
      />
    ));

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.queryByText('5')).not.toBeInTheDocument();
    expect(screen.getByText('2').parentElement).toHaveClass('active');
  });

  it('changes to clicked page number', async () => {
    renderReact(() => (
      <Paginator
        state={{
          currentPage: 2,
          currentStart: 10,
          maxPage: 7,
          pageLimit: 10,
        }}
        onPageClick={onPageClick}
        getNewQueryParam={getQueryParam}
      />
    ));

    const pageButton = screen.getByText('4');
    userEvent.click(pageButton);

    expect(getQueryParam).toHaveBeenCalledWith(4);
  });

  it('changes to the first page', async () => {
    renderReact(() => (
      <Paginator
        state={{
          currentPage: 2,
          currentStart: 10,
          maxPage: 7,
          pageLimit: 10,
        }}
        onPageClick={onPageClick}
        getNewQueryParam={getQueryParam}
      />
    ));

    const pageButton = screen.getByText('First');
    userEvent.click(pageButton);

    expect(getQueryParam).toHaveBeenCalledWith(1);
  });

  it('changes to the previous page', async () => {
    renderReact(() => (
      <Paginator
        state={{
          currentPage: 3,
          currentStart: 20,
          maxPage: 7,
          pageLimit: 10,
        }}
        onPageClick={onPageClick}
        getNewQueryParam={getQueryParam}
      />
    ));

    const pageButton = screen.getByText('Previous');
    userEvent.click(pageButton);

    expect(getQueryParam).toHaveBeenCalledWith(2);
  });

  it('changes to the next page', async () => {
    renderReact(() => (
      <Paginator
        state={{
          currentPage: 2,
          currentStart: 10,
          maxPage: 7,
          pageLimit: 10,
        }}
        onPageClick={onPageClick}
        getNewQueryParam={getQueryParam}
      />
    ));

    const pageButton = screen.getByText('Next');
    userEvent.click(pageButton);

    expect(getQueryParam).toHaveBeenCalledWith(3);
  });

  it('changes to the last page', async () => {
    renderReact(() => (
      <Paginator
        state={{
          currentPage: 2,
          currentStart: 10,
          maxPage: 7,
          pageLimit: 10,
        }}
        onPageClick={onPageClick}
        getNewQueryParam={getQueryParam}
      />
    ));

    const pageButton = screen.getByText('Last');
    userEvent.click(pageButton);

    expect(getQueryParam).toHaveBeenCalledWith(7);
  });

  it('can be disabled', async () => {
    renderReact(() => (
      <Paginator
        state={{
          currentPage: 2,
          currentStart: 10,
          maxPage: 7,
          pageLimit: 10,
        }}
        onPageClick={onPageClick}
        getNewQueryParam={getQueryParam}
        disable
      />
    ));

    const pageButton = screen.getByText('4');
    userEvent.click(pageButton);

    expect(pageButton.parentElement).toHaveClass('disabled');
    // `userEvent` can "click through" the disabled element, therefore triggering the event
  });

  it('scrolls on page change', async () => {
    renderReact(() => (
      <Paginator
        state={{
          currentPage: 2,
          currentStart: 10,
          maxPage: 7,
          pageLimit: 10,
        }}
        onPageClick={onPageClick}
        getNewQueryParam={getQueryParam}
      />
    ));

    const pageButton = screen.getByText('Next');
    userEvent.click(pageButton);

    expect(scrollToTop).toHaveBeenCalled();
  });

  it('calls click event on click', async () => {
    renderReact(() => (
      <Paginator
        state={{
          currentPage: 2,
          currentStart: 10,
          maxPage: 7,
          pageLimit: 10,
        }}
        onPageClick={onPageClick}
        getNewQueryParam={getQueryParam}
      />
    ));

    const pageButton = screen.getByText('Last');
    userEvent.click(pageButton);

    expect(onPageClick).toHaveBeenCalled();
    expect(getQueryParam).toHaveBeenCalled();
  });
});
