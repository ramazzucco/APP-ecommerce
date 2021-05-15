
const objectToSring = (obj) => {
    const arrayOfStrings = [];
    const keys = Object.keys(obj);
    const values = Object.values(obj);

    for (let i = 0; i < keys.length; i++) {
        const string = `${keys[i]}: ${values[i]};`;
        arrayOfStrings.push(string);
    }

    console.log(arrayOfStrings.join(""))
    return arrayOfStrings.join("")
}

export { objectToSring }