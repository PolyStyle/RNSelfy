'use strict';
 
 /* proxy for all the api calls on the node server */

var baseUrl = 'http://localhost:3000'


function isSuccess(code) {
  return code >= 200 && code < 300;
}
/**
 * Gets all the posts
 */
export function getPosts() {
  var self = this;
  console.log('called api proxy')
  var endpoint = baseUrl + '/posts';
  return fetch(endpoint, {
  	method: 'GET',
  	headers: {'Content-Type': 'application/json',
  							'Authorization': 'Bearer ' + 'TOKEN'}
	}).then(function(res) {

			if(!isSuccess(res.status)){
				return res.json().then(function(json) {
					return Promise.reject(json);
				});
			}
			return res.json();
  });
};


export function getPost(id) {
  var self = this;
  console.log('called api proxy')
  var endpoint = baseUrl + '/posts/' +id;
  return fetch(endpoint, {
    method: 'GET',
    headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + 'TOKEN'}
  }).then(function(res) {

      if(!isSuccess(res.status)){
        return res.json().then(function(json) {
          return Promise.reject(json);
        });
      }
      return res.json();
  });
};


export function getBrand(id) {
  var self = this;
  console.log('called api proxy')
  var endpoint = baseUrl + '/brands/' +id;
  return fetch(endpoint, {
    method: 'GET',
    headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + 'TOKEN'}
  }).then(function(res) {

      if(!isSuccess(res.status)){
        return res.json().then(function(json) {
          return Promise.reject(json);
        });
      }
      return res.json();
  });
};


export function getBrandStream(id) {
  var self = this;
  console.log('called api proxy')
  var endpoint = baseUrl + '/brands/stream/' +id;
  return fetch(endpoint, {
    method: 'GET',
    headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + 'TOKEN'}
  }).then(function(res) {

      if(!isSuccess(res.status)){
        return res.json().then(function(json) {
          return Promise.reject(json);
        });
      }
      return res.json();
  });
};

export function getTag(id) {
  var self = this;
  console.log('called api proxy')
  var endpoint = baseUrl + '/tags/' +id;
  return fetch(endpoint, {
    method: 'GET',
    headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + 'TOKEN'}
  }).then(function(res) {

      if(!isSuccess(res.status)){
        return res.json().then(function(json) {
          return Promise.reject(json);
        });
      }
      return res.json();
  });
};



export function getTagStream(id) {
  var self = this;
  console.log('called api proxy')
  var endpoint = baseUrl + '/tags/stream/' +id;
  return fetch(endpoint, {
    method: 'GET',
    headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + 'TOKEN'}
  }).then(function(res) {

      if(!isSuccess(res.status)){
        return res.json().then(function(json) {
          return Promise.reject(json);
        });
      }
      return res.json();
  });
};


