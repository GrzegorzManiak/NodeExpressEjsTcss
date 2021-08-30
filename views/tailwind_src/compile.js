const path = require("path");
const excludedFiles = ['compile.js'];
const publicDirectory = path.resolve('./content/public');
const childProcess = require('child_process');
const fs = require('fs');

let Files = [],
    i = 0;

//--// Neet function adapted from https://stackoverflow.com/a/63111390/10163112
function walkDirectory(Directory) {
    fs.readdirSync(Directory).forEach(File => {
        const Absolute = path.join(Directory, File);
        if (fs.statSync(Absolute).isDirectory()) return walkDirectory(Absolute);
        else if (!excludedFiles.includes(File) && /\.css$/gm.exec(File)) return Files.push(Absolute);
    });
}

//--// Executes the function and saves the output to Files for later use.
walkDirectory(__dirname);

Files.forEach(file => {
    //Converts the absolute path to the relative.
    let localPath = file.toString().replace(path.resolve('./views/tailwind_src'), '');

    //Converts the file paths in 'tailwind_src' to the public content directory.
    let newPath = path.resolve(publicDirectory + '/css/' + localPath);

    //Uses Child process to execute the command to compile tailwind css.
    let command = `NODE_ENV=production npx tailwindcss build ${file} -o ${newPath}`;

    console.log(`Compiling: ${localPath}`)
    childProcess.execSync(command);
    console.log(`Done: [${++i}/${Files.length}]`);
    console.log('')
})

console.log('Finished!')