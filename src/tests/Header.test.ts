import { render, screen, fireEvent } from '@testing-library/svelte';
import Header from '../lib/components/header/Header.svelte';
import { use } from 'chai';
import chaiDom from 'chai-dom';

use(chaiDom);


describe('Header component', () => {
  it('should render the title "To-do List"', () => {
    render(Header);
    const titleElement = screen.getByTestId('To-do List Title');
    expect(titleElement).to.exist;
  });
});

describe('Header component', () => {
  it('should render the title "To-do List"', () => {
    render(Header);
    const titleElement = screen.getByTestId('To-do List Button');
    expect(titleElement).to.exist;
  });
});

describe('Header component', () => {
  it('should render with correct styles and css div to the to-do List', () => {
    render(Header);

    const headerElement = screen.getByTestId('To-do List');
    const computerStyles = window.getComputedStyle(headerElement);
		expect(computerStyles.backgroundColor).toEqual('rgb(103, 93, 80)');
    expect(computerStyles.height).toEqual('70px');
    expect(computerStyles.width).toEqual('100%');
    expect(computerStyles.position).toEqual('fixed');
    expect(computerStyles.zIndex).toEqual('3');
  });
});

describe('Header component', () => {
  it('should render with correct styles and CSS for the title "To-do List"', () => {
    render(Header);

    const titleElement = screen.getByTestId('Title To-do List');
    const titleStyles = window.getComputedStyle(titleElement);

    expect(titleStyles.getPropertyValue('font-size')).toEqual('2em');
    expect(titleStyles.getPropertyValue('font-weight')).toEqual('bold');
  });
});

describe('Header component', () => {
  it('should render with correct styles and CSS class for the logout button', () => {
    render(Header);

    const logoutButton = screen.getByText('Log Out');
    const logoutButtonStyles = window.getComputedStyle(logoutButton);

    expect(logoutButtonStyles.getPropertyValue('background-color')).toEqual('ButtonFace');
    expect(logoutButtonStyles.getPropertyValue('color')).toEqual('ButtonText');
    expect(logoutButtonStyles.getPropertyValue('padding-left')).toEqual('6px');
    expect(logoutButtonStyles.getPropertyValue('padding-right')).toEqual('6px');
    expect(logoutButtonStyles.getPropertyValue('padding-top')).toEqual('2px');
    expect(logoutButtonStyles.getPropertyValue('padding-bottom')).toEqual('3px');
    expect(logoutButtonStyles.getPropertyValue('margin-left')).toEqual('auto');
  });
});

describe('Header component', () => {
  it('should render the redirect link to "/todo-lists"', () => {
    render(Header);
    const titleElement = screen.getByTestId('To-do List Title');
    expect(titleElement).to.exist;
    expect(titleElement.getAttribute('href')).to.equal('/todo-lists');
  });
});
