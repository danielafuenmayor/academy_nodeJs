const ArticlesService = require('./articles.js')
const mockingoose = require('mockingoose')
const articles = require('../database/articles')
const authors = require('../database/authors')
const service = new ArticlesService(articles, authors)
const articleModel = require('../database/article-model')

const _articles = [
  {
    _id: '616d89518ca982345002a092',
    title: 'Some title',
    author: 'Some author',
    url: 'https://someurl.com',
    keywords: ['Some', 'Keywords'],
    readMins: 5,
    source: 'ARTICLE',
  },
  {
    _id: '616d89518ca982345002a093',
    title: 'Some title',
    author: 'Some author',
    url: 'https://someurl.com',
    keywords: ['Some', 'Keywords'],
    readMins: 5,
    source: 'ARTICLE',
  },
]
const _article = {
  _id: '616d89518ca982345002a093',
  title: 'Some title',
  author: 'Some author',
  url: 'https://someurl.com',
  keywords: ['Some', 'Keywords'],
  readMins: 5,
  source: 'ARTICLE',
}

describe('article methods', () => {
  //list
  it('should return all articles', async () => {
    mockingoose(articleModel).toReturn(_articles, 'find')
    const result = await service.list()
    expect(JSON.parse(JSON.stringify(result))).toStrictEqual(_articles)
  })
  //get
  it('should return one article', async () => {
    mockingoose(articleModel).toReturn(_article, 'finOne')
    const result = await service.get({params: {id: '616d89518ca982345002a093'}})
    expect(JSON.parse(JSON.stringify(result))).toStrictEqual(_articles[0])
  })
  //create
  //   it('should return the new article', async () => {
  //     mockingoose(articleModel).toReturn(_article, 'save')
  //     // mockingoose(authorModel).toReturn(_author, 'findOne')
  //     const newArticle = await service.create({body: _article})
  //     expect(JSON.parse(JSON.stringify(newArticle))).toStrictEqual(_article)
  //   })
})
