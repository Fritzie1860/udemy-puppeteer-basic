// this file for "E2E: submitting feedback" module

const puppeteer = require('puppeteer')
const expect = require('chai').expect

describe('Submitting Feedback', ()=>{
    let browser
    let page

    before(async function(){
        browser = await puppeteer.launch({
            headless: true,
            slowMo: 0
        })
        page = await browser.newPage()
        await page.setDefaultTimeout(10000)
        await page.setDefaultNavigationTimeout(20000)
    })

    after(async function(){
        await browser.close()
    })

    it('Display Feedback Form', async function(){
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.waitForSelector('#feedback')
        await page.click('#feedback')
    })

    it('Submit feedback', async function(){
        await page.waitForSelector('form')
        await page.type('#name', 'Zie')
        await page.type('#email', 'zie@gmail.com')
        await page.type('#subject', 'Feedback')
        await page.type('#comment', 'This is my feedback')
        await page.click('input[type="submit"]')
        
    })

    it('Display Result Page', async function(){
        await page.waitForSelector('#feedback-title')
        const url = await page.url()
        expect(url).to.include('./senFeedback.html')
    })
})