const fs = require('fs');
const path = require("path");

fs.writeFile(path.join(__dirname, 'file1.txt'), 'Name: Masha Age: 21 City: Lviv,', (err) => {
    if (err) {
        console.log(err);
        throw err;
    }
})

// 1. Спробуйте створити якийсь файл txt, прочитайте з нього дані і одразу, дані які ви отримали запишіть їх в інший файл,
// в вас вийде невеликий callback hell, пізніше я вам покажу як можна це обійти, але поки зробіть так

fs.readFile(path.join(__dirname, 'file1.txt'),(err, data) => {
    if (err) {
        console.log(err);
        throw err
    }
    fs.appendFile(path.join(__dirname, 'file2.txt'), `${data}`, (err) => {
        if (err) {
            console.log(err);
            throw err
        }
    })
})

// 2. Створіть файл ( можете вручну ) заповніть його якимись даними. Прочитайте його, скопіюйте всі дані з нього і перенесіть
// їх в нову папку та файл в ній, старий файл видаліть після того як все завершиться. Також вийде callback hell

fs.readFile(path.join(__dirname, 'file1.txt'),(err, data) => {
    if (err) {
        console.log(err);
        throw err
    }
    fs.mkdir(path.join(__dirname, 'copy'), (err) => {
        if (err) {
            console.log(err);
            throw err;
        }
        fs.writeFile(path.join(__dirname, 'copy', 'copy.txt'), `${data}`, (err) => {
            if (err) {
                console.log(err);
                throw err;
            }
            fs.unlink(path.join(__dirname, 'file1.txt'), (err) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
            })
        })
    })
})

// 3. Створіть папку (можете вручну) напишіть скріпт який створить в ній якись дані (можуть бути нові папки і файли(в файли запишіть якусь дату) )
// і напишіть функцію яка буде зчитувати папку і перевіряти якщо дані які в ній лежать - це файли тоді вам потрібно їх очистити,
// але не видаляти, якщо дані - це папки, вам потрібно їх перейменувати і додати до назви префікс _new

// fs.mkdir(path.join(__dirname, 'task3', 'file1'), (err) => {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
//     fs.mkdir(path.join(__dirname, 'task3', 'file2'), (err) => {
//         if (err) {
//             console.log(err);
//             throw err;
//         }
//         fs.writeFile(path.join(__dirname, 'task3', 'text1.txt'), 'hello', (err) => {
//             if (err) {
//                 console.log(err);
//                 throw err;
//             }
//             fs.writeFile(path.join(__dirname, 'task3', 'text2.txt'), 'goodbye', (err) => {
//                 if (err) {
//                     console.log(err);
//                     throw err;
//                 }
//             })
//         })
//     })
// })

function readFile(folder) {
    fs.readdir(path.join(__dirname, `${folder}`), (err, data) => {
        if (err) {
            console.log(err);
            throw err;
        }
        for (const file of data) {
            fs.stat(path.join(`${folder}`, file), (err, status) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
                if (status.isDirectory()){
                    console.log('folder:' + file);
                    fs.rename(path.join(`${folder}`, file), path.join(`${folder}`, file + '_new'), (err) => {
                        if (err) {
                            console.log(err);
                            throw err;
                        }
                    })
                    readFile(path.join(`${folder}`+ '/' + file));
                }else {
                    console.log('file:' + file)
                    fs.truncate(path.join(`${folder}`, file), (err) => {
                        if (err) {
                            console.log(err);
                            throw err;
                        }
                    })
                }
            });
        }
    });
}
readFile('task3');