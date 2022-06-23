const { MarkovMachine } = require('./markov');

describe('Test Markov Machine', function () {
    let mm;

    beforeAll(function () {
        let text = "As I pee sir, I see Pisa";
        mm = new MarkovMachine(text);
    });

    test('test makeChains', function () {
        expect(mm.chain["I"]).toEqual(["pee", "see"]);
    });

    test('test getIndexArray', function () {
        expect(mm.getIndexArray("I")).toEqual([1, 4]);
    });

    test('test getFollowWordsArray', function () {
        expect(mm.getFollowWordsArray([1, 4])).toEqual(["pee", "see"]);
    });

    test('test makeText', function () {
        expect(mm.makeText()).toEqual(expect.any(String));
    });
});