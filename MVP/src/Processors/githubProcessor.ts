import chalk from 'chalk';
import { transformToNDJSONRow } from '../Transform/NDJSON';
import { QueryParams, Repository } from '../Types/DataTypes';
import { RepoURL } from '../Input/Input';

/**
 * John Leidy
 * takes in github url, returns QueryParams if the owner and name can be extracted using match
 * this is still necessary because there is not a universally exported function in cleanurls to handle this
 * we do not have the repo owner and repo name until we make a request to the registry to get the github url stored there
 * then we can reparse the url and extract those items
 * @param url any github url, including those that come back from registry with and without ssh
 * @returns QueryParams | undefined
 */
export const getOwnerNameFromGithubUrl = (url: string): QueryParams | undefined => {
    //regex to pull the owner and repo name.
    //complex because npm urls can be ssh or http urls
    const regex = /(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/]+)\/([^\/]+?)(?:\.git)?$/;

    const match = url.match(regex);

    if (match) {
        const owner = match[1];
        const repoName = match[2];

        return { owner: owner, repoName: repoName };
    } else {
        console.log(chalk.red('Invalid GitHub URL'));
        console.log(url);
        return undefined;
    }
};

/**
 * John Leidy
 * This function receives a RepoUrl obj and creates a repo using it
 * @param githubUrlData - The repo url data type from clean urls {@type RepoUrl}
 * @returns a repository with proper fielsd initialized
 */
export const processGitHubUrl = <T>(githubUrlData: RepoURL): Repository<T> | undefined => {
    if (githubUrlData) {
        return {
            owner: githubUrlData.repoOwner,
            repoName: githubUrlData.repoName,
            fileUrl: githubUrlData.raw,
            queryResult: null,
            NDJSONRow: transformToNDJSONRow(githubUrlData.raw),
        };
    } else {
        return undefined;
    }
};
