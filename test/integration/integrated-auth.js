/* eslint-disable linebreak-style */
const Connection = require('../../src/tedious').Connection;
const assert = require('chai').assert;
// const Request = require('../../src/tedious').Request;
// const TYPES = require('../../src/tedious').TYPES;

describe('connection-test', function() {
  it('test connection', async function() {
    var config = {
      server: '', // Server Name
      authentication: {
        type: 'integrated',
        options: {
          domain: '', // Domain
        }
      },
      options: {
        database: '', // Database Name
        trustServerCertificate: true
      }
    };
    var connection = new Connection(config);
    connection.connect();
    var status = await new Promise((resolve, reject) => {
      connection.on('connect', function(err) {
        if (err) {
          console.log(err);
          reject(new Error('not connected'));
        } else {
          resolve('connected');
        }
        connection.close();
      });
    });
    assert.equal('connected', status);
  });
});
