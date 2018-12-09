//fetch
let NYCOpenData =  {
    nycData: () => {
        let url = 'https://data.cityofnewyork.us/resource/9s4h-37hy.json';
        return fetch(url, {
           headers: {
                'X-App-Token': 'VxVfB1l051bDWPhFmrm2QeX9a'
           }, 
        })
        .then(response => response.json())
    },

    
}


export default NYCOpenData;



/*
Create filter functions
//get by year
//get by offense
//get by borough
//make multiple selection
*/