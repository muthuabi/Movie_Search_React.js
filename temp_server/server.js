const express=require('express');
const app=express();
const cors=require('cors');
const port=5000;
const fstream=require('fs');
app.use(cors());

app.get("/movie-data",(req,res)=>{
	fstream.readFile("Film.JSON",(err,data)=>{
		if(err)
			res.send({error:"Some Error Has Occured"});
		res.status(200).json(JSON.parse(data));
	})

});
app.post("/movie-data",(req,res)=>{
	fstream.readFile("Film.JSON",(err,data)=>{
		if(err)
			res.send({error:"Some Error Has Occured"});
		res.status(200).json(JSON.parse(data));
	})
});

app.use((req,res,next)=>{
	res.status(404).send({message:"The Requested PATH is NOT AVAILABLE"});
})

app.listen(port,(e)=>{
	console.log("Listening on "+port);
})
