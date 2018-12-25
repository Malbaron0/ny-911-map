//fetch
let NYCOpenData = {

    nycData: () => {
        let url = 'https://data.cityofnewyork.us/resource/9s4h-37hy.json';
        return fetch(url, {
            headers: {
                'X-App-Token': 'VxVfB1l051bDWPhFmrm2QeX9a'
            },
        })
            .then(response => response.json())
    },

    //Get category values for year, crimeType
    getCrimeTypes: (nycData) => {
        let result = nycData.reduce((accumlator, current) => {

            let year = new Date(current.cmplnt_fr_dt).getFullYear();

            if (accumlator["crimeTypes"] === undefined && accumlator["years"] === undefined) {
                accumlator["crimeTypes"] = [];
                accumlator["years"] = [];
            }
            if (accumlator["crimeTypes"].length === 0 || !accumlator["crimeTypes"].includes(current.law_cat_cd)) {
                if (current.law_cat_cd !== undefined) {
                    accumlator["crimeTypes"].push(current.law_cat_cd);
                }
            }
            if (accumlator["years"].length === 0 || !accumlator["years"].includes(year)) {
                if (!Number.isNaN(year)) {
                    accumlator["years"].push(year);
                }
            }

            return accumlator;
        }, {})

        return result;
    },
    //recursively call for multiple options?
    getByYear: (nycData, year) => {
        return nycData.filter(crime => year == new Date(crime.cmplnt_fr_dt).getUTCFullYear())
    },

    getByCrime: (nycData, crimeName) => {
        return nycData.filter(crime => crime.law_cat_cd == crimeName)
    },

    getByBorough: (nycData, borough) => {
        return nycData.filter(crime => crime.boro_nm == borough)
    },

    getMultiple: (nycData, year, crimeName, borough) => {
        console.log(`${year}  ${crimeName}  ${borough}`);
        return nycData.filter(crime => {
            return (year == new Date(crime.cmplnt_fr_dt).getUTCFullYear() &&
                crime.law_cat_cd == crimeName &&
                crime.boro_nm == borough)
        })
    }


}

export default NYCOpenData;
/*
Create filter functions
//get by year
//get by offense
//get by borough
//make multiple selection
*/