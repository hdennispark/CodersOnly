const request = require('supertest');
const { internalIP } = require('webpack-dev-server');
const express = require('express');
const app = require('../server.js');
const server = 'http://localhost:3000';
const assert = require('assert');

describe('Route integration', () => {
  describe('GET', () => {
    // Note that we return the evaluation of `request` here! It evaluates to
    // a promise, so Jest knows not to say this test passes until that
    // promise resolves. See https://jestjs.io/docs/en/asynchronous
    it('responds with 201 status and text/html content type', () => {
      return request(server)
        .get('/api/feed')
        .expect('Content-Type', /application\/json/)
        .expect(201);
    });
  });

});