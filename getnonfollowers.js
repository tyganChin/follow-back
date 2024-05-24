
async function handleZipFile() {

    // get the inputted zip file 
    const fileInput = document.getElementById('zipFileInput');
    const file = fileInput.files[0];

    // if the file exists execute, otherwise set result to error
    let jsonFiles = new Array(2);
    if (!file) {
        document.getElementById('result').innerText = 'No file selected';
    }

    // create a fileReader instance
    const reader = new FileReader();

    // wrap file reading in a promise
    const arrayBuffer = await new Promise((resolve, reject) => {
        reader.onload = function(event) {
            resolve(event.target.result);
        };
        reader.onerror = function(error) {
            reject(error);
        };
        reader.readAsArrayBuffer(file);
    });
    await processZipFile(arrayBuffer, jsonFiles);

    noFollowBack = doNotFollowBack(jsonFiles);

    localStorage.setItem('noFollowBack', JSON.stringify(noFollowBack));

    window.location.href = 'results.html';
}

function processZipFile(arrayBuffer, jsonFiles) {

    // reference JSZip and create new JSZip object
    const JSZip = window.JSZip;
    const zip = new JSZip();

    // iterate through json files 
    return zip.loadAsync(arrayBuffer).then(function(zip) {
        const filePromises = [];
        zip.forEach(function(relativePath, zipEntry) {
            const filePromise = zipEntry.async("string").then(function(content) {

                // get name of json file
                path = relativePath.split('/')
                fileName = path[path.length - 1];

                // assign needed files to json array
                switch(fileName) {
                    case "following.json":
                        jsonFiles[0] = JSON.parse(content).relationships_following;
                        break;
                    case "followers_1.json":
                        jsonFiles[1] = JSON.parse(content);
                        break;
                }
            });
            filePromises.push(filePromise);
        });

        return Promise.all(filePromises);
    });
}

function doNotFollowBack(jsonFiles) {

    // create a hash table with all of the following names 
    let mutuals = {};
    jsonFiles[0].forEach(subarray => {
        data = subarray.string_list_data[0]
        mutuals[data.value] = data.href;
    });

    // remove any accounts from following if that account follows you back
    jsonFiles[1].forEach(subarray => {
        data = subarray.string_list_data[0]
        if (data.value in mutuals) {
            delete mutuals[data.value];
        } 
    });

    return mutuals;
}
