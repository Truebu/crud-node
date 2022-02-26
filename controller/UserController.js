const User = require("../model/customerModel.js");

exports.create= (req, res)=>{
    console.log(req.body);
    if(!req.body){
        res.status(400).send({
            msg: "The body can't been void"
        });
    }

    const user = new User({
        email: req.body.email,
        name: req.body.name,
        stade: req.body.stade
    });

    User.create(user, (err, data)=>{
        if(err){
            res.status(500).send({
                msg: err.message || "An error occurred while creating the user"
            });
        }else{
            res.send(data);
        }
    });
}

exports.getAll = (req, res) =>{
    User.getAll((err, data) =>{
        if(err){
            res.status(500).send({
                msg: err.message || "An error occurred while geting users"
            });
        }else{
            res.send(data);
        }
    });
}

exports.findById = (req, res) =>{
        User.findById(req.params.userId, (err, data) =>{
            if(err){
                if(err.kind === "not found"){
                    res.status(404).send({
                        msg: `User not found with id : ${req.params.userId}.`
                    });
                }else{
                    res.status(500).send({
                        msg: `Error getting user with id : ${req.params.userId}.`
                    });
                }
            }else{
                res.send(data);
            }
        });
}

exports.remove = (req, res) =>{
    User.remove(req.params.userId, (err, data) =>{
        if(err){
            if(err.kind === "not found"){
                res.status(404).send({
                    msg: `User not found with id : ${req.params.userId}.`
                });
            }else{
                res.status(500).send({
                    msg: `Error deleting user with id : ${req.params.userId}.`
                });
            }
        }else{
            res.send({msg: "Successfully deleted user"});
        }
    });
}

exports.updateById = (req, res) =>{
    if(!req.body){
        res.status(400).send({
            msg: "The body can't been void"
        });
    }
    const newUser = req.body;
    User.updateById(req.params.userId, newUser, (err, data)=>{
        if(err){
            if(err.kind === "not found"){
                res.status(404).send({
                    msg: `User not found with id : ${req.params.userId}.`
                });
            }else{
                res.status(500).send({
                    msg: `Error getting user with id : ${req.params.userId}.`
                });
            }
        }else{
            res.send(data);
        }
    });

}

exports.removeAll = (req, res) => {
    User.removeAll((err, data) =>{
        if(err){
            res.status(500).send({
                msg: err.message || "An error occurred while deleting users"
            });
        }else{
            res.send({msg : "All users were deleted"});
        }
    });
}