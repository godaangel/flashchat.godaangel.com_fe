require('shelljs/global');

var from = `${pwd().stdout}/dist`;

exec('npm run build');

var to = '/Users/godaangel/Documents/myAllProgrameCode/2017server/wstest';

cp('-R',`${from}/*`,`${to}`);

console.log('finished，文件已经拷贝到',`${to}`);