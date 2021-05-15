const urlbase = [];

const environment = (environment) => {
    const urlbasedevelopment = "http://localhost:3000";
    const urlbaseproduction = "";

    environment === "development"
        ? urlbase.push(urlbasedevelopment)
        : urlbase.push(urlbaseproduction)
}

const themes = [ "styledefault", "light1", "dark1" ];

export { environment, urlbase, themes }