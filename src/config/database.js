const moongose=require("mongoose");
const connection=async()=>{
  await  moongose.connect(
    "mongodb+srv://adarsh08:4june1972@cluster0.thwwxbv.mongodb.net/tinderdev?retryWrites=true&w=majority&appName=Cluster0"
);}


module.exports=connection;