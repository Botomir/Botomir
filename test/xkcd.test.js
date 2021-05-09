const source = require('rfr');

const { getRandomComic, getNewestComic, getComic } = source('bot/utils/xkcd');

describe('xkcd comic api', () => {
    test('random success', () => {
        expect(getRandomComic()).resolves.toContainKeys(['img', 'num', 'year', 'month', 'day', 'safe_title']);
        expect(getRandomComic()).resolves.toContainKeys(['img', 'num', 'year', 'month', 'day', 'safe_title']);
        expect(getRandomComic()).resolves.toContainKeys(['img', 'num', 'year', 'month', 'day', 'safe_title']);
        expect(getRandomComic()).resolves.toContainKeys(['img', 'num', 'year', 'month', 'day', 'safe_title']);
        expect(getRandomComic()).resolves.toContainKeys(['img', 'num', 'year', 'month', 'day', 'safe_title']);
    });

    test('newest', async () => {
        const newA = await getNewestComic();
        const newB = await getNewestComic();

        expect(newA).toContainKeys(['img', 'num', 'year', 'month', 'day', 'safe_title']);
        expect(newB).toContainKeys(['img', 'num', 'year', 'month', 'day', 'safe_title']);

        expect(newA.num).toBe(newB.num);
    });

    test('specific comic', async () => {
        const newA = await getComic(1);
        const newB = await getComic(4);
        const newC = await getComic(400);
        const newD = await getComic('40');
        const newE = await getComic('34');

        expect(newA).toContainKeys(['img', 'num', 'year', 'month', 'day', 'safe_title']);
        expect(newB).toContainKeys(['img', 'num', 'year', 'month', 'day', 'safe_title']);

        expect(newC).toContainKeys(['img', 'num', 'year', 'month', 'day', 'safe_title']);
        expect(newD).toContainKeys(['img', 'num', 'year', 'month', 'day', 'safe_title']);
        expect(newE).toContainKeys(['img', 'num', 'year', 'month', 'day', 'safe_title']);

        expect(newA.num).toBe(1);
        expect(newB.num).toBe(4);
        expect(newC.num).toBe(400);
        expect(newD.num).toBe(40);
        expect(newE.num).toBe(34);
    });

    test('invalid comic number - word', async () => {
        await expect(getComic('abcd')).toReject();
        await expect(getComic('cool')).toReject();
        await expect(getComic('cdde')).toReject();
    });

    test('invalid comic number - negative', async () => {
        await expect(getComic(-12)).toReject();
        await expect(getComic('-3')).toReject();
        await expect(getComic('-223')).toReject();
    });

    test('invalid comic number - too high', async () => {
        await expect(getComic(1999999999999)).toReject();
        await expect(getComic('1999999999999')).toReject();
    });

    test('invalid comic number - 0', async () => {
        await expect(getComic(0)).toReject();
        await expect(getComic('0')).toReject();
    });
});
