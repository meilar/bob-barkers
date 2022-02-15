export default class AmazonService {
  static makeAPICall(searchCategory) {
    return fetch(`https://api.rainforestapi.com/request?api_key=${process.env.API_KEY}&type=bestsellers&category_id=bestsellers_${searchCategory}&amazon_domain=amazon.com`).then(function(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    }).catch(function(errorStatus) {
      return Error(errorStatus);
    });
  }
}