const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const result = blogs.reduce((sum, blog) => sum + blog.likes, 0)
  return result
}

module.exports = {
  dummy, totalLikes
}

