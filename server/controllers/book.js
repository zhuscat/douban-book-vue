const Book = require('../models/book');

async function getBooks(ctx) {
  const sortKey = ctx.query.sort || 'ratingPeople';
  const page = ctx.query.page || 0;
  const sortObject = {
    [sortKey]: -1,
  };
  const books = await Book.find()
    .skip(page * 20)
    .limit(20)
    .sort(sortObject)
    .exec();
  ctx.body = books.map(book => book.toObject());
}

async function getBooksByTag(ctx) {
  const tag = decodeURIComponent(ctx.params.tag);
  const sortKey = ctx.query.sort || 'ratingPeople';
  const page = ctx.query.page || 0;
  const sortObject = {
    [sortKey]: -1,
  };
  const books = await Book.find({
    tags: tag,
  }).skip(page * 20)
    .limit(20)
    .sort(sortObject)
    .exec();
  ctx.body = books.map(book => book.toObject());
}

async function getBooks2(ctx) {
  const sortKey = ctx.query.sort || 'ratingPeople';
  const page = ctx.query.page || 0;
  const sortObject = {
    [sortKey]: -1,
  };
  const books = await Book.find()
    .skip(page * 20)
    .limit(20)
    .sort(sortObject)
    .exec();
  const total = await Book.find().count();
  ctx.body = {
    books: books.map(book => book.toObject()),
    total,
  };
}

async function getBooksByTag2(ctx) {
  const tag = decodeURIComponent(ctx.params.tag);
  const sortKey = ctx.query.sort || 'ratingPeople';
  const page = ctx.query.page || 0;
  const sortObject = {
    [sortKey]: -1,
  };
  const books = await Book.find({
    tags: tag,
  }).skip(page * 20)
    .limit(20)
    .sort(sortObject)
    .exec();
  const total = await Book.find({
    tags: tag,
  }).count();
  ctx.body = {
    books: books.map(book => book.toObject()),
    total,
  };
}

module.exports = { getBooks, getBooksByTag, getBooks2, getBooksByTag2 };
