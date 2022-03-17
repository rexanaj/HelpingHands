// Takes in a JSON and appends a "log" field 
// which contains the team name, access time and data source 
const addLog = (data) => {
    data.log = {
        "Team Name": "Dwen",
        "Access Time": new Date(),
        "Data Source": "https://www.who.int/emergencies/disease-outbreak-news"
    }
    return data;
}

module.exports = { addLog };