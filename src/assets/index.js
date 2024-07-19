const fs = require("fs");
const path = require("path")

const blogs = fs.readFileSync(path.join(__dirname+"/New.md"))

let blog = 2
blogs.toString().split("---").forEach(file => {
  try {

    fs.writeFileSync(path.join(__dirname+`/blog-${blog}.md`), file)
    ++blog

  } catch (e) {
    console.log(e)
  }
  console.log(blog++)

})