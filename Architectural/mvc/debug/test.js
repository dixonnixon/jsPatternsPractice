
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();


// describe('urlTest', function() { //что тестируем
//     // it('тест ссылки на API', function() { //пояснение поведения
//     // //   var api = 'http://192.168.0.4/include/ArxivTest/api.php';

//     // //   assert.equal(api, pub.url());
//     //   // Test implementation goes here
//     // });
    
//       // We can have more its here

//     it('testLogin', function () {
        
//     })
// });

describe('loginCtrl', function() {
    it('testLogIntoSystyem:Joe@ukr.net', function() {
        const model = new Model('joe@ukr.net', '123', false);
        let controller = new Controller(model, null);

        controller.executeLogin().then(() => {
            assert.equal(controller.isLoggedIn(), true);
        });
    });
});

