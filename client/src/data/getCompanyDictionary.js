const getCompanyDictionary = (jobApps) => {
  let companyDictionary = {};

  for (let i = 0; i < jobApps.length; i++) {
    let idx = i;
    let company = jobApps[i];
    let company_name = company.company_name.toLowerCase();
    let curChars = '';

    for (let i = 0; i < company_name.length; i++) {
      let character = company_name[i];
      curChars += character;

      if (companyDictionary[curChars]) {
        companyDictionary[curChars].push([company_name, idx]);
      } else {
        companyDictionary[curChars] = [[company_name, idx]];
      }
    }
  }

  return companyDictionary;
}

export default getCompanyDictionary;
