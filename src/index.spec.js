var $ = require("jquery");
var jsonData = require("./mockdata.json");
var jsdom = require("jsdom");
var path =  $ = require("path");
var fs = require("fs");
global.$ = $;
global.jQuery = $
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
jest.mock('./index.css', () => ({
  a: jest.fn()
}))
jest.mock('@fortawesome/fontawesome-free/js/all.js', () => ({
    b: jest.fn()
  }))
  beforeEach(() => {
    // Constructing a new JSDOM with this option is the key
    // to getting the code in the script tag to execute.
    // This is indeed dangerous and should only be done with trusted content.
    // https://github.com/jsdom/jsdom#executing-scripts
    dom = new jsdom.JSDOM(html, { runScripts: 'dangerously' })
    container = dom.window.document.body
  })
test('first test',() =>{
    // indexfile.fun
    expect(1).toBe(1);

    let proceedBtn =  container.querySelector('button.proceed');
    let backBtn =  container.querySelector('#back');
    let nextBtn =  container.querySelector('#next');
    expect(proceedBtn).toBeTruthy();
    expect(backBtn).toBeFalsy();
    expect(nextBtn).toBeFalsy();
    proceedBtn.click();
    expect(proceedBtn).toBeFalsy();
    expect(backBtn).toBeTruthy();
    expect(nextBtn).toBeTruthy();
});
