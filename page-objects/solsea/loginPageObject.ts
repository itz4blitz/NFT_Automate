import { expect, Locator, Page } from '@playwright/test';

export class loginPO {
    readonly page: Page;
    readonly loginInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loggedInSuccessPopup: Locator;

    constructor(page: Page){
        this.page = page;
        this.loginInput = page.locator('[placeholder="Email"]');
        this.passwordInput = page.locator('[placeholder="Password"]');
        this.loginButton = page.locator('button:has-text("Log In")');
        this.loggedInSuccessPopup = page.locator('text=Logged in successfully!');
    }

    async login(username: string, password: string){
        await this.loginInput.isVisible();
        await this.loginInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async checkIsLoggedIn(){
        if (await this.loggedInSuccessPopup.isVisible){
            return true;
        }
        else return false;
    }


}
