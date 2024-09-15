import { jest } from '@jest/globals';
import { ProvideURLsForQuerying } from '../Input/Sanitize';
import { readFileSync } from 'fs';
import { TryReadUrlFile } from '../Input/Input';
import OpenAI from 'openai';
import { licenseFunction } from '../Scoring/licenseFunction';
import { responsiveFunction } from '../Scoring/responsiveFunction';
import * as LICENSESCORING from '../Scoring/licenseFunction';
import * as RESPONSIVESCORING from '../Scoring/responsiveFunction';
import * as BUSFACTORSCORING from '../Scoring/scoreBusFactor';

/**
 * John Leidy
 * General fetch spy and mock. This is used to prevent actual network calls being performed during unit testing.
 */
export const getFetchSpy = <T>(returnBody: T, statusCode: number, throwAnError?: boolean) =>
    jest
        .spyOn(global, 'fetch')
        .mockImplementation(async (input: string | URL | Request, init?: RequestInit | undefined) => {
            if (throwAnError === true) {
                throw new Error('fetch spy threw an error');
            }
            //A blob
            const blob = new Blob([JSON.stringify(returnBody, null, 2)], {
                type: 'application/json',
            });
            //the mock response object fetch will return when called
            return new Response(blob, { status: statusCode });
        });

export const getLicenseFuncSpy = (returnValue: number) =>
    jest.spyOn(LICENSESCORING, 'licenseFunction').mockImplementation((repo) => returnValue);

export const getResponsiveFuncSpy = (returnValue: number) =>
    jest.spyOn(RESPONSIVESCORING, 'responsiveFunction').mockImplementation((repo) => returnValue);

export const getBusFactorFuncSpy = (returnValue: number) =>
    jest.spyOn(BUSFACTORSCORING, 'scoreBusFactor').mockImplementation((repo) => returnValue);

export const getMockedCleanUrls = (filepath?: string) => {
    const cleanUrls = ProvideURLsForQuerying(filepath ? filepath : './src/TestUtils/example.txt', true);
    return cleanUrls;
};
