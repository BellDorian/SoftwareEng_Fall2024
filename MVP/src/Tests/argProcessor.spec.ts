import { afterEach, beforeAll, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { processArguments } from '../Processors/argProcessor';
import { validFilePath, validSpacePath } from '../TestUtils/constants';

describe('Arg Processor', () => {
    const originalArgv = process.argv;
    beforeAll(() => {
        jest.spyOn(console, 'warn').mockImplementation(() => {});
    });
    beforeEach(() => {
        process.argv = [...originalArgv];
    });
    afterEach(() => {
        process.argv = [...originalArgv];
    });
    it('Should return a valid filepath if it exists in args', async () => {
        process.argv = [...originalArgv, validFilePath()];
        const filePath = await processArguments();
        expect(filePath).toBeTruthy();
    });
    it('Should return undefined if a valid filepath does not exist', async () => {
        process.argv = [...originalArgv];
        const filepath = await processArguments();
        expect(filepath).toBeFalsy();
    });
    it('Should process paths with spaces', async () => {
        process.argv = [...originalArgv, validSpacePath()];
        const filepath = await processArguments();
        expect(filepath).toBeTruthy();
    });
});
