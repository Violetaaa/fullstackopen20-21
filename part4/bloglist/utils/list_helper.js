const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {

  if (blogs.length === 0) {
    return 'No blogs rated yet'
  }

  return blogs.reduce((a, b) => a.likes > b.likes ? a : b)

  // maxLikes = -1
  // for (var i = 0; i < blogs.length; i++) {
  //   if (blogs[i]['likes'] > maxLikes){
  //     maxLikes = blogs[i]['likes'] 
  //     mostLikedBlog = blogs[i]
  //   }
  // }
  // return mostLikedBlog
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}


