import React from 'react';
import ReactDOM from 'react-dom';
//const configureMockStore =require('redux-mock-store')
import fetchMock from 'fetch-mock'
import App from './App';
import { ACTION_TYPES, setIsLoading } from '../src/actions/index'
import thunk from 'redux-thunk';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


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

describe('async action category click', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
    fetchMock.getOnce('/todos', {
      body: { todos: ['do something'] },
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = [
     // { type: types.FETCH_TODOS_REQUEST },
      { type: ac, body: { todos: ['do something'] } }
    ]
    const store = mockStore({ todos: [] })

    return store.dispatch(actions.fetchTodos()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})