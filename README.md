# sam-store-manager

[![Build Status](https://travis-ci.org/walsamlee/sam-store-manager.svg?branch=ch-setup-travis-ci-161475643)](https://travis-ci.org/walsamlee/sam-store-manager)
[![Coverage Status](https://coveralls.io/repos/github/walsamlee/sam-store-manager/badge.svg?branch=ch-integrate-coveralls-161492975)](https://coveralls.io/github/walsamlee/sam-store-manager?branch=ch-integrate-coveralls-161492975)

Store Manager is a web application that helps store owners manage sales and product inventory records.

## Made with
  ### Client
    * CSS for UI styling

  ### Server
	* Nodejs for server-side logic
	* Express for api routes implementation
	* Heroku for service hosting

  ### Continuous Integration
    * Travis CI

  ### Test-Driven Development
	* Mocha with Chai

## Available APIs
- API routes for products
  * GET : ```/api/v1/products```
  * GET : ```/api/v1/products/<productId>```
  * POST : ```/api/v1/products```
- API routes for sales
  * GET : ```/api/v1/sales```
  * GET : ```/api/v1/sales/<salesId>```
  * POST : ```/api/v1/sales```
