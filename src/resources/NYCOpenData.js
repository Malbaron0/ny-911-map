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
    
    getByYear: (nycData, year) => {
        return nycData.filter(crime => {
            let stringDate = new Date(crime.cmplnt_fr_dt).getUTCFullYear().toString();
            if(year.includes(stringDate)){
                return true;
            }
        })
    },

    getByCrime: (nycData, crimeName) => {
        return nycData.filter( crime => {
            if(crimeName.includes(crime.law_cat_cd))
                return true;
        })
    },

    getByBorough: (nycData, borough) => {
        return nycData.filter(crime => {
            if(borough.includes(crime.boro_nm)){
                return true;
            }
        })
    },

    getMultiple: (nycData, selectedCategoryValues) => {
        let results = 
        
        nycData.filter(crime => {
            let stringDate = new Date(crime.cmplnt_fr_dt).getUTCFullYear().toString();
            if(selectedCategoryValues.yearValues.includes(stringDate)){
                return true;
            }
        })
        .filter(crimeByYear => {
            if(selectedCategoryValues.crimeValues.includes(crimeByYear.law_cat_cd))
                return true;
        })
        .filter(crimeByType => {
            if(selectedCategoryValues.boroughValues.includes(crimeByType.boro_nm)){
                return true;
            }
        })
        return results;
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