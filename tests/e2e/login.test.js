// this file for "E2E: login page" module

const puppeteer = require('puppeteer')

describe('Login Test', ()=>{
    let browser
    let page

    before(async function(){
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 0
        })
        page = await browser.newPage()
        await page.setDefaultTimeout(10000)
        await page.setDefaultNavigationTimeout(20000)
    })

    after(async function(){
        await browser.close()
    })

    beforeEach(async function(){
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.waitForSelector('#signin_button')
    })

    it('Login Test - Invalid Credential (-)', async function(){
        await page.click('#signin_button')
        await page.waitForSelector('#login_form')
        
        await page.type('#user_login', 'invalid cred')
        await page.type('#user_password', 'invalid pass')
        await page.click('#user_remember_me')
        await page.click('input[type="submit"]') //use atribute 'type'
        await page.waitForSelector('.alert-error') //use atribute 'class'
    })

    it('Login Test - Valid Credential (+)', async function(){
        await page.click('#signin_button')
        await page.waitForSelector('#login_form')
        
        await page.type('#user_login', 'username')
        await page.type('#user_password', 'password')
        await page.click('#user_remember_me')
        await page.click('input[type="submit"]') //use atribute 'type'
        await page.waitForSelector('#settingBox') 
    })
})