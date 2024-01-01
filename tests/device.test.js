// this file for "device emulation" module

const puppeteer = require('puppeteer')

describe('Device Emulation', ()=>{
    let browser
    let page

    before(async function(){
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 10
        })
        // to open incognito browser -> set up an anonymous browser context, then pass to a new page func
        const context = await browser.createIncognitoBrowserContext()
        page = await context.newPage()

        page = await browser.newPage()
        await page.setDefaultTimeout(10000)
        await page.setDefaultNavigationTimeout(20000)
    })

    after(async function(){
        await browser.close()
    })

    // basically to emulate any device for desktop, all we have to do is use set viewport and pass it the width and height

    it('Desktop Device Test', async function(){
        await page.setViewport({ //telling the browser to set the viewport to the value of this width and height
            width: 1650,
            height: 1050
        })
        await page.goto('https://www.example.com')
        await page.waitForTimeout(5000)
    })

    it('Tablet Device Test', async function(){
        const tablet = puppeteer.KnownDevices['iPad landscape']
        await page.emulate(tablet) //will set the viewport of the puppeteer to match the iPad landscaoe resolution
        await page.goto('https://www.example.com')
        await page.waitForTimeout(5000)
    })

    it('Mobile Device Test', async function(){
        const mobile = puppeteer.KnownDevices['iPhone 13']
        await page.emulate(mobile) //will set the viewport of the puppeteer to match the iPhone resolution
        await page.goto('https://www.example.com')
        await page.waitForTimeout(5000)
    })

})