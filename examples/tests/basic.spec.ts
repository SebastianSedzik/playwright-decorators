import { expect } from "@playwright/test";
import {
  beforeEach,
  suite,
  test,
  tag,
  fixme,
  slow,
  annotation,
  TestArgs
} from "playwright-decorators";

@tag(['x-api-consumer'])
@suite()
class SignInSuite {
  @beforeEach()
  async setPageRoute({ page }: TestArgs) {
    // set sign-in page context for each test in the suite
    await page.goto('http://localhost:3000/sign-in');
  }
  
  @test()
  async userShouldNotBeAbleToSignInWithInvalidCredentials({ page }: TestArgs) {
    // when user fills invalid credentials & submits the form
    await page.getByTestId('sign-in-email').fill("example@email.com");
    await page.getByTestId('sign-in-password').fill("example password");
    await page.getByTestId('sign-in-submit').click();
    // then user is redirected to sign-in page
    await expect(page).toHaveURL('http://localhost:3000/sign-in')
  }

  @fixme("Unstable test")
  @annotation({
    type: 'issue',
    description: 'jira.com/issue-123'
  })
  @test()
  async userShouldBeAbleToResetPassword({ page }: TestArgs) {
    await page.goto('http://localhost:3000/sign-in/reset');
    // ...
  }

  @tag(['team-y'])
  @slow("/sign-in/sso page is under the development, and needs more then 500ms to load")
  @test()
  async userShouldBeAbleToLoginViaSSO({ page }: TestArgs) {
    await page.goto('http://localhost:3000/sign-in/sso');
    await expect(page.getByTestId('page-title')).toHaveText('SSO Login');
    // ...
  }
}
