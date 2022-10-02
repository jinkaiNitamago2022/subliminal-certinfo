import * as certInfo from './certificate-Info.js';
// import * as storage from './storage.js';
import * as url from './url.js';

const storageCache = {};

export async function updateTab(tab) {
    var [commonName, organization] = await certInfo.getCertInfo(
        url.getCurrentTabUrl(tab),
        async(res) => {
            var j = await res.json();
            return [j.message.subject.CN, j.message.subject.O];
        }
    )
    chrome.storage.session.set(
        {
            'commonName': typeof commonName !== 'undefined' ? commonName : 'Unknown',
            'organization': typeof organization !== 'undefined' ? organization : 'Unknown'
            // 後に脅威情報リンクも追記する
        }
    );

    console.log('commonName: ' + commonName);
    console.log('Organization: ' + organization);

    // ↓ のような感じで、storageCache に保存した情報を取得する
    // await storage.assignStorageCache(storageCache);
    // console.log(storageCache);
}