const puppeteer = require('puppeteer')


// 'describe' or describe block is wrapper around the test suite/steps
// no need to start any selenium server or some other external service. Replaced by 2 lines of code
describe('My First Puppeteer Test', ()=> {
    it('should launch the browser', async function(){
        const browser = await puppeteer.launch({ //it handles everything regarding spinning the browser
            headless: false, //false: make the test pop up the browser
            slowMo: 50, //50: make each of these commands takes 50ms
            devtools: false //false: close the devtools on browser
            //we can add more option here..
        }) 

        const page = await browser.newPage()
        // spin up the 'browser' in headful mode and give us access to all puppeteer commands using 'page'
        
        await page.goto('https://example.com/') //telling to the 'page' to visit the url
        //await page.waitForTimeout(30000) //wait for the promise resolve the 3000ms timeout
        await page.waitForSelector('h1') //one example of 'assertion'. To make sure the url is working = to check the element is exist. if true, then move on. if false, it will throw an error
        //await page.reload() //could refresh the browser
        await page.goto('https://dev.to/')
        await page.waitForSelector('#topbar') //using id as a selector
        
        // trying go back and forward 
        await page.goBack()
        await page.waitForSelector('h1')
        await page.goForward()
        await page.waitForSelector('#topbar')

        await page.goto('https://devexpress.github.io/testcafe/example/')

        // interacting with input field
        const fillInput = 'Zie'
        await page.type('#developer-name', fillInput, {delay: 100}) //calling type, first arg is selector, 2nd is value, and 3rd is delay.

        // interacting with button
        await page.click('#background-parallel-testing', {clickCount: 1}) //calling click, first arg is selector, 2nd is optional-clickcount default is 1.
        
        // interacting with dropdown
        await page.select('#preferred-interface', 'Both') //calling select, get the selector and put the specific value option
        
        // confirm the test result with assertion
        await page.waitForTimeout(1000)
        await page.click('#submit-button')
        await page.waitForSelector('.result-content')

        await browser.close() //close the browser
    })
})