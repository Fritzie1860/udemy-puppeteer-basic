// this file for "E2E: Currency Exchange" module

const puppeteer = require('puppeteer')

describe('Login Test', ()=>{
    let browser
    let page

    before(async function(){
        browser = await puppeteer.launch({
            headless: true,
            slowMo: 0
        })
        const context = await browser.createIncognitoBrowserContext()
        page = await context.newPage()

        page = await browser.newPage()
        await page.setDefaultTimeout(10000)
        await page.setDefaultNavigationTimeout(20000)

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

    it('Display currency exchange form', async function(){
        await page.waitForSelector('.nav-tabs')
        await page.click('#pay_bills_tab')
        await page.waitForSelector('#tabs > ul > li:nth-child(3) > a')
        await page.click('#tabs > ul > li:nth-child(3) > a')
        await page.waitForSelector('.board')
    })

    it('exchange currency', async function(){
        await page.select('#pc_currency', 'GBP')
        await page.type('pc_amount','3000')
        await page.click('#pc_inDollars_true')
        await page.click('#purchase_case')
        await page.waitForSelector('#alert_content')
    })
})