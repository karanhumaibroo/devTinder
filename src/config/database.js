const moongose=require("mongoose");
const connection=async()=>{
  await  moongose.connect(
    process.env.MOONGOSE_CONNECT
);}


module.exports=connection;