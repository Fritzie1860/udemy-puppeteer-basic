const puppeteer = require('puppeteer')

describe('My First Puppeteer Test', ()=> {
    it('should launch the browser', async function(){
        const browser = await puppeteer.launch({ //it handles everything regarding spinning the browser
            headless: false, //false: make the test pop up the browser
            slowMo: 30, //50: make each of these commands takes 50ms
            devtools: false //false: close the devtools on browser
            //we can add more option here..
        }) 

        const page = await browser.newPage()
        // spin up the 'browser' in headful mode and give us access to all puppeteer commands using 'page'
        
        await page.goto('https://example.com/') //telling to the 'page' to visit the url
        await new Promise(resolve => setTimeout(resolve, 3000)) //wait for the promise resolve the 3000ms timeout
        await page.waitForSelector('h1') //one example of 'assertion'. To make sure the url is working = to check the element is exist. if true, then move on. if false, it will throw an error
        await page.reload() //could refresh the browser
        await browser.close() //close the browser
    })
})
// 'describe' or describe block is wrapper around the test suite/steps
// no need to start any selenium server or some other external service. Replaced by 2 lines of code
