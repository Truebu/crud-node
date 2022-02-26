const sql =require("./db.js");

const User = function(user){
    this.email = user.email;
    this.name = user.name;
    this.stade = user.stade;
}

User.create = (newUser, result)=>{
    sql.query("insert into user set ?", newUser, (err, res)=>{
        if(err){
            console.log("error:", err );
            result(err, null);
            return;
        }

        console.log("create customer: ", {id: res.insetId, ...newUser});
        result(null, {id: res.insetId, ...newUser});
    });
};

User.findById = (userId, result)=>{
    sql.query(`select * from user where id = ${userId}`, (err, res)=>{
        if(err){
            console.log("error:", err );
            result(err, null);
            return;
        }
        console.log(res);
        if(res.length){
            console.log("Customer found: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({kind: "Not found"}, null);
    });
}

User.getAll = result =>{
    sql.query("select * from user", (err, res)=>{
        if(err){
            console.log("error:", err );
            result(err, null);
            return;
        }
        
        console.log("Users: ", res);
        result(null, res);
    });
}

User.updateById = (id, user, result)=>{
    sql.query("update user set email = ?, name = ?,  stade = ? where id =?",
    [user.email, user.name, user.stade, id], (err, res)=>{
        if(err){
            console.log("error:", err );
            result(err, null);
            return;
        }
        if(res.affectedRows == 0){
            result({kind: "Not found"}, null);
            return;
        }

        console.log("customer update: ", {id: id, ...user});
        result>(null, {id:id, ...user});
    });
}

User.remove = (id, result) =>{
    sql.query("delete from user where id = ? ", id, (err, res)=>{
        if(err){
            console.log("error:", err );
            result(err, null);
            return;
        }
        if(res.affectedRows == 0){
            result({kind: "Not found"}, null);
            return;
        }
        console.log("customer deleted with id: ", id);
        result(null, res);
    });
}

User.removeAll = result =>{
    sql.query("delete from user", (err, res)=>{
        if(err){
            console.log("error:", err );
            result(err, null);
            return;
        }

        console.log(`deleteds ${res.affectedRows} users`);
        result(null, res);
    });
}

module.exports = User;