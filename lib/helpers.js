// this file for "extend puppeteer and custom the commands" module

module.exports = {
    click: async function(page, selector){ //click: specify the page/context of the page and click which selector want to click
        try{
            //click func will automatically be waiting for the selector to appear
            await page.waitForSelector(selector)
            await page.click(selector)
        }catch(error){
            //specify error msg
            throw new Error('Could not click on selector: '+ selector)
        }
    },
    getText: async function(page, selector){
        try {
            await page.waitForSelector(selector)
            return await page.$eval(selector, element => element.innerHTML)
        } catch (error) {
            throw new Error('Cannot get the text from selector: '+ selector)
        }
    },
    getCount: async function(page, selector){
        try {
            await page.waitForSelector(selector)
            return await page.$$eval(selector, element => element.length)
        } catch (error) {
            throw new Error('Cannot get count of selector: '+ selector)
        }
    },
    typeText: async function(page, selector, text){
        try {
            await page.waitForSelector(selector)
            await page.type(selector, text)
        } catch (error) {
            throw new Error('Cannot get type into selector: '+selector)
        }
    },
    waitForText: async function(page, selector, text){ //find the text
        try {
            await page.waitForSelector(selector)
            await page.waitForFunction((selector, text) => {
                document.querySelector(selector).innerHTML.include(text),
                {},
                selector,
                text
            })
        } catch (error) {
            throw new Error('Text '+ text + ' not found for selector: '+selector)
        }
    },
    shouldNotExist: async function(page, selector){
        try {
            //await page.waitFor(() => !document.querySelector(selector)) //if the selector is still on the page, but it's just not visible -> will throw an error
            //use this:
            await page.waitForSelector(selector, {hidden: true})
        } catch (error) {
            throw new Error('Selector: '+selector+' should not exist')
        }
    }
}