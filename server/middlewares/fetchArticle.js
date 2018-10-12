import { Article, User } from '../db/models';

// Method to fetch an article with the user
const getArticle = (request, response, next) => {
  Article.findOne({
    include: [{
      model: User,
      as: 'users',
      attributes: ['firstname', 'lastname', 'username']
    }],
    attributes: ['id', 'title', 'body', 'slug', 'description'],
    where: {
      slug: request.params.slug
    }
  })
    .then((article) => {
      if (!article) {
        return response.status(404)
          .json({
            status: 'failed',
            message: 'Article cannot be found'
          });
      }
      request.articleObject = article;
      next();
    })
    .catch(next);
};

export default getArticle;