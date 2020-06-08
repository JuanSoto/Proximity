const s = require('shelljs');

s.rm('-rf', 'build');
s.mkdir('build');
s.mkdir('build/uploadsCompleted');
s.cp('.env', 'build/.env');
s.cp('-R', 'uploadsTest/', 'build/uploads');
