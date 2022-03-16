const stringToDate = (dateString) => {
    const split = dateString.split("-");
    const formattedEndDate = new Date(split[2], split[1] - 1, split[0]);
    return formattedEndDate;
}

module.exports = { stringToDate };