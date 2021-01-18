function readFile(fileName) {
    const fs = require("fs");
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, "utf8", function (err, data) {
            if (!err) {
                resolve(String(data));
            } else {
                reject(err);
            }
        });
    });
}

function writeFile(fileName, contents) {
    const fs = require("fs");
    return new Promise(function (resolve, reject) {
        fs.writeFile(fileName, contents, "utf8", function (err) {
            if (!err) {
                resolve("success");
            } else {
                reject(err);
            }
        });
    });
}

const parseAddress = async function parsingAddress(inputStr) {
    const thisFile = await readFile(process.cwd() + "/target.txt");
    let arr0, arr2;
    let refinedAddress;

    arr0 = thisFile.split("\n");
    const arr1 = arr0.map((el) => el.split("\t"));
    arr2 = [];
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i][1] !== undefined && arr1[i][2] === "존재") {
            arr2.push(arr1[i][1].split(" "));
        }
    }

    refinedAddress = [];
    for (let i = 0; i < arr2.length; i++) {
        if (arr2[i].length > 2) {
            refinedAddress.push(arr2[i]);
        }
    }

    const tempFirst = refinedAddress.map((el) => el[0]);
    let firstArr = Array.from(new Set(tempFirst));

    let firstAddress = [];
    for (let i = 0; i < firstArr.length; i++) {
        temp = { value: firstArr[i], sub: [] };
        temp2 = [];
        for (let j = 0; j < refinedAddress.length; j++) {
            if (refinedAddress[j][0] === firstArr[i]) {
                temp2.push(refinedAddress[j][1]);
            }
        }
        for (let j = 0; j < Array.from(new Set(temp2)).length; j++) {
            temp.sub.push({ value: Array.from(new Set(temp2))[j], sub: [] });
        }
        firstAddress.push(temp);
    }

    for (let i = 0; i < firstAddress.length; i++) {
        for (let j = 0; j < firstAddress[i].sub.length; j++) {
            let temp = [];
            for (let k = 0; k < refinedAddress.length; k++) {
                if (
                    firstAddress[i].value === refinedAddress[k][0] &&
                    firstAddress[i].sub[j].value === refinedAddress[k][1]
                ) {
                    temp.push(refinedAddress[k][2]);
                }
            }
            temp = Array.from(new Set(temp));
            tempSub = [];
            for (let j = 0; j < temp.length; j++) {
                tempSub.push({ value: temp[j], sub: [] });
            }
            firstAddress[i].sub[j].sub = tempSub;
        }
    }

    const file = JSON.parse(await readFile(process.cwd() + "/test2.json"));
    let trimmedStr = inputStr.trim().replace(/\s{2,}/gi, " ");
    let arr = trimmedStr.split(" ");

    // const first = ["특별자치도", "특별자치시", "특별시", "도", "광역시"];
    // const second = ["시", "군", "구", "읍", "면", "동"];
    // const third = ["구", "읍", "면", "동", "가", "로", "리"];

    let x, y, z;
    for (let i = 0; i < file.length; i++) {
        if (new RegExp(arr[0]).test(file[i].value)) {
            x = i;
        }
    }

    for (let i = 0; i < file[x].sub.length; i++) {
        if (new RegExp(arr[1]).test(file[x].sub[i].value)) {
            y = i;
        }
    }

    for (let i = 0; i < file[x].sub[y].sub.length; i++) {
        if (new RegExp(arr[2]).test(file[x].sub[y].sub[i].value)) {
            z = i;
        }
    }


    return {
        coordinate: [x, y, z],
        result:
            `${file[x].value} ${file[x].sub[y].value} ${file[x].sub[y].sub[z].value}`,
        arr: [
            file[x].value,
            file[x].sub[y].value,
            file[x].sub[y].sub[z].value
        ]
    };

    // let getCoordinate = function () {
    //   return {
    //     coordinate: [x, y, z],
    //     result:
    //       file[x].value + file[x].sub[y].value + file[x].sub[y].sub[z].value,
    //   };
    // };

}


module.exports = {
    readFile,
    writeFile,
    parseAddress
}
