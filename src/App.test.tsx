import React from 'react';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store'
import fetchMock from 'fetch-mock'
import App from './App';
import { ACTION_TYPES, setIsLoading } from '../src/actions/index'


describe('actions', () => {
  it('should create an action to set Is Loading', () => {
    const text = 'Finish docs'
    const expectedAction = {
      type: ACTION_TYPES.SET_ISLOADING,
      payload:true
    }
    expect(setIsLoading(true)).toEqual(expectedAction)
  })
})