const { before } = require('mocha')
const puppeteer = require('puppeteer')
const expect = require('chai').expect //only pull out expect -> '.expect'

// 'describe' or describe block is wrapper around the test suite/steps
// no need to start any selenium server or some other external service. Replaced by 2 lines of code
// good to know: all these puppeteer actions have 30s default timeout
// hooks are used to allow commands to be executed under certain conditions easily. Mocha has 4 default hook options, After, Before, After Each, and Before Each.
describe('My First Puppeteer Test', ()=> {
    let browser
    let page

    // before hook
    before(async function(){ //'before Hook' -> specify the code which will be run once before all steps
        browser = await puppeteer.launch({ //it handles everything regarding spinning the browser
            headless: false, //false: make the test pop up the browser
            slowMo: 10, //50: make each of these commands takes 50ms
            devtools: false //false: close the devtools on browser
            //we can add more option here..
        }) 

        page = await browser.newPage()//spin up the 'browser' in headful mode and give us access to all puppeteer commands using 'page'
        await page.setDefaultTimeout(10000) //can override the timeout globally in this block
        await page.setDefaultNavigationTimeout(200000) //only for navigation action in several func, for all the rest will have only 10s

    })

    // after hook
    after(async function(){ //'after Hook' -> specify the code which will be run after the last test step is finished
        await browser.close() //close the browser
    })

    // before each hook
    beforeEach(async function(){ //runs before each test step

    })

    // after each hook
    afterEach(async function(){ //runs after each test step

    })

    // 'it blocks' for test steps or cases
    it('should launch the browser', async function(){

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

        // extract the text content from element
        await page.goto('https://example.com/')
        const title = await page.title()
        const url = await page.url()
        const text = await page.$eval('h1', element => element.textContent) //store in the var -> using evaluate or $eval function, 1st arg is selector, 2nd arg is callback func or promise
        
        // count the element
        const count = await page.$$eval('p', element => element.length) //it will count p tags on the page
        console.log('Text in the h1: ' + text)
        console.log('p tags on the page: ' + count)

        // verify that the text and count result are correct using expect as assertion
        expect(title).to.be.a('string', 'Example Domain') //comparing with - 1st arg is data type, 2nd arg is the expected text
        expect(url).to.include('example.com') //not using to be an exact value, but checking the included value on that expected text
        expect(text).to.be.a('string', 'Example Domain')
        expect(count).to.equal(2) //for comparing with number

        // keyboard press
        await page.goto('https://devexpress.github.io/testcafe/example/')
        await page.waitForSelector('#developer-name')
        await page.type('#developer-name', 'Kuromi')
        await page.keyboard.press('Enter', {delay: 10})

        // use XPath when waitForSelector can not be used
        await page.waitForXPath('//h1') //need to passing the element in the xpatch format instead of classic selector

        // verofy that the element is not longer exist
        await page.waitForSelector('#submit-button', {hidden: true}) //it will reverse the effect of wait for selector, it will be waiting until the selector is hidden

    })
})