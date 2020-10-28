const _ = require("lodash");

const dummy = blogs => 1

const totalLikes = blogs => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = blogs => {
  if (blogs.length === 0) {
    return 'No blogs rated yet'
  }
  return blogs.reduce((a, b) => a.likes > b.likes ? a : b)
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}
