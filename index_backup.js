const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(express.json());
app.use(cors());

const con = mysql.createConnection({
	host : "localhost",
	user : "root",
	password : "abc123",
	database : "sms_project2"
});

app.post("/save", (req, res)=>{
	let data = [req.body.rno, req.body.name, req.body.marks, req.body.feedback];
	let sql = "insert into student values(?,?,?,?)";
	con.query(sql, data, (err, result)=>{
		if (err)  return res.send(err) 
		else 
			return res.send(result)

	})

})

app.delete("/remove", (req,res)=>{
	let data = [req.body.rno];
	let sql = "delete from student where rno = ?";
	con.query(sql, data, (err, result)=>{
		if(err)
			return res.send(err);
		else
			return res.send(result);
	})

})

app.get("/gd", (req,res)=>{
	let sql = "select * from student";
	con.query(sql, (error, result)=>{
		if(error)
			return res.send(error);
		else
			return res.send(result);
	})

});


app.put("/modify", (req, res)=>{
	let data = [req.body.name, req.body.marks, req.body.feedback, req.body.rno];
	let sql = "update student set name = ?, marks = ?, feedback = ? where rno = ?";
	con.query(sql, data, (err, result)=>{
		if (err)
			return res.send(err);
		else
			return res.send(result);

	})


});
app.listen(9000, ()=>{console.log("Server started @9000")});