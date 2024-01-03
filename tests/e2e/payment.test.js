// this file for "E2E: payment + date picker" module

const puppeteer = require('puppeteer')

describe('Login Test', ()=>{
    let browser
    let page

    before(async function(){
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 20
        })
        const context = await browser.createIncognitoBrowserContext()
        page = await context.newPage()

        page = await browser.newPage()
        await page.setDefaultTimeout(10000)
        await page.setDefaultNavigationTimeout(200000)

        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.waitForSelector('#login_form')
        
        await page.type('#user_login', 'invalid cred')
        await page.type('#user_password', 'invalid pass')
        await page.click('#user_remember_me')
        await page.click('input[type="submit"]') //use atribute 'type'
    })

    after(async function(){
        await browser.close()
    })

    it('Display payment form', async function(){
        await page.waitForSelector('.nav-tab')
        await page.click('#pay_bills_tab')
        await page.waitForSelector('.board')

    })

    it('Make payment ', async function(){
        await page.select('#sp_payee', 'Apple')
        await page.select('#sp_account', 'Credit Card')
        await page.type('#sp_amount','500')

        // interacting with date picker
        await page.type('#sp_date', '2020-03-18')
        await page.keyboard.press('Enter')
        await page.type('#sp_description','note for payment')
        await page.click('#pay_saved_payees')
    })

    it('Display result page', async function(){
        await page.waitForSelector('#alert_content') 
    })
})