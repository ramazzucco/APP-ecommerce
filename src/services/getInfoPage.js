const urlbase = [];

const environment = (environment) => {
    const urlbasedevelopment = "http://localhost:3000";
    const urlbaseproduction = "";

    environment === "development"
        ? urlbase.push(urlbasedevelopment)
        : urlbase.push(urlbaseproduction)
}

export { environment, urlbase }