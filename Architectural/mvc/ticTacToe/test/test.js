import TicTacToe from '../src/model.js';
import ConfigLoader from '../src/configLoader.js';


async function initConfig() {
    let cr = new ConfigLoader();
    await cr.load();
    return cr;
}

describe("model", function() {
    var cr;
    
    describe("init ", function() {
        beforeEach(async function() {
            cr = await initConfig();
        });

        it(`canBeObj`, async function() {
            let model = new TicTacToe({ cells: Array(), board: cr.board });
            console.log(model);
            assert.equal(true, typeof model === 'object');
        });

    });
        // it(`${x} in the power 3 is ${expected}`, function() {
        //     assert.equal(pow(x, 3), expected);
        // });

    //   function makeTest(x) {
    //     let expected = x * x * x;
    //     it(`${x} in the power 3 is ${expected}`, function() {
    //       assert.equal(pow(x, 3), expected);
    //     });
    //   }
  
    //   for (let x = 1; x <= 5; x++) {
    //     makeTest(x);
    //   }
  
    
  
    // it("if n is negative, the result is NaN", function() {
    // //   assert.isNaN(pow(2, -1));
    // });
  
    // it("if n is not integer, the result is NaN", function() {
    // //   assert.isNaN(pow(2, 1.5));
    // });
  
  });