const store = require('./store/store');

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/plain'
};

const sendGetResponse = (response, data, statusCode, headers) => {
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};

const sendPostResponse = (response, statusCode, headers) => {
  response.writeHead(statusCode, headers);
  console.group();
  // console.log('RESPONSE: ', response);
  console.groupEnd();
  // store.messageStore.push(response);
  response.end('You successfully sent data!');
};

let actions = {
  'POST': (request, response) => {
    // PURPOSE: store request -> into messsageStore.storage
    // messageStore.storage.push(request);
    console.log(request);
    sendPostResponse(response, 200, defaultCorsHeaders);
  },
  'GET': (request, response) => {
    // PURPOSE: give message.storage to the client
    sendGetResponse(response, store.messageStore.storage, 200, defaultCorsHeaders);
  }
};

var requestHandler = function (request, response) {

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  if (request.method === 'POST') {
    actions['POST'](request, response);
  } else {
    actions['GET'](response, response);
  }

};

exports.requestHandler = requestHandler;