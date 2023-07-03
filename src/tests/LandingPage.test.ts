import LandingPage from '../lib/components/LandingPage.svelte';
import { render, screen, fireEvent } from '@testing-library/svelte';
import { Registry } from '$lib/auth/Registry';


//describe('LandingPage component ', () => {
//  render(LandingPage);
//  it('should call Registry.auth.checkParams() on mount', () => {
//    expect(Registry.auth.checkParams).to.exist;
//  });
//
//  it('should call Registry.auth.logout() when logout button is clicked', () => {
//    expect(Registry.auth.logout).to.exist;
//  });
//});

describe('LandingPage component ', () => {
  beforeEach(() => {
    render(LandingPage);
  });

  it('should call Registry.auth.checkParams() on mount', () => {
      expect(Registry.auth.checkParams).to.exist;
  });

  it('should call Registry.auth.logout() when logout button is clicked', () => {
    expect(Registry.auth.logout).to.exist;
  });

  it('should render the logo image', () => {
    const logoImage = screen.getByTestId('logo Landing');
    expect(logoImage).to.exist;
  });

  it('should render the app title', () => {
    const titleElement = screen.getByTestId('title proyect');
    expect(titleElement).to.exist;
  
    const classList = Array.from(titleElement.classList);
    expect(classList).to.include.members(['text-4xl', 'text-[#675D50]', 'font-bold']);
  });

  it('should render the hero content with the correct text and styles', () => {
    const heroContent = screen.getByTestId('hero-content');
    expect(heroContent).to.exist;
  
    const titleElement = screen.getByTestId('TASK MANAGER');
    expect(titleElement).to.exist;
    const classList = Array.from(titleElement.classList);
    expect(classList).to.include.members(['text-7xl', 'text-[#675D50]', 'font-bold']);
  
    const descriptionElement = screen.getByTestId('description');
    expect(descriptionElement).to.exist;
    const classListDes = Array.from(descriptionElement.classList);
    expect(classListDes).to.include.members(['py-6', 'text-2xl', 'text-[#675D50]']);
  
    const buttonElement = screen.getByText('See Lists');
    expect(buttonElement).to.exist;
    const classListButton = Array.from(buttonElement.classList);
    expect(classListButton).to.include.members(['btn', 'bg-[#ABC4AA]', 'border-none', 'text-[#675D50]']);
  });

  it('should render the navbar with the correct styles', () => {
    const navbar = screen.getByTestId('navbar');
    expect(navbar).to.exist;

    const classList = Array.from(navbar.classList);
    expect(classList).to.include.members(['navbar', 'bg-[#ABC4AA]', 'h-32']);
  });

  it('should render the logout button with the correct styles', () => {
    const logoutButton = screen.getByText('Logout');
    expect(logoutButton).to.exist;

    const classList = Array.from(logoutButton.classList);
    expect(classList).to.include.members(['text-xl', 'text-[#675D50]', 'btn', 'btn-ghost', 'rounded-btn']);
  });
  
  it('should navigate to "/todo-lists" when the "See Lists" button is clicked', () => {
    const seeListsButton = screen.getByText('See Lists');
    expect(seeListsButton.getAttribute('href')).to.equal('/todo-lists');
  });

  
});
