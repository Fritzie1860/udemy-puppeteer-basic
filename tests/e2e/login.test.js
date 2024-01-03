// this file for "E2E: login page" module

const puppeteer = require('puppeteer')

describe('Login Test', ()=>{
    let browser
    let page

    before(async function(){
        browser = await puppeteer.launch({
            headless: "new",
            slowMo: 0
        })
        // const context = await browser.createIncognitoBrowserContext()
        // page = await context.newPage()

        page = await browser.newPage()
        await page.setDefaultTimeout(30000)
        await page.setDefaultNavigationTimeout(30000)
    })

    after(async function(){
        await browser.close()
    })

    it('Login Test - Invalid Credential (-)', async function(){
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.waitForSelector('#signin_button')
        await page.click('#signin_button')
        await page.waitForSelector('#login_form')
        
        await page.type('#user_login', 'invalid cred')
        await page.type('#user_password', 'invalid pass')
        await page.click('#user_remember_me')
        await page.click('input[type="submit"]') //use attribute 'type'
    
        // Add debugging information
        console.log('Page URL after login attempt:', page.url());
        
        // Add a screenshot for debugging
        await page.screenshot({ path: 'login_failure.png' });
    
        await page.waitForSelector('.alert-error') //use attribute 'class'
    })    

    it('Login Test - Valid Credential (+)', async function(){
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.waitForSelector('#signin_button')
        await page.click('#signin_button')
        await page.waitForSelector('#login_form')
        
        await page.type('#user_login', 'username')
        await page.type('#user_password', 'password')
        await page.click('#user_remember_me')
        await page.click('input[type="submit"]') //use atribute 'type'
        await page.waitForSelector('#settingBox') 
    })
})